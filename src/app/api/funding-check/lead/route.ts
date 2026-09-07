import { NextResponse } from "next/server";
import {
  answersToSummary,
  type AssessmentAnswers,
  type AssessmentResult,
} from "@/lib/funding-check/engine";

/**
 * Funding-check lead capture: lightweight email-only for V1 (no DB).
 *
 * Sends via the Resend REST API (no SDK dependency). Config:
 *   RESEND_API_KEY        - required to actually send
 *   FUNDING_LEAD_EMAIL_TO - recipient; falls back to FUNDING_LEAD_EMAIL_TO_FALLBACK
 *   FUNDING_LEAD_EMAIL_FROM - verified sender; falls back to onboarding@resend.dev
 *
 * Email is best-effort per the codebase convention: missing config logs a
 * warning but never crashes the request.
 */

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

function buildEmailHtml(lead: LeadPayload, summary: Record<string, string>, result: AssessmentResult): string {
  const rows = Object.entries(summary)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const resultRows = [
    ["Pathway", result.pathway],
    ["Headline", result.headline],
    ["Project case", `${result.caseTier} (${result.caseScore} points)`],
    ["Positive override fired", result.positiveOverride ? "yes" : "no"],
    ["Strong components", result.components.strong.join(", ") || "(none)"],
    ["Moderate components", result.components.moderate.join(", ") || "(none)"],
    ["Weak components", result.components.weak.join(", ") || "(none)"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td><td style="padding:6px 12px;border:1px solid #e5e7eb;">${escapeHtml(String(v))}</td></tr>`,
    )
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
  <p style="margin-top:16px;font-size:0.75rem;color:#6b7280;">Sent ${new Date().toISOString()} from the SmartComms NZ funding pre-qualification tool.</p>
</div>`;
}

export async function POST(req: Request) {
  let body: { answers?: AssessmentAnswers; lead?: LeadPayload; result?: AssessmentResult };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { answers, lead, result } = body;
  if (!lead || !lead.name || !lead.school || !lead.email || !answers) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FUNDING_LEAD_EMAIL_TO ?? process.env.FUNDING_LEAD_EMAIL_TO_FALLBACK;
  const from = process.env.FUNDING_LEAD_EMAIL_FROM ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.warn(
      "[funding-check/lead] RESEND_API_KEY or FUNDING_LEAD_EMAIL_TO not set - lead not emailed. " +
        `Lead was: ${lead.school} / ${lead.email} (${lead.cta})`,
    );
    // Config incomplete: acknowledge so the user is not blocked, but flag it.
    return NextResponse.json({ ok: true, queued: false });
  }

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
        html: buildEmailHtml(lead, summary, result ?? { pathway: "five_ya", headline: "-", pathwayLabel: null, positiveOverride: false, positiveOverrideMessage: null, components: { strong: [], moderate: [], weak: [] }, hasStrongComponents: false, caseTier: "weak", caseScore: 0, supportingFactors: [], infrastructureSummary: { reusable: "unknown", heading: "-", body: "-" }, confirmationsNeeded: [] }),
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[funding-check/lead] Resend error ${res.status}: ${text}`);
      return NextResponse.json({ ok: false, error: "Could not send request" }, { status: 502 });
    }
  } catch (e) {
    console.error("[funding-check/lead] send failed", e);
    return NextResponse.json({ ok: false, error: "Could not send request" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, queued: true });
}
