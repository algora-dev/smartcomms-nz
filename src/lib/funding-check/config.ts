/**
 * NZ School Communications Funding Pre-Qualification Tool - configuration.
 *
 * Everything the engine and UI render from lives here: questions, options,
 * scoring weights, thresholds and result copy. Keep this file data-only so the
 * rules engine stays deterministic and every result is traceable to a rule.
 */

export type FitTier = "strong" | "moderate" | "weak";
export type CaseTier = "strong" | "moderate" | "weak";

/** Adjustable scoring thresholds (spec section 4). */
export const SCORE_THRESHOLDS = {
  caseStrongMin: 6,
  caseModerateMin: 3,
} as const;

/** Point values used by the engine (spec section 4). */
export const POINTS = {
  component: { strong: 3, moderate: 2, weak: 1 },
  caseReason: { veryStrong: 3, strong: 2, moderate: 1, weak: 0 },
  routineMaintenanceOnly: -2,
  relatedProject: 1,
  projectType: { replacement: 2, partialOrExpansion: 1 },
} as const;

export interface OptionDef {
  id: string;
  label: string;
  tooltip?: string;
}

/** Screen 1 - school type. Drives the funding pathway branch. */
export const SCHOOL_TYPES: OptionDef[] = [
  { id: "state", label: "State school (public school)" },
  { id: "state_integrated", label: "State-integrated school", tooltip: "A government-funded school where the land/buildings are generally owned by another organisation such as a church or trust." },
  { id: "private", label: "Private / independent school" },
  { id: "unsure_school", label: "Not sure" },
];

/** Screen 2 - project status. */
export const PROJECT_STATUSES: OptionDef[] = [
  { id: "replacement", label: "Complete replacement of an existing system" },
  { id: "partial_upgrade", label: "Partial upgrade of an existing system" },
  { id: "expansion", label: "Adding new areas/features to an existing system" },
  { id: "no_system", label: "Existing school with no suitable current system" },
  { id: "alongside_other_works", label: "Upgrade being completed alongside other ICT/property works" },
  { id: "new_block", label: "New building/block at an existing school" },
  { id: "new_school", label: "Completely new school/site" },
  { id: "maintenance_only", label: "Routine repair/maintenance only" },
  { id: "unsure_project", label: "Not sure" },
];

/** Screen 3 - reasons. Multi-select, each carries a case weight. */
export const REASONS: (OptionDef & { weight: "veryStrong" | "strong" | "moderate" | "weak" })[] = [
  { id: "fails_regularly", label: "Current system regularly fails", weight: "veryStrong" },
  { id: "cannot_hear_classrooms", label: "Some classrooms/buildings cannot hear announcements", weight: "veryStrong" },
  { id: "lockdown_unreliable", label: "Emergency/lockdown messages cannot reliably reach the entire site", weight: "veryStrong" },
  { id: "end_of_life", label: "Existing system is old or end-of-life", weight: "strong" },
  { id: "parts_difficult", label: "Replacement parts/support are difficult to obtain", weight: "strong" },
  { id: "outdoor_gaps", label: "Outdoor areas have inadequate coverage", weight: "strong" },
  { id: "hall_gaps", label: "Hall/gym/large spaces have inadequate coverage", weight: "strong" },
  { id: "detached_gaps", label: "Detached buildings cannot reliably receive announcements", weight: "strong" },
  { id: "intelligibility", label: "Spoken announcements are difficult to understand", weight: "strong" },
  { id: "site_expanded", label: "School/site has expanded since the current system was installed", weight: "strong" },
  { id: "no_site_wide", label: "There is currently no suitable site-wide system", weight: "strong" },
  { id: "related_works_planned", label: "Other network/cabling/property work is already planned", weight: "strong" },
  { id: "extra_functionality", label: "We mainly want additional functionality", weight: "moderate" },
  { id: "newer_tech", label: "We mainly want newer technology", weight: "weak" },
  { id: "routine_only", label: "Existing system only requires routine repair", weight: "weak" },
  { id: "unsure_reason", label: "Not sure", weight: "weak" },
];

