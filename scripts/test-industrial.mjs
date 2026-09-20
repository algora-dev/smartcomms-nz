import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
 INDUSTRIAL_PATH, INDUSTRIAL_RESEARCH_DATE, industrialPlatforms,
 industrialSources, industrialUseCases, industrialQuestions, industrialProjects,
} from "../src/lib/content/industrial-guide.ts";
import { INDUSTRIAL_PRICING_EXAMPLE, industrialExamplePricingHref } from "../src/lib/content/industrial-example.ts";
import { calculateEstimate } from "../src/lib/pricing/calculate.ts";
import { parseCalculatorState } from "../src/lib/pricing/validation.ts";
import { estimateLowMultiplier, estimateHighMultiplier, PRICING_MODEL_VERSION } from "../src/lib/pricing/config.ts";
import { CONTENT_META, reviewedDateStrict } from "../src/lib/content-meta.ts";
import { assessFinanceFit } from "../src/lib/finance-check/engine.ts";
import { parseIndustryContext, resolveIndustryContext, financeOrganisationForIndustry, isNonSchoolIndustry, buildIndustryToolHref, readEstimateRange } from "../src/lib/industry-context.ts";

const source = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const page = source(`../src/app${INDUSTRIAL_PATH}/page.tsx`);
const ids = industrialPlatforms.map((p) => p.id);
assert.equal(ids.length, 8); assert.equal(new Set(ids).size, ids.length);
for (const collection of [industrialUseCases, industrialQuestions, industrialProjects]) {
 assert.equal(new Set(collection.map((p) => p.id)).size, collection.length);
}
for (const item of [...industrialPlatforms, ...industrialUseCases, ...industrialQuestions, ...industrialProjects]) {
 for (const id of [...item.sources, ...(item.nzSources ?? [])]) assert.ok(industrialSources[id], `Unresolved source: ${id}`);
}
for (const item of industrialUseCases) {
 assert.equal(item.startingPoints.length, 3); assert.equal(new Set(item.startingPoints).size, 3);
 item.startingPoints.forEach((id) => assert.ok(ids.includes(id)));
 assert.ok(item.why && item.changes && item.sources.length);
}
for (const s of Object.values(industrialSources)) assert.equal(new URL(s.href).protocol, "https:");
// Deterministic source-registry maintenance (cleanup §5): label/kind present,
// well-formed hostnames, no duplicate source hrefs. Remote HTTP status is a
// separate periodic check, not part of this deterministic test.
{
  const seen = new Map();
  for (const [id, s] of Object.entries(industrialSources)) {
    assert.ok(s.label && typeof s.label === "string", `Source ${id} missing label`);
    assert.ok(s.kind && typeof s.kind === "string", `Source ${id} missing kind`);
    const u = new URL(s.href);
    assert.ok(u.hostname.includes(".") && !u.hostname.includes(" "), `Source ${id} malformed domain`);
    assert.ok(!seen.has(s.href), `Duplicate source href ${s.href} (${id} and ${seen.get(s.href)})`);
    seen.set(s.href, id);
  }
}
// These record this editorial release, not a rule that any brand must always win.
const uc = Object.fromEntries(industrialUseCases.map((r) => [r.id, r]));
assert.equal(uc["shift-sip"].startingPoints[0], "algo");
assert.equal(uc.shopfloor.startingPoints[0], "toa");
assert.equal(uc.visual.startingPoints[0], "atlasied");
assert.equal(uc.integrated.startingPoints[0], "spon");
assert.equal(uc.gate.startingPoints[0], "2n");
assert.equal(uc.security.startingPoints[0], "axis");
assert.ok(industrialPlatforms.find((p) => p.id === "toa").sources.includes("toa-cx"));
assert.ok(industrialPlatforms.find((p) => p.id === "spon").sources.includes("spon-video"));
assert.match(industrialPlatforms.find((p) => p.id === "2n").nz, /not a verified NZ listing/);
assert.match(industrialProjects.find((p) => p.id === "sanitarium").label, /NZ installer account/);
assert.match(industrialProjects.find((p) => p.id === "terloc").label, /Brazil/);
assert.match(industrialProjects.find((p) => p.id === "melox").label, /France/);

