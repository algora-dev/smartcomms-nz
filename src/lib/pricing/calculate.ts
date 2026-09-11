// Deterministic pricing engine. Pure functions, no React.

import { pricingConfig, unitPrice } from "./config";
import type {
  BreakdownLine,
  CalculatorState,
  EstimateResult,
  FeaturePackage,
  Tier,
} from "./types";

function subtotalForTier(state: CalculatorState, tier: Tier) {
  const c = pricingConfig;
  const lines: BreakdownLine[] = [];
  let amount = 0;

  const add = (label: string, value: number, detail?: string) => {
    if (value > 0) {
      lines.push({ label, detail, amount: value });
      amount += value;
    }
  };

  // Headend / platform (flat across tiers)
  add("Central paging / control platform", c.headendPrice, "Paging station, server, software, remote programming and commissioning");

  // Areas
  const a = state.areas;
  const spk = {
    largeIndoor: state.speakers.largeIndoor ?? c.defaults.largeIndoorSpeakers,
    outdoor: state.speakers.outdoor ?? c.defaults.outdoorHorns,
    largeOutdoor: state.speakers.largeOutdoor ?? c.defaults.largeOutdoorHorns,
  };

  const cfg = c.areas;
  add(
    `Standard indoor rooms (${a.standardIndoor})`,
    a.standardIndoor * unitPrice(cfg.standardIndoor.priceA, cfg.standardIndoor.priceB, tier),
    "1 wall-mount IP speaker per room, installed"
  );
  add(
    `Large indoor spaces (${a.largeIndoor} × ${spk.largeIndoor} speakers)`,
    a.largeIndoor * spk.largeIndoor * unitPrice(cfg.largeIndoor.priceA, cfg.largeIndoor.priceB, tier),
    "Ceiling speakers for halls / gymnasiums"
  );
  add(
    `Outdoor areas (${a.outdoor} × ${spk.outdoor} speakers)`,
    a.outdoor * spk.outdoor * unitPrice(cfg.outdoor.priceA, cfg.outdoor.priceB, tier),
    "Weatherproof horn speakers"
  );
  add(
    `Large outdoor / sports areas (${a.largeOutdoor} × ${spk.largeOutdoor} speakers)`,
    a.largeOutdoor * spk.largeOutdoor * unitPrice(cfg.largeOutdoor.priceA, cfg.largeOutdoor.priceB, tier),
    "Pole-mounted horn speakers"
  );

  // Entry intercoms
  if (a.entry > 0) {
    const ic = state.fineTune.entryIntercom === "video" ? c.intercoms.videoPanel : c.intercoms.voicePanel;
    add(
      `Entry intercom panels (${a.entry} × ${ic.label.toLowerCase()})`,
      a.entry * unitPrice(ic.priceA, ic.priceB, tier)
    );
  }

  // Two-way buttons (resolved from package or fine-tune)
  const twoWayRooms = resolveTwoWayRooms(state);
  if (twoWayRooms > 0) {
    add(
      `Two-way room call buttons (${twoWayRooms})`,
      twoWayRooms * unitPrice(c.intercoms.twoWayButton.priceA, c.intercoms.twoWayButton.priceB, tier),
      "Push-button calling using the speaker's built-in microphone"
    );
  }

  // Fire interface
  if (resolveFire(state)) {
    add("Fire alarm / lockdown / EVAC interface", c.fireInterfacePrice);
  }

  // Additional control stations
  const stations = state.fineTune.additionalControlStations;
  if (stations > 0) {
    add(
      `Additional control stations (${stations})`,
      stations * unitPrice(
        c.intercoms.additionalControlStation.priceA,
        c.intercoms.additionalControlStation.priceB,
        tier
      )
    );
  }

  return { lines, amount };
}

export function resolveFire(state: CalculatorState): boolean {
  return state.featurePackage === "safety" || state.featurePackage === "interactive";
}

/** Fine-tune overrides package defaults for two-way buttons. */
export function resolveTwoWayRooms(state: CalculatorState): number {
  const ft = state.fineTune;
  if (ft.twoWayMode === "none") return 0;
  if (ft.twoWayMode === "some") return ft.twoWayQty;
  if (ft.twoWayMode === "all") return state.areas.standardIndoor;
  // package default
  return state.featurePackage === "interactive" ? state.areas.standardIndoor : 0;
}

function countEndpoints(state: CalculatorState): number {
  const c = pricingConfig;
  const a = state.areas;
  return (
    a.standardIndoor * c.areas.standardIndoor.speakersPerArea +
    a.largeIndoor * (state.speakers.largeIndoor ?? c.defaults.largeIndoorSpeakers) +
    a.outdoor * (state.speakers.outdoor ?? c.defaults.outdoorHorns) +
    a.largeOutdoor * (state.speakers.largeOutdoor ?? c.defaults.largeOutdoorHorns) +
    a.entry +
    state.fineTune.additionalControlStations
  );
}

export function calculateEstimate(state: CalculatorState): EstimateResult {
  const c = pricingConfig;
  const hi = c.estimateHighMultiplier;

  let low: number;
  let high: number;

  if (state.tier === "unsure") {
    const b = subtotalForTier(state, "B").amount;
    const ch = subtotalForTier(state, "C").amount * hi;
    low = b;
    high = ch;
  } else {
    const s = subtotalForTier(state, state.tier).amount;
    low = s;
    high = s * hi;
  }

  const endpoints = countEndpoints(state);
  const monitoringAnnual = state.fineTune.monitoring ? c.monitoringAnnualPrice : null;
  const monitoringIncludedMonths =
    state.tier === "A" ? c.monitoringFreeMonthsTierA : 0;

  // Breakdown shown under the primary tier basis (B for unsure low-side)
  const { lines } = subtotalForTier(state, state.tier === "unsure" ? "B" : state.tier);

  return {
    low,
    high,
    basis: state.tier,
    endpoints,
    overThreshold: endpoints > c.endpointWarningThreshold,
    monitoringAnnual,
    monitoringIncludedMonths,
    breakdown: lines,
    twoWayRooms: resolveTwoWayRooms(state),
    fireInterface: resolveFire(state),
  };
}

export const packageLabel: Record<FeaturePackage, string> = {
  essential: "Essential",
  safety: "Safety & Control",
  interactive: "Interactive",
};
