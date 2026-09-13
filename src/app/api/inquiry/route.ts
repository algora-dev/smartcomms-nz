import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const TO_EMAIL = process.env.INQUIRY_EMAIL_TO ?? "insights@t3labs.co.uk";
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // per file
const MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 5;

const ALLOWED_EXTENSIONS = new Set(["pdf", "png", "jpg", "jpeg", "webp", "dwg", "heic"]);

const HELP_LABELS: Record<string, string> = {
  formal_quote: "Formal quote",
  site_assessment: "Site assessment",
  funding_review: "Funding / project review",
  choosing_system: "Help choosing a system",
  technical_review: "Technical / network review",
  general_question: "General project question",
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
    if (!key) {
      return NextResponse.json(
        { error: "The enquiry service is temporarily unavailable. Please try the form again in a few minutes." },
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

    const mode = get("mode"); // quote | assessment | message
    const isProject = mode === "quote" || mode === "assessment";
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
      // "unknown" is accepted only for formats we cannot sniff (dwg, heic).
      attachments.push({ filename: f.name, content: Buffer.from(bytes) });
    }

    // Attribution fields (internal only, never shown to users).
    const attribution = [...fd.keys()]
      .filter((k) => k.startsWith("attr_"))
      .map((k) => [k.slice(5), fd.get(k)?.toString() ?? ""] as const)
      .filter(([, v]) => v);

    const modeLabel =
      mode === "assessment" ? "Site assessment request"
      : mode === "message" ? "General contact message"
      : "Accurate quote request";

    const body = [
      `Type: ${modeLabel}`,
      helpType && HELP_LABELS[helpType] ? `Help requested: ${HELP_LABELS[helpType]}` : null,
      `Name: ${name}`,
      organisation ? `Organisation: ${organisation}` : null,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "Phone: (not provided)",
      location ? `Town / region: ${location}` : null,
      estimate ? `Estimate: ${estimate}` : null,
      estimateLink ? `Estimate link: ${estimateLink}` : null,
      pageUrl ? `Page URL: ${pageUrl}` : null,
      referrer ? `Referrer: ${referrer}` : null,
      "",
      isProject ? "Comments:" : "Message:",
      (isProject ? comments : message) || "(none)",
      "",
      "Attribution (internal only):",
      attribution.length ? attribution.map(([k, v]) => `- ${k}: ${v}`).join("\n") : "(none captured)",
    ].filter((line) => line !== null).join("\n");

    const sendResult = await resend.emails.send({
      from: process.env.INQUIRY_EMAIL_FROM ?? "SmartComms NZ <insights@t3labs.co.uk>",
      to: [TO_EMAIL],
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
