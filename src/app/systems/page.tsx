import { ProjectHelpPanel } from "@/components/content/ProjectHelpPanel";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { reviewedLabel } from "@/lib/content-meta";

export const metadata: Metadata = buildMetadata({
  title: "Paging, PA, Bell & Intercom System Types",
  description:
    "Compare traditional 100V, full-IP and hybrid paging systems, then explore bells, emergency messaging, intercom and network planning.",
  path: "/systems",
});

const ARCHITECTURES = [
  {
    id: "traditional",
    title: "Traditional 100V PA",
    bestFor: [
      "Simple one-way paging",
      "Existing analogue estates",
      "Cost-sensitive basic systems",
    ],
    strength: "Simple, mature and economical.",
    tradeOff: "Less endpoint-level control and integration.",
    desc: "A classic amplifier-to-speaker architecture. A central amplifier drives 100-volt speaker lines run throughout the site.",
  },
  {
    id: "ip",
    title: "Full IP / PoE paging",
    bestFor: [
      "Modern distributed sites",
      "Flexible zoning, bells and scheduling",
      "Two-way communication and network integration",
    ],
    strength: "Scalable control and endpoint intelligence.",
    tradeOff: "Network readiness matters.",
    desc: "Network-based endpoints where each speaker or intercom is an IP device powered over the network via PoE.",
  },
  {
    id: "hybrid",
    title: "Hybrid IP + 100V",
    bestFor: [
      "Staged upgrades",
      "Retaining usable speakers and cabling",
      "Modern controls without replacing everything",
    ],
    strength: "Protects useful existing investment.",
    tradeOff: "Design needs to account for both architectures.",
    desc: "An IP control layer combined with retained 100V infrastructure, bridging new intelligence with existing speakers and cabling.",
  },
];

const FUNCTIONS = [
  {
    href: "/systems/ip-paging-pa",
    title: "IP Paging & PA",
    desc: "Live and scheduled announcements delivered over the data network to zoned speakers across a site.",
  },
  {
    href: "/systems/school-bell-announcements",
    title: "School Bells & Announcements",
    desc: "Automated bell schedules, tones and daily announcements across classrooms, halls and outdoor areas.",
  },
  {
    href: "/systems/emergency-lockdown",
    title: "Emergency & Lockdown",
    desc: "Lockdown, evacuation and emergency messaging with the coverage, zoning and intelligibility a site needs.",
  },
  {
    href: "/systems/ip-intercom",
    title: "IP Intercom & Two-Way Communication",
    desc: "Fixed call points, gate entry and room-to-office two-way audio that can share paging infrastructure.",
  },
];

const RESOURCES = [
  {
    href: "/compare/schools",
    title: "Compare platforms",
    desc: "Side-by-side comparison of leading paging and PA platforms sold in New Zealand.",
  },
  {
    href: "/guides/ip-paging-network-readiness",
    title: "Network readiness",
    desc: "Check cabling, PoE, switching and resilience before specifying an IP system.",
  },
  {
    href: "/guides/school-pa-specification-checklist",
    title: "School specification checklist",
    desc: "Define coverage, bells, emergency features and support so quotes compare fairly.",
  },
  {
    href: "/pricing",
    title: "Pricing",
    desc: "How NZ paging and PA projects are priced, with indicative planning ranges.",
  },
  {
    href: "/funding",
    title: "School funding",
    desc: "Whether fixed communications work may fit a 5YA / 10YPP property pathway.",
  },
];

export default function SystemsPage() {
  return (
    <div>
      <section className="sc-container sc-container-wide pb-6 pt-10">
        <div className="rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">
            System architecture guide
          </p>
          <h1 className="sc-title mt-3">
            Paging, PA, Bell &amp; Intercom System Types
          </h1>
          <p className="mt-5 max-w-3xl text-[1.125rem] leading-relaxed text-[var(--sc-slate)] sm:text-lg">
            Modern communication systems range from simple 100V public-address installations to full
            IP and hybrid networks combining paging, bells, emergency messages and two-way intercom.
            Start with the architecture, then explore the functions your site actually needs.
          </p>
          <div className="mt-8 sc-actions">
            <Link href="/pricing-tool" className="sc-btn-primary">Estimate project cost</Link>
            <Link href="/compare/schools" className="sc-btn-secondary">Compare platforms</Link>
          </div>
          <p className="mt-6 text-xs text-[var(--sc-slate)]">
            Last reviewed {reviewedLabel("/systems")}
          </p>
        </div>
      </section>

      <section className="sc-container sc-container-wide py-10">
        <h2 className="sc-section-title">
          Three architecture options
        </h2>
        <p className="mt-3 max-w-3xl text-lg text-[var(--sc-slate)]">
          Almost every paging or PA proposal describes one of these three architectures.
          Understanding which one you are being quoted is the first step to judging whether it fits.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {ARCHITECTURES.map((a) => (
            <section key={a.id} id={a.id} className="sc-card flex flex-col p-6 scroll-mt-24">
              <h3 className="text-xl font-semibold text-[var(--sc-blue-900)]">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{a.desc}</p>
              <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--sc-blue-700)]">Best for</h4>
              <ul className="mt-2 space-y-1 text-sm text-[var(--sc-slate)]">
                {a.bestFor.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-[var(--sc-teal)]" aria-hidden>✓</span> {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[var(--sc-slate)]">
                <span className="font-semibold text-[var(--sc-blue-900)]">Strength:</span> {a.strength}
              </p>
              <p className="mt-1 text-sm text-[var(--sc-slate)]">
                <span className="font-semibold text-[var(--sc-blue-900)]">Trade-off:</span> {a.tradeOff}
              </p>
            </section>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/systems/traditional-vs-ip"
            className="sc-btn-secondary"
          >
            Deciding between traditional and IP? Read the comparison guide →
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container sc-container-wide">
          <h2 className="sc-section-title">
            What the system needs to do
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-[var(--sc-slate)]">
            Architecture is only half the decision. These guides break the system down by the
            functions a site actually needs.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {FUNCTIONS.map((f) => (
              <Link key={f.href} href={f.href} className="sc-card group bg-white p-6">
                <h3 className="text-lg font-semibold text-[var(--sc-blue-900)] group-hover:text-[var(--sc-blue-700)]">
                  {f.title} <span aria-hidden>→</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sc-container sc-container-wide py-14">
        <h2 className="sc-section-title">Planning resources</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <Link key={r.href} href={r.href} className="sc-card group p-6">
              <h3 className="font-semibold text-[var(--sc-blue-900)] group-hover:text-[var(--sc-blue-700)]">
                {r.title} <span aria-hidden>→</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{r.desc}</p>
            </Link>
          ))}
        </div>
      </section>
      <ProjectHelpPanel {...{"title": "Need help choosing a system type?", "description": "Tell us about your site and what you need to hear, announce or communicate.", "buttonLabel": "Ask about your requirements", "mode": "system_selection", "sourceTopic": "systems_hub"}} />
    </div>
  );
}
