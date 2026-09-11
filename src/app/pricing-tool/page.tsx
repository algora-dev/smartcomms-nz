import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PricingTool } from "@/components/pricing/PricingTool";
import { presetSummaries } from "@/lib/pricing/presets";
import { formatNZD, pricingConfig } from "@/lib/pricing/config";

export const metadata: Metadata = buildMetadata({
  title: "PA & Intercom System Cost Calculator NZ",
  description:
    "Get a ballpark installed price for an IP paging, PA, bell or intercom system in New Zealand in under a minute. Indicative cost ranges for schools, offices and multi-zone sites.",
  path: "/pricing-tool",
});

const exampleSummaries = presetSummaries();
const smallExample = exampleSummaries[0];
const mediumExample = exampleSummaries[1];

const faqs = [
  {
    q: "How much does an IP paging system cost in New Zealand?",
    a: `Installed cost depends mainly on the number of areas, available network cabling and the required emergency or intercom functions. As configuration examples, the current calculator produces ${smallExample.range} for the small-site preset and ${mediumExample.range} for the medium multi-zone preset. These are indicative configurations rather than market averages or formal quotes.`,
  },
  {
    q: "What makes a paging system more expensive?",
    a: "The biggest drivers are the number of areas and speakers, whether new network cabling must be run, large indoor or outdoor spaces that need multiple speakers, two-way intercom requirements, video entry intercoms, emergency interfaces and difficult site access.",
  },
  {
    q: "Is network cabling included?",
    a: "The calculator treats new builds, existing sites with suitable network points and retrofits needing new cabling differently. New-build pricing assumes device cabling is part of the wider construction work, while retrofit-cabling-required pricing includes a 25% uplift on affected installed unit rates.",
  },
  {
    q: "Is this a formal quote?",
    a: "No. The calculator gives an indicative ballpark based on standard assumptions and the pricing configuration last reviewed on 11 September 2026. Final pricing depends on the completed design, site conditions and installation requirements.",
  },
];

export default function PricingToolPage() {
  const examples = exampleSummaries;

  return (
    <div>
      <div id="top" className="sc-container py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--sc-navy)] sm:text-4xl">Ballpark system cost calculator</h1>
          <p className="mt-3 text-[var(--sc-slate)]">
            Answer three quick questions and get an indicative installed price range for an IP paging, PA, bell and intercom system. No technical knowledge needed.
          </p>
          <p className="mt-2 text-xs text-[var(--sc-slate)]">Indicative only, ex GST. Not a formal quote.</p>
        </div>
        <div className="mt-10"><PricingTool /></div>
      </div>

      <section className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--sc-navy)]">Indicative installed system examples in New Zealand</h2>
          <p className="mt-3 text-sm text-[var(--sc-slate)]">
            The main cost drivers are the number of areas to cover, speaker quantities, existing network cabling and the emergency/intercom functionality required. Every example includes the central platform allowance of {formatNZD(pricingConfig.headendPrice)} ex GST. These examples use the same pricing config as the calculator and are not presented as market averages.
          </p>
          <div className="mt-6 grid gap-4">
            {examples.map((e) => (
              <div key={e.title} className="rounded-xl border border-[var(--sc-border)] bg-white p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-[var(--sc-navy)]">{e.title}</h3>
                  <div className="font-bold text-[var(--sc-teal-strong)]">{e.range}</div>
                </div>
                <p className="mt-1 text-sm text-[var(--sc-slate)]">{e.blurb}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {e.detailLines.map((d) => (
                    <li key={d} className="rounded-full bg-[var(--sc-blue-50)] px-3 py-1 text-xs text-[var(--sc-navy)]">{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--sc-slate)]">
            Indicative only, ex GST. Pricing assumptions last reviewed {pricingConfig.reviewedAtLabel}.{" "}
            <Link href="#top" className="font-medium text-[var(--sc-navy)] underline decoration-[var(--sc-teal)] underline-offset-2">Try the calculator</Link> for your own configuration.
          </p>
        </div>
      </section>

      <section className="py-14" id="faqs">
        <div className="sc-container max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--sc-navy)]">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-[var(--sc-border)] bg-white p-5">
                <h3 className="font-semibold text-[var(--sc-charcoal)]">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
