import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { schoolBandSummaries } from "@/lib/pricing/school-bands";

export const metadata: Metadata = buildMetadata({
  title: "School PA, Paging, Bell & Intercom Systems NZ",
  description: "Practical NZ guide to school PA, IP paging, bell, lockdown, announcement and intercom systems, including indicative costs and potential 5YA funding pathways.",
  path: "/schools",
});

const reviewed = "11 September 2026";
const bands = schoolBandSummaries();

const capabilities = [
  ["Paging & announcements", "Live or scheduled messages to the whole school, individual blocks or selected areas."],
  ["School bells", "Scheduled tones, music or spoken messages for class changes and daily events."],
  ["Emergency communication", "Lockdown, evacuation and other urgent messages distributed quickly across the site."],
  ["Indoor & outdoor coverage", "Classrooms, offices, halls, gyms, courtyards, fields and detached buildings."],
  ["Two-way intercom", "Fixed call points or room-to-office communication where two-way contact is useful."],
  ["IP / network integration", "Modern systems can use the school network and may reuse suitable existing data cabling."],
];

export default function SchoolsPage() {
  return (
    <div>
      <div className="sc-container max-w-4xl py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">New Zealand schools</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">School PA, paging, bell and intercom systems</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--sc-slate)]">
          A modern school communications system can combine daily bells, live announcements, emergency messaging, indoor and outdoor coverage and two-way intercom into one coordinated platform. This guide explains the main options, likely cost ranges and the funding questions NZ state schools should investigate.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/pricing-tool" className="sc-btn-primary">Estimate your school cost</Link>
          <Link href="/tools/funding-check" className="sc-btn-secondary">Check potential 5YA funding</Link>
        </div>
        <p className="mt-4 text-xs text-[var(--sc-slate)]">Last reviewed {reviewed}. Pricing is indicative only and funding is never guaranteed.</p>
      </div>

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">What a school system can provide</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([title, desc]) => (
              <div key={title} className="sc-card bg-white p-5">
                <h3 className="font-semibold text-[var(--sc-blue-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sc-container max-w-4xl py-14">
        <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">How much can a school system cost?</h2>
        <p className="mt-3 max-w-3xl text-[var(--sc-slate)]">
          The ranges below are planning examples generated from the same pricing model as the SmartComms calculator. They are designed to answer the early budgeting question, not replace a site-specific quote. Existing cabling, room count, outdoor coverage and intercom/emergency features can move a project materially within or beyond these bands.
        </p>
        <div className="mt-6 grid gap-5">
          {bands.map((band) => (
            <article key={band.id} className="sc-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">{band.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-[var(--sc-slate)]">{band.description}</p>
                </div>
                <p className="text-xl font-bold text-[var(--sc-teal-strong)]">{band.displayRange}</p>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {band.typicalFeatures.map((feature) => (
                  <li key={feature} className="rounded-full bg-[var(--sc-blue-50)] px-3 py-1 text-xs text-[var(--sc-blue-900)]">{feature}</li>
                ))}
              </ul>
              {band.largeSystem && <p className="mt-3 text-xs text-[var(--sc-slate)]">The upper end exceeds the calculator&#39;s standard 30-endpoint system allowance, so additional central hardware may be required.</p>}
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">
          All values are indicative installed planning ranges, ex GST. They are based on the current SmartComms pricing methodology and standard assumptions, not a supplier quote or promise of final price.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/pricing-tool" className="sc-btn-primary">Price your own school</Link>
          <Link href="/pricing" className="sc-btn-secondary">See pricing methodology</Link>
        </div>
      </section>

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">Could a state school fund the upgrade through 5YA?</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-[var(--sc-slate)]">
            Potentially. The strongest argument is usually where the project creates, replaces or substantially upgrades fixed communications infrastructure and addresses a genuine property, coverage or safety need. The school&#39;s 10YPP, available 5YA allocation, Ministry ownership and project priorities still determine the actual pathway.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/tools/funding-check" className="sc-btn-primary">Check your project</Link>
            <Link href="/funding" className="sc-btn-secondary">Read the 5YA guide</Link>
          </div>
        </div>
      </section>

      <article className="sc-container max-w-3xl py-14 sc-prose">
        <h2>When should a school consider replacing its current system?</h2>
        <p>Common triggers include unreliable bells or paging, unsupported equipment, classrooms or outdoor areas that cannot hear announcements, poor speech intelligibility, expansion into new blocks, and emergency messages that do not reliably reach the entire site.</p>
        <h2>Does a school need to replace everything?</h2>
        <p>Not always. Depending on the existing installation, some speakers, cabling, racks or network infrastructure may be reusable. A hybrid upgrade can sometimes retain working infrastructure while replacing the control layer and adding IP functionality where it provides the most value.</p>
        <h2>Can existing network cabling be used?</h2>
        <p>Often, yes, if suitable data cabling and network capacity are already available near the required device locations. This is one reason existing-site projects can vary significantly in cost. The pricing calculator separates sites with suitable network points from sites that are likely to need new cabling.</p>
        <h2>What should happen next?</h2>
        <p>Start with a ballpark budget and, for a state school, check whether the fixed infrastructure has a potential 5YA pathway. A site assessment can then confirm what is reusable, where coverage is needed and what should appear in a formal quote or property-funding discussion.</p>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({ headline: "School PA, Paging, Bell & Intercom Systems NZ", description: "NZ guide to school paging, bells, PA, emergency communication, intercom, pricing and funding.", url: `${site.url}/schools`, datePublished: "2026-09-11", dateModified: "2026-09-11" })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "SmartComms NZ", url: site.url }, { name: "Schools", url: `${site.url}/schools` }])) }} />
    </div>
  );
}
