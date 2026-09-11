import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { presetSummaries } from "@/lib/pricing/presets";
import { pricingConfig, formatNZD } from "@/lib/pricing/config";

export const metadata: Metadata = buildMetadata({
  title: "IP Paging, PA & Intercom System Costs NZ",
  description:
    "Indicative installed price ranges for IP paging, PA, bell and intercom systems in New Zealand, plus the main factors that affect project cost.",
  path: "/pricing",
});

const FACTORS = [
  { title: "Areas and endpoints", desc: "More rooms, speakers, horns, intercoms and control points increase equipment and installation cost." },
  { title: "Existing cabling", desc: "A retrofit with suitable network points is usually cheaper than a site that needs new data cabling throughout." },
  { title: "Large indoor and outdoor areas", desc: "Halls, gyms, yards and sports fields usually need multiple speakers or higher-output horns." },
  { title: "Emergency features", desc: "Fire, lockdown and EVAC interfaces add capability and a one-off system cost." },
  { title: "Two-way intercom", desc: "Room call buttons and entry intercom panels add cost based on how many locations need two-way communication." },
  { title: "Site access", desc: "Cable routes, ceiling access, mounting height and project constraints can change final installation labour." },
];

export default function PricingPage() {
  const examples = presetSummaries();

  return (
    <div>
      <div className="sc-container max-w-4xl py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">New Zealand pricing guide</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            What does an IP paging, PA or intercom system cost?
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--sc-slate)]">
            There is no single installed price because site size, cabling, speaker quantities and functionality vary. The examples below use the same pricing assumptions as the SmartComms calculator so you can see the likely order of magnitude before requesting a formal quote.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pricing-tool" className="sc-btn-primary">Calculate your site</Link>
            <Link href="/tools/funding-check" className="sc-btn-secondary">Check school funding potential</Link>
          </div>
          <p className="mt-4 text-xs text-[var(--sc-slate)]">Indicative only, ex GST. Pricing assumptions last reviewed {pricingConfig.reviewedAtLabel}.</p>
        </div>
      </div>

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">Indicative installed system examples</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">
            Every example includes the standard central paging/control platform allowance of {formatNZD(pricingConfig.headendPrice)} ex GST. These are configuration examples, not market averages or formal quotes.
          </p>
          <div className="mt-6 grid gap-5">
            {examples.map((example) => (
              <div key={example.title} className="sc-card bg-white p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">{example.title}</h3>
                  <p className="text-lg font-bold text-[var(--sc-teal-strong)]">{example.range}</p>
                </div>
                <p className="mt-2 text-sm text-[var(--sc-slate)]">{example.blurb}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {example.detailLines.map((line) => (
                    <li key={line} className="rounded-full bg-[var(--sc-blue-50)] px-3 py-1 text-xs text-[var(--sc-blue-900)]">{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sc-container max-w-4xl py-14">
        <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">What changes the price?</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACTORS.map((factor) => (
            <div key={factor.title} className="sc-card p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">{factor.title}</h3>
              <p className="mt-2 text-sm text-[var(--sc-slate)]">{factor.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">Get a range for your own site</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
            The calculator asks only three things: the site situation, the areas you need covered and the capability level you want. You can refine it further if you know more, but you do not need technical knowledge to get started.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/pricing-tool" className="sc-btn-primary">Get a ballpark price</Link>
            <Link href="/funding" className="sc-btn-secondary">School funding guide</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
