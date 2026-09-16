import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

// Destination inbox is configured exclusively via environment variables.
// No hardcoded fallback: a missing variable must fail safely (503) rather
// than expose or rely on a private address in a public repository.
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // per file
const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 5;

/**
 * Abuse protection note: durable per-IP rate limiting for this route is a
 * deployment-layer control (Vercel Firewall / WAF or an edge rate limiter),
 * because in-memory limits do not survive across serverless instances.
 * The honeypot + field validation below are the in-app baseline only.
 */

const ALLOWED_EXTENSIONS = new Set(["pdf", "png", "jpg", "jpeg", "webp", "dwg", "heic"]);

const HELP_LABELS: Record<string, string> = {
  choosing_system: "Help choosing a system",
  understanding_estimate: "Help understanding an estimate",
  formal_quote: "Formal quote / installer",
  site_assessment: "Site assessment",
  funding_scope: "Funding / project-scope question",
  cabling_network: "Network / cabling question",
  quote_review: "Existing design / quote review",
  general_question: "General question",
  // legacy values (pre-triage modal)
  technical_review: "Technical / network review",
  funding_review: "Funding / project review",
};

const MODE_LABELS: Record<string, string> = {
  project_help: "Project help",
  quote_help: "Quote help",
  funding_help: "Funding / scope help",
  site_assessment: "Site assessment enquiry",
  cabling_help: "Cabling / network enquiry",
  system_selection: "System selection help",
  general_message: "General contact message",
  // legacy values
  quote: "Quote help",
  assessment: "Site assessment enquiry",
  message: "General contact message",
  cabling: "Cabling / network enquiry",
  connect: "Project help",
};

const EXISTING_PROVIDER_LABELS: Record<string, string> = {
  yes: "Yes",
  no: "No",
  unsure: "Not sure",
};

function fileExtension(name: string): string {
  const parts = name.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() ?? "" : "";
}

/**
 * Content sniffing: never trust the filename extension alone. Returns a
 * short label for the detected type, or null when the bytes do not match a
 * known allowed format. Formats we cannot reliably sniff (dwg, heic) fall
 * back to extension-only acceptance.
 */
function sniffFileType(bytes: Uint8Array): string | null | "unknown" {
  if (bytes.length < 4) return null;
  // %PDF
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return "pdf";
  // PNG
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  // JPEG
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  // RIFF....WEBP
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes.length > 12 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) return "webp";
  return "unknown";
}