/** Screen 4 - current infrastructure. */
export const CURRENT_SYSTEMS: OptionDef[] = [
  { id: "full", label: "Full school-wide system" },
  { id: "partial", label: "Partial system / some areas only" },
  { id: "legacy", label: "Old or legacy system" },
  { id: "several", label: "Several separate systems" },
  { id: "none", label: "No system" },
  { id: "unsure_system", label: "Not sure" },
];

export const CABLING_STATUS: OptionDef[] = [
  { id: "modern_most", label: "Modern network cabling is available across most areas" },
  { id: "some_areas", label: "Network cabling exists in some areas" },
  { id: "little_none", label: "Very little/no suitable network cabling exists" },
  { id: "new_required", label: "New cabling will probably be required throughout" },
  { id: "unsure_cabling", label: "Not sure" },
];

/** Only asked when existing cabling was selected (some_areas / modern_most). */
export const POE_OPTIONS: OptionDef[] = [
  { id: "poe_most", label: "Yes, most areas" },
  { id: "poe_some", label: "Some areas" },
  { id: "poe_no", label: "No" },
  { id: "unsure_poe", label: "Not sure" },
];

export const POE_TOOLTIP =
  "PoE allows compatible devices to receive network connectivity and electrical power through the same Ethernet cable.";

export const CABLING_TOOLTIP =
  "Network cabling means Ethernet/data cabling such as Cat5e or Cat6 used by modern IP equipment.";

export const REUSABLE_ITEMS: OptionDef[] = [
  { id: "indoor_speakers", label: "Indoor speakers" },
  { id: "outdoor_speakers", label: "Outdoor speakers/horns" },
  { id: "speaker_cabling", label: "Speaker cabling" },
  { id: "switches", label: "Network switches" },
  { id: "fibre_links", label: "Fibre/network links between buildings" },
  { id: "racks", label: "Equipment racks" },
  { id: "controllers_amps", label: "Existing controllers/amplifiers" },
  { id: "paging_mic", label: "Paging microphone/control station" },
  { id: "none_reusable", label: "None that we know of" },
  { id: "unsure_reusable", label: "Not sure" },
];

/** Screen 5 - selectable feature cards with pre-set funding classifications. */
export interface FeatureDef {
  id: string;
  label: string;
  description: string;
  fit: FitTier;
  note?: string;
}

export const FEATURES: FeatureDef[] = [
  // Strong
  { id: "indoor_speakers", label: "Indoor paging speakers", description: "Fixed speakers for classrooms, offices and indoor spaces.", fit: "strong" },
  { id: "outdoor_horns", label: "Outdoor speakers / horns", description: "Weather-resistant speakers for fields, courtyards and outdoor areas.", fit: "strong" },
  { id: "bell_system", label: "School bell / class-change system", description: "Scheduled bells, tones or messages.", fit: "strong" },
  { id: "live_announcements", label: "Live school-wide announcements", description: "Allows authorised staff to speak across the site.", fit: "strong" },
  { id: "zoned_announcements", label: "Zoned announcements", description: "Send announcements to selected areas/buildings.", fit: "strong" },
  { id: "emergency_lockdown", label: "Emergency / lockdown announcements", description: "Live or prerecorded safety and emergency messages.", fit: "strong" },
  { id: "hall_gym", label: "Hall / gym coverage", description: "Dedicated coverage for large indoor areas.", fit: "strong" },
  { id: "detached_coverage", label: "Detached-building coverage", description: "Paging/announcements across separate buildings.", fit: "strong" },
  { id: "fixed_cabling", label: "Fixed communications/network cabling", description: "Permanent cabling and outlets required for the system.", fit: "strong" },
  // Moderate
  { id: "intercom_callpoints", label: "Fixed intercom / call points", description: "Permanent points allowing two-way communication.", fit: "moderate" },
  { id: "reception_console", label: "Reception paging console", description: "Desk microphone/controller for administration.", fit: "moderate" },
  { id: "central_controller", label: "Central controller / rack equipment", description: "Hardware controlling the communications system.", fit: "moderate" },
  { id: "integration", label: "Integration with security/emergency/phone systems", description: "Connections between communications and other systems.", fit: "moderate" },
  { id: "network_switches", label: "Network switches / servers", description: "Supporting IT hardware.", fit: "moderate", note: "May require a different furniture/equipment funding treatment." },
  // Weak
  { id: "software_licences", label: "Software / licences", description: "Subscriptions or software required to manage the system.", fit: "weak" },
  { id: "training", label: "Training", description: "Staff system training.", fit: "weak" },
  { id: "support_maintenance", label: "Ongoing support / maintenance", description: "Service agreements and routine support.", fit: "weak" },
];

