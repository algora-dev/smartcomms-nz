/**
 * NZ School Communications Funding Pre-Qualification Tool - rules engine.
 *
 * Deterministic and explainable: every output field traces back to a rule in
 * this file driven by config values. No AI, no randomness.
 */

import {
  CABLING_STATUS,
  FEATURES,
  POINTS,
  REASONS,
  RELATED_WORKS,
  RESULT_COPY,
  SCHOOL_TYPES,
  SCORE_THRESHOLDS,
  type CaseTier,
  type FitTier,
} from "./config";

export interface AssessmentAnswers {
  schoolType?: string;
  projectStatus?: string;
  reasons: string[];
  currentSystem?: string;
  cablingStatus?: string;
  poeStatus?: string;
  reusable: string[];
  features: string[];
  relatedWorks: string[];
  ministryOwnership?: string;
  tenYearPlan?: string;
}

export interface ComponentBreakdown {
  strong: string[];
  moderate: string[];
  weak: string[];
}

export type PathwayKind = "five_ya" | "state_integrated" | "private" | "new_build";

export interface AssessmentResult {
  /** Which special-result pathway applies (spec section 5). */
  pathway: PathwayKind;
  headline: string;
  pathwayLabel: string | null;
  /** True when the positive override rule fired (>=1 strong component, weak case). */
  positiveOverride: boolean;
  positiveOverrideMessage: string | null;
  components: ComponentBreakdown;
  hasStrongComponents: boolean;
  caseTier: CaseTier;
  caseScore: number;
  supportingFactors: string[];
  infrastructureSummary: {
    reusable: "yes" | "partial" | "none" | "unknown";
    heading: string;
    body: string;
  };
  confirmationsNeeded: string[];
}

function labelOf(options: { id: string; label: string }[], id?: string): string | null {
  if (!id) return null;
  return options.find((o) => o.id === id)?.label ?? null;
}

export function componentBreakdown(featureIds: string[]): ComponentBreakdown {
  const byId = new Map(FEATURES.map((f) => [f.id, f]));
  const out: ComponentBreakdown = { strong: [], moderate: [], weak: [] };
  for (const id of featureIds) {
    const f = byId.get(id);
    if (!f) continue;
    out[f.fit].push(f.label);
  }
  return out;
}

export function scoreProjectCase(answers: AssessmentAnswers): { score: number; factors: string[] } {
  let score = 0;
  const factors: string[] = [];

  // Reason weights (spec section 3, screen 3).
  const reasonsById = new Map(REASONS.map((r) => [r.id, r]));
  for (const id of answers.reasons) {
    const r = reasonsById.get(id);
    if (!r) continue;
    score += POINTS.caseReason[r.weight];
    factors.push(r.label);
  }

  // Project status factors (spec section 3, screen 2).
  const ps = answers.projectStatus;
  if (ps === "replacement" || ps === "no_system") {
    score += POINTS.projectType.replacement;
    factors.push(ps === "replacement" ? "Project involves a full system replacement" : "No suitable current system exists");
  } else if (ps === "partial_upgrade" || ps === "expansion") {
    score += POINTS.projectType.partialOrExpansion;
    factors.push(ps === "partial_upgrade" ? "Project involves a substantial partial upgrade" : "Project expands coverage to new areas");
  } else if (ps === "alongside_other_works") {
    score += POINTS.relatedProject;
    factors.push("Upgrade is being coordinated with other planned ICT/property works");
  } else if (ps === "new_block") {
    score += POINTS.relatedProject;
    factors.push("A new building/block creates a specification opportunity");
  }

  // Routine-maintenance-only condition (spec section 4).
  if (ps === "maintenance_only") {
    score += POINTS.routineMaintenanceOnly;
  }

  // Related planned work adds a positive coordination factor (spec section 3, screen 6).
  const related = answers.relatedWorks.filter(
    (id) => id !== "no_other_work" && id !== "unsure_related",
  );
  if (related.length > 0) {
    score += POINTS.relatedProject;
    factors.push(
      "Other planned work creates a coordination opportunity (" +
        related.map((id) => labelOf(RELATED_WORKS, id)).filter(Boolean).join(", ") +
        ")",
    );
  }

  return { score, factors };
}

