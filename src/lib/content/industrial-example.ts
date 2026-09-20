import type { CalculatorState } from "../pricing/types";
import { buildIndustryToolHref } from "../industry-context";

/** Small, illustrative non-hazardous workplace scope, not a real installation.
 * Explicit speaker overrides describe this scenario only, not an area coverage rule.
 * Uses the existing owner-approved pricing model unchanged.
 */
export const INDUSTRIAL_PRICING_EXAMPLE: CalculatorState = {
  tier: "B",
  areas: { standardIndoor: 4, largeIndoor: 1, outdoor: 1, largeOutdoor: 0, entry: 1 },
  speakers: { largeIndoor: 4, outdoor: 2, largeOutdoor: null },
  featurePackage: "essential",
  fineTune: {
    twoWayMode: "none", twoWayQty: 0, entryIntercom: "voice",
    additionalControlStations: 0, monitoring: false,
  },
};

export function industrialExamplePricingHref(): string {
  const base = buildIndustryToolHref("/pricing-tool", { industry: "industrial", source: "other" });
  const [path, query] = base.split("?");
  const params = new URLSearchParams(query);
  // Retain the existing validated cfg link format. URLSearchParams performs
  // the transport encoding; PricingTool decodes the JSON before validation.
  params.set("cfg", encodeURIComponent(JSON.stringify(INDUSTRIAL_PRICING_EXAMPLE)));
  return `${path}?${params.toString()}`;
}
