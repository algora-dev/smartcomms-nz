import { calculateEstimate } from "../src/lib/pricing/calculate.ts";
import { defaultState } from "../src/lib/pricing/presets.ts";
import { formatNZD } from "../src/lib/pricing/config.ts";

const t = (over) => {
  const s = { ...defaultState(), ...over };
  s.fineTune = { ...defaultState().fineTune, ...(over.fineTune ?? {}) };
  return s;
};

// Test A: Tier B, 10 rooms, Essential (headend 5995 + 10 x 685 = 12845; low = 80%)
let r = calculateEstimate(t({ tier: "B", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("A low", formatNZD(r.low), "expect $10,276");
console.log("A high", formatNZD(r.high), "expect $12,845");

// Test B: Tier C, 10 rooms, Essential (C no longer carries a cabling uplift)
r = calculateEstimate(t({ tier: "C", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("B low", r.low.toFixed(2), "expect 10276 (= B low, no 25% uplift)");

// Test C: Tier B safety (5995 + 6850 + 1895 = 14740; low = 11792)
r = calculateEstimate(t({ tier: "B", featurePackage: "safety", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("C low", formatNZD(r.low), "expect $11,792");

// Test D: Tier B interactive (5995 + 6850 + 1895 + 10*285 = 17590; low = 14072)
r = calculateEstimate(t({ tier: "B", featurePackage: "interactive", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("D low", formatNZD(r.low), "expect $14,072");

// Test E: unsure (B basis, same 80-100% range)
r = calculateEstimate(t({ tier: "unsure", areas: { ...defaultState().areas, standardIndoor: 10 } }));
console.log("E low", formatNZD(r.low), "expect $10,276");
console.log("E high", formatNZD(r.high), "expect $12,845");

// endpoints check
r = calculateEstimate(t({ tier: "B", areas: { standardIndoor: 20, largeIndoor: 2, outdoor: 1, largeOutdoor: 1, entry: 2 } }));
console.log("endpoints", r.endpoints, "expect 20+8+2+2+2=34, overThreshold", r.overThreshold);
