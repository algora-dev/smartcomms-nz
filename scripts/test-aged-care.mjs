import assert from "node:assert/strict";
import { carePlatforms, careUseCases, careSources, careQuestions, AGED_CARE_PATH } from "../src/lib/content/aged-care-guide.ts";
import { CARE_PRICING_EXAMPLE, careExamplePricingHref } from "../src/lib/content/aged-care-example.ts";
import { calculateEstimate } from "../src/lib/pricing/calculate.ts";
import {
  parseIndustryContext, industryFromParams, resolveIndustryContext,
  financeOrganisationForIndustry, readEstimateRange, buildIndustryToolHref,
} from "../src/lib/industry-context.ts";

const platformIds = carePlatforms.map((p) => p.id);
assert.equal(new Set(platformIds).size, 8);
assert.deepEqual(new Set(platformIds), new Set(["axis", "2n", "algo", "toa", "spon", "prospero", "itc", "frontrow"]));
assert.equal(new Set(careUseCases.map((c) => c.id)).size, careUseCases.length);
assert.equal(new Set(careQuestions.map((q) => q.id)).size, careQuestions.length);
for (const useCase of careUseCases) {
  assert.equal(useCase.choices.length, 3);
  assert.equal(new Set(useCase.choices.map((c) => c.platform)).size, 3);
  useCase.choices.forEach((choice) => assert.ok(platformIds.includes(choice.platform)));
  assert.ok(useCase.changes.length > 20, "Each conditional ranking must explain its limits.");
}
for (const item of [...carePlatforms, ...careUseCases, ...careQuestions]) {
  for (const id of [...item.sources, ...(item.nzSources ?? [])]) assert.ok(careSources[id], `Unknown source ${id}`);
}
for (const source of Object.values(careSources)) assert.equal(new URL(source.href).protocol, "https:");
assert.equal(AGED_CARE_PATH, "/industries/aged-care-retirement-villages");
assert.equal(parseIndustryContext("aged-care"), "aged-care");
for (const bad of [undefined, null, "hospital", "state_school", "AGED-CARE", "<script>", "__proto__", 1, {}]) {
  assert.equal(parseIndustryContext(bad), undefined);
}
assert.equal(industryFromParams(new URLSearchParams("industry=aged-care")), "aged-care");
assert.equal(financeOrganisationForIndustry("aged-care"), "aged_care");
assert.equal(financeOrganisationForIndustry(), undefined);
assert.equal(resolveIndustryContext("aged-care", "state_school"), undefined, "User choice must override incoming industry.");
assert.equal(resolveIndustryContext("aged-care", "commercial"), undefined);
assert.equal(resolveIndustryContext(undefined, "aged_care"), "aged-care");
assert.equal(resolveIndustryContext("aged-care"), "aged-care");
assert.deepEqual(readEstimateRange(new URLSearchParams("estimateLow=38000&estimateHigh=47000")), { low: 38000, high: 47000 });
for (const query of ["", "estimateLow=0&estimateHigh=1000", "estimateLow=-1&estimateHigh=100", "estimateLow=Infinity&estimateHigh=Infinity", "estimateLow=300&estimateHigh=200", "estimateLow=100&estimateHigh=5000001", "estimateLow=abc&estimateHigh=200"]) {
  assert.equal(readEstimateRange(new URLSearchParams(query)), undefined);
}
const estimate = calculateEstimate(CARE_PRICING_EXAMPLE);
assert.ok(estimate.low > 0 && estimate.high >= estimate.low);
assert.equal(estimate.fireInterface, false);
assert.equal(estimate.twoWayRooms, 0);
assert.equal(estimate.monitoringAnnual, null);
const pricingUrl = new URL(careExamplePricingHref(), "https://smartcomms.co.nz");
const state = JSON.parse(decodeURIComponent(pricingUrl.searchParams.get("cfg")));
assert.deepEqual(state, CARE_PRICING_EXAMPLE, "Must roundtrip through current PricingTool decoder.");
assert.deepEqual(calculateEstimate(state), estimate);
assert.equal(pricingUrl.searchParams.get("industry"), "aged-care");
const financeUrl = new URL(buildIndustryToolHref("/tools/finance-check", { industry: "aged-care", source: "pricing", estimate }), "https://smartcomms.co.nz");
assert.equal(financeUrl.searchParams.get("estimateLow"), String(estimate.low));
assert.equal(financeUrl.searchParams.get("estimateHigh"), String(estimate.high));
assert.equal(financeUrl.searchParams.has("cfg"), false);
assert.equal(financeUrl.searchParams.has("fundingResult"), false);
assert.equal(buildIndustryToolHref("/pricing-tool"), "/pricing-tool");
assert.equal(buildIndustryToolHref("/tools/finance-check", { estimate: { low: 100, high: 50 } }), "/tools/finance-check");
console.log(`Aged-care data/context/example assertions passed: ${carePlatforms.length} profiles, ${careUseCases.length} shortlists, ${Object.keys(careSources).length} sources.`);
console.log(`Illustrative scope, current engine: NZ$${estimate.low}–$${estimate.high} ex GST; ${estimate.endpoints} endpoints under current defaults.`);
