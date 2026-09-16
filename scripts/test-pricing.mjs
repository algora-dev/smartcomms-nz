import assert from "node:assert/strict";
import { calculateEstimate } from "../src/lib/pricing/calculate.ts";
import { defaultState } from "../src/lib/pricing/presets.ts";
import { formatNZD, pricingConfig } from "../src/lib/pricing/config.ts";

const t = (over) => {
  const s = { ...defaultState(), ...over };
  s.fineTune = { ...defaultState().fineTune, ...(over.fineTune ?? {}) };
  return s;
};

// Test A: Tier B, 10 rooms, Essential (headend 5995 + 10 x 685 = 12845; low = 80%)
let r = calculateEstimate(t({ tier: "B", areas: { ...defaultState().areas, standardIndoor: 10 } }));
assert.equal(r.low, 10276, `A low expected 10276, got ${r.low}`);
assert.equal(r.high, 12845, `A high expected 12845, got ${r.high}`);

// Test B: Tier C prices identically to B (site-wide cabling excluded, no uplift)
r = calculateEstimate(t({ tier: "C", areas: { ...defaultState().areas, standardIndoor: 10 } }));
assert.equal(r.low, 10276, `B low expected 10276 (no cabling uplift), got ${r.low}`);

// Test C: Tier B safety (5995 + 6850 + 1895 = 14740; low = 11792)
r = calculateEstimate(t({ tier: "B", featurePackage: "safety", areas: { ...defaultState().areas, standardIndoor: 10 } }));
assert.equal(r.low, 11792, `C low expected 11792, got ${r.low}`);

// Test D: Tier B interactive (5995 + 6850 + 1895 + 10*285 = 17590; low = 14072)
r = calculateEstimate(t({ tier: "B", featurePackage: "interactive", areas: { ...defaultState().areas, standardIndoor: 10 } }));
assert.equal(r.low, 14072, `D low expected 14072, got ${r.low}`);
assert.equal(r.twoWayRooms, 10, "interactive package should default two-way buttons to all standard rooms");

// Test E: unsure (B basis, same 80-100% range)
r = calculateEstimate(t({ tier: "unsure", areas: { ...defaultState().areas, standardIndoor: 10 } }));
assert.equal(r.low, 10276, `E low expected 10276, got ${r.low}`);
assert.equal(r.high, 12845, `E high expected 12845, got ${r.high}`);

// Endpoints + large-system threshold
r = calculateEstimate(t({ tier: "B", areas: { standardIndoor: 20, largeIndoor: 2, outdoor: 1, largeOutdoor: 1, entry: 2 } }));
assert.equal(r.endpoints, 34, `endpoints expected 34, got ${r.endpoints}`);
assert.equal(r.overThreshold, true, "34 endpoints should be over threshold");

// Per-line ranges: every breakdown line carries low/high matching the model multipliers
r = calculateEstimate(t({ tier: "B", featurePackage: "safety", areas: { ...defaultState().areas, standardIndoor: 10 } }));
for (const line of r.breakdown) {
  assert.ok(line.amountLow !== undefined && line.amountHigh !== undefined, `line "${line.label}" missing range`);
  assert.equal(line.amountLow, Math.round(line.amount * pricingConfig.estimateLowMultiplier), `line "${line.label}" amountLow mismatch`);
  assert.equal(line.amountHigh, Math.round(line.amount * pricingConfig.estimateHighMultiplier), `line "${line.label}" amountHigh mismatch`);
}

// Monitoring: optional only, no free-months rule
r = calculateEstimate(t({ tier: "A", areas: { ...defaultState().areas, standardIndoor: 10 }, fineTune: { monitoring: true } }));
assert.equal(r.monitoringAnnual, pricingConfig.monitoringAnnualPrice);
assert.equal(r.monitoringIncludedMonths, 0, "no free-monitoring period in the generic model");

console.log("pricing tests: all assertions passed");
console.log(`  A: ${formatNZD(10276)} - ${formatNZD(12845)}`);
console.log(`  safety: ${formatNZD(11792)} | interactive: ${formatNZD(14072)} | endpoints: 34`);
