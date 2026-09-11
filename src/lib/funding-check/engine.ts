/**
 * NZ School Communications Funding Check - V2 rules engine.
 *
 * Deliberately deterministic and positive-path focused. The tool identifies
 * legitimate funding angles without representing that funding is approved.
 */

import {
  CABLING_STATUS,
  CURRENT_SYSTEMS,
  FEATURES,
  PROJECT_STATUSES,
  REASONS,
  RESULT_COPY,
  SCHOOL_TYPES,
  SCORE_THRESHOLDS,
  type CaseTier,
} from "./config";

export interface AssessmentAnswers {
  schoolType?: string;
  projectStatus?: string;
  reasons: string[];
  features: string[];
  currentSystem?: string;
  cablingStatus?: string;
}

export interface ComponentBreakdown {
  strong: string[];
  moderate: string[];
  weak: string[];
}

export type PathwayKind = "five_ya" | "state_integrated" | "private" | "new_build" | "unknown";

export interface AssessmentResult {
  pathway: PathwayKind;
  headline: string;
  pathwayLabel: string | null;
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
    const feature = byId.get(id);
    if (!feature) continue;
    out[feature.fit].push(feature.label);
  }
  return out;
}

/**
 * Scores distinct case-strength categories rather than every checkbox, so
 * overlapping coverage symptoms do not artificially inflate the result.
 */
export function scoreProjectCase(answers: AssessmentAnswers): { score: number; factors: string[] } {
  const categories = new Set<string>();
  const factors: string[] = [];
  const reasonsById = new Map(REASONS.map((reason) => [reason.id, reason]));

  for (const id of answers.reasons) {
    const reason = reasonsById.get(id);
    if (!reason || reason.category === "neutral" || reason.category === "functionality") continue;
    categories.add(reason.category);
    factors.push(reason.label);
  }

  switch (answers.projectStatus) {
    case "replacement":
      categories.add("capital_scope");
      factors.push("The project is a replacement or substantial system upgrade");
      break;
    case "expansion":
      categories.add("capital_scope");
      factors.push("The project adds permanent coverage or functionality");
      break;
    case "no_system":
      categories.add("capital_scope");
      factors.push("The existing school requires a new fixed communications asset");
      break;
    case "alongside_other_works":
      categories.add("coordination");
      factors.push("The work can be coordinated with another ICT/property project");
      break;
    default:
      break;
  }

  // Keep the result concise and avoid duplicate wording.
  const uniqueFactors = [...new Set(factors)].slice(0, 4);
  return { score: categories.size, factors: uniqueFactors };
}

export function caseTierFor(score: number): CaseTier {
  if (score >= SCORE_THRESHOLDS.caseStrongMin) return "strong";
  if (score >= SCORE_THRESHOLDS.caseModerateMin) return "moderate";
  return "weak";
}

function infrastructureSummary(answers: AssessmentAnswers): AssessmentResult["infrastructureSummary"] {
  let reusable: AssessmentResult["infrastructureSummary"]["reusable"] = "unknown";
  let heading = "Existing infrastructure: To be confirmed";

  if (answers.currentSystem === "mostly_usable") {
    reusable = "yes";
    heading = "Existing infrastructure: Likely reusable in part";
  } else if (answers.currentSystem === "partly_reusable") {
    reusable = "partial";
    heading = "Existing infrastructure: Partially reusable";
  } else if (answers.currentSystem === "full_replacement" || answers.currentSystem === "none") {
    reusable = "none";
    heading = "Existing infrastructure: Major upgrade likely";
  }

  let body: string;
  if (answers.cablingStatus === "modern_most") {
    body = "Modern network cabling appears to be available across most areas, which may simplify the upgrade and reduce new cabling work.";
  } else if (answers.cablingStatus === "some_areas") {
    body = "Some network infrastructure may be reusable, with additional fixed cabling likely required in uncovered areas.";
  } else if (answers.cablingStatus === "new_required") {
    body = "A wider fixed cabling upgrade is likely. New permanent communications cabling can form part of the overall capital infrastructure scope.";
  } else {
    body = "A site review can confirm what can be reused and whether new fixed cabling is required. This mainly affects project scope and cost, not whether the communications need is worth reviewing for funding.";
  }

  return { reusable, heading, body };
}

function confirmationsNeeded(pathway: PathwayKind): string[] {
  if (pathway === "five_ya") {
    return [
      "Current 10YPP priorities and available 5YA budget",
      "Ministry ownership / property treatment for the affected areas",
      "Final technical scope and indicative project cost",
    ];
  }
  if (pathway === "state_integrated") {
    return ["The relevant proprietor/property funding pathway", "Final technical scope and indicative project cost"];
  }
  if (pathway === "new_build") {
    return ["Whether the communications requirements are already included in the project specification", "Final technical scope and budget"];
  }
  if (pathway === "unknown") {
    return ["Whether the school is state, state-integrated or private", "The relevant property / capital funding pathway"];
  }
  return ["Available capital / grant funding options", "Final technical scope and indicative project cost"];
}

export function runAssessment(answers: AssessmentAnswers): AssessmentResult {
  let pathway: PathwayKind;
  if (answers.schoolType === "state_integrated") pathway = "state_integrated";
  else if (answers.schoolType === "private") pathway = "private";
  else if (answers.projectStatus === "new_build") pathway = "new_build";
  else if (answers.schoolType === "unsure_school") pathway = "unknown";
  else pathway = "five_ya";

  const components = componentBreakdown(answers.features);
  const hasStrong = components.strong.length > 0;
  const { score, factors } = scoreProjectCase(answers);
  const caseTier = caseTierFor(score);

  const positiveOverride = hasStrong && caseTier === "weak" && pathway === "five_ya";
  let headline: string;
  if (pathway === "state_integrated") headline = RESULT_COPY.stateIntegrated.headline;
  else if (pathway === "private") headline = RESULT_COPY.private.headline;
  else if (pathway === "new_build") headline = RESULT_COPY.newBuild.headline;
  else if (pathway === "unknown") headline = RESULT_COPY.unknownSchool.headline;
  else if (caseTier === "strong" && hasStrong) headline = RESULT_COPY.headline.strong;
  else if (hasStrong) headline = RESULT_COPY.headline.partialStrong;
  else headline = RESULT_COPY.headline.investigate;

  return {
    pathway,
    headline,
    pathwayLabel: pathway === "five_ya" ? RESULT_COPY.pathway5ya : null,
    positiveOverride,
    positiveOverrideMessage: positiveOverride ? RESULT_COPY.positiveOverride : null,
    components,
    hasStrongComponents: hasStrong,
    caseTier,
    caseScore: score,
    supportingFactors: factors,
    infrastructureSummary: infrastructureSummary(answers),
    confirmationsNeeded: confirmationsNeeded(pathway),
  };
}

export function answersToSummary(answers: AssessmentAnswers): Record<string, string> {
  return {
    "School type": labelOf(SCHOOL_TYPES, answers.schoolType) ?? "(not answered)",
    "Project type": labelOf(PROJECT_STATUSES, answers.projectStatus) ?? "(not answered)",
    Reasons: answers.reasons.map((id) => labelOf(REASONS, id)).filter(Boolean).join("; ") || "(none)",
    "Requested outcomes": answers.features
      .map((id) => FEATURES.find((feature) => feature.id === id)?.label)
      .filter(Boolean)
      .join("; ") || "(none)",
    "Current system": labelOf(CURRENT_SYSTEMS, answers.currentSystem) ?? "(not answered)",
    "Network cabling": labelOf(CABLING_STATUS, answers.cablingStatus) ?? "(not answered)",
  };
}
