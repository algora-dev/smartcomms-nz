// Business-core result contracts (Release 2 / 2.1).
// Wire shapes for the versioned, read-only assessment API. Pricing-only for
// now; other assessment_type variants return not_supported until implemented.

export const BUSINESS_ID = "smartcomms-nz" as const;
export const ASSESSMENT_SCHEMA_VERSION = 1;

/** Canonical domain status set (Agent-Ready standard). "not_supported" is the
 * ONLY unsupported-status name — do not introduce "unsupported". */
export type DomainStatus =
  | "ok"
  | "needs_input"
  | "not_supported"
  | "requires_human_review"
  | "unavailable";

export type AssessmentType = "pricing" | "funding" | "finance";

/** Known verticals for optional context. Contextual only — never merged into
 * calculator state. */
export const KNOWN_INDUSTRIES = ["schools", "aged-care", "industrial", "commercial"] as const;
export type Industry = (typeof KNOWN_INDUSTRIES)[number];

export type FreshnessState = "current_approved_model" | "review_due" | "withdrawn";

export interface AssessmentRequestBase {
  assessment_type: AssessmentType;
}

/** External request shape (Release 2.1, canonical):
 * { assessment_type: "pricing", input: { state: <cfg-format calculator state>, industry?: "aged-care" } } */
export interface PricingAssessmentInput {
  state: unknown;
  industry?: Industry;
}

export interface BreakdownLineOut {
  label: string;
  detail?: string;
  amount_low: number;
  amount_high: number;
}

export interface PricingAssessmentResult {
  business_id: typeof BUSINESS_ID;
  schema_version: number;
  capability: "assessment";
  assessment_type: "pricing";
  status: "ok";
  result_type: "budget_estimate";
  currency: "NZD";
  tax_basis: "excludes GST";
  generated_at: string;
  freshness: { state: FreshnessState; model_reviewed_at: string };
  pricing_model_version: string;
  included_scope: string;
  exclusions: string[];
  low: number;
  high: number;
  breakdown: BreakdownLineOut[];
  endpoints: number;
  large_system_warning: boolean;
  optional_recurring_monitoring_annual_nzd: number | null;
  normalized_input: Record<string, unknown>;
  applied_defaults: string[];
  limitations: string[];
  next_actions: { label: string; url: string }[];
}

export interface AssessmentError {
  business_id: typeof BUSINESS_ID;
  schema_version: number;
  assessment_type: AssessmentType | "unknown";
  status: Exclude<DomainStatus, "ok">;
  message: string;
  missing?: string[];
}
