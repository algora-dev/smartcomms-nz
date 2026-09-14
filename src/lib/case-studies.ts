/**
 * Case-study content model (V8 Phase 12/13).
 *
 * Architecture only - NO public records exist yet. The registry starts
 * empty and is not referenced by any route. When 5-7 verified NZAV
 * projects (plus the Lincoln High flagship, once the exact funding
 * figure is reconciled with NZAV / the source financial statement)
 * arrive, add entries here and publish /case-studies routes.
 *
 * Rules (locked):
 * - Never invent project facts, prices, funding values or finance terms.
 * - Never publish an empty or placeholder case-study page.
 * - The Lincoln High funding value must not be published until the
 *   $98k verbal figure vs the $108,492 "MOE 5YA Bell/PA Upgrade" capital
 *   commitment figure are reconciled and confirmed with NZAV, including
 *   what the figure represents (funding / capital commitment / receipt /
 *   total contract / other).
 */

export type CaseStudySector = "school" | "commercial";

export type CaseStudyTags =
  | "new-build"
  | "retrofit"
  | "full-ip"
  | "hybrid"
  | "funded"
  | "self-funded"
  | "finance-lease";

export interface CaseStudyFunding {
  programme: string; // e.g. "Ministry 5YA (10YPP project)"
  amount?: number; // publish only when verified + confirmed
  amountDescription?: string; // what the figure represents, exactly
  sourceUrl?: string; // public financial statement / record URL
}

export interface CaseStudy {
  slug: string;
  sector: CaseStudySector;
  schoolName?: string; // school projects
  clientName?: string; // commercial projects
  location: string;
  year: number;
  installer: string; // e.g. NZAV
  itPartner?: string;
  systemBrand?: string;
  systemArchitecture: "full-ip" | "hybrid" | "traditional";
  zonesOrEndpoints?: number;
  classrooms?: number;
  outdoorAreas?: number;
  halls?: number;
  originalProblem: string;
  existingInfrastructureReused?: string;
  solution: string;
  keyFeatures: string[];
  projectValue?: number; // publish only when confirmed publishable
  funding?: CaseStudyFunding;
  projectOutcome: string;
  images: string[]; // workspace-relative public paths
  quote?: { text: string; attribution: string };
  sources?: { label: string; url: string }[];
  reviewedDate: string; // ISO - from verified review, not deploy date
}

/**
 * Empty until real verified project data arrives. Future routes:
 * /case-studies (hub, add to nav only when >= 2 strong entries exist)
 * and /case-studies/[slug].
 */
export const CASE_STUDIES: CaseStudy[] = [];

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Tag support exists so filters can be wired without another rebuild. */
export function caseStudiesWithTag(tag: CaseStudyTags): CaseStudy[] {
  // Tags are derived per entry once real data exists (see README).
  return CASE_STUDIES.filter((c) => tagOf(c) === tag);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function tagOf(_c: CaseStudy): CaseStudyTags | undefined {
  return undefined; // wired when real entries define their tags
}
