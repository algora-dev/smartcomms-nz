import type { CalculatorState } from "./types";
import { calculateEstimate } from "./calculate";
import { formatNZD } from "./config";

export interface SchoolBand {
  id: string;
  title: string;
  description: string;
  lowState: CalculatorState;
  highState: CalculatorState;
  typicalFeatures: string[];
}

const baseFineTune = {
  twoWayMode: "package" as const,
  twoWayQty: 0,
  entryIntercom: "voice" as const,
  additionalControlStations: 0,
  monitoring: false,
};

export const schoolBands: SchoolBand[] = [
  {
    id: "small-school",
    title: "Small school",
    description: "A smaller primary or similar site with roughly 6–8 teaching/admin rooms and limited shared or outdoor coverage.",
    lowState: {
      tier: "B",
      areas: { standardIndoor: 6, largeIndoor: 0, outdoor: 0, largeOutdoor: 0, entry: 0 },
      speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
      featurePackage: "essential",
      fineTune: baseFineTune,
    },
    highState: {
      tier: "C",
      areas: { standardIndoor: 8, largeIndoor: 1, outdoor: 1, largeOutdoor: 0, entry: 1 },
      speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
      featurePackage: "safety",
      fineTune: baseFineTune,
    },
    typicalFeatures: ["live and zoned paging", "scheduled bells", "indoor coverage", "optional hall/outdoor coverage", "optional emergency interface"],
  },
  {
    id: "medium-school",
    title: "Medium school",
    description: "A medium multi-block school with roughly 12–18 rooms, a hall, outdoor coverage and more comprehensive safety functionality.",
    lowState: {
      tier: "B",
      areas: { standardIndoor: 12, largeIndoor: 1, outdoor: 1, largeOutdoor: 0, entry: 0 },
      speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
      featurePackage: "safety",
      fineTune: baseFineTune,
    },
    highState: {
      tier: "C",
      areas: { standardIndoor: 18, largeIndoor: 1, outdoor: 2, largeOutdoor: 0, entry: 1 },
      speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
      featurePackage: "interactive",
      fineTune: baseFineTune,
    },
    typicalFeatures: ["school-wide and zoned paging", "bells and scheduled messages", "hall and outdoor coverage", "emergency / lockdown interface", "optional two-way room calling"],
  },
  {
    id: "large-school",
    title: "Large school / campus",
    description: "A larger secondary school or campus with 22–30+ rooms, multiple outdoor zones, large spaces, entry intercoms and broader two-way capability.",
    lowState: {
      tier: "B",
      areas: { standardIndoor: 22, largeIndoor: 1, outdoor: 2, largeOutdoor: 1, entry: 1 },
      speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
      featurePackage: "safety",
      fineTune: baseFineTune,
    },
    highState: {
      tier: "C",
      areas: { standardIndoor: 30, largeIndoor: 2, outdoor: 3, largeOutdoor: 1, entry: 2 },
      speakers: { largeIndoor: null, outdoor: null, largeOutdoor: null },
      featurePackage: "interactive",
      fineTune: { ...baseFineTune, entryIntercom: "video", additionalControlStations: 1 },
    },
    typicalFeatures: ["multi-building paging", "bells and scheduled messages", "large indoor/outdoor coverage", "emergency / lockdown interface", "intercom and additional control points"],
  },
];

export function schoolBandSummaries() {
  return schoolBands.map((band) => {
    const low = calculateEstimate(band.lowState);
    const high = calculateEstimate(band.highState);
    return {
      ...band,
      displayRange: `${formatNZD(low.low)} – ${formatNZD(high.high)}${high.overThreshold ? "+" : ""} ex GST`,
      lowValue: low.low,
      highValue: high.high,
      largeSystem: high.overThreshold,
    };
  });
}
