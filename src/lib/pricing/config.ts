// Single source of truth for all pricing. No component should hard-code prices.
// Derived/provisional values must be approved by T3 Labs / NZAV before launch.

import type { EntryIntercomType, Tier } from "./types";

export const tierCMultiplier = 1.25;
export const estimateHighMultiplier = 1.2;

export const pricingConfig = {
  headendPrice: 4995,
  tierCMultiplier,
  estimateHighMultiplier,
  monitoringAnnualPrice: 650,
  monitoringFreeMonthsTierA: 24,
  fireInterfacePrice: 1895,
  endpointWarningThreshold: 30,

  areas: {
    standardIndoor: {
      label: "Standard indoor rooms",
      example: "Classrooms, offices, meeting rooms, wards, staff rooms",
      info: "Any standard-sized room needing one speaker. A school classroom, a hospital ward, a meeting room - if it is a room, it counts here.",
      priceA: 645,
      priceB: 685,
      speakersPerArea: 1,
    },
    largeIndoor: {
      label: "Large indoor spaces",
      example: "Assembly halls, gymnasiums, large common areas, workshops",
      info: "Bigger indoor spaces need multiple ceiling speakers spread out for even coverage.",
      priceA: 645, // per ceiling speaker
      priceB: 685,
      speakersPerArea: 4,
    },
    outdoor: {
      label: "Outdoor areas",
      example: "Courtyards, car parks, loading areas, yards, playgrounds",
      info: "Covered or sheltered outdoor areas using weatherproof horn speakers.",
      priceA: 645, // per horn speaker
      priceB: 685,
      speakersPerArea: 2,
    },
    largeOutdoor: {
      label: "Large outdoor / sports areas",
      example: "Sports fields, large yards, large open grounds",
      info: "Large open outdoor areas using pole-mounted horn speakers for long-range coverage.",
      priceA: 950, // per pole-mounted horn
      priceB: 1050,
      speakersPerArea: 2,
    },
  },

  intercoms: {
    voicePanel: { label: "Voice intercom", priceA: 650, priceB: 650 },
    videoPanel: { label: "Video intercom", priceA: 875, priceB: 875 },
    twoWayButton: { priceA: 285, priceB: 285 },
    additionalControlStation: { priceA: 1850, priceB: 1850 },
  },

  defaults: {
    largeIndoorSpeakers: 4,
    outdoorHorns: 2,
    largeOutdoorHorns: 2,
    entryIntercomType: "voice" as EntryIntercomType,
  },
} as const;

/** Resolve a unit price for a tier. Tier C = B x 1.25 (never hard-coded). */
export function unitPrice(priceA: number, priceB: number, tier: Tier): number {
  if (tier === "A") return priceA;
  const base = priceB;
  return tier === "B" ? base : base * tierCMultiplier;
}

export function formatNZD(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-NZ");
}

/** Rounded display for the sticky footer, e.g. 14585 -> $14.5k */
export function formatK(n: number): string {
  const k = n / 1000;
  return "$" + (Math.round(k * 10) / 10).toFixed(1).replace(/\.0$/, "") + "k";
}
