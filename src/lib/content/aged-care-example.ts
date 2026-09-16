import type { CalculatorState } from "../pricing/types";
import { buildIndustryToolHref } from "../industry-context";

/** Illustrative common-area brief, not a real facility or a clinical system BOM. */
export const CARE_PRICING_EXAMPLE: CalculatorState = {
  tier: "B",
  areas: { standardIndoor: 6, largeIndoor: 1, outdoor: 1, largeOutdoor: 0, entry: 1 },
  speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
  featurePackage: "essential",
  fineTune: {
    twoWayMode: "none", twoWayQty: 0, entryIntercom: "voice",
    additionalControlStations: 0, monitoring: false,
  },
};

export function careExamplePricingHref(): string {
  const base = buildIndustryToolHref("/pricing-tool", { industry: "aged-care", source: "other" });
  const [path, query] = base.split("?");
  const params = new URLSearchParams(query);
  // Existing PricingTool expects JSON.parse(decodeURIComponent(params.get('cfg'))).
  // Keep this encoding aligned if the shared tool's serializer changes.
  params.set("cfg", encodeURIComponent(JSON.stringify(CARE_PRICING_EXAMPLE)));
  return `${path}?${params.toString()}`;
}
