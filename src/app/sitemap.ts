import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Extend this registry as pages ship — single source of truth for sitemap + nav
export const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/systems", priority: 0.9 },
  { path: "/systems/traditional-vs-ip", priority: 0.8 },
  { path: "/guides", priority: 0.9 },
  { path: "/pricing", priority: 0.9 },
  { path: "/funding", priority: 0.8 },
  { path: "/tools", priority: 0.9 },
  { path: "/tools/system-planner", priority: 0.9 },
  { path: "/tools/funding-check", priority: 0.9 },
  { path: "/compare", priority: 0.8 },
  { path: "/about", priority: 0.5 },
  { path: "/about/methodology", priority: 0.4 },
  { path: "/about/disclosure", priority: 0.4 },
  { path: "/about/editorial-policy", priority: 0.4 },
  { path: "/contact", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: new Date(),
    priority: r.priority,
  }));
}