export function caseTierFor(score: number): CaseTier {
  if (score >= SCORE_THRESHOLDS.caseStrongMin) return "strong";
  if (score >= SCORE_THRESHOLDS.caseModerateMin) return "moderate";
  return "weak";
}

function infrastructureSummary(answers: AssessmentAnswers): AssessmentResult["infrastructureSummary"] {
  const knownReusable = answers.reusable.filter(
    (id) => id !== "none_reusable" && id !== "unsure_reusable",
  );
  const cablingKnown = answers.cablingStatus === "modern_most" || answers.cablingStatus === "some_areas";

  let reusable: "yes" | "partial" | "none" | "unknown";
  if (answers.reusable.includes("none_reusable")) reusable = "none";
  else if (knownReusable.length >= 3) reusable = "yes";
  else if (knownReusable.length > 0) reusable = "partial";
  else reusable = "unknown";

  const heading =
    reusable === "yes"
      ? "Existing infrastructure: Likely reusable"
      : reusable === "partial"
        ? "Existing infrastructure: Partially reusable"
        : reusable === "none"
          ? "Existing infrastructure: Little appears reusable"
          : "Existing infrastructure: To be confirmed";

  let body: string;
  if (cablingKnown) {
    body =
      "Some existing network infrastructure may be reusable, but additional fixed cabling is likely to be required in uncovered areas. This affects project scope and cost, not necessarily the funding opportunity.";
  } else if (answers.cablingStatus === "new_required" || answers.cablingStatus === "little_none") {
    body =
      "New permanent cabling will likely form part of the fixed infrastructure requirement. This increases project scope and cost, but new fixed cabling may itself be part of a fundable infrastructure project rather than reducing funding potential.";
  } else {
    body =
      "The condition of existing infrastructure is not yet confirmed. A site review would establish what can be reused and what new fixed cabling is required. This affects scope and cost, not necessarily the funding opportunity.";
  }

  return { reusable, heading, body };
}

function confirmationsNeeded(answers: AssessmentAnswers, pathway: PathwayKind): string[] {
  const items: string[] = [];
  if (pathway === "five_ya") {
    if (!answers.ministryOwnership || answers.ministryOwnership.startsWith("unsure")) {
      items.push("Whether the affected buildings are Ministry-owned");
    }
    if (!answers.tenYearPlan || answers.tenYearPlan.startsWith("unsure") || answers.tenYearPlan === "plan_unknown_content") {
      items.push("Current 10YPP priorities and remaining 5YA allocation");
    }
  }
  items.push("Exact condition of existing infrastructure");
  items.push("Final system scope and equipment accounting treatment");
  items.push("Formal project cost estimate");
  return items;
}

export function runAssessment(answers: AssessmentAnswers): AssessmentResult {
  // Pathway branch (spec section 5).
  let pathway: PathwayKind;
  if (answers.schoolType === "state_integrated") pathway = "state_integrated";
  else if (answers.schoolType === "private") pathway = "private";
  else if (answers.projectStatus === "new_school") pathway = "new_build";
  else pathway = "five_ya";

  const components = componentBreakdown(answers.features);
  const hasStrong = components.strong.length > 0;

  const { score, factors } = scoreProjectCase(answers);
  const caseTier = caseTierFor(score);

  // Headline + positive override (spec section 4).
  const positiveOverride = hasStrong && caseTier === "weak";
  let headline: string;
  if (caseTier === "strong") headline = RESULT_COPY.headline.strong;
  else if (hasStrong) headline = RESULT_COPY.headline.partialStrong;
  else if (caseTier !== "weak") headline = RESULT_COPY.headline.partialStrong;
  else headline = RESULT_COPY.headline.investigate;

  const pathwayLabel =
    pathway === "five_ya" ? RESULT_COPY.pathway5ya : null;

  return {
    pathway,
    headline,
    pathwayLabel,
    positiveOverride,
    positiveOverrideMessage: positiveOverride ? RESULT_COPY.positiveOverride : null,
    components,
    hasStrongComponents: hasStrong,
    caseTier,
    caseScore: score,
    supportingFactors: factors,
    infrastructureSummary: infrastructureSummary(answers),
    confirmationsNeeded: confirmationsNeeded(answers, pathway),
  };
}

