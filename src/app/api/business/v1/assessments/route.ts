import { NextRequest, NextResponse } from "next/server";
import { assessPricing } from "@/lib/business-core/assess-pricing";
import { PRICING_MODEL_VERSION } from "@/lib/pricing/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // stateless, never cached

/**
 * POST /api/business/v1/assessments — read-only, versioned pricing assessment.
 * GET — capability discovery.
 *
 * Canonical request (Release 2.1):
 *   { "assessment_type": "pricing", "input": { "state": <cfg-format calculator state>, "industry": "aged-care"? } }
 *
 * GATED on BOTH methods: stays off (404, nothing advertised) until the owner
 * sets BUSINESS_API_ENABLED=true after Vercel rate controls are confirmed.
 * Stateless: creates no records, PDFs, leads or messages.
 */

const MAX_BODY_BYTES = 16 * 1024; // validated state is ~1 KB

function disabled(): NextResponse {
  // Same safe disabled result for GET and POST: no capability advertised,
  // no configuration values exposed.
  return NextResponse.json({ error: "Not available." }, { status: 404 });
}

function telemetry(
  reqId: string,
  status: string,
  startedAt: number,
  extra: Record<string, string | number> = {},
): void {
  // Minimal operational telemetry only: no PII, no request bodies.
  console.log(
    JSON.stringify({
      t: "assessment",
      req_id: reqId,
      capability: "pricing_assessment",
      adapter: "http",
      status,
      elapsed_ms: Date.now() - startedAt,
      pricing_model_version: PRICING_MODEL_VERSION,
      ...extra,
    }),
  );
}

export async function POST(req: NextRequest) {
  const startedAt = Date.now();
  const reqId = req.headers.get("x-request-id") ?? crypto.randomUUID();
  if (process.env.BUSINESS_API_ENABLED !== "true") return disabled();

  // Bound the request before parsing.
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    telemetry(reqId, "rejected_oversize", startedAt);
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }
  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) {
    telemetry(reqId, "rejected_oversize", startedAt);
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    telemetry(reqId, "rejected_bad_json", startedAt);
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const assessmentType =
    typeof (body as { assessment_type?: unknown })?.assessment_type === "string"
      ? (body as { assessment_type: string }).assessment_type
      : "unknown";

  if (assessmentType !== "pricing") {
    // Discriminated contract: reserved variants are explicit not_supported.
    telemetry(reqId, "not_supported", startedAt, { requested: assessmentType.slice(0, 24) });
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
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  // Canonical contract: input.state (validated inside assessPricing).
  const input = (body as { input?: unknown }).input;
  const result = assessPricing(input);
  telemetry(reqId, result.status, startedAt);
  return NextResponse.json(result, {
    status: result.status === "ok" ? 200 : 400,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET() {
  const startedAt = Date.now();
  if (process.env.BUSINESS_API_ENABLED !== "true") return disabled();
  telemetry(`get-${crypto.randomUUID()}`, "discovery_ok", startedAt);
  // Discovery-only; assessments are POST-only and stateless.
  return NextResponse.json(
    {
      business_id: "smartcomms-nz",
      schema_version: 1,
      capability: "assessment",
      supported_types: ["pricing"],
      method: "POST",
      request_shape: { assessment_type: "pricing", input: { state: "cfg-format calculator state", industry: "optional: schools | aged-care | industrial | commercial" } },
      note: "Read-only budget estimates, NZD ex GST.",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
