import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { carePlatforms, careUseCases, careSources, careQuestions, AGED_CARE_PATH } from "../src/lib/content/aged-care-guide.ts";
import { CARE_PRICING_EXAMPLE, careExamplePricingHref } from "../src/lib/content/aged-care-example.ts";
import { calculateEstimate } from "../src/lib/pricing/calculate.ts";
import {
  parseIndustryContext, industryFromParams, resolveIndustryContext,
  financeOrganisationForIndustry, readEstimateRange, buildIndustryToolHref,
} from "../src/lib/industry-context.ts";

const pageSource = readFileSync(new URL("../src/app/industries/aged-care-retirement-villages/page.tsx", import.meta.url), "utf8");

const platformIds = carePlatforms.map((p) => p.id);
assert.equal(new Set(platformIds).size, 8);
assert.deepEqual(new Set(platformIds), new Set(["axis", "2n", "algo", "toa", "spon", "prospero", "itc", "frontrow"]));
assert.equal(new Set(careUseCases.map((c) => c.id)).size, careUseCases.length);
assert.equal(new Set(careQuestions.map((q) => q.id)).size, careQuestions.length);

// Revised shortlist structure (compare-refresh handoff).
const useCaseById = Object.fromEntries(careUseCases.map((c) => [c.id, c]));
for (const useCase of careUseCases) {
  assert.equal(useCase.startingPoints.length, 3, `Use case ${useCase.id} must list three starting points.`);
  assert.equal(new Set(useCase.startingPoints).size, 3);
  useCase.startingPoints.forEach((id) => assert.ok(platformIds.includes(id), `Unknown platform ${id} in ${useCase.id}`));
  assert.ok(useCase.why.length > 40, `Use case ${useCase.id} must explain its order.`);
}
assert.deepEqual(useCaseById["entrance-intercom"].startingPoints, ["2n", "axis", "spon"], "Entrance/video row must start 2n, axis, spon.");
assert.equal(useCaseById["integrated-communication"].startingPoints[0], "spon", "Integrated communications must start with spon.");
assert.equal(useCaseById["retain-pa"].startingPoints[0], "algo", "Reuse/SIP row must start with algo.");

// SPON evidence: current audio + video intercom sources must be present.
const spon = carePlatforms.find((p) => p.id === "spon");
assert.ok(spon, "SPON profile must exist");
for (const required of ["spon-audio-intercom", "spon-video-intercom", "spon-outdoor-video", "spon-video-master"]) {
  assert.ok(spon.sources.includes(required), `SPON sources must include ${required}`);
}
for (const required of ["spon-nz-video", "spon-nz-outdoor-video"]) {
  assert.ok(spon.nzSources.includes(required), `SPON NZ sources must include ${required}`);
}
assert.ok(spon.summary.toLowerCase().includes("video intercom"), "SPON summary must reflect the broader family.");

// Enriched platform model used by shortlist/capability/profiles.
for (const platform of carePlatforms) {
  for (const field of ["verdict", "paging", "intercom", "visitor", "integration", "value", "costWatch", "core", "audio", "call", "entrance"]) {
    assert.ok(typeof platform[field] === "string" && platform[field].length > 10, `${platform.id} missing ${field}`);
  }
  assert.ok(platform.strengths.length >= 2 && platform.tradeoffs.length >= 2, `${platform.id} needs strengths/tradeoffs`);
}

for (const item of [...carePlatforms, ...careUseCases, ...careQuestions]) {
  for (const id of [...item.sources, ...(item.nzSources ?? [])]) assert.ok(careSources[id], `Unknown source ${id}`);
}
for (const source of Object.values(careSources)) assert.equal(new URL(source.href).protocol, "https:");
assert.equal(AGED_CARE_PATH, "/industries/aged-care-retirement-villages");

// Page integration: industry-aware journeys retained; no school-funding CTA.
assert.ok(pageSource.includes('industry: "aged-care"'), "Page must build industry-aware links.");
assert.ok(pageSource.includes("careExamplePricingHref"), "Example must use the cfg roundtrip link.");
assert.ok(!/funding-check|5YA/i.test(pageSource), "Aged-care page must not link school funding.");

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
console.log(`Aged-care compare-refresh assertions passed: ${carePlatforms.length} profiles, ${careUseCases.length} use-case rows, ${Object.keys(careSources).length} sources.`);
console.log(`Illustrative scope, current engine: NZ$${estimate.low}–$${estimate.high} ex GST; ${estimate.endpoints} endpoints under current defaults.`);