export async function POST(req: Request) {
  try {
    const { Resend } = await import("resend");
    const key = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_EMAIL_TO;
    const fromEmail = process.env.INQUIRY_EMAIL_FROM;
    if (!key || !toEmail || !fromEmail) {
      if (!key) console.error("[inquiry] RESEND_API_KEY is not configured.");
      if (!toEmail) console.error("[inquiry] INQUIRY_EMAIL_TO is not configured.");
      if (!fromEmail) console.error("[inquiry] INQUIRY_EMAIL_FROM is not configured.");
      return NextResponse.json(
        { error: "Something went wrong. Please try again shortly." },
        { status: 503 },
      );
    }
    const resend = new Resend(key);

    const fd = await req.formData();
    const get = (k: string) => (fd.get(k) ?? "").toString().slice(0, 4000);

    // Honeypot. Real users never see or fill this field.
    if (get("company_website")) {
      return NextResponse.json({ ok: true });
    }

    const mode = get("mode");
    const isProject = mode !== "general_message" && mode !== "message";
    const name = get("name");
    const email = get("email");
    const organisation = get("organisation");
    const phone = get("phone");
    const location = get("location");
    const message = get("message");
    const comments = get("comments");
    const helpType = get("helpType");
    const estimate = get("estimate");
    const estimateLink = get("estimateLink");
    const pageUrl = get("pageUrl");
    const referrer = get("referrer");
    const existingProvider = get("existingProvider");
    const providerName = get("providerName");
    const brandPreference = get("brandPreference");
    const sourceTopic = get("sourceTopic");

    // Basic server-side sanity: email shape and bounded lengths.
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    for (const [label, value] of [["name", name], ["email", email]] as const) {
      if (value.length > 300) {
        return NextResponse.json({ error: `The ${label} field is too long.` }, { status: 400 });
      }
    }

    // Project enquiries require name/organisation/email/town-region; generic
    // contact requires name/email/message. Phone is always optional.
    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (isProject && (!organisation || !location)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!isProject && !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const files = fd.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `Please attach no more than ${MAX_FILES} files.` }, { status: 400 });
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "Attachments are too large in total. Please keep combined uploads under 20MB." }, { status: 400 });
    }

    // Enforce a sane overall request size (defence in depth against oversized posts).
    const requestSize = Number(req.headers.get("content-length") ?? "0");
    if (requestSize > MAX_TOTAL_ATTACHMENT_BYTES + 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Request is too large. Please reduce the size of your attachments." }, { status: 413 });
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    for (const f of files) {
      if (f.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json({ error: `${f.name} is larger than 8MB. Please attach a smaller file.` }, { status: 400 });
      }
      const ext = fileExtension(f.name);
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return NextResponse.json({ error: `${f.name} is not a supported file type.` }, { status: 400 });
      }
      const bytes = new Uint8Array(await f.arrayBuffer());
      const sniffed = sniffFileType(bytes);
      if (sniffed === null) {
        return NextResponse.json({ error: `${f.name} does not appear to be a valid ${ext.toUpperCase()} file.` }, { status: 400 });
      }
      // "unknown" bytes are accepted ONLY for formats we cannot sniff
      // (dwg, heic). Any other allowed extension with unrecognised bytes
      // is rejected: never trust the filename extension alone.
      if (sniffed === "unknown" && ext !== "dwg" && ext !== "heic") {
        return NextResponse.json({ error: `${f.name} does not appear to be a valid ${ext.toUpperCase()} file.` }, { status: 400 });
      }
      attachments.push({ filename: f.name, content: Buffer.from(bytes) });
    }

    // Structured tool/page context lines (ctx_* keys, non-PII).
    const contextLines = [...fd.keys()]
      .filter((k) => k.startsWith("ctx_"))
      .map((k) => [k.slice(4), fd.get(k)?.toString().slice(0, 2000) ?? ""] as const)
      .filter(([, v]) => v);

    // Attribution fields (internal only, never shown to users).
    const attribution = [...fd.keys()]
      .filter((k) => k.startsWith("attr_"))
      .map((k) => [k.slice(5), fd.get(k)?.toString() ?? ""] as const)
      .filter(([, v]) => v);

    const modeLabel = MODE_LABELS[mode] ?? "Enquiry";

    const body = [
      `Type: ${modeLabel}`,
      helpType && HELP_LABELS[helpType] ? `Help requested: ${HELP_LABELS[helpType]}` : null,
      sourceTopic ? `Source topic: ${sourceTopic}` : null,
      `Name: ${name}`,
      organisation ? `Organisation: ${organisation}` : null,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "Phone: (not provided)",
      location ? `Town / region: ${location}` : null,
      existingProvider && EXISTING_PROVIDER_LABELS[existingProvider]
        ? `Existing provider relationship: ${EXISTING_PROVIDER_LABELS[existingProvider]}${providerName ? ` (${providerName})` : ""}`
        : null,
      brandPreference ? `Brand / product preference: ${brandPreference}` : null,
      estimate ? `Estimate: ${estimate}` : null,
      estimateLink ? `Estimate link: ${estimateLink}` : null,
      pageUrl ? `Page URL: ${pageUrl}` : null,
      referrer ? `Referrer: ${referrer}` : null,
      "",
      ...(contextLines.length
        ? ["Tool / page context (attached automatically):", ...contextLines.map(([k, v]) => `- ${k}: ${v}`), ""]
        : []),
      isProject ? "Comments:" : "Message:",
      (isProject ? comments : message) || "(none)",
      "",
      "Attribution (internal only):",
      attribution.length ? attribution.map(([k, v]) => `- ${k}: ${v}`).join("\n") : "(none captured)",
      "",
      "=== ROUTING STATUS ===",
      "T3 review required — not automatically forwarded.",
      "You may recommend a provider and send the customer the provider's public contact details.",
      "Do NOT share the customer's personal/contact/project information with any provider unless the customer agrees to a direct introduction.",
    ].filter((line) => line !== null).join("\n");

    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `SmartComms enquiry: ${modeLabel} - ${name}`,
      text: body,
      attachments,
    });

    if (sendResult.error) {
      console.error("inquiry resend error", sendResult.error);
      return NextResponse.json({ error: "We couldn't send your enquiry. Please try the form again in a few minutes." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("inquiry error", err);
    return NextResponse.json({ error: "We couldn't send your enquiry. Please try the form again in a few minutes." }, { status: 500 });
  }
}
