export const site = {
  name: "SmartComms NZ",
  legalName: "SmartComms NZ",
  operator: "T3 Labs", // confirmed by Shaun 2026-09-05
  locale: "en-NZ",
  country: "NZ",
  currency: "NZD",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://smartcomms.co.nz",
  description:
    "Independent New Zealand resource for understanding, planning and budgeting IP paging, school bell, PA, intercom and integrated communication systems.",
} as const;

// Locale config: day-one AU fork support
export const locale = {
  market: "NZ",
  currency: "NZD",
  gstLabel: "GST",
  countryName: "New Zealand",
} as const;

// Real contributors only (v2 rule: no fabricated experts)
export const authors = {
  shaun: {
    name: "Shaun Carter",
    role: "Editor",
    note: "Reviews technical, pricing and specification content for SmartComms NZ.",
  },
} as const;

export const tagline = "People connected | Possibilities expanded";
