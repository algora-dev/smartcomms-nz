import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * SmartComms NZ /compare hub — index of the industry-by-industry system
 * comparison guides. Each card links to a full comparison page.
 */
const PAGE_TITLE = "Compare PA, Paging & Intercom Systems by Industry";
const PAGE_DESCRIPTION =
  "Side-by-side comparisons of PA, paging, bell and intercom systems sold in New Zealand, matched to the site they serve — schools, aged care and more.";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/compare",
});

const pageUrl = `${site.url.replace(/\/$/, "")}/compare`;

const COMPARISONS = [
  {
    href: "/compare/schools",
    tag: "Schools",
    title: "School PA, Paging, Bell & Intercom Systems",
    desc: "SPON, FrontRow, Algo, Bosch PROSPERO, ITC, Axis and TOA compared for NZ schools: features, NZ supply and support, and trade-offs.",
    points: ["7 platforms side by side", "Published NZ school projects", "Funding and planning context"],
  },
  {
    href: "/industries/aged-care-retirement-villages",
    tag: "Aged care & retirement villages",
    title: "Aged Care & Retirement Village PA, Paging & Intercom Systems",
    desc: "PA, IP paging, announcement and intercom systems for NZ rest homes and retirement villages, including visitor video, existing-PA reuse and indicative pricing.",
    points: ["Systems for care environments", "Existing-PA reuse options", "Indicative pricing and finance"],
  },
];

export default function CompareHubPage() {
  return (
    <div>
      <section className="sc-container max-w-[1150px] pb-6 pt-10">
        <div className="rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">
            System comparisons
          </p>
          <h1 className="mt-3 text-[2.1rem] font-bold leading-[1.1] tracking-tight text-[var(--sc-blue-900)] sm:text-[3rem]">
            Compare Systems for Your Type of Site
          </h1>
          <p className="mt-5 max-w-3xl text-[1.125rem] leading-relaxed text-[var(--sc-slate)] sm:text-lg">
            The right paging, PA or intercom system depends on where it lives. We compare the systems
            sold and supported in New Zealand for the jobs they actually suit — schools, aged care
            facilities and other site types — so you can shortlist with confidence.
          </p>
        </div>
      </section>

      <section className="sc-container max-w-[1150px] pb-16">
        <ul className="grid gap-6 md:grid-cols-2">
          {COMPARISONS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-[var(--sc-border)] bg-white p-7 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--sc-teal)] hover:shadow-[0_10px_30px_rgba(44,177,165,0.15)] sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">
                  {item.tag}
                </p>
                <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-[var(--sc-blue-900)] transition-colors duration-200 group-hover:text-[var(--sc-teal)]">
                  {item.title}
                </h2>
                <p className="mt-3 flex-1 leading-relaxed text-[var(--sc-slate)]">{item.desc}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-[var(--sc-slate)]">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sc-teal)]" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sc-blue-700)] transition-all duration-200 group-hover:gap-2.5 group-hover:text-[var(--sc-teal)]">
                  View comparison <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: "SmartComms NZ", url: site.url },
              { name: "Compare systems", url: pageUrl },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: PAGE_TITLE,
              itemListElement: COMPARISONS.map((item, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: item.title,
                url: `${site.url.replace(/\/$/, "")}${item.href}`,
              })),
            },
          ]),
        }}
      />
    </div>
  );
}
