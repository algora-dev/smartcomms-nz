/**
 * NZ School Communications Funding Check - V2 configuration.
 *
 * V2 is intentionally short and outcome-focused. The public tool asks only
 * what is needed to identify a plausible funding pathway and a useful next
 * step. Detailed equipment/accounting questions belong in the follow-up review.
 */

export type FitTier = "strong" | "moderate" | "weak";
export type CaseTier = "strong" | "moderate" | "weak";

export const SCORE_THRESHOLDS = {
  caseStrongMin: 2,
  caseModerateMin: 1,
} as const;

export interface OptionDef {
  id: string;
  label: string;
  tooltip?: string;
}

/** Screen 1A - official NZ school type, with plain-English wording. */
export const SCHOOL_TYPES: OptionDef[] = [
  { id: "state", label: "State school (public school)" },
  {
    id: "state_integrated",
    label: "State-integrated school",
    tooltip:
      "A government-funded school where the land/buildings are generally owned by another organisation such as a church or trust.",
  },
  { id: "private", label: "Private / independent school" },
  { id: "unsure_school", label: "Not sure" },
];

/** Screen 1B - project stage/type. */
export const PROJECT_STATUSES: OptionDef[] = [
  { id: "replacement", label: "Replace or substantially upgrade an existing system" },
  { id: "expansion", label: "Add coverage or features to an existing system" },
  { id: "no_system", label: "Install a system at an existing school where none is suitable now" },
  { id: "alongside_other_works", label: "Include it while other ICT, cabling or refurbishment work is happening" },
  { id: "new_build", label: "New school / major new building project" },
  { id: "maintenance_only", label: "Repair or maintenance only" },
  { id: "unsure_project", label: "Not sure" },
];

/**
 * Screen 2 - reasons, deliberately collapsed into six meaningful categories.
 * category is used by the rules engine so overlapping answers do not inflate
 * the result.
 */
export const REASONS: (OptionDef & {
  category: "asset" | "coverage" | "safety" | "expansion" | "coordination" | "functionality" | "neutral";
})[] = [
  {
    id: "old_or_failing",
    label: "The current system is old, unreliable or failing",
    category: "asset",
  },
  {
    id: "coverage_gaps",
    label: "Some areas do not receive clear or reliable announcements",
    category: "coverage",
  },
  {
    id: "emergency_gap",
    label: "Emergency / lockdown communication needs improvement",
    category: "safety",
  },
  {
    id: "site_changed",
    label: "The school has expanded or needs additional coverage",
    category: "expansion",
  },
  {
    id: "other_works",
    label: "Other cabling, ICT or refurbishment work is already planned",
    category: "coordination",
  },
  {
    id: "new_functionality",
    label: "We mainly want improved or additional functionality",
    category: "functionality",
  },
  { id: "unsure_reason", label: "Not sure", category: "neutral" },
];

/** Screen 3 - user-facing outcomes. All are fixed/integral communication-system outcomes. */
export interface FeatureDef {
  id: string;
  label: string;
  description: string;
  fit: FitTier;
  note?: string;
}

export const FEATURES: FeatureDef[] = [
  {
    id: "paging_announcements",
    label: "Paging & announcements",
    description: "School-wide or zoned spoken announcements through fixed speakers.",
    fit: "strong",
  },
  {
    id: "bells_scheduled",
    label: "Bells & scheduled messages",
    description: "Class-change bells, tones and automated scheduled announcements.",
    fit: "strong",
  },
  {
    id: "emergency_lockdown",
    label: "Emergency & lockdown communication",
    description: "Live or prerecorded safety and emergency messages across the school.",
    fit: "strong",
  },
  {
    id: "site_coverage",
    label: "Indoor & outdoor site coverage",
    description: "Coverage for classrooms, offices, halls, gyms, detached buildings and outdoor areas.",
    fit: "strong",
  },
  {
    id: "intercom_callpoints",
    label: "Two-way intercom / call points",
    description: "Permanently installed intercom points for communication between locations.",
    fit: "strong",
    note: "Strong fit where the intercom is permanently installed and integral to the wider communications system.",
  },
  {
    id: "fixed_infrastructure",
    label: "Fixed cabling & communications infrastructure",
    description: "Permanent network/data cabling, outlets and fixed infrastructure required for the system.",
    fit: "strong",
  },
];

