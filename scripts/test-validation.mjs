// SC-02 boundary-validation tests for parseCalculatorState.
// Run: npm run test:validation
import assert from "node:assert/strict";
import { parseCalculatorState, hasScope } from "../src/lib/pricing/validation.ts";
import { defaultState } from "../src/lib/pricing/presets.ts";
import { calculateEstimate } from "../src/lib/pricing/calculate.ts";

let passed = 0;
function ok(name, fn) {
  fn();
  passed++;
  console.log(`PASS  ${name}`);
}

ok("valid full state round-trips with fixed numbers", () => {
  const state = defaultState();
  state.tier = "B";
  state.areas.standardIndoor = 10;
  state.featurePackage = "essential";
  const r = parseCalculatorState(JSON.parse(JSON.stringify(state)));
  assert.equal(r.ok, true);
  const est = calculateEstimate(r.state);
  assert.equal(Math.round(est.low), 10276);
  assert.equal(Math.round(est.high), 12845);
});

ok("null speaker override preserved (not zero, not dropped)", () => {
  const r = parseCalculatorState({ ...defaultState(), tier: "B", areas: { standardIndoor: 5 } });
  assert.equal(r.ok, true);
  assert.equal(r.state.speakers.largeIndoor, null);
  assert.ok(r.appliedDefaults.includes("speakers.largeIndoor"));
});

ok("explicit false/0 monitoring and quantities survive (no || fallback collapse)", () => {
  const r = parseCalculatorState({
    tier: "C",
    areas: { standardIndoor: 0, largeIndoor: 0, outdoor: 0, largeOutdoor: 0, entry: 0 },
    speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
    featurePackage: "safety",
    fineTune: { twoWayMode: "none", twoWayQty: 0, entryIntercom: "voice", additionalControlStations: 0, monitoring: false },
  });
  assert.equal(r.ok, true);
  assert.equal(r.state.fineTune.monitoring, false);
  assert.equal(r.state.areas.standardIndoor, 0);
});

ok("unknown/extra nested fields are dropped, not stored", () => {
  const r = parseCalculatorState({
    tier: "B",
    areas: { standardIndoor: 4, email: "x@y.z", note: { deep: "payload" } },
    featurePackage: "essential",
    evil: { nested: { object: 1 } },
  });
  assert.equal(r.ok, true);
  const stored = JSON.stringify(r.state);
  assert.ok(!stored.includes("email") && !stored.includes("note") && !stored.includes("evil"));
});

ok("negative / fractional / non-finite / over-max counts rejected", () => {
  for (const bad of [-1, 1.5, "3", 100, NaN, Infinity, null]) {
    const r = parseCalculatorState({ tier: "B", areas: { standardIndoor: bad }, featurePackage: "essential" });
    assert.equal(r.ok, false, `expected reject for ${String(bad)}`);
  }
});

ok("invalid enums rejected (tier, package, twoWayMode, entryIntercom)", () => {
  for (const [patch] of [
    [{ tier: "D" }], [{ tier: "admin" }], [{ featurePackage: "premium" }], [{ fineTune: { twoWayMode: "lots" } }], [{ fineTune: { entryIntercom: "gate" } }],
  ]) {
    const r = parseCalculatorState({ ...defaultState(), ...patch });
    assert.equal(r.ok, false, `expected reject for ${JSON.stringify(patch)}`);
  }
});

ok("speaker override 0 rejected (0 means zero speakers — not a valid override)", () => {
  const r = parseCalculatorState({ tier: "B", areas: { outdoor: 2 }, speakers: { outdoor: 0 }, featurePackage: "essential" });
  assert.equal(r.ok, false);
});

ok("control stations capped at 5, matching UI stepper", () => {
  assert.equal(parseCalculatorState({ tier: "B", areas: { standardIndoor: 1 }, featurePackage: "essential", fineTune: { additionalControlStations: 6 } }).ok, false);
  assert.equal(parseCalculatorState({ tier: "B", areas: { standardIndoor: 1 }, featurePackage: "essential", fineTune: { additionalControlStations: 5 } }).ok, true);
});

ok("two-way qty cannot exceed standard indoor rooms", () => {
  const r = parseCalculatorState({ tier: "B", areas: { standardIndoor: 3 }, featurePackage: "essential", fineTune: { twoWayMode: "some", twoWayQty: 4 } });
  assert.equal(r.ok, false);
});

ok("valid older cfg with omitted optional fields gets documented defaults", () => {
  const r = parseCalculatorState({ tier: "B", areas: { standardIndoor: 6 }, featurePackage: "essential" });
  assert.equal(r.ok, true);
  assert.equal(r.state.fineTune.twoWayMode, "package");
  assert.equal(r.state.fineTune.entryIntercom, "voice");
  assert.equal(r.state.fineTune.monitoring, false);
});

ok("default empty state is parseable but has no scope (not a completed run)", () => {
  const r = parseCalculatorState(defaultState());
  assert.equal(r.ok, true);
  assert.equal(hasScope(r.state), false);
});

ok("hasScope true for any real scope (areas, entry, stations)", () => {
  assert.equal(hasScope(parseCalculatorState({ tier: "B", areas: { entry: 1 }, featurePackage: "essential" }).state), true);
  assert.equal(hasScope(parseCalculatorState({ tier: "B", areas: {}, featurePackage: "essential", fineTune: { additionalControlStations: 1 } }).state), true);
});

ok("interactive fixture unchanged: 10 rooms -> $14,072-$17,590", () => {
  const s = defaultState();
  s.tier = "B"; s.areas.standardIndoor = 10; s.featurePackage = "interactive";
  const est = calculateEstimate(s);
  assert.equal(Math.round(est.low), 14072);
  assert.equal(Math.round(est.high), 17590);
  assert.equal(est.twoWayRooms, 10);
});

ok("malformed non-object / array inputs rejected", () => {
  for (const bad of [null, "string", 42, [], true]) {
    assert.equal(parseCalculatorState(bad).ok, false, `expected reject for ${String(bad)}`);
  }
});

console.log(`\nvalidation tests: all ${passed} assertions passed`);
