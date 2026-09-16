export const ORGANISATION_TYPES = [
  { value: "state_school", label: "State school / kura", group: "Education" },
  { value: "state_integrated_school", label: "State-integrated school", group: "Education" },
  { value: "private_school", label: "Private school", group: "Education" },
  { value: "tertiary", label: "University / tertiary / training provider", group: "Education" },
  { value: "early_learning", label: "Early learning / childcare", group: "Education" },
  { value: "aged_care", label: "Aged care / retirement village", group: "Health & care" },
  { value: "healthcare", label: "Healthcare / medical", group: "Health & care" },
  { value: "government", label: "Government / public-sector organisation", group: "Public sector" },
  { value: "local_government", label: "Local government / council", group: "Public sector" },
  { value: "commercial", label: "Office / commercial business", group: "Commercial & other" },
  { value: "industrial", label: "Warehouse / industrial / manufacturing", group: "Commercial & other" },
  { value: "hospitality_events", label: "Hospitality / venue / events", group: "Commercial & other" },
  { value: "nonprofit", label: "Charity / not-for-profit", group: "Commercial & other" },
  { value: "other", label: "Other organisation", group: "Commercial & other" },
] as const;

export type OrganisationType = (typeof ORGANISATION_TYPES)[number]["value"];

export const PROJECT_VALUE_BANDS = [
  { value: "under_10", label: "Under $10,000", low: 0, high: 10000 },
  { value: "10_20", label: "$10,000 – $20,000", low: 10000, high: 20000 },
  { value: "20_40", label: "$20,000 – $40,000", low: 20000, high: 40000 },
  { value: "40_60", label: "$40,000 – $60,000", low: 40000, high: 60000 },
  { value: "60_100", label: "$60,000 – $100,000", low: 60000, high: 100000 },
  { value: "100_250", label: "$100,000 – $250,000", low: 100000, high: 250000 },
  { value: "250_plus", label: "$250,000+", low: 250000, high: null },
  { value: "unsure", label: "I’m not sure yet", low: null, high: null },
] as const;

export type ProjectValueBand = (typeof PROJECT_VALUE_BANDS)[number]["value"] | "smartcomms_estimate";

export const SITE_SIZE_BANDS = [
  { value: "1_10", label: "1–10 areas" },
  { value: "11_20", label: "11–20 areas" },
  { value: "21_40", label: "21–40 areas" },
  { value: "41_75", label: "41–75 areas" },
  { value: "76_100", label: "76–100 areas" },
  { value: "100_plus", label: "100+ areas" },
  { value: "unsure", label: "Not sure" },
] as const;

export type SiteSizeBand = (typeof SITE_SIZE_BANDS)[number]["value"];

export const WEEKLY_BUDGETS = [
  { value: "under_250", label: "Under $250 / week" },
  { value: "250_500", label: "$250–$500 / week" },
  { value: "500_1000", label: "$500–$1,000 / week" },
  { value: "1000_2000", label: "$1,000–$2,000 / week" },
  { value: "2000_plus", label: "$2,000+ / week" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const MONTHLY_BUDGETS = [
  { value: "under_1000", label: "Under $1,000 / month" },
  { value: "1000_2000", label: "$1,000–$2,000 / month" },
  { value: "2000_4000", label: "$2,000–$4,000 / month" },
  { value: "4000_8000", label: "$4,000–$8,000 / month" },
  { value: "8000_plus", label: "$8,000+ / month" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export type PaymentFrequency = "weekly" | "monthly";
export type PaymentBudget =
  | (typeof WEEKLY_BUDGETS)[number]["value"]
  | (typeof MONTHLY_BUDGETS)[number]["value"];

export const UPFRONT_BANDS = [
  { value: "none", label: "Nothing upfront" },
  { value: "up_to_10", label: "Up to 10%" },
  { value: "10_20", label: "10–20%" },
  { value: "20_30", label: "20–30%" },
  { value: "30_50", label: "30–50%" },
  { value: "50_plus", label: "50%+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export type UpfrontBand = (typeof UPFRONT_BANDS)[number]["value"];

export const RESULT_COPY = {
  strong: {
    eyebrow: "Strong reason to explore finance",
    headline: "A finance or leasing conversation looks well worth having",
    body:
      "You have enough project and budget information for a finance specialist to have a useful first conversation. The provider will still need to assess the organisation, equipment and final transaction before offering any terms.",
  },
  good: {
    eyebrow: "Finance looks worth discussing",
    headline: "There is enough here to explore the available options",
    body:
      "Your answers give a useful starting point. A specialist can explain which finance or leasing structures may be relevant and what extra information would be needed next.",
  },
  tailored: {
    eyebrow: "Tailored finance discussion recommended",
    headline: "This looks like a project worth discussing directly with a specialist",
    body:
      "Larger or less-defined projects often need a tailored structure rather than a simple online estimate. That does not rule finance out — it just means the next useful step is a conversation about the organisation, project and available options.",
  },
  early: {
    eyebrow: "Worth a conversation",
    headline: "You do not need every number worked out before asking about finance",
    body:
      "You are still early in the planning process, but a finance specialist can explain what may be possible and what information would make the next step more useful. If the project cost is still unclear, SmartComms can also help you estimate it first.",
  },
} as const;

export type FinanceResultLevel = keyof typeof RESULT_COPY;

export const DISCLAIMER =
  "SmartComms does not provide finance, make credit decisions or guarantee approval. This checker is preliminary guidance only. Actual finance availability, rates, terms, security, documentation and approval are determined by the relevant finance provider.";
