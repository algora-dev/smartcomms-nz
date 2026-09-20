// Read-only pricing assessment (Release 2).
// Wraps the SAME validator + deterministic engine the site uses. Stateless:
// no records, PDFs, leads or messages are created by an assessment.

import { parseCalculatorState, hasScope } from "@/lib/pricing/validation";
import { calculateEstimate } from "@/lib/pricing/calculate";
import {
  PRICING_MODEL_VERSION,
  PRICING_PROVENANCE,
  pricingConfig,
} from "@/lib/pricing/config";
import type { CalculatorState } from "@/lib/pricing/types";
import type {
  AssessmentError,
  FreshnessState,
  PricingAssessmentResult,
} from "./contracts";

/** Owner policy: an approved model stays current_approved_model for 90 days
 * after its review date, then flags review_due. Withdrawn is a manual owner
 * decision, never a timer. */
const REVIEW_DUE_DAYS = 90;

function freshness(): { state: FreshnessState; model_reviewed_at: string } {
  const reviewed = new Date(pricingConfig.reviewedAt).getTime();
  const ageDays = (Date.now() - reviewed) / (24 * 60 * 60 * 1000);
  return {
    state: ageDays > REVIEW_DUE_DAYS ? "review_due" : "current_approved_model",
    model_reviewed_at: pricingConfig.reviewedAt,
  };
}

export type AssessPricingResult = PricingAssessmentResult | AssessmentError;

export function assessPricing(input: unknown): AssessPricingResult {
  const parsed = parseCalculatorState(input);
  if (!parsed.ok) {
    return {
      business_id: "smartcomms-nz",
      schema_version: 1,
      assessment_type: "pricing",
      status: "needs_input",
      message:
        "The supplied calculator state is invalid or incomplete. Supply the public cfg-format state used by /pricing-tool.",
      missing: [parsed.error],
    };
  }
  const state = parsed.state;
  // An unspecified project must not yield a controller-only "whole project" answer.
  if (!hasScope(state)) {
    return {
      business_id: "smartcomms-nz",
      schema_version: 1,
      assessment_type: "pricing",
      status: "needs_input",
      message:
        "No project scope supplied. Provide at least one area, entry point or control station; a completely unspecified project cannot be priced.",
      missing: ["areas", "entry", "additionalControlStations"],
    };
  }

  return buildResult(state, parsed.appliedDefaults);
}

export function buildResult(
  state: CalculatorState,
  appliedDefaults: string[],
): PricingAssessmentResult {
  const estimate = calculateEstimate(state);

  const cfgParam = encodeURIComponent(JSON.stringify(state));
  const nextActions = [
    {
      label: "Open this configuration in the SmartComms pricing tool",
      url: `/pricing-tool?cfg=${cfgParam}`,
    },
    {
      label: "Human-reviewed enquiry (SmartComms replies with provider suggestions)",
      url: "/contact",
    },
  ];

  return {
    business_id: "smartcomms-nz",
    schema_version: 1,
    capability: "assessment",
    assessment_type: "pricing",
    status: "ok",
    result_type: "budget_estimate",
    currency: "NZD",
    tax_basis: "excludes GST",
    generated_at: new Date().toISOString(),
    freshness: freshness(),
    pricing_model_version: PRICING_MODEL_VERSION,
    included_scope:
      "Installed IP paging / PA / intercom scope as entered: central platform, area speakers/intercom points, package features, control stations.",
    exclusions: [
      pricingConfig.cablingDisclaimer,
      "Recurring monitoring services (quoted separately when selected).",
    ],
    low: Math.round(estimate.low),
    high: Math.round(estimate.high),
    breakdown: estimate.breakdown.map((l) => ({
      label: l.label,
      detail: l.detail,
      amount_low: l.amountLow ?? l.amount,
      amount_high: l.amountHigh ?? l.amount,
    })),
    endpoints: estimate.endpoints,
    large_system_warning: estimate.overThreshold,
    optional_recurring_monitoring_annual_nzd: estimate.monitoringAnnual,
    normalized_input: state as unknown as Record<string, unknown>,
    applied_defaults: appliedDefaults,
    limitations: [
      "An indicative SmartComms planning range informed by supplier and installation pricing, for the scope entered. Actual project quotes can differ.",
      "Not a formal quote and not verified by an installer.",
      `Whole-NZD allowances; band ${PRICING_PROVENANCE.band} of configured baseline amounts.`,
    ],
    next_actions: nextActions,
  };
}
