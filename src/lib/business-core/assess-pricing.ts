// Read-only pricing assessment (Release 2 / 2.1).
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
import { site } from "@/lib/site";
import {
  BUSINESS_ID,
  ASSESSMENT_SCHEMA_VERSION,
  KNOWN_INDUSTRIES,
  type AssessmentError,
  type FreshnessState,
  type Industry,
  type PricingAssessmentResult,
} from "./contracts";

/** Owner policy: an approved model stays current_approved_model for 90 days
 * after its review date, then flags review_due. Withdrawn is a manual owner
 * decision, never a timer. */
const REVIEW_DUE_DAYS = 90;

const origin = site.url.replace(/\/$/, "");

function err(status: AssessmentError["status"], message: string, missing?: string[]): AssessmentError {
  return {
    business_id: BUSINESS_ID,
    schema_version: ASSESSMENT_SCHEMA_VERSION,
    assessment_type: "pricing",
    status,
    message,
    ...(missing ? { missing } : {}),
  };
}

function freshness(): { state: FreshnessState; model_reviewed_at: string } {
  const reviewed = new Date(pricingConfig.reviewedAt).getTime();
  const ageDays = (Date.now() - reviewed) / (24 * 60 * 60 * 1000);
  return {
    state: ageDays > REVIEW_DUE_DAYS ? "review_due" : "current_approved_model",
    model_reviewed_at: pricingConfig.reviewedAt,
  };
}

export type AssessPricingResult = PricingAssessmentResult | AssessmentError;

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * Canonical external contract (Release 2.1):
 * { assessment_type: "pricing", input: { state: <cfg-format state>, industry?: ... } }
 * `industry` is contextual only and is NEVER merged into calculator state.
 */
export function assessPricing(input: unknown): AssessPricingResult {
  if (!isObject(input)) {
    return err("needs_input", "Supply an input object with `state` (the public cfg-format calculator state).", ["input"]);
  }
  // Do not silently convert: unknown top-level keys other than state/industry are rejected.
  const allowed = new Set(["state", "industry"]);
  for (const key of Object.keys(input)) {
    if (!allowed.has(key)) {
      return err("needs_input", `Unknown input field '${key}'. Only 'state' and optional 'industry' are accepted.`);
    }
  }
  const industry = input.industry;
  if (industry !== undefined) {
    if (typeof industry !== "string" || !(KNOWN_INDUSTRIES as readonly string[]).includes(industry)) {
      return err("needs_input", `Invalid industry. Known values: ${KNOWN_INDUSTRIES.join(", ")}.`, ["industry"]);
    }
  }

  const parsed = parseCalculatorState(input.state);
  if (!parsed.ok) {
    return err(
      "needs_input",
      "The supplied calculator state is invalid or incomplete. Supply the public cfg-format state used by /pricing-tool.",
      [parsed.error],
    );
  }
  const state = parsed.state;
  // An unspecified project must not yield a controller-only "whole project" answer.
  if (!hasScope(state)) {
    return err(
      "needs_input",
      "No project scope supplied. Provide at least one area, entry point or control station; a completely unspecified project cannot be priced.",
      ["areas", "entry", "additionalControlStations"],
    );
  }

  return buildResult(state, parsed.appliedDefaults, industry as Industry | undefined);
}

export function buildResult(
  state: CalculatorState,
  appliedDefaults: string[],
  industry?: Industry,
): PricingAssessmentResult {
  const estimate = calculateEstimate(state);
  const cfgParam = encodeURIComponent(JSON.stringify(state));

  // Absolute, agent-safe URLs derived from the central site config (Release 2.1 §5).
  // Known non-school industries (aged-care, industrial) get the finance-check
  // next step mirroring the website journey — never school funding (cleanup §3).
  const nextActions = [
    {
      label: "Open this configuration in the SmartComms pricing tool",
      url: `${origin}/pricing-tool?cfg=${cfgParam}`,
    },
    ...(industry === "aged-care" || industry === "industrial"
      ? [
          {
            label:
              industry === "aged-care"
                ? "Finance / leasing readiness guidance (aged care)"
                : "Explore payment options for this project (industrial)",
            url: `${origin}/tools/finance-check?industry=${industry}&source=assessment`,
          },
        ]
      : []),
    {
      label: "Human-reviewed enquiry (SmartComms replies with provider suggestions)",
      url: `${origin}/contact`,
    },
  ];

  return {
    business_id: BUSINESS_ID,
    schema_version: ASSESSMENT_SCHEMA_VERSION,
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
      `Whole-NZD allowances; band ${PRICING_PROVENANCE.band}.`,
    ],
    next_actions: nextActions,
  };
}
