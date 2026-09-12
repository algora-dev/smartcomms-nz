import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "School PA Specification Checklist: Compare Quotes Like-for-Like",
  description:
    "A practical pre-procurement checklist for NZ schools specifying a PA, paging, bell or intercom system — so every quote you receive covers the same scope and can be compared fairly.",
  path: "/guides/school-pa-specification-checklist",
});

const reviewed = "12 September 2026";
void reviewed;

const SECTIONS = [
  {
    title: "1. Coverage and zones",
    items: [
      "List every building, block, hall, gym, library and admin area the system must reach",
      "List outdoor areas: courts, fields, covered walkways, bus bays, gates",
      "Define the zones you need to address separately (blocks, indoor/outdoor, hall-only, etc.)",
      "Note spaces with high background noise (workshops, kitchens, gyms) that need specific treatment",
    ],
  },
  {
    title: "2. Bells and schedules",
    items: [
      "State the bell schedule requirements: timetables, A/B weeks, term-aware calendars",
      "Who can pause, advance or override bells, and from where",
      "Custom tones/chimes required, and whether different zones need different schedules",
      "See the bells and announcements guide for the full capability list",
    ],
  },
  {
    title: "3. Announcements and paging",
    items: [
      "How many live paging points (office consoles, handsets, software clients) and where",
      "Priority rules: routine paging must not block emergency messaging",
      "Any requirement for scheduled or pre-recorded daily announcements",
    ],
  },
  {
    title: "4. Emergency capability",
    items: [
      "Pre-recorded lockdown and evacuation messages (provide scripts to be consistent across quotes)",
      "Number and location of activation points, and who is authorised",
      "Zone-targeted emergency messaging requirements",
      "Redundancy: endpoint-local message storage, UPS backup, multi-path activation",
      "Integration with existing security, duress or notification systems — or state clearly none is required",
    ],
  },
  {
    title: "5. Intercom and two-way",
    items: [
      "Exact locations needing two-way audio (gates, reception, selected classrooms)",
      "Required integration with your phone system (SIP/VoIP/Teams) and who supports it",
      "Whether missed-call handling (voicemail/roll-over) is needed for gate intercoms",
    ],
  },
  {
    title: "6. Architecture and existing infrastructure",
    items: [
      "State what may be retained: existing speakers, 100V cabling, network switching",
      "Require testing evidence for any reused cabling in the quote",
      "Specify IP, hybrid or traditional — or require bidders to price the trade-off explicitly",
    ],
  },
  {
    title: "7. Network readiness (for IP/hybrid)",
    items: [
      "Attach your completed network readiness checklist to the tender documents",
      "State clearly who provisions VLANs, QoS and PoE — installer or IT partner",
      "Require the PoE power budget calculation in the quote",
    ],
  },
  {
    title: "8. Management and support",
    items: [
      "Who administers schedules, zones and users day to day, and via what interface",
      "Training included at handover, for how many staff",
      "Warranty period on endpoints, labour and configuration",
      "Ongoing support: response times, remote monitoring, firmware updates",
      "Spare parts availability and NZ-local support presence",
    ],
  },
  {
    title: "9. Commercial",
    items: [
      "Total installed price separated into equipment, cabling, switch/network work, labour and configuration",
      "GST status clearly stated",
      "Payment milestones and retention terms",
      "Exclusions listed explicitly (e.g. switch upgrades, after-hours work)",
      "Indicative programme: lead times for equipment, installation windows around term dates",
    ],
  },
];

export default function SpecificationChecklistPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="Project Planning Checklist"
        title="School PA, Paging & Bell Specification Checklist"
        description="A good specification makes competing quotes easier to compare and reduces the risk of missing important coverage, emergency, network or operational requirements. Use this checklist to define what a school actually needs before requesting a formal system design or supplier quote."
        tags={["PA specification", "Paging checklist", "School bells", "Emergency coverage", "Quote comparison"]}
        primaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        secondaryCta={{ label: "Check school funding", href: "/tools/funding-check" }}
        reviewed="12 September 2026"
        note="Attach to tender documents"
        breadcrumb={[{ name: "Guides", href: "/guides" }, { name: "School PA Specification Checklist" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Preparing a consistent brief before requesting system quotes" },
          { label: "Best fit", value: "Schools, consultants, IT partners and property teams" },
          { label: "Covers", value: "Coverage, zoning, bells, emergency functions, intercom, network infrastructure and support" },
          { label: "Next step", value: "Use the checklist, then compare pricing and funding options" },
        ]}
      />
      <article className="sc-container max-w-[800px] py-8 sc-prose">
      {SECTIONS.map((section) => (
        <section key={section.title} className="sc-card p-6 not-prose">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">{section.title}</h2>
          <ul className="mt-3 space-y-1 text-[var(--sc-slate)] list-disc pl-5">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
      <h2 id="how-to-use">How to use it with suppliers</h2>
      <ol>
        <li>Send the checklist with the same maps, photos and network information to every bidder</li>
        <li>Require a compliance response per section (&quot;complies / partially / not included + price&quot;)</li>
        <li>Score on lifecycle and support, not just the bottom line — see the{" "}
          <Link href="/compare">platform comparison</Link> for the dimensions that matter</li>
        <li>Check indicative market pricing with the <Link href="/pricing-tool">ballpark calculator</Link>{" "}
          before accepting anything outlier-high or suspiciously low</li>
      </ol>
      <h2 id="funding">Connecting to funding</h2>
      <p>
        A clear specification is also what a 10YPP / 5YA property funding case needs: documented
        need, defined scope and evidence of value for money. See the{" "}
        <Link href="/funding">funding guide</Link> and run the{" "}
        <Link href="/tools/funding-check">funding checker</Link> for an indicative read.
      </p>
      <ContinuePlanning
        items={[
          { title: "Pricing guide", desc: "Indicative NZ installed ranges so you can sanity-check every quote.", href: "/pricing" },
          { title: "5YA funding guide", desc: "How a clearly specified project fits the property funding process.", href: "/funding" },
          { title: "Compare paging platforms", desc: "Which platforms and ecosystems suit which specifications.", href: "/compare" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed 12 September 2026. Procurement-support guidance only — follow your school&apos;s and
        the Ministry&apos;s procurement rules for any formal tender.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "School PA Specification Checklist: Compare Quotes Like-for-Like",
              description:
                "A practical pre-procurement checklist for NZ schools specifying a PA, paging, bell or intercom system, so quotes can be compared fairly.",
              url: `${site.url}/guides/school-pa-specification-checklist`,
              datePublished: "2026-09-12",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Guides", url: `${site.url}/guides` },
              { name: "School PA Specification Checklist", url: `${site.url}/guides/school-pa-specification-checklist` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
