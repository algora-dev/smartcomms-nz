import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { schoolBandSummaries } from "@/lib/pricing/school-bands";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { reviewedLabel } from "@/lib/content-meta";
import { publishedDate, reviewedDate } from "@/lib/content-meta";

export const metadata: Metadata = buildMetadata({
  title: "School PA, Paging, Bell & Intercom Systems NZ",
  description: "Practical NZ guide to school PA, IP paging, bell, lockdown, announcement and intercom systems, including indicative costs and potential 5YA funding pathways.",
  path: "/schools",
});

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
      <AuthorityHero
        eyebrow="New Zealand school communications"
        title="School Paging, PA, Bell & Intercom Systems"
        description="Plan a modern school communication system for bells, live announcements, emergency messages, indoor and outdoor coverage, and optional two-way intercom. Compare systems, estimate cost and check potential Ministry funding."
        tags={["School paging", "Bell systems", "Emergency announcements", "Intercom", "5YA funding"]}
        primaryCta={{ label: "Get a ballpark price", href: "/pricing-tool" }}
        secondaryCta={{ label: "Check school funding", href: "/tools/funding-check" }}
        reviewed={reviewedLabel("/schools")}
        note="Indicative pricing and funding guidance"
        breadcrumb={[{ name: "Schools", href: "/schools" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Bells, announcements, emergency messages and site-wide communication" },
          { label: "Best fit", value: "Primary, intermediate and secondary schools upgrading or replacing legacy PA and bell systems" },
          { label: "Planning options", value: "Full IP, traditional PA or hybrid upgrades" },
          { label: "Next step", value: "Estimate project cost or check funding potential" },
        ]}
      />
      <div className="h-8" />

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

      <section className="sc-container max-w-4xl py-14">
      <ContinuePlanning
        items={[
          { title: "NZ school requirements", desc: "Ministry design, cabling and procurement guidance for school PA and paging.", href: "/guides/nz-school-pa-paging-requirements" },
          { title: "Specification checklist", desc: "Define scope so every quote covers the same things and compares fairly.", href: "/guides/school-pa-specification-checklist" },
          { title: "Network readiness", desc: "Check cabling, PoE and switching before an IP paging project.", href: "/guides/ip-paging-network-readiness" },
          { title: "Compare platforms", desc: "Side-by-side comparison of paging and PA platforms available in NZ.", href: "/compare" },
          { title: "Pricing", desc: "Indicative installed cost ranges and how they are built up.", href: "/pricing" },
          { title: "School funding", desc: "Whether fixed communications work may fit a 5YA / 10YPP pathway.", href: "/funding" },
        ]}
      />
      </section>

      <article className="sc-container max-w-3xl py-14 sc-prose">
        <h2>When should a school consider replacing its current system?</h2>
        <p>Common triggers include unreliable bells or paging, unsupported equipment, classrooms or outdoor areas that cannot hear announcements, poor speech intelligibility, expansion into new blocks, and emergency messages that do not reliably reach the entire site. If bells are the main concern, see our <Link href="/systems/school-bell-announcements">school bell system guide</Link>; for safety messaging, see <Link href="/systems/emergency-lockdown">emergency and lockdown communication</Link>.</p>
        <h2>Does a school need to replace everything?</h2>
        <p>Not always. Depending on the existing installation, some speakers, cabling, racks or network infrastructure may be reusable. A hybrid upgrade can sometimes retain working infrastructure while replacing the control layer and adding IP functionality where it provides the most value. Where two-way communication matters, an <Link href="/systems/ip-intercom">IP intercom</Link> layer can be added selectively.</p>
        <h2>Can existing network cabling be used?</h2>
        <p>Often, yes, if suitable data cabling and network capacity are already available near the required device locations. This is one reason existing-site projects can vary significantly in cost. The pricing calculator separates sites with suitable network points from sites that are likely to need new cabling. To check your network against what an IP system needs, use our <Link href="/guides/ip-paging-network-readiness">network readiness checklist</Link>.</p>
        <h2>What should happen next?</h2>
        <p>Start with a ballpark budget and, for a state school, check whether the fixed infrastructure has a potential 5YA pathway. A site assessment can then confirm what is reusable, where coverage is needed and what should appear in a formal quote or property-funding discussion. The Ministry-side context is covered in our <Link href="/guides/nz-school-pa-paging-requirements">NZ school PA and paging requirements guide</Link>, and the <Link href="/guides/school-pa-specification-checklist">specification checklist</Link> helps you get comparable quotes.</p>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({ headline: "School PA, Paging, Bell & Intercom Systems NZ", description: "NZ guide to school paging, bells, PA, emergency communication, intercom, pricing and funding.", url: `${site.url}/schools`, datePublished: publishedDate("/schools"), dateModified: reviewedDate("/schools") })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "SmartComms NZ", url: site.url }, { name: "Schools", url: `${site.url}/schools` }])) }} />
    </div>
  );
}
