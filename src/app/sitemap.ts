import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const UPDATED = "2026-09-11";

export const routes: { path: string; priority: number; updated?: string }[] = [
  { path: "/", priority: 1 },
  { path: "/schools", priority: 0.98 },
  { path: "/systems", priority: 0.9 },
  { path: "/systems/ip-paging-pa", priority: 0.9, updated: "2026-09-12" },
  { path: "/systems/school-bell-announcements", priority: 0.9, updated: "2026-09-12" },
  { path: "/systems/emergency-lockdown", priority: 0.85, updated: "2026-09-12" },
  { path: "/systems/ip-intercom", priority: 0.8, updated: "2026-09-12" },
  { path: "/systems/traditional-vs-ip", priority: 0.8 },
  { path: "/guides", priority: 0.8, updated: "2026-09-12" },
  { path: "/guides/nz-school-pa-paging-requirements", priority: 0.9, updated: "2026-09-12" },
  { path: "/guides/ip-paging-network-readiness", priority: 0.85, updated: "2026-09-12" },
  { path: "/guides/school-pa-specification-checklist", priority: 0.9, updated: "2026-09-12" },
  { path: "/pricing", priority: 0.95 },
  { path: "/pricing-tool", priority: 0.95 },
  { path: "/funding", priority: 0.95 },
  { path: "/tools", priority: 0.8 },
  { path: "/tools/funding-check", priority: 0.95 },
  { path: "/compare", priority: 0.9, updated: "2026-09-12" },
  { path: "/schools", priority: 0.98, updated: "2026-09-12" },
  { path: "/funding", priority: 0.95, updated: "2026-09-12" },
  { path: "/pricing", priority: 0.95, updated: "2026-09-12" },
  { path: "/about", priority: 0.5 },
  { path: "/about/methodology", priority: 0.4 },
  { path: "/about/disclosure", priority: 0.4 },
  { path: "/about/editorial-policy", priority: 0.4 },
  { path: "/privacy", priority: 0.3 },
  { path: "/contact", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: new Date(route.updated ?? UPDATED),
    priority: route.priority,
  }));
}
