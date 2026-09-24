import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { jsPDF } from "jspdf";
import { parseCalculatorState, hasScope } from "@/lib/pricing/validation";
import { calculateEstimate } from "@/lib/pricing/calculate";
import {
  PRICING_MODEL_VERSION,
  PRICING_PROVENANCE,
  pricingConfig,
} from "@/lib/pricing/config";
import type { CalculatorState, BreakdownLine } from "@/lib/pricing/types";

export const runtime = "nodejs";

/**
 * POST /api/pricing-tool/output-log
 *
 * Server-side proof-of-use logging for the Pricing Tool.
 * SC-02 (2026-09-20): the server now VALIDATES the incoming state through the
 * shared allowlisted parser and RECOMPUTES the estimate itself via
 * calculateEstimate(). Client-supplied totals/breakdowns are accepted from the
 * legacy client for a rolling transition but are NEVER used as authority and
 * NEVER persisted. Only allowlisted calculator fields can be stored, so the
 * record is non-personal by construction.
 *
 * Fire-and-forget: always 204, even on internal failure - never surfaces
 * errors to the tool user. Failures are recorded as safe outcome codes via
 * console (no request bodies, no PII). A logging incident can be disabled
 * with env PRICING_LOG_DISABLED=true without touching the calculator.
 */

const RECORD_SCHEMA_VERSION = 2;
/** Hard byte bound on the request body, checked BEFORE parsing (SC-02.B). */
const MAX_BODY_BYTES = 16 * 1024; // 16 KiB — validated state is ~1 KB