/** Human-readable answer summary for lead emails / saved reports. */
export function answersToSummary(answers: AssessmentAnswers): Record<string, string> {
  return {
    "School type": labelOf(SCHOOL_TYPES, answers.schoolType) ?? "(not answered)",
    "Project status": labelOf(
      [
        { id: "replacement", label: "Complete replacement" },
        { id: "partial_upgrade", label: "Partial upgrade" },
        { id: "expansion", label: "Expansion" },
        { id: "no_system", label: "No suitable current system" },
        { id: "alongside_other_works", label: "Alongside other works" },
        { id: "new_block", label: "New building/block" },
        { id: "new_school", label: "Completely new school/site" },
        { id: "maintenance_only", label: "Routine repair/maintenance only" },
        { id: "unsure_project", label: "Not sure" },
      ],
      answers.projectStatus,
    ) ?? "(not answered)",
    "Reasons": answers.reasons.map((id) => labelOf(REASONS, id)).filter(Boolean).join("; ") || "(none)",
    "Current system": labelOf(
      [
        { id: "full", label: "Full school-wide system" },
        { id: "partial", label: "Partial system" },
        { id: "legacy", label: "Old or legacy system" },
        { id: "several", label: "Several separate systems" },
        { id: "none", label: "No system" },
        { id: "unsure_system", label: "Not sure" },
      ],
      answers.currentSystem,
    ) ?? "(not answered)",
    "Network cabling": labelOf(CABLING_STATUS, answers.cablingStatus) ?? "(not answered)",
    "PoE support": answers.poeStatus
      ? labelOf(
          [
            { id: "poe_most", label: "Yes, most areas" },
            { id: "poe_some", label: "Some areas" },
            { id: "poe_no", label: "No" },
            { id: "unsure_poe", label: "Not sure" },
          ],
          answers.poeStatus,
        ) ?? "(not answered)"
      : "(not asked)",
    "Reusable infrastructure": answers.reusable.map((id) => labelOf(
      [
        { id: "indoor_speakers", label: "Indoor speakers" },
        { id: "outdoor_speakers", label: "Outdoor speakers/horns" },
        { id: "speaker_cabling", label: "Speaker cabling" },
        { id: "switches", label: "Network switches" },
        { id: "fibre_links", label: "Fibre/network links" },
        { id: "racks", label: "Equipment racks" },
        { id: "controllers_amps", label: "Controllers/amplifiers" },
        { id: "paging_mic", label: "Paging microphone/control station" },
        { id: "none_reusable", label: "None known" },
        { id: "unsure_reusable", label: "Not sure" },
      ],
      id,
    )).filter(Boolean).join("; ") || "(none)",
    "Requested features": answers.features
      .map((id) => {
        const f = FEATURES.find((x) => x.id === id);
        return f ? `${f.label} [${f.fit}]` : null;
      })
      .filter(Boolean)
      .join("; ") || "(none)",
    "Related work": answers.relatedWorks.map((id) => labelOf(RELATED_WORKS, id)).filter(Boolean).join("; ") || "(none)",
    "Ministry ownership": answers.ministryOwnership
      ? labelOf(
          [
            { id: "own_yes", label: "Yes" },
            { id: "own_mostly", label: "Mostly" },
            { id: "own_no", label: "No" },
            { id: "unsure_ownership", label: "Not sure" },
          ],
          answers.ministryOwnership,
        ) ?? "(not answered)"
      : "(skipped)",
    "In 10YPP": answers.tenYearPlan
      ? labelOf(
          [
            { id: "plan_yes", label: "Yes" },
            { id: "plan_no", label: "No" },
            { id: "unsure_plan", label: "Not sure" },
            { id: "plan_unknown_content", label: "Unknown 10YPP content" },
          ],
          answers.tenYearPlan,
        ) ?? "(not answered)"
      : "(skipped)",
  };
}

export type { FitTier };