// No new price formula. Fixture intentionally remains a small general-purpose scope.
assert.equal(estimateLowMultiplier, 0.8); assert.equal(estimateHighMultiplier, 1);
assert.ok(PRICING_MODEL_VERSION); const parsed = parseCalculatorState(INDUSTRIAL_PRICING_EXAMPLE);
assert.ok(parsed.ok); assert.deepEqual(parsed.state, INDUSTRIAL_PRICING_EXAMPLE);
const result = calculateEstimate(INDUSTRIAL_PRICING_EXAMPLE);
assert.ok(result.low > 0 && result.high >= result.low); assert.equal(result.endpoints, 11);
assert.equal(result.fireInterface, false); assert.equal(result.twoWayRooms, 0);
const pricingUrl = new URL(industrialExamplePricingHref(), "https://smartcomms.co.nz");
assert.equal(pricingUrl.pathname, "/pricing-tool"); assert.equal(pricingUrl.searchParams.get("industry"), "industrial");
const decoded = parseCalculatorState(JSON.parse(decodeURIComponent(pricingUrl.searchParams.get("cfg"))));
assert.ok(decoded.ok); assert.deepEqual(calculateEstimate(decoded.state), result);
assert.equal(parseIndustryContext("industrial"), "industrial");
assert.equal(parseIndustryContext("aged-care"), "aged-care");
assert.equal(parseIndustryContext("industrial&email=x"), undefined);
assert.equal(parseIndustryContext("__proto__"), undefined);
assert.equal(resolveIndustryContext("industrial", "state_school"), undefined);
assert.equal(resolveIndustryContext("industrial", "aged_care"), "aged-care");
assert.equal(resolveIndustryContext("aged-care", "industrial"), "industrial");
assert.equal(resolveIndustryContext("industrial"), "industrial");
assert.equal(financeOrganisationForIndustry("industrial"), "industrial");
assert.ok(isNonSchoolIndustry("industrial")); assert.ok(isNonSchoolIndustry("aged-care"));
assert.equal(isNonSchoolIndustry(undefined), false);
const financeUrl = new URL(buildIndustryToolHref("/tools/finance-check", {industry: "industrial", source: "pricing", estimate:result}), "https://smartcomms.co.nz");
assert.deepEqual(readEstimateRange(financeUrl.searchParams), { low: result.low, high: result.high });
assert.equal(financeUrl.searchParams.get("cfg"), null);
const early = assessFinanceFit({organisationType:"industrial", paymentFrequency:"weekly", projectValueBand:"unsure", siteSizeBand:"unsure", paymentBudget:"unsure", upfrontBand:"none"});
assert.equal(early.level,"early"); assert.doesNotMatch(early.headline, /ineligible|reject|declin/i);

// Register the new route before compiling/rendering it. No fabricated fallback.
assert.ok(CONTENT_META[INDUSTRIAL_PATH]); assert.equal(reviewedDateStrict(INDUSTRIAL_PATH), INDUSTRIAL_RESEARCH_DATE);
assert.ok(source("../src/app/sitemap.ts").includes(INDUSTRIAL_PATH));
assert.ok(source("../src/app/compare/page.tsx").includes(INDUSTRIAL_PATH));
assert.ok(source("../src/app/guides/page.tsx").includes(INDUSTRIAL_PATH));
assert.ok(page.includes("calculateEstimate(INDUSTRIAL_PRICING_EXAMPLE)"));
assert.ok(page.includes("ProjectHelpLauncher"));
// The existing launcher renders a dialog div when open: do not nest it in a p.
assert.ok(!/<p[^>]*>(?:(?!<\/p>).)*<Help/s.test(page));
assert.ok(!/funding-check|href=["']\/funding|5YA/.test(page));
assert.ok(!/aggregateRating|ratingValue|"@type": "Review"/.test(page));
assert.ok(page.includes('"https://schema.org/ItemListUnordered"'));
assert.ok(source("../src/components/tool-cross-sell.tsx").includes("isNonSchoolIndustry(industry)"));
assert.ok(source("../src/components/pricing/ResultView.tsx").includes('industry === "industrial"'));
console.log(`industrial tests passed: ${ids.length} profiles, ${industrialUseCases.length} use cases, ${industrialQuestions.length} FAQs; example NZ$${result.low}–$${result.high} ex GST (${result.endpoints} endpoints)`);
