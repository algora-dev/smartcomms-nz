import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { jsPDF } from "jspdf";

export const runtime = "nodejs";

/**
 * POST /api/pricing-tool/output-log
 *
 * Server-side proof-of-use logging for the Ballpark Pricing Tool, cloned from
 * the supplier-tool output-log pattern (quotecore-plus a33aaf66). When a user
 * reaches the results view, the client fire-and-forgets the full calculator
 * state + estimate here. We store:
 *   - one row per completed run in pricing_tool_outputs (inputs + output as JSONB)
 *   - a server-generated PDF of the output in the private pricing-tool-outputs bucket
 *
 * Fire-and-forget: always 204, even on internal failure - never surfaces
 * errors to the tool user. No PII collected.
 */

type BreakdownLineIn = { label?: string; detail?: string; amount?: number };

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

// Simple in-memory per-IP rate limit: 30 runs/hour (same budget as supplier tool)
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
  unsure: "Not sure (range spans tier B - C)",
};
const PACKAGE_LABEL: Record<string, string> = {
  essential: "Essential",
  safety: "Safety & Control",
  interactive: "Interactive",
};
const money = (n: number) => `$${Math.round(n).toLocaleString("en-NZ")}`;

function buildPdf(args: {
  tier: string; featurePackage: string; breakdown: BreakdownLineIn[];
  low: number; high: number; created: Date; createdNz: string;
}): Uint8Array {
  const { tier, featurePackage, breakdown, low, high, created, createdNz } = args;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  let y = 50;

  doc.setFontSize(16);
  doc.text("SmartComms NZ - pricing tool output record", 40, y);
  y += 18;
  doc.setFontSize(9);
  doc.text(`Created: ${created.toISOString()} / NZ: ${createdNz}`, 40, y);
  y += 14;
  doc.text(`Site situation: ${TIER_LABEL[tier] ?? tier}`, 40, y); y += 12;
  doc.text(`Feature package: ${PACKAGE_LABEL[featurePackage] ?? featurePackage}`, 40, y); y += 22;

  doc.setFontSize(11);
  doc.text("Itemised breakdown", 40, y); y += 16;
  doc.setFontSize(9);
  for (const l of breakdown.slice(0, 80)) {
    if (y > 780) { doc.addPage(); y = 50; }
    doc.text(String(l.label ?? "item").slice(0, 60), 40, y);
    doc.text(money(Number(l.amount) || 0), W - 40, y, { align: "right" });
    y += 14;
    if (l.detail) {
      doc.setFontSize(7.5);
      doc.text(String(l.detail).slice(0, 110), 46, y); y += 10;
      doc.setFontSize(9);
    }
  }
  y += 10;
  if (y > 760) { doc.addPage(); y = 50; }
  doc.setFontSize(10);
  doc.text(`Estimate range: ${money(low)} - ${money(high)} ex GST`, 40, y);
  return doc.output("arraybuffer") as unknown as Uint8Array;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) return new NextResponse(null, { status: 204 });

    const raw = await req.json().catch(() => null);
    if (!raw || typeof raw !== "object") return new NextResponse(null, { status: 204 });
    const b = raw as Record<string, unknown>;

    const tier = typeof b.tier === "string" ? b.tier.slice(0, 12) : "";
    if (!["A", "B", "C", "unsure"].includes(tier)) return new NextResponse(null, { status: 204 });
    const featurePackage = typeof b.featurePackage === "string" ? b.featurePackage.slice(0, 16) : "";

    const areas = (b.areas && typeof b.areas === "object" ? b.areas : {}) as Record<string, unknown>;
    const speakers = (b.speakers && typeof b.speakers === "object" ? b.speakers : {}) as Record<string, unknown>;
    const fineTune = (b.fineTune && typeof b.fineTune === "object" ? b.fineTune : {}) as Record<string, unknown>;

    const breakdown = Array.isArray(b.breakdown)
      ? (b.breakdown as BreakdownLineIn[]).slice(0, 80).map((l) => ({
          label: typeof l.label === "string" ? l.label.slice(0, 80) : undefined,
          detail: typeof l.detail === "string" ? l.detail.slice(0, 160) : undefined,
          amount: Number(l.amount) || 0,
        }))
      : [];
    const low = Number(b.low) || 0;
    const high = Number(b.high) || 0;
    if (breakdown.length === 0 || low <= 0 || high < low) {
      return new NextResponse(null, { status: 204 });
    }

    const client = getClient();
    if (!client) return new NextResponse(null, { status: 204 });

    // Payload size cap (40KB) to keep rows cheap at volume
    const payload = {
      areas, speakers, fineTune, breakdown,
      basis: typeof b.basis === "string" ? b.basis.slice(0, 12) : undefined,
      endpoints: Number(b.endpoints) || 0,
      overThreshold: Boolean(b.overThreshold),
      monitoringAnnual: b.monitoringAnnual === null ? null : Number(b.monitoringAnnual) || 0,
      monitoringIncludedMonths: Number(b.monitoringIncludedMonths) || 0,
      twoWayRooms: Number(b.twoWayRooms) || 0,
      fireInterface: Boolean(b.fireInterface),
    };
    if (JSON.stringify(payload).length > 40000) {
      payload.breakdown = payload.breakdown.slice(0, 20);
    }

    const created = new Date();
    const createdNz = new Intl.DateTimeFormat("en-NZ", {
      timeZone: "Pacific/Auckland", dateStyle: "medium", timeStyle: "short",
    }).format(created);

    const pdf = buildPdf({ tier, featurePackage, breakdown, low, high, created, createdNz });

    const { data: row, error: insertErr } = await client
      .from("pricing_tool_outputs")
      .insert({
        created_nz: createdNz,
        tier,
        feature_package: featurePackage,
        areas, speakers, fine_tune: fineTune,
        estimate_low: low,
        estimate_high: high,
        endpoints: payload.endpoints,
        item_count: breakdown.length,
        payload,
      })
      .select("id")
      .single();
    if (insertErr || !row) return new NextResponse(null, { status: 204 });

    const path = `runs/${row.id}.pdf`;
    const { error: upErr } = await client.storage
      .from("pricing-tool-outputs")
      .upload(path, pdf, { contentType: "application/pdf", upsert: true });
    if (!upErr) {
      await client.from("pricing_tool_outputs").update({ pdf_path: path }).eq("id", row.id);
    }
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
