export const site = {
  name: "SmartComms NZ",
  legalName: "SmartComms NZ",
  operator: "T3 Labs",
  locale: "en-NZ",
  country: "NZ",
  currency: "NZD",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.smartcomms.co.nz",
  description:
    "New Zealand information and planning resource for IP paging, PA, bell, intercom and integrated communication systems, including pricing and school funding tools.",
} as const;

export const locale = {
  market: "NZ",
  currency: "NZD",
  gstLabel: "GST",
  countryName: "New Zealand",
} as const;

export const authors = {
  shaun: {
    name: "Shaun Carter",
    role: "Editor",
    note: "Reviews technical, pricing and specification content for SmartComms NZ.",
  },
} as const;

export const tagline = "People connected | Possibilities expanded";
