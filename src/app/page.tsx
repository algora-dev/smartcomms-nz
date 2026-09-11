import type { Metadata } from "next";
import Link from "next/link";
import { SmartcommsHero } from "@/components/home/smartcomms-hero";
import { SystemVideo } from "@/components/home/system-video";
import { Reveal } from "@/components/home/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "School Paging, Bell, PA & Intercom Guidance NZ | SmartComms",
  description:
    "Understand, plan and budget paging, school bell, PA, intercom and emergency communication systems in New Zealand. Explore guides, pricing research and planning tools.",
  alternates: { canonical: site.url },
  openGraph: {
    title: "School Paging, Bell, PA & Intercom Guidance NZ | SmartComms",
    description:
      "Understand, plan and budget paging, school bell, PA, intercom and emergency communication systems in New Zealand.",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
};

const INTENT_CARDS = [
  {
    href: "/systems/traditional-vs-ip",
    title: "Replace an old PA system",
    desc: "Work out what to keep, what to replace and which architecture suits your existing cabling.",
  },
  {
    href: "/guides",
    title: "Automate bells and schedules",
    desc: "Understand scheduled bell systems, zone-based timetables and calendar integration options.",
  },
  {
    href: "/systems",
    title: "Plan an IP paging system",
    desc: "Network requirements, endpoint types, zoning and design principles for IP paging projects.",
  },
  {
    href: "/guides",
    title: "Improve emergency communication",
    desc: "Lockdown paging, alert tones and emergency zones for schools and large facilities.",
  },
  {
    href: "/systems",
    title: "Add intercom or access communication",
    desc: "Two-way intercom stations and door access communication across one connected platform.",
  },
  {
    href: "/tools",
    title: "Build a budget or requirements brief",
    desc: "Use our tools to shape an indicative architecture and a practical brief before you request quotes.",
  },
];

const GUIDES = [
  { title: "IP Paging vs Traditional 100V PA Systems", desc: "How the two architectures differ and when each makes sense.", href: "/guides" },
  { title: "Can Existing Speakers and Cabling Be Reused?", desc: "What can carry over to a new system and what usually gets replaced.", href: "/guides" },
  { title: "IP Paging Network Requirements for NZ Schools", desc: "VLANs, PoE budgets and bandwidth basics for school networks.", href: "/guides" },
  { title: "How to Design Paging Zones", desc: "Splitting a site into zones for bells, announcements and alerts.", href: "/guides" },
  { title: "Does It Still Work if the Internet Goes Down?", desc: "What happens to paging, bells and emergency features during outages.", href: "/guides" },
  { title: "School Lockdown & Emergency Paging Basics", desc: "Lockdown alerts, tone standards and communication planning.", href: "/guides" },
];

