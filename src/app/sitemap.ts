import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { reviewedDate } from "@/lib/content-meta";

const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/schools", priority: 0.98 },
  { path: "/systems", priority: 0.9 },
  { path: "/systems/ip-paging-pa", priority: 0.9 },
  { path: "/systems/school-bell-announcements", priority: 0.9 },
  { path: "/systems/emergency-lockdown", priority: 0.85 },
  { path: "/systems/ip-intercom", priority: 0.8 },
  { path: "/systems/traditional-vs-ip", priority: 0.8 },
  { path: "/guides", priority: 0.8 },
  { path: "/guides/nz-school-pa-paging-requirements", priority: 0.9 },
  { path: "/guides/ip-paging-network-readiness", priority: 0.85 },
  { path: "/guides/school-pa-specification-checklist", priority: 0.9 },
  { path: "/pricing", priority: 0.95 },
  { path: "/pricing-tool", priority: 0.95 },
  { path: "/funding", priority: 0.95 },
  { path: "/tools", priority: 0.8 },
  { path: "/tools/funding-check", priority: 0.95 },
  { path: "/financing", priority: 0.9 },
  { path: "/tools/finance-check", priority: 0.95 },
  { path: "/compare", priority: 0.9 },
  { path: "/compare/schools", priority: 0.9 },
  { path: "/industries/aged-care-retirement-villages", priority: 0.9 },
  { path: "/about", priority: 0.5 },
  { path: "/about/methodology", priority: 0.4 },
  { path: "/about/disclosure", priority: 0.4 },
  { path: "/about/editorial-policy", priority: 0.4 },
  { path: "/privacy", priority: 0.3 },
  { path: "/contact", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Each route appears exactly once; lastModified comes from the central
  // content-metadata registry so it stays truthful per page.
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    // Registry-missing routes now yield an empty date (detected in dev via
    // console.warn) rather than a fabricated one; omit lastModified then.
    lastModified: reviewedDate(route.path) || undefined,
    priority: route.priority,
  }));
}
