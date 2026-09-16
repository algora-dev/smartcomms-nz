// Single source of truth for all pricing. No component should hard-code prices.
// Derived/provisional values must be approved by T3 Labs / NZAV before launch.

import type { EntryIntercomType, Tier } from "./types";

export const estimateLowMultiplier = 0.8;
export const estimateHighMultiplier = 1;

export const pricingConfig = {
  reviewedAt: "2026-09-16",
  reviewedAtLabel: "16 September 2026",
  headendPrice: 5995,
  estimateLowMultiplier,
  estimateHighMultiplier,
  monitoringAnnualPrice: 650,
  monitoringFreeMonthsTierA: 24,
  fireInterfacePrice: 1895,
  endpointWarningThreshold: 30,
  /**
   * Site-wide cabling is excluded from all estimates (tiers A and C especially).
   * Correct NZ terminology: Ministry of Education approved ICT installation contractor.
   */
  cablingDisclaimer:
    "These estimates do not include network cabling throughout the site. Site-wide data cabling must be installed by a Ministry of Education approved ICT installation contractor (or an equivalently certified installer for non-school sites), and is an additional cost. Our installation teams only carry out short patch-in runs (up to about 3 m using conduit). We can put you in touch with trusted cabling contractors for pricing.",

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

/* Tier C prices identically to tier B: site-wide cabling is excluded from all
   estimates and handled by the cabling disclaimer + partner referral instead. */
export function unitPrice(priceA: number, priceB: number, tier: Tier): number {
  if (tier === "A") return priceA;
  return priceB;
}

export function formatNZD(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-NZ");
}

/** Rounded display for the sticky footer, e.g. 14585 -> $14.5k */
export function formatK(n: number): string {
  const k = n / 1000;
  return "$" + (Math.round(k * 10) / 10).toFixed(1).replace(/\.0$/, "") + "k";
}
