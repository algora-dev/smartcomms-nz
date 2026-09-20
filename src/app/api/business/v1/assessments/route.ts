import { NextRequest, NextResponse } from "next/server";
import { assessPricing } from "@/lib/business-core/assess-pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // stateless, never cached

/**
 * POST /api/business/v1/assessments
 *
 * Read-only, versioned pricing assessment (Release 2). Reuses the SAME
 * validator + deterministic engine as the public calculator. Stateless:
 * creates no records, PDFs, leads or messages. Human fallback is the
 * existing enquiry journey via the returned next-action URLs.
 *
 * GATED: stays off until deployment-layer rate controls are proven
 * (SC-06: "Keep the new external API off until adequate controls are
 * proven"). Enable with env BUSINESS_API_ENABLED=true.
 */
export async function POST(req: NextRequest) {
  if (process.env.BUSINESS_API_ENABLED !== "true") {
    return NextResponse.json({ error: "Not available." }, { status: 404 });
  }

  // Bound the request before parsing; validated state is ~1 KB.
  const MAX_BODY_BYTES = 16 * 1024;
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }
  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const assessmentType =
    typeof (body as { assessment_type?: unknown })?.assessment_type === "string"
      ? (body as { assessment_type: string }).assessment_type
      : "unknown";

  if (assessmentType !== "pricing") {
    // Discriminated contract: reserved variants are explicit not_supported.
    return NextResponse.json(
      {
        business_id: "smartcomms-nz",
        schema_version: 1,
        assessment_type: assessmentType,
        status: "not_supported",
        message:
          assessmentType === "funding" || assessmentType === "finance"
            ? "This assessment type is reserved but not implemented yet."
            : "Unknown assessment_type. Only 'pricing' is supported.",
      },
      { status: 400 },
    );
  }

  const input = (body as { input?: unknown }).input ?? body;
  const result = assessPricing(input);
  const status = result.status;
  return NextResponse.json(result, {
    status: status === "ok" ? 200 : 400,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET() {
  // Discovery-only; assessments are POST-only and stateless.
  return NextResponse.json(
    {
      business_id: "smartcomms-nz",
      schema_version: 1,
      capability: "assessment",
      supported_types: ["pricing"],
      method: "POST",
      note: "Read-only budget estimates. POST { assessment_type: 'pricing', input: <cfg-format calculator state> }.",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
