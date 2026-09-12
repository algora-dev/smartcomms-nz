import type { Metadata } from "next";
import Link from "next/link";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "School PA Specification Checklist: Compare Quotes Like-for-Like",
  description:
    "A practical pre-procurement checklist for NZ schools specifying a PA, paging, bell or intercom system — so every quote you receive covers the same scope and can be compared fairly.",
  path: "/guides/school-pa-specification-checklist",
});

const reviewed = "12 September 2026";

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
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <nav className="text-sm text-[var(--sc-slate)]" aria-label="Breadcrumb">
        <Link href="/guides" className="hover:text-[var(--sc-blue-700)]">Guides</Link>
        <span aria-hidden> / </span>
        <span>School PA Specification Checklist</span>
      </nav>
      <h1>School PA specification checklist</h1>
      <p className="text-lg">
        The most common reason school paging quotes are impossible to compare is that each bidder
        answered a different question. This checklist defines the question. Work through it before
        requesting quotes, attach it to your tender documents, and require every bidder to respond
        section by section.
      </p>
      <p>
        Context first if you need it: what the Ministry frameworks expect is covered in the{" "}
        <Link href="/guides/nz-school-pa-paging-requirements">NZ school PA requirements guide</Link>,
        and the system concepts are in the{" "}
        <Link href="/systems/ip-paging-pa">IP paging architecture guide</Link>.
      </p>
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
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed {reviewed}. Procurement-support guidance only — follow your school&apos;s and
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
    </div>
  );
}
