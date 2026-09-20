/**
 * Small, non-personal context passed between SmartComms tools.
 * Pure functions: safe in server and client components; no session/global state.
 * Do not put names, email, resident data or free-text enquiries in URLs.
 */
import type { OrganisationType } from "./finance-check/config";

export const INDUSTRY_CONTEXTS = {
  "aged-care": { label: "Aged care / retirement village", financeOrganisation: "aged_care" },
  industrial: { label: "Warehouse / industrial / manufacturing", financeOrganisation: "industrial" },
} as const satisfies Record<string, { label: string; financeOrganisation: OrganisationType }>;
export type IndustryContext = keyof typeof INDUSTRY_CONTEXTS;
type ParamsReader = { get(name: string): string | null };

export function parseIndustryContext(value: unknown): IndustryContext | undefined {
  return value === "aged-care" || value === "industrial" ? value : undefined;
}
export function industryFromParams(params: ParamsReader): IndustryContext | undefined {
  return parseIndustryContext(params.get("industry"));
}

/** An explicit, different organisation selection always overrides incoming context. */
export function resolveIndustryContext(
  incoming: IndustryContext | undefined,
  selectedOrganisation?: OrganisationType,
): IndustryContext | undefined {
  if (selectedOrganisation !== undefined) {
    if (selectedOrganisation === "aged_care") return "aged-care";
    if (selectedOrganisation === "industrial") return "industrial";
    return undefined;
  }
  return incoming;
}
export function financeOrganisationForIndustry(industry?: IndustryContext): OrganisationType | undefined {
  return industry ? INDUSTRY_CONTEXTS[industry].financeOrganisation : undefined;
}

/** Only explicitly recognised non-school contexts suppress school funding CTAs. */
export function isNonSchoolIndustry(industry?: IndustryContext): boolean {
  return industry === "aged-care" || industry === "industrial";
}

export function readEstimateRange(params: ParamsReader): { low: number; high: number } | undefined {
  const rawLow = params.get("estimateLow");
  const rawHigh = params.get("estimateHigh");
  if (!rawLow || !rawHigh) return undefined;
  const low = Number(rawLow);
  const high = Number(rawHigh);
  if (!Number.isFinite(low) || !Number.isFinite(high) || low <= 0 || high < low || high > 5_000_000) return undefined;
  return { low, high };
}

type Destination = "/pricing-tool" | "/tools/finance-check" | "/financing";
type ToolLinkOptions = {
  industry?: IndustryContext;
  source?: "pricing" | "financing" | "other";
  estimate?: { low: number; high: number };
};
/** Never forwards arbitrary query strings, including any obsolete cfg to finance. */
export function buildIndustryToolHref(path: Destination, options: ToolLinkOptions = {}): string {
  const params = new URLSearchParams();
  if (options.industry) params.set("industry", options.industry);
  if (options.source) params.set("source", options.source);
  if (options.estimate) {
    const candidate = new URLSearchParams({ estimateLow: String(options.estimate.low), estimateHigh: String(options.estimate.high) });
    const range = readEstimateRange(candidate);
    if (range) {
      params.set("estimateLow", String(range.low));
      params.set("estimateHigh", String(range.high));
    }
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}
