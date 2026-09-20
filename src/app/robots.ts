import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Ordinary search crawling preserved; private/API paths excluded in EVERY
      // explicit agent group so an OAI-specific allow cannot bypass them.
      { userAgent: "*", allow: "/", disallow: ["/insights/", "/api/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/insights/", "/api/"] },
      // GPTBot: training-use opt-out (search access above is unaffected).
      { userAgent: "GPTBot", disallow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
