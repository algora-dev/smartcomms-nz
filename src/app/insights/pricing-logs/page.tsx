import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Pricing tool output log",
  robots: { index: false, follow: false },
};

const TIER_LABEL: Record<string, string> = {
  A: "New build (A)",
  B: "Existing + cabling (B)",
  C: "Existing, new cabling (C)",
  unsure: "Not sure (B-C range)",
};
const PKG_LABEL: Record<string, string> = {
  essential: "Essential",
  safety: "Safety & Control",
  interactive: "Interactive",
};
const money = (n: number) => `$${Math.round(n).toLocaleString("en-NZ")}`;

function getClient() {
  const url = process.env.SC_SUPABASE_URL;
  const key = process.env.SC_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/**
 * Internal-only viewer for pricing tool output logs. Not linked anywhere.
 * Access: /insights/pricing-logs?key=<PRICING_LOGS_KEY env value>
 */
export default async function PricingLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const expected = process.env.PRICING_LOGS_KEY;
  const ok = Boolean(expected) && key === expected;

  if (!ok) {
    return (
      <main className="sc-container py-16 max-w-2xl">
        <h1 className="text-2xl font-bold">Pricing tool output log</h1>
        <p className="mt-3 text-sm">Invalid or missing access key.</p>
      </main>
    );
  }

  const client = getClient();
  if (!client) {
    return (
      <main className="sc-container py-16 max-w-2xl">
        <p className="text-sm">Storage not configured.</p>
      </main>
    );
  }

  const { data: rows } = await client
    .from("pricing_tool_outputs")
    .select("id, created_at, created_nz, tier, feature_package, estimate_low, estimate_high, endpoints, item_count, pdf_path, areas, fine_tune")
    .order("created_at", { ascending: false })
    .limit(100);

  const list = rows ?? [];

  // Signed URLs (1 hour) for stored PDFs, generated server-side
  const pdfLinks: Record<string, string> = {};
  for (const r of list) {
    if (r.pdf_path) {
      const { data } = await client.storage
        .from("pricing-tool-outputs")
        .createSignedUrl(r.pdf_path, 3600);
      if (data?.signedUrl) pdfLinks[r.id as string] = data.signedUrl;
    }
  }

  return (
    <main className="sc-container py-12 max-w-4xl">
      <h1 className="text-2xl font-bold">Pricing tool output log ({list.length} latest)</h1>
      <div className="mt-6 space-y-3">
        {list.length === 0 && <p className="text-sm">No completed outputs logged yet.</p>}
        {list.map((r) => {
          const areas = (r.areas ?? {}) as Record<string, number>;
          const ft = (r.fine_tune ?? {}) as Record<string, unknown>;
          const areaStr = Object.entries(areas)
            .filter(([, v]) => Number(v) > 0)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ") || "none";
          const ftStr = Object.entries(ft)
            .map(([k, v]) => `${k}=${String(v)}`)
            .join(", ");
          return (
            <div key={r.id} className="sc-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-semibold">
                  {TIER_LABEL[r.tier ?? ""] ?? r.tier} · {PKG_LABEL[r.feature_package ?? ""] ?? r.feature_package}
                </div>
                <div className="text-sm tabular-nums">
                  {money(Number(r.estimate_low))} - {money(Number(r.estimate_high))}
                </div>
              </div>
              <div className="mt-1 text-xs text-[var(--sc-slate)]">
                {r.created_nz ?? r.created_at} · {r.endpoints} endpoints · {r.item_count} lines
              </div>
              <div className="mt-1 text-xs">Areas: {areaStr}</div>
              <div className="mt-1 text-xs">Fine-tune: {ftStr || "defaults"}</div>
              {r.pdf_path && (
                <a
                  className="mt-2 inline-block text-xs font-medium text-[var(--sc-blue-700)] underline"
                  href={pdfLinks[r.id as string] ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  View stored PDF
                </a>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
