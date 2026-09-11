// Pricing types — SmartComms NZ ballpark pricing tool
// Single source of truth shapes; all values live in config.ts

export type Tier = "A" | "B" | "C";
export type InstallationType = Tier | "unsure";

export type FeaturePackage = "essential" | "safety" | "interactive";

export type AreaKey = "standardIndoor" | "largeIndoor" | "outdoor" | "largeOutdoor";

export type EntryIntercomType = "voice" | "video";

export interface AreaQuantities {
  standardIndoor: number;
  largeIndoor: number;
  outdoor: number;
  largeOutdoor: number;
  entry: number; // entry / intercom points
}

/** Optional per-area speaker count overrides (fine-tune). null = default */
export interface SpeakerOverrides {
  largeIndoor: number | null;
  outdoor: number | null;
  largeOutdoor: number | null;
}

export interface FineTune {
  twoWayMode: "package" | "none" | "some" | "all"; // package = use package default
  twoWayQty: number;
  entryIntercom: EntryIntercomType;
  additionalControlStations: number;
  monitoring: boolean;
}

export interface CalculatorState {
  tier: InstallationType;
  areas: AreaQuantities;
  speakers: SpeakerOverrides;
  featurePackage: FeaturePackage;
  fineTune: FineTune;
}

export interface BreakdownLine {
  label: string;
  detail?: string;
  amount: number;
}

export interface EstimateResult {
  low: number;
  high: number;
  /** tier the headline numbers are based on ("unsure" = B low / C high) */
  basis: InstallationType;
  endpoints: number;
  overThreshold: boolean;
  monitoringAnnual: number | null; // null = not selected
  monitoringIncludedMonths: number;
  breakdown: BreakdownLine[];
  /** resolved config used for the numbers (for tests / PDF) */
  twoWayRooms: number;
  fireInterface: boolean;
}
