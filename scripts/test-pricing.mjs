import { calculateEstimate } from "../src/lib/pricing/calculate.ts";
import { defaultState } from "../src/lib/pricing/presets.ts";
import { formatNZD } from "../src/lib/pricing/config.ts";

const t = (over) => {
  const s = { ...defaultState(), ...over };
  s.fineTune = { ...defaultState().fineTune, ...(over.fineTune ?? {}) };
  return s;
};

// Test A: Tier B, 10 rooms, Essential
let r = calculateEstimate(t({ tier: "B", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("A low", formatNZD(r.low), "expect $11,845");
console.log("A high", formatNZD(r.high), "expect $14,214");

// Test B: Tier C, 10 rooms, Essential
r = calculateEstimate(t({ tier: "C", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("B low", r.low.toFixed(2), "expect 4995 + 10*856.25 = 13557.5");

// Test C: Tier B safety
r = calculateEstimate(t({ tier: "B", featurePackage: "safety", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("C low", formatNZD(r.low), "expect $13,740");

// Test D: Tier B interactive
r = calculateEstimate(t({ tier: "B", featurePackage: "interactive", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("D low", formatNZD(r.low), "expect $16,590");

// Test E: unsure
r = calculateEstimate(t({ tier: "unsure", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("E low", formatNZD(r.low), "expect $11,845");
console.log("E high", formatNZD(r.high), "expect 13557.5*1.2 = $16,269");

// endpoints check
r = calculateEstimate(t({ tier: "B", areas: { standardIndoor: 20, largeIndoor: 2, outdoor: 1, largeOutdoor: 1, entry: 2 } }));
console.log("endpoints", r.endpoints, "expect 20+8+2+2+2=34, overThreshold", r.overThreshold);
