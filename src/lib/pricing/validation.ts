// Boundary validation for calculator state (SC-02).
// All untrusted CalculatorState input (URL cfg links, logger requests, future
// API assessments) must pass through parseCalculatorState. Produces a fresh
// allowlisted CalculatorState — never a cast of the untrusted object.

import type {
  AreaQuantities,
  CalculatorState,
  EntryIntercomType,
  FeaturePackage,
  InstallationType,
  SpeakerOverrides,
} from "./types";
import { defaultState } from "./presets";

export const MAX_AREA_COUNT = 99; // matches the UI stepper maximum
export const MAX_CONTROL_STATIONS = 5; // matches the UI stepper maximum
export const MAX_SPEAKER_OVERRIDE = 20;
export const MAX_TWO_WAY_QTY = 99;

export type ParsedState =
  | { ok: true; state: CalculatorState; appliedDefaults: string[] }
  | { ok: false; error: string };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Non-negative finite integer within [0, max]. */
function count(v: unknown, max: number, label: string): number | null {
  const n = v;
  if (n === undefined) return null; // absent → caller decides (documented default)
  if (n === null || typeof n !== "number" || !Number.isInteger(n) || n < 0 || n > max) return -1;
  return n;
}

const TIERS = new Set<InstallationType>(["A", "B", "C", "unsure"]);
const PACKAGES = new Set<FeaturePackage>(["essential", "safety", "interactive"]);
const TWO_WAY_MODES = new Set(["package", "none", "some", "all"]);
const ENTRY_TYPES = new Set<EntryIntercomType>(["voice", "video"]);

/**
 * Parse untrusted input into a validated CalculatorState.
 * - Missing optional fields fall back to documented defaults (recorded in appliedDefaults).
 * - Unknown fields are dropped, never stored.
 * - Out-of-range / wrong-type values invalidate the whole input.
 */
export function parseCalculatorState(input: unknown): ParsedState {
  if (!isObject(input)) return { ok: false, error: "not an object" };
  const appliedDefaults: string[] = [];

  const tier = input.tier;
  if (typeof tier !== "string" || !TIERS.has(tier as InstallationType)) {
    return { ok: false, error: "invalid tier" };
  }

  const areasIn = isObject(input.areas) ? input.areas : null;
  if (!areasIn) return { ok: false, error: "missing areas" };
  const areas: AreaQuantities = {
    standardIndoor: 0,
    largeIndoor: 0,
    outdoor: 0,
    largeOutdoor: 0,
    entry: 0,
  };
  for (const key of Object.keys(areas) as (keyof AreaQuantities)[]) {
    const n = count(areasIn[key], MAX_AREA_COUNT, key);
    if (n === null) appliedDefaults.push(`areas.${key}`);
    else if (n === -1) return { ok: false, error: `invalid areas.${key}` };
    else areas[key] = n;
  }

  const speakersIn = isObject(input.speakers) ? input.speakers : {};
  const speakers: SpeakerOverrides = { largeIndoor: null, outdoor: null, largeOutdoor: null };
  for (const key of Object.keys(speakers) as (keyof SpeakerOverrides)[]) {
    const v = speakersIn[key];
    if (v === undefined || v === null) {
      appliedDefaults.push(`speakers.${key}`); // null = approved default, not zero
      continue;
    }
    if (typeof v !== "number" || !Number.isInteger(v) || v < 1 || v > MAX_SPEAKER_OVERRIDE) {
      return { ok: false, error: `invalid speakers.${key}` };
    }
    speakers[key] = v;
  }

  const pkg = input.featurePackage;
  if (typeof pkg !== "string" || !PACKAGES.has(pkg as FeaturePackage)) {
    return { ok: false, error: "invalid featurePackage" };
  }

  const ftIn = isObject(input.fineTune) ? input.fineTune : {};
  const twoWayMode = ftIn.twoWayMode;
  if (twoWayMode === undefined) {
    appliedDefaults.push("fineTune.twoWayMode"); // documented package default
  } else if (typeof twoWayMode !== "string" || !TWO_WAY_MODES.has(twoWayMode)) {
    return { ok: false, error: "invalid fineTune.twoWayMode" };
  }
  let twoWayQty = 0;
  {
    const n = count(ftIn.twoWayQty, MAX_TWO_WAY_QTY, "twoWayQty");
    if (n === null) appliedDefaults.push("fineTune.twoWayQty");
    else if (n === -1) return { ok: false, error: "invalid fineTune.twoWayQty" };
    else twoWayQty = n;
  }
  const entryIntercom = ftIn.entryIntercom;
  if (entryIntercom === undefined) appliedDefaults.push("fineTune.entryIntercom");
  else if (typeof entryIntercom !== "string" || !ENTRY_TYPES.has(entryIntercom as EntryIntercomType)) {
    return { ok: false, error: "invalid fineTune.entryIntercom" };
  }
  let stations = 0;
  {
    const n = count(ftIn.additionalControlStations, MAX_CONTROL_STATIONS, "stations");
    if (n === null) appliedDefaults.push("fineTune.additionalControlStations");
    else if (n === -1) return { ok: false, error: "invalid fineTune.additionalControlStations" };
    else stations = n;
  }
  const monitoring = ftIn.monitoring;
  if (monitoring === undefined) appliedDefaults.push("fineTune.monitoring");
  else if (typeof monitoring !== "boolean") {
    return { ok: false, error: "invalid fineTune.monitoring" };
  }

  // Two-way buttons cannot exceed the standard indoor rooms they serve.
  if (twoWayMode === "some" && twoWayQty > areas.standardIndoor) {
    return { ok: false, error: "twoWayQty exceeds standardIndoor rooms" };
  }

  const state: CalculatorState = {
    tier: tier as InstallationType,
    areas,
    speakers,
    featurePackage: pkg as FeaturePackage,
    fineTune: {
      twoWayMode: (twoWayMode === undefined
        ? "package"
        : twoWayMode) as CalculatorState["fineTune"]["twoWayMode"],
      twoWayQty,
      entryIntercom: (entryIntercom === undefined
        ? defaultState().fineTune.entryIntercom
        : entryIntercom) as EntryIntercomType,
      additionalControlStations: stations,
      monitoring: monitoring === undefined ? false : monitoring,
    },
  };
  return { ok: true, state, appliedDefaults };
}

/** A completed run must specify actual scope, not just the always-present platform. */
export function hasScope(state: CalculatorState): boolean {
  const a = state.areas;
  return (
    a.standardIndoor + a.largeIndoor + a.outdoor + a.largeOutdoor + a.entry > 0 ||
    state.fineTune.additionalControlStations > 0
  );
}
