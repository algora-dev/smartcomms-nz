// Representative example configurations for the crawlable pricing section.
// Numbers are COMPUTED from the same config as the calculator — never duplicated as literals.

import type { CalculatorState } from "./types";
import { calculateEstimate } from "./calculate";
import { formatNZD } from "./config";

export function defaultState(): CalculatorState {
  return {
    tier: "unsure",
    areas: {
      standardIndoor: 10,
      largeIndoor: 0,
      outdoor: 0,
      largeOutdoor: 0,
      entry: 0,
    },
    speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
    featurePackage: "essential",
    fineTune: {
      twoWayMode: "package",
      twoWayQty: 0,
      entryIntercom: "voice",
      additionalControlStations: 0,
      monitoring: false,
    },
  };
}

export interface Preset {
  id: string;
  title: string;
  blurb: string;
  state: CalculatorState;
}

export const presets: Preset[] = [
  {
    id: "small-site",
    title: "Small site",
    blurb: "A small school, office or care facility with a handful of rooms and one entrance.",
    state: {
      tier: "B",
      areas: { standardIndoor: 6, largeIndoor: 0, outdoor: 0, largeOutdoor: 0, entry: 0 },
      speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
      featurePackage: "essential",
      fineTune: { twoWayMode: "package", twoWayQty: 0, entryIntercom: "voice", additionalControlStations: 0, monitoring: false },
    },
  },
  {
    id: "medium-site",
    title: "Medium multi-zone site",
    blurb: "A medium multi-zone site: teaching or office rooms, a hall, an outdoor area and one gated entry.",
    state: {
      tier: "C",
      areas: { standardIndoor: 14, largeIndoor: 1, outdoor: 1, largeOutdoor: 0, entry: 1 },
      speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
      featurePackage: "safety",
      fineTune: { twoWayMode: "package", twoWayQty: 0, entryIntercom: "voice", additionalControlStations: 0, monitoring: false },
    },
  },
  {
    id: "large-site",
    title: "Larger site",
    blurb: "A larger school or campus: many rooms, a gymnasium, outdoor areas, a sports field and video intercom entries.",
    state: {
      tier: "B",
      areas: { standardIndoor: 24, largeIndoor: 1, outdoor: 2, largeOutdoor: 1, entry: 2 },
      speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
      featurePackage: "interactive",
      fineTune: { twoWayMode: "package", twoWayQty: 0, entryIntercom: "video", additionalControlStations: 1, monitoring: false },
    },
  },
];

export interface PresetSummary {
  title: string;
  blurb: string;
  range: string;
  detailLines: string[];
}

export function presetSummaries(): PresetSummary[] {
  return presets.map((p) => {
    const r = calculateEstimate(p.state);
    const a = p.state.areas;
    const detail: string[] = [];
    if (a.standardIndoor) detail.push(`${a.standardIndoor} indoor rooms`);
    if (a.largeIndoor) detail.push(`${a.largeIndoor} large indoor space${a.largeIndoor > 1 ? "s" : ""}`);
    if (a.outdoor) detail.push(`${a.outdoor} outdoor area${a.outdoor > 1 ? "s" : ""}`);
    if (a.largeOutdoor) detail.push(`${a.largeOutdoor} sports / large outdoor area${a.largeOutdoor > 1 ? "s" : ""}`);
    if (a.entry) detail.push(`${a.entry} entr${a.entry > 1 ? "ies" : "y"} with ${p.state.fineTune.entryIntercom} intercom`);
    const tierLabel =
      p.state.tier === "A" ? "new build" : p.state.tier === "B" ? "existing site, cabling available" : "existing site, new cabling required";
    detail.push(tierLabel);
    return {
      title: p.title,
      blurb: p.blurb,
      range: `${formatNZD(r.low)} – ${formatNZD(r.high)} ex GST`,
      detailLines: detail,
    };
  });
}
