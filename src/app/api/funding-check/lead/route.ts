import { NextResponse } from "next/server";
import {
  answersToSummary,
  runAssessment,
  type AssessmentAnswers,
  type AssessmentResult,
} from "@/lib/funding-check/engine";

interface LeadPayload {
  name: string;
  school: string;
  email: string;
  phone: string;
  contactMethod: string;
  townRegion: string;
  cta: string;
  /** Honeypot: real UI never fills this. */
  companyWebsite?: string;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildEmailHtml(
  lead: LeadPayload,
  summary: Record<string, string>,
  result: AssessmentResult,
  source?: { url?: string; referrer?: string },
  attribution?: Record<string, string>,
): string {
  const rows = Object.entries(summary)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${escapeHtml(v)}</td></tr>`)
    .join("");

  const resultRows = [
    ["Pathway", result.pathway],
    ["Headline", result.headline],
    ["Project case", `${result.caseTier} (${result.caseScore} categories)`],
    ["Strong components", result.components.strong.join(", ") || "(none)"],
  ]
    .map(([k, v]) => `<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${escapeHtml(String(v))}</td></tr>`)
    .join("");

  return `<div style="font-family:system-ui,sans-serif;color:#1f2937;">
  <h2 style="color:#0b2d5b;">New funding-check lead: ${escapeHtml(lead.school)}</h2>
  <p><strong>CTA:</strong> ${lead.cta === "review" ? "Project scope review" : "Indicative system quote"}</p>
  <p style="padding:8px 12px;background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;"><strong>ROUTING STATUS:</strong> T3 review required — NOT automatically forwarded to any partner. Share provider details only after the customer agrees to a direct introduction.</p>
  <h3 style="color:#0b2d5b;">Contact</h3>
  <ul>
    <li><strong>Name:</strong> ${escapeHtml(lead.name)}</li>
    <li><strong>School:</strong> ${escapeHtml(lead.school)}</li>
    <li><strong>Email:</strong> ${escapeHtml(lead.email)}</li>
    <li><strong>Phone:</strong> ${escapeHtml(lead.phone || "(not provided)")}</li>
    <li><strong>Preferred contact:</strong> ${escapeHtml(lead.contactMethod)}</li>
    <li><strong>Town / region:</strong> ${escapeHtml(lead.townRegion || "(not provided)")}</li>
  </ul>
  <h3 style="color:#0b2d5b;">Assessment result</h3>
  <table style="border-collapse:collapse;font-size:0.925rem;">${resultRows}</table>
  <h3 style="color:#0b2d5b;">Questionnaire answers</h3>
  <table style="border-collapse:collapse;font-size:0.925rem;">${rows}</table>
  ${source?.url ? `<p><strong>Page:</strong> ${escapeHtml(source.url)}</p>` : ""}
  ${source?.referrer ? `<p><strong>Referrer:</strong> ${escapeHtml(source.referrer)}</p>` : ""}
  ${attribution && Object.keys(attribution).length ? `<h3 style="color:#0b2d5b;">Attribution (internal only)</h3><table style="border-collapse:collapse;font-size:0.925rem;">${Object.entries(attribution).map(([k, v]) => `<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:600;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${escapeHtml(v)}</td></tr>`).join("")}</table>` : ""}
  <p style="margin-top:16px;font-size:0.75rem;color:#6b7280;">Sent ${new Date().toISOString()} from the SmartComms NZ funding check.</p>
</div>`;
}

export async function POST(req: Request) {
  let body: {
    answers?: AssessmentAnswers;
    lead?: LeadPayload;
    source?: { url?: string; referrer?: string };
    attribution?: Record<string, string>;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { answers, lead, source, attribution } = body;
  // Honeypot: silently accept and discard obvious bot submissions.
  if (lead?.companyWebsite) return NextResponse.json({ ok: true });
  if (!lead || !lead.name || !lead.school || !lead.email || !answers) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }
  // Bounded lengths / sane email shape (defence in depth).
  const bounded = (v: string | undefined, max: number) => (v ?? "").toString().trim().length <= max;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_RE.test(lead.email) || !bounded(lead.name, 300) || !bounded(lead.school, 300) || !bounded(lead.townRegion, 200) || !bounded(lead.phone, 60)) {
    return NextResponse.json({ ok: false, error: "Please check the contact details you entered." }, { status: 400 });
  }
  // Server-side enforcement of the funding lead requirements (frontend
  // validation must never be the only gate).
  if (!lead.townRegion || !lead.townRegion.trim()) {
    return NextResponse.json({ ok: false, error: "Please add your town or region so we can route your enquiry." }, { status: 400 });
  }
  if (lead.contactMethod === "phone" && (!lead.phone || !lead.phone.trim())) {
    return NextResponse.json({ ok: false, error: "Please add a phone number so we can call you back." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Destination inbox is configured exclusively via environment variables.
  // No hardcoded fallback: a missing variable must fail safely (503).
  const to = process.env.FUNDING_LEAD_EMAIL_TO ?? process.env.INQUIRY_EMAIL_TO;
  const from = process.env.FUNDING_LEAD_EMAIL_FROM ?? process.env.INQUIRY_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    if (!apiKey) console.error("[funding-check/lead] RESEND_API_KEY is not configured.");
    if (!to) console.error("[funding-check/lead] FUNDING_LEAD_EMAIL_TO / INQUIRY_EMAIL_TO is not configured.");
    if (!from) console.error("[funding-check/lead] FUNDING_LEAD_EMAIL_FROM / INQUIRY_EMAIL_FROM is not configured.");
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again shortly." },
      { status: 503 },
    );
  }

  const result = runAssessment(answers);
  const summary = answersToSummary(answers);
  const subject = `Funding-check lead: ${lead.school} - ${lead.cta === "review" ? "Project review" : "System quote"}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject,
        html: buildEmailHtml(lead, summary, result, source, attribution),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[funding-check/lead] Resend error ${res.status}: ${text}`);
      return NextResponse.json({ ok: false, error: "We couldn't submit your request. Please try the form again in a few minutes." }, { status: 502 });
    }
  } catch (error) {
    console.error("[funding-check/lead] send failed", error);
    return NextResponse.json({ ok: false, error: "We couldn't submit your request. Please try the form again in a few minutes." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
