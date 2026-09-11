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

const faqs = [
  {
    q: "How much does an IP paging system cost in New Zealand?",
    a: "It depends mainly on the number of areas covered, whether network cabling already exists, and how much emergency and intercom functionality you need. As a guide, a small existing site with around six rooms starts from roughly $9k ex GST installed, while larger multi-zone systems commonly land between $25k and $45k ex GST. Use the calculator above for a ballpark range based on your own site.",
  },
  {
    q: "What makes a paging system more expensive?",
    a: "The biggest drivers are the number of areas and speakers, whether new network cabling must be run to an existing building, large indoor or outdoor spaces that need multiple speakers, two-way intercom requirements, video entry intercoms, fire or lockdown interfaces, and difficult site access for cabling.",
  },
  {
    q: "Is network cabling included?",
    a: "It depends on the scenario. In a new build, cabling to device locations is usually part of the wider building works. On an existing site with spare network points near each area, only short patch leads are needed. On an existing site without nearby points, new cabling must be run, which increases the installed cost by roughly 25% and is the hardest thing to estimate without a site visit.",
  },
  {
    q: "Is this a formal quote?",
    a: "No. This calculator gives an indicative ballpark based on standard assumptions and typical installed pricing. Final pricing depends on the site, the completed design and installation conditions. Request an accurate quote and one of our trusted installation partners can review your site and provide a proper project quote.",
  },
];

export default function PricingToolPage() {
  const examples = presetSummaries();
  const reviewed = new Date().toLocaleDateString("en-NZ", { month: "long", year: "numeric" });

  return (
    <div>
      <div className="sc-container py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--sc-navy)] sm:text-4xl">
            Ballpark system cost calculator
          </h1>
          <p className="mt-3 text-[var(--sc-slate)]">
            Answer three quick questions and get an indicative installed price range for an IP paging,
            PA, bell and intercom system. No technical knowledge needed.
          </p>
        </div>
        <div className="mt-10">
          <PricingTool />
        </div>
      </div>

      {/* server-rendered crawlable pricing section */}
      <section className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--sc-navy)]">Typical installed system costs in New Zealand</h2>
          <p className="mt-3 text-sm text-[var(--sc-slate)]">
            The main cost drivers are the number of areas to cover, the speakers each area needs, whether
            network cabling already exists, and how much emergency and intercom functionality you want.
            Every system also includes a central platform (paging station, server, software, programming
            and commissioning) at {formatNZD(pricingConfig.headendPrice)} ex GST. All figures below are
            indicative only and use the same pricing data as the calculator above.
          </p>
          <div className="mt-6 grid gap-4">
            {examples.map((e) => (
              <div key={e.title} className="rounded-xl border border-[var(--sc-border)] bg-white p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-[var(--sc-navy)]">{e.title}</h3>
                  <div className="font-bold text-[var(--sc-teal)]">{e.range}</div>
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
            Indicative only, ex GST. Last reviewed {reviewed}.{" "}
            <Link href="#top" className="font-medium text-[var(--sc-navy)] underline decoration-[var(--sc-teal)] underline-offset-2">
              Try the calculator
            </Link>{" "}
            for your own configuration.
          </p>
        </div>
      </section>

      {/* FAQs */}
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