// Minimal typing so supabase-js accepts our table (no generated types in this repo)
type Db = {
  public: {
    Tables: {
      pricing_tool_outputs: {
        Row: { id: string } & Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let serviceClient: ReturnType<typeof createClient<Db>> | null = null;
function getClient() {
  if (serviceClient) return serviceClient;
  const url = process.env.SC_SUPABASE_URL;
  const key = process.env.SC_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  serviceClient = createClient<Db>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return serviceClient;
}

const logOff = (code: string) => console.warn(`[output-log:${code}]`);

// Simple in-memory per-IP rate limit: 30 runs/hour (same budget as supplier tool).
// Deployment-layer rate limiting (Vercel Firewall) is the durable control; this is
// the in-app baseline only.
const hits = new Map<string, { n: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + 60 * 60 * 1000 });
    return false;
  }
  h.n += 1;
  return h.n > 30;
}

const TIER_LABEL: Record<string, string> = {
  A: "New build / major construction (tier A)",
  B: "Existing site, network cabling available (tier B)",
  C: "Existing site, new cabling required (tier C)",
  // Unsure is priced on tier B with site-wide cabling excluded (disclaimer), NOT a B-C span.
  unsure: "Not sure (priced on tier B basis; site-wide cabling excluded - see note)",
};
const PACKAGE_LABEL: Record<string, string> = {
  essential: "Essential",
  safety: "Safety & Control",
  interactive: "Interactive",
};
const money = (n: number) => `$${Math.round(n).toLocaleString("en-NZ")}`;

function buildPdf(args: {
  state: CalculatorState;
  breakdown: BreakdownLine[];
  low: number; high: number; endpoints: number;
  created: Date; createdNz: string;
}): Uint8Array {
  const { state, breakdown, low, high, endpoints, created, createdNz } = args;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  let y = 50;

  doc.setFontSize(16);
  doc.text("SmartComms NZ - pricing tool output record", 40, y);
  y += 18;
  doc.setFontSize(9);
  doc.text(`Created: ${created.toISOString()} / NZ: ${createdNz}`, 40, y); y += 12;
  doc.text(`Pricing model: ${PRICING_MODEL_VERSION} (reviewed ${pricingConfig.reviewedAt})`, 40, y); y += 12;
  doc.text(`Basis: server-recomputed from validated inputs (${money(low)} - ${money(high)} ex GST)`, 40, y); y += 14;
  doc.text(`Site situation: ${TIER_LABEL[state.tier] ?? state.tier}`, 40, y); y += 12;
  doc.text(`Feature package: ${PACKAGE_LABEL[state.featurePackage] ?? state.featurePackage}`, 40, y); y += 12;
  doc.text(`Endpoints: ${endpoints}`, 40, y); y += 22;

  doc.setFontSize(11);
  doc.text("Itemised breakdown", 40, y); y += 16;
  doc.setFontSize(9);
  for (const l of breakdown.slice(0, 80)) {
    if (y > 780) { doc.addPage(); y = 50; }
    doc.text(String(l.label).slice(0, 60), 40, y);
    const lo = l.amountLow ?? l.amount;
    const hi = l.amountHigh ?? lo;
    doc.text(lo === hi ? money(lo) : `${money(lo)} - ${money(hi)}`, W - 40, y, { align: "right" });
    y += 14;
    if (l.detail) {
      doc.setFontSize(7.5);
      doc.text(String(l.detail).slice(0, 110), 46, y); y += 10;
      doc.setFontSize(9);
    }
  }
  y += 10;
  if (y > 700) { doc.addPage(); y = 50; }

  // Scope parity: material qualifications the internal PDF must carry (SC-02.D).
  doc.setFontSize(9);
  const notes = [
    `Estimate range: ${money(low)} - ${money(high)} ex GST (NZD).`,
    pricingConfig.cablingDisclaimer,
    state.fineTune.monitoring
      ? `Optional recurring monitoring ($${pricingConfig.monitoringAnnualPrice}/yr indicative) is excluded from the installed estimate.`
      : "Recurring monitoring services, where selected, are quoted separately from the installed estimate.",
    endpoints > pricingConfig.endpointWarningThreshold
      ? "Large-system configuration: additional central hardware may be required beyond this estimate."
      : "",
  ].filter(Boolean);
  for (const note of notes) {
    const lines = doc.splitTextToSize(note, W - 80) as string[];
    for (const line of lines) {
      if (y > 790) { doc.addPage(); y = 50; }
      doc.text(line, 40, y); y += 11;
    }
    y += 4;
  }
  return doc.output("arraybuffer") as unknown as Uint8Array;
}

export async function POST(req: NextRequest) {
  try {
    // Kill-switch: a logging incident never requires disabling the calculator.
    if (process.env.PRICING_LOG_DISABLED === "true") return new NextResponse(null, { status: 204 });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) return new NextResponse(null, { status: 204 });

    // Byte-bound BEFORE parsing (early header check + real body bound).
    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (contentLength > MAX_BODY_BYTES) return new NextResponse(null, { status: 204 });
    const rawText = await req.text();
    if (rawText.length > MAX_BODY_BYTES) { logOff("oversize_body"); return new NextResponse(null, { status: 204 }); }

    let raw: unknown;
    try { raw = JSON.parse(rawText); } catch { logOff("bad_json"); return new NextResponse(null, { status: 204 }); }

    const parsed = parseCalculatorState(raw);
    if (!parsed.ok) { logOff(`invalid_state:${parsed.error}`); return new NextResponse(null, { status: 204 }); }
    const state = parsed.state;
    if (!hasScope(state)) { logOff("no_scope"); return new NextResponse(null, { status: 204 }); }

    const client = getClient();
    if (!client) return new NextResponse(null, { status: 204 });

    // Authoritative result: computed server-side from the validated state.
    const estimate = calculateEstimate(state);
    if (!(estimate.low > 0 && estimate.high >= estimate.low)) {
      logOff("bad_estimate"); return new NextResponse(null, { status: 204 });
    }

    // Legacy rolling transition: accept old-client result fields, ignore as
    // authority, record only a mismatch marker (never the tampered payload).
    const b = raw as Record<string, unknown>;
    const legacyLow = Number(b.low) || 0;
    const legacyHigh = Number(b.high) || 0;
    const legacyMismatch =
      (legacyLow > 0 || legacyHigh > 0) &&
      (Math.abs(legacyLow - estimate.low) > 1 || Math.abs(legacyHigh - estimate.high) > 1);

    const created = new Date();
    const createdNz = new Intl.DateTimeFormat("en-NZ", {
      timeZone: "Pacific/Auckland", dateStyle: "medium", timeStyle: "short",
    }).format(created);

    // Stored payload: allowlisted fields only, plus provenance/version stamps.
    const payload = {
      record_schema_version: RECORD_SCHEMA_VERSION,
      pricing_model_version: PRICING_MODEL_VERSION,
      currency: PRICING_PROVENANCE.currency,
      tax_basis: PRICING_PROVENANCE.taxBasis,
      calculation_origin: "server_v2_recomputed",
      applied_defaults: parsed.appliedDefaults,
      legacy_client_mismatch: legacyMismatch,
      areas: state.areas,
      speakers: state.speakers,
      fine_tune: state.fineTune,
      breakdown: estimate.breakdown,
      basis: estimate.basis,
      endpoints: estimate.endpoints,
      overThreshold: estimate.overThreshold,
      monitoringAnnual: estimate.monitoringAnnual,
      monitoringIncludedMonths: estimate.monitoringIncludedMonths,
      twoWayRooms: estimate.twoWayRooms,
      fireInterface: estimate.fireInterface,
    };

    const pdf = buildPdf({
      state, breakdown: estimate.breakdown,
      low: estimate.low, high: estimate.high, endpoints: estimate.endpoints,
      created, createdNz,
    });

    const { data: row, error: insertErr } = await client
      .from("pricing_tool_outputs")
      .insert({
        created_nz: createdNz,
        tier: state.tier,
        feature_package: state.featurePackage,
        areas: state.areas,
        speakers: state.speakers,
        fine_tune: state.fineTune,
        estimate_low: estimate.low,
        estimate_high: estimate.high,
        endpoints: estimate.endpoints,
        item_count: estimate.breakdown.length,
        payload,
      })
      .select("id")
      .single();
    if (insertErr || !row) { logOff("insert_failed"); return new NextResponse(null, { status: 204 }); }

    const path = `runs/${row.id}.pdf`;
    const { error: upErr } = await client.storage
      .from("pricing-tool-outputs")
      .upload(path, pdf, { contentType: "application/pdf", upsert: true });
    if (upErr) { logOff("pdf_upload_failed"); return new NextResponse(null, { status: 204 }); }
    await client.from("pricing_tool_outputs").update({ pdf_path: path }).eq("id", row.id);
    return new NextResponse(null, { status: 204 });
  } catch {
    logOff("unhandled");
    return new NextResponse(null, { status: 204 });
  }
}
