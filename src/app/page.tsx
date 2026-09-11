import type { Metadata } from "next";
import Link from "next/link";
import { SmartcommsHero } from "@/components/home/smartcomms-hero";
import { SystemVideo } from "@/components/home/system-video";
import { Reveal } from "@/components/home/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "IP Paging, PA, Bell & Intercom Systems NZ | SmartComms",
  description:
    "Plan, price and understand IP paging, PA, bell, intercom and emergency communication systems in New Zealand. Free pricing and school funding tools.",
  alternates: { canonical: site.url },
  openGraph: {
    title: "IP Paging, PA, Bell & Intercom Systems NZ | SmartComms",
    description:
      "Plan, price and understand IP paging, PA, bell, intercom and emergency communication systems in New Zealand.",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
};

const INTENT_CARDS = [
  {
    href: "/schools",
    title: "Plan a school communications system",
    desc: "School-specific guidance covering paging, bells, emergency communication, intercom, indicative costs and funding.",
  },
  {
    href: "/systems/traditional-vs-ip",
    title: "Replace an old PA system",
    desc: "Understand what can potentially be reused, what usually changes and which architecture suits the site.",
  },
  {
    href: "/systems",
    title: "Plan an IP paging system",
    desc: "Compare traditional, full IP and hybrid architectures before a project is specified.",
  },
  {
    href: "/pricing-tool",
    title: "Work out a ballpark budget",
    desc: "Get an indicative installed price range in under a minute without needing technical knowledge.",
  },
  {
    href: "/tools/funding-check",
    title: "Check school funding potential",
    desc: "NZ state schools can quickly see whether parts of a proposed project may have a 5YA / 10YPP pathway.",
  },
  {
    href: "/funding",
    title: "Understand 5YA / 10YPP funding",
    desc: "See why fixed school communications infrastructure may fit and what the school needs to do next.",
  },
  {
    href: "/contact",
    title: "Get a project reviewed",
    desc: "Already have a site, quote or proposed design? Send the details for a practical next-step review.",
  },
];

export default function HomePage() {
  return (
    <>
      <SmartcommsHero />
      <SystemVideo />

      <section className="sc-container py-16">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">Free planning tools</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">
              Start with cost or funding
            </h2>
            <p className="mt-3 text-lg text-[var(--sc-slate)]">
              You do not need to know the products or technical design first. Use whichever question matters most right now, then move between the tools as the project becomes clearer.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="sc-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">30-60 seconds</p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">Ballpark Cost Calculator</h3>
              <p className="mt-2 text-[var(--sc-slate)]">
                Choose the site situation, areas to cover and feature level to get an indicative installed price range.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/pricing-tool" className="sc-btn-primary">Get a ballpark price</Link>
                <Link href="/pricing" className="sc-btn-secondary">See how pricing works</Link>
              </div>
            </div>
            <div className="sc-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">NZ schools</p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">School Funding Check</h3>
              <p className="mt-2 text-[var(--sc-slate)]">
                See whether fixed paging, bells, emergency communication, intercoms or cabling may have a potential Ministry 5YA / 10YPP funding pathway.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/tools/funding-check" className="sc-btn-primary">Check potential funding</Link>
                <Link href="/funding" className="sc-btn-secondary">Read the funding guide</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <div className="sc-container py-16">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">
              What these systems can cover
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-[var(--sc-slate)]">
              SmartComms covers site-wide paging, scheduled bells and messages, emergency communication, fixed intercoms, indoor and outdoor speakers, and the infrastructure that connects them.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INTENT_CARDS.map((card) => (
                <Link key={card.title} href={card.href} className="sc-card group bg-white p-6">
                  <h3 className="font-semibold text-[var(--sc-blue-900)] group-hover:text-[var(--sc-blue-700)]">
                    {card.title} <span aria-hidden>→</span>
                  </h3>
                  <p className="mt-2 text-sm text-[var(--sc-slate)]">{card.desc}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sc-container py-16">
        <Reveal>
          <div className="rounded-2xl border border-[var(--sc-border)] bg-white p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">For New Zealand schools</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">Cost, system design and funding in one place</h2>
            <p className="mt-3 max-w-3xl text-lg text-[var(--sc-slate)]">
              The school guide brings together the questions schools usually research separately: what a modern paging and bell system can do, what a small, medium or large project may cost, and whether fixed communications work has a potential 5YA pathway.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/schools" className="sc-btn-primary">Explore school systems</Link>
              <Link href="/pricing" className="sc-btn-secondary">See indicative school costs</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="sc-container py-16">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">Built to make the next step easier</h2>
          <p className="mt-3 max-w-3xl text-lg text-[var(--sc-slate)]">
            Whether you are researching a future project or already talking to an installer, the site is designed to help you understand the architecture, budget, funding possibilities and questions worth resolving before a final quote.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/systems" className="sc-btn-secondary">Compare system architectures</Link>
            <Link href="/guides" className="sc-btn-secondary">Browse practical guides</Link>
            <Link href="/contact" className="sc-btn-primary">Ask about a project</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
