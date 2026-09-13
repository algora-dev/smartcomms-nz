import type { Metadata } from "next";
import { site } from "./site";

export function buildMetadata(opts: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  const url = opts.path ? `${site.url}${opts.path}` : site.url;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/scnz-logo-colour.png`,
    description: site.description,
    areaServed: { "@type": "Country", name: "New Zealand" },
    // sameAs is intentionally omitted: no genuine SmartComms social profiles
    // exist yet. Only add sameAs entries for profiles that actually exist.
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  /** Only supply when a named reviewer has visibly reviewed the page. */
  reviewedBy?: {
    name: string;
    role: string;
    organisation: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Organization", name: "SmartComms NZ Editorial Team" },
    publisher: { "@type": "Organization", name: site.name },
    ...(opts.reviewedBy
      ? { reviewedBy: { "@type": "Person", name: opts.reviewedBy.name } }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