/** Screen 4A - current system at a useful, non-technical level. */
export const CURRENT_SYSTEMS: OptionDef[] = [
  { id: "mostly_usable", label: "An existing system is mostly usable" },
  { id: "partly_reusable", label: "Some existing parts may be reusable" },
  { id: "full_replacement", label: "The existing system likely needs full replacement" },
  { id: "none", label: "There is no current system" },
  { id: "unsure_system", label: "Not sure" },
];

/** Screen 4B - network readiness. */
export const CABLING_STATUS: OptionDef[] = [
  { id: "modern_most", label: "Modern network cabling is available across most areas" },
  { id: "some_areas", label: "Network cabling exists in some areas" },
  { id: "new_required", label: "Little/no suitable cabling exists, so new cabling is likely needed" },
  { id: "unsure_cabling", label: "Not sure" },
];

export const CABLING_TOOLTIP =
  "Network cabling means Ethernet/data cabling such as Cat5e or Cat6 used by modern IP systems. If you are unsure, choose 'Not sure'.";

export const DISCLAIMER =
  "This is an indicative funding check based on publicly available Ministry guidance and the information supplied. It does not determine formal eligibility or guarantee funding. Final funding depends on the school's property circumstances, priorities, available budget and the relevant Ministry/property approval process.";

export const SUPPORTING_ITEM_NOTE =
  "Some supporting items such as movable IT hardware, software/licensing, training or ongoing support may need separate budget treatment.";

export const RESULT_COPY = {
  headline: {
    strong: "Strong potential funding opportunity",
    partialStrong: "Parts of your project show strong funding potential",
    investigate: "A funding pathway appears worth investigating",
  } as const,
  pathway5ya: "Ministry 5YA capital funding through your 10 Year Property Plan (10YPP)",
  pathway5yaBody:
    "Based on your answers, the fixed communications parts of this project appear consistent with the types of capital infrastructure worth putting through the school's 5YA / 10YPP property process.",
  stateIntegrated: {
    headline: "Potential property-funding opportunity",
    heading: "Different property-funding pathway identified",
    body: "State-integrated schools use different property-funding arrangements from ordinary state schools. Fixed communications work may still be worth reviewing through the proprietor / relevant property-funding pathway.",
    cta: "Request a funding pathway review",
  },
  private: {
    headline: "Project funding options worth exploring",
    heading: "Standard 5YA funding does not apply",
    body: "The project may still be a strong capital upgrade, but it will need to use the school's own capital budget or another grant/funding route rather than the standard state-school 5YA pathway.",
    cta: "Explore project and funding options",
  },
  newBuild: {
    headline: "Strong capital-project opportunity",
    heading: "New Build / Capital Project Pathway",
    body: "For a new state-school or major new-building project, the communications system is better addressed inside the wider project design and specification rather than treated as a normal existing-school 5YA upgrade.",
    cta: "Get the communications scope reviewed",
  },
  unknownSchool: {
    headline: "A funding pathway may be available",
    heading: "School type needs confirming",
    body: "The fixed communications scope is worth reviewing. If this is a state school, 5YA / 10YPP may be the relevant pathway. If it is state-integrated or private, a different property or capital funding route will apply.",
    cta: "Request a funding pathway review",
  },
  positiveOverride:
    "We found fixed communications elements with a strong potential funding fit. The overall case may simply need better supporting evidence before it is put forward.",
  ctaPrimary: "Get a Funding-Ready Project Review",
  ctaPrimaryBody:
    "We can review the existing system, confirm the likely scope, identify the strongest funding components and prepare an indicative budget and technical summary for discussion with the school's Property Advisor / 10YPP consultant.",
  ctaSecondary: "Get an Indicative System Quote",
} as const;