/** Screen 6 - related work. Multi-select, adds a positive coordination factor. */
export const RELATED_WORKS: OptionDef[] = [
  { id: "cabling_upgrade", label: "Structured cabling upgrade" },
  { id: "network_switch_upgrade", label: "Network/switch upgrade" },
  { id: "classroom_refurb", label: "Classroom refurbishment" },
  { id: "building_refurb", label: "Building refurbishment" },
  { id: "electrical_upgrade", label: "Electrical upgrade" },
  { id: "security_upgrade", label: "Security/safety upgrade" },
  { id: "fire_emergency", label: "Fire/emergency system work" },
  { id: "new_classroom_block", label: "New classroom/block" },
  { id: "major_property", label: "Major property project" },
  { id: "no_other_work", label: "No other work planned" },
  { id: "unsure_related", label: "Not sure" },
];

/** Screen 7 - optional property questions. Never required. */
export const MINISTRY_OWNERSHIP: OptionDef[] = [
  { id: "own_yes", label: "Yes" },
  { id: "own_mostly", label: "Mostly" },
  { id: "own_no", label: "No" },
  { id: "unsure_ownership", label: "Not sure" },
];

export const TEN_YEAR_PLAN: OptionDef[] = [
  { id: "plan_yes", label: "Yes" },
  { id: "plan_no", label: "No" },
  { id: "unsure_plan", label: "Not sure" },
  { id: "plan_unknown_content", label: "I do not know what our 10YPP contains" },
];

export const DISCLAIMER =
  "This tool provides an indicative assessment based on publicly available Ministry guidance and the information supplied. It does not determine formal eligibility or guarantee funding. Funding decisions depend on the school's property circumstances, priorities, available budget and the relevant Ministry/property approval process.";

/** Result copy blocks (spec section 5 + 6). */
export const RESULT_COPY = {
  headline: {
    strong: "Strong potential funding opportunity",
    partialStrong: "Parts of your project show strong funding potential",
    investigate: "A funding pathway appears worth investigating",
  } as const,
  pathway5ya: "Ministry 5YA capital funding through your 10 Year Property Plan (10YPP)",
  stateIntegrated: {
    heading: "Different property-funding pathway identified",
    body: "State-integrated schools use different property-funding arrangements from ordinary state schools. Some capital works may be considered through proprietor/Policy One funding or other funding sources.",
    cta: "Request a funding pathway review",
  },
  private: {
    heading: "Standard 5YA funding does not apply",
    body: "Other capital, charitable, community or fundraising options may still be available.",
    cta: "Explore alternative funding/project options",
  },
  newBuild: {
    heading: "New Build / Capital Project Pathway",
    body: "Rather than treating this as a normal 5YA upgrade, the communications system should ideally be included in the wider Ministry-funded design and project specification.",
    cta: "Get the communications system scoped before design/procurement is finalised",
  },
  positiveOverride:
    "Some parts of your proposed project appear to have a strong potential funding fit, although the overall project case may need stronger supporting evidence.",
  ctaPrimary: "Get a Funding-Ready Project Review",
  ctaPrimaryBody:
    "We can review the existing system, confirm the likely project scope, identify the strongest funding components and prepare an indicative budget and technical summary for discussion with the school's Property Advisor / 10YPP consultant.",
  ctaSecondary: "Get an Indicative System Quote",
} as const;