const QUOTE_LINKS = [
  { href: "/systems", label: "Understand the recommended architecture" },
  { href: "/pricing", label: "Understand pricing factors" },
  { href: "/guides", label: "Understand zoning" },
  { href: "/guides", label: "Understand emergency features" },
  { href: "/systems", label: "Understand network requirements" },
];

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Rebuilt animated hero (handoff 2026-09-06) */}
      <SmartcommsHero />

      {/* System overview video */}
      <SystemVideo />

      {/* Section 2 — Pricing */}
      <section className="sc-container py-16">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            What does a system usually cost?
          </h2>
          <p className="mt-3 text-lg text-[var(--sc-slate)] max-w-3xl">
            Project cost depends on site size, existing infrastructure, speaker count, zones,
            emergency features and installation complexity.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="sc-card p-6">
              <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">How pricing works</h3>
              <ul className="mt-3 space-y-2 text-[var(--sc-slate)]">
                <li>· Number of speakers, horns and intercom endpoints</li>
                <li>· Zones, emergency features and lockdown capability</li>
                <li>· Network and PoE requirements</li>
                <li>· Reuse of existing cabling and speakers</li>
                <li>· Installation complexity and site access</li>
              </ul>
              <p className="mt-4 text-sm text-[var(--sc-slate)]">
                NZ project pricing research is in development. We do not publish averages until we
                have real project data behind them.
              </p>
            </div>
            <div className="sc-card p-6 flex flex-col justify-between bg-[var(--sc-blue-50)]">
              <div>
                <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">
                  Find your likely system cost
                </h3>
                <p className="mt-3 text-[var(--sc-slate)]">
                  Use the system estimator to get an indicative architecture and price range based
                  on your site and feature requirements.
                </p>
              </div>
            <Link href="/pricing-tool" className="sc-btn-primary mt-6 self-start">
                Estimate your system
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Section 3 — Funding */}
      <section className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <div className="sc-container py-16">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">
              Need funding for your system?
            </h2>
            <p className="mt-3 text-lg text-[var(--sc-slate)] max-w-3xl">
              SmartComms is developing guidance to help schools and other organisations understand
              potential funding pathways, what may be eligible, and what information is usually
              needed before a project moves ahead.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { title: "Understand funding pathways", desc: "Where projects like this are typically funded from in NZ." },
                { title: "Check likely eligibility", desc: "What kinds of systems and projects usually qualify." },
                { title: "Prepare the right project information", desc: "The documentation that makes an application easier." },
              ].map((c) => (
                <div key={c.title} className="sc-card p-6 bg-white">
                  <h3 className="font-semibold text-[var(--sc-blue-900)]">{c.title}</h3>
                  <p className="mt-2 text-sm text-[var(--sc-slate)]">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/funding" className="sc-btn-primary">Explore funding options</Link>
              <Link href="/funding#eligibility" className="sc-btn-secondary">Check eligibility</Link>
            </div>
            <p className="mt-6 text-xs text-[var(--sc-slate)] max-w-3xl">
              SmartComms NZ is not a government agency. Funding information is general guidance only
              and should be confirmed against the relevant programme rules and official sources.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section 4 — Intent cards */}
      <section className="sc-container py-16">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            Start with the part you need help with
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INTENT_CARDS.map((c) => (
              <Link key={c.title} href={c.href} className="sc-card p-6 group">
                <h3 className="font-semibold text-[var(--sc-blue-900)] group-hover:text-[var(--sc-blue-700)]">
                  {c.title} <span aria-hidden>→</span>
                </h3>
                <p className="mt-2 text-sm text-[var(--sc-slate)]">{c.desc}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Section 5 — Tools */}
      <section className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <div className="sc-container py-16">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">
              Use SmartComms tools to plan your project
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="sc-card p-6 bg-white">
                <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">System Estimator</h3>
                <p className="mt-2 text-[var(--sc-slate)]">
                  Get an indicative architecture and, once pricing data is available, a likely
                  price range.
                </p>
          <Link href="/pricing-tool" className="sc-btn-primary mt-4">Estimate your system</Link>
              </div>
              <div className="sc-card p-6 bg-white opacity-90">
                <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">
                  Requirements Builder <span className="ml-2 rounded-full bg-[var(--sc-blue-100)] px-2.5 py-1 text-xs font-medium text-[var(--sc-blue-700)]">In development</span>
                </h3>
                <p className="mt-2 text-[var(--sc-slate)]">
                  Build a practical communication-system brief to guide quotes and planning.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 8 — Popular guides */}
      <section className="sc-container py-16">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">Popular guides</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.title} href={g.href} className="sc-card p-6 group">
                <h3 className="font-semibold text-[var(--sc-blue-900)] group-hover:text-[var(--sc-blue-700)]">{g.title}</h3>
                <p className="mt-2 text-sm text-[var(--sc-slate)]">{g.desc}</p>
              </Link>
            ))}
          </div>
          <Link href="/guides" className="sc-btn-secondary mt-6">Browse all guides</Link>
        </Reveal>
      </section>

      {/* Section 9 — Reviewing a quote */}
      <section className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <div className="sc-container py-16">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">
              Already reviewing a proposed system or quote?
            </h2>
            <p className="mt-3 text-lg text-[var(--sc-slate)] max-w-3xl">
              If a provider has already recommended a system, SmartComms can help you understand
              the architecture, the key features, the likely cost drivers and the questions worth
              checking before you proceed.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 max-w-3xl">
              {QUOTE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[var(--sc-blue-600)] hover:text-[var(--sc-blue-700)] underline-offset-2 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
