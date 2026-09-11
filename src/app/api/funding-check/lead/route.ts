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
  cta: string;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildEmailHtml(
  lead: LeadPayload,
  summary: Record<string, string>,
  result: AssessmentResult,
  source?: { url?: string; referrer?: string },
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
  <p><strong>CTA:</strong> ${lead.cta === "review" ? "Funding-Ready Project Review" : "Indicative System Quote"}</p>
  <h3 style="color:#0b2d5b;">Contact</h3>
  <ul>
    <li><strong>Name:</strong> ${escapeHtml(lead.name)}</li>
    <li><strong>School:</strong> ${escapeHtml(lead.school)}</li>
    <li><strong>Email:</strong> ${escapeHtml(lead.email)}</li>
    <li><strong>Phone:</strong> ${escapeHtml(lead.phone || "(not provided)")}</li>
    <li><strong>Preferred contact:</strong> ${escapeHtml(lead.contactMethod)}</li>
  </ul>
  <h3 style="color:#0b2d5b;">Assessment result</h3>
  <table style="border-collapse:collapse;font-size:0.925rem;">${resultRows}</table>
  <h3 style="color:#0b2d5b;">Questionnaire answers</h3>
  <table style="border-collapse:collapse;font-size:0.925rem;">${rows}</table>
  ${source?.url ? `<p><strong>Page:</strong> ${escapeHtml(source.url)}</p>` : ""}
  ${source?.referrer ? `<p><strong>Referrer:</strong> ${escapeHtml(source.referrer)}</p>` : ""}
  <p style="margin-top:16px;font-size:0.75rem;color:#6b7280;">Sent ${new Date().toISOString()} from the SmartComms NZ funding check.</p>
</div>`;
}

export async function POST(req: Request) {
  let body: {
    answers?: AssessmentAnswers;
    lead?: LeadPayload;
    source?: { url?: string; referrer?: string };
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { answers, lead, source } = body;
  if (!lead || !lead.name || !lead.school || !lead.email || !answers) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FUNDING_LEAD_EMAIL_TO ?? "insights@t3labs.co.uk";
  const from = process.env.FUNDING_LEAD_EMAIL_FROM ?? "SmartComms NZ <insights@t3labs.co.uk>";

  if (!apiKey) {
    console.error("[funding-check/lead] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { ok: false, error: "The enquiry service is temporarily unavailable. Please try again shortly or use our contact form." },
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
        html: buildEmailHtml(lead, summary, result, source),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[funding-check/lead] Resend error ${res.status}: ${text}`);
      return NextResponse.json({ ok: false, error: "Could not send request. Please try again or email us directly." }, { status: 502 });
    }
  } catch (error) {
    console.error("[funding-check/lead] send failed", error);
    return NextResponse.json({ ok: false, error: "Could not send request. Please try again or email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
