/**
 * Central content-metadata registry (V7).
 *
 * Single source of truth for published/reviewed dates so visible "last
 * reviewed" text, Article dateModified and sitemap lastModified cannot drift.
 * Dates change only when content was substantively reviewed or updated,
 * never merely because a deployment happened.
 */

export interface ContentMeta {
  published: string; // ISO date
  reviewed: string; // ISO date, only bumped on substantive review
}

export const CONTENT_META: Record<string, ContentMeta> = {
  "/": { published: "2026-09-05", reviewed: "2026-09-13" },
  "/schools": { published: "2026-09-11", reviewed: "2026-09-13" },
  "/systems": { published: "2026-09-11", reviewed: "2026-09-13" },
  "/systems/ip-paging-pa": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/systems/school-bell-announcements": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/systems/emergency-lockdown": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/systems/ip-intercom": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/systems/traditional-vs-ip": { published: "2026-09-11", reviewed: "2026-09-13" },
  "/guides": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/guides/nz-school-pa-paging-requirements": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/guides/ip-paging-network-readiness": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/guides/school-pa-specification-checklist": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/pricing": { published: "2026-09-11", reviewed: "2026-09-11" },
  "/pricing-tool": { published: "2026-09-11", reviewed: "2026-09-11" },
  "/funding": { published: "2026-09-11", reviewed: "2026-09-11" },
  "/tools": { published: "2026-09-11", reviewed: "2026-09-11" },
  "/tools/funding-check": { published: "2026-09-11", reviewed: "2026-09-13" },
  "/compare": { published: "2026-09-12", reviewed: "2026-09-12" },
  "/about": { published: "2026-09-05", reviewed: "2026-09-05" },
  "/about/methodology": { published: "2026-09-05", reviewed: "2026-09-05" },
  "/about/disclosure": { published: "2026-09-05", reviewed: "2026-09-05" },
  "/about/editorial-policy": { published: "2026-09-05", reviewed: "2026-09-05" },
  "/privacy": { published: "2026-09-05", reviewed: "2026-09-05" },
  "/contact": { published: "2026-09-05", reviewed: "2026-09-05" },
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-09-13" -> "13 September 2026" */
export function formatContentDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Human label for the visible "Last reviewed" line on a page. */
export function reviewedLabel(path: string): string {
  const meta = CONTENT_META[path];
  return meta ? formatContentDate(meta.reviewed) : "";
}

/** ISO reviewed date for Article dateModified / sitemap lastModified. */
export function reviewedDate(path: string): string {
  return CONTENT_META[path]?.reviewed ?? "2026-09-11";
}
