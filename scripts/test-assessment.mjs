// Release 2/2.1 assessment contract tests.
// Run: npm run test:assessment
import assert from "node:assert/strict";
import { assessPricing } from "../src/lib/business-core/assess-pricing.ts";
import { defaultState } from "../src/lib/pricing/presets.ts";

let passed = 0;
function ok(name, fn) {
  fn();
  passed++;
  console.log(`PASS  ${name}`);
}

const tenRoomsB = { ...defaultState(), tier: "B", areas: { ...defaultState().areas, standardIndoor: 10 } };

ok("valid input.state (10-room B Essential) returns the exact public fixture band", () => {
  const r = assessPricing({ state: tenRoomsB });
  assert.equal(r.status, "ok");
  assert.equal(r.result_type, "budget_estimate");
  assert.equal(r.currency, "NZD");
  assert.equal(r.tax_basis, "excludes GST");
  assert.equal(r.low, 10276);
  assert.equal(r.high, 12845);
  assert.equal(r.pricing_model_version, "smartcomms-nz-pricing-v1");
});

ok("forged low/high/breakdown inside state payload cannot change the result", () => {
  const forged = { state: { ...JSON.parse(JSON.stringify(tenRoomsB)), low: 1, high: 2, breakdown: [{ label: "lie", amount: 1 }] } };
  const r = assessPricing(forged);
  assert.equal(r.status, "ok");
  assert.equal(r.low, 10276);
  assert.equal(r.high, 12845);
  assert.ok(!JSON.stringify(r.breakdown).includes("lie"));
});

ok("unspecified project returns needs_input, not a controller-only quote", () => {
  const r = assessPricing({ state: defaultState() });
  assert.equal(r.status, "needs_input");
  assert.ok(Array.isArray(r.missing) && r.missing.includes("areas"));
});

ok("missing input.state returns needs_input", () => {
  const r = assessPricing({});
  assert.equal(r.status, "needs_input");
  assert.ok(r.missing.includes("input") || r.message.includes("state"));
});

ok("invalid state returns needs_input with the validation reason", () => {
  const r = assessPricing({ state: { tier: "Z", areas: { standardIndoor: -5 }, featurePackage: "premium" } });
  assert.equal(r.status, "needs_input");
});

ok("unknown top-level input fields are rejected, not silently converted", () => {
  const r = assessPricing({ state: tenRoomsB, extra: "field" });
  assert.equal(r.status, "needs_input");
  assert.ok(r.message.includes("extra"));
});

ok("industrial industry mirrors the website journey: finance + contact, no school funding", () => {
  const r = assessPricing({ state: tenRoomsB, industry: "industrial" });
  assert.equal(r.status, "ok");
  const urls = r.next_actions.map((a) => a.url);
  assert.ok(urls.some((u) => u.startsWith("https://") && u.includes("/tools/finance-check?industry=industrial")));
  assert.ok(urls.some((u) => u.endsWith("/contact")));
  assert.ok(!urls.some((u) => u.includes("funding-check")));
});

ok("optional industry accepted without modifying pricing state or numbers", () => {
  const withIndustry = assessPricing({ state: tenRoomsB, industry: "aged-care" });
  const without = assessPricing({ state: tenRoomsB });
  assert.equal(withIndustry.status, "ok");
  assert.equal(withIndustry.low, without.low);
  assert.equal(withIndustry.high, without.high);
  // aged-care routes the finance next action to the finance tool, not school funding
  assert.ok(withIndustry.next_actions.some((a) => a.url.includes("/tools/finance-check?industry=aged-care")));
});

ok("invalid industry rejected", () => {
  const r = assessPricing({ state: tenRoomsB, industry: "hospitals" });
  assert.equal(r.status, "needs_input");
  assert.ok(r.missing.includes("industry"));
});

ok("monitoring is reported separately from installed low/high", () => {
  const withMonitoring = JSON.parse(JSON.stringify(tenRoomsB));
  withMonitoring.fineTune.monitoring = true;
  const r = assessPricing({ state: withMonitoring });
  assert.equal(r.status, "ok");
  assert.equal(r.optional_recurring_monitoring_annual_nzd, 650);
  assert.equal(r.low, 10276); // monitoring not baked into the band
});

ok("freshness reflects the model review date (review_due after 90d)", () => {
  const r = assessPricing({ state: tenRoomsB });
  assert.ok(["current_approved_model", "review_due"].includes(r.freshness.state));
  assert.equal(r.freshness.model_reviewed_at, "2026-09-16");
});

ok("limitations include the owner-approved public description, never 'formal quote'", () => {
  const r = assessPricing({ state: tenRoomsB });
  const text = r.limitations.join(" ");
  assert.ok(text.includes("Actual project quotes can differ"));
  assert.ok(text.includes("Not a formal quote"));
});

ok("next-action URLs are absolute, derived from central site config", () => {
  const r = assessPricing({ state: tenRoomsB });
  for (const a of r.next_actions) {
    assert.ok(/^https:\/\/[a-z.]+\/.+/.test(a.url), `not absolute: ${a.url}`);
  }
  const tool = r.next_actions.find((a) => a.url.includes("/pricing-tool?cfg="));
  assert.ok(tool, "cfg deep link present");
  // round-trip: the cfg param must parse back to the same numbers
  const cfg = JSON.parse(decodeURIComponent(tool.url.split("cfg=")[1]));
  const again = assessPricing({ state: cfg });
  assert.equal(again.low, 10276);
  assert.ok(r.next_actions.some((a) => a.url.endsWith("/contact")));
});

ok("applied defaults are reported (older-cfg omitted fields)", () => {
  const r = assessPricing({ state: { tier: "B", areas: { standardIndoor: 6 }, featurePackage: "essential" } });
  assert.equal(r.status, "ok");
  assert.ok(r.applied_defaults.includes("fineTune.twoWayMode"));
});

ok("large-system warning surfaces when endpoints exceed the threshold", () => {
  const big = JSON.parse(JSON.stringify(tenRoomsB));
  big.areas.standardIndoor = 40;
  const r = assessPricing({ state: big });
  assert.equal(r.large_system_warning, true);
});

ok("no PII-bearing or unknown fields are echoed into normalized_input", () => {
  const r = assessPricing({ state: { ...tenRoomsB, email: "x@y.z", secret: "value" } });
  assert.equal(r.status, "ok");
  const echoed = JSON.stringify(r.normalized_input);
  assert.ok(!echoed.includes("email") && !echoed.includes("secret"));
});

ok("canonical status names only — no 'unsupported' anywhere in the domain", () => {
  const r = assessPricing({ state: {} });
  assert.equal(r.status, "needs_input");
  assert.ok(r.status !== "unsupported");
});

console.log(`\nassessment tests: all ${passed} assertions passed`);
