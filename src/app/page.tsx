import type { Metadata } from "next";
import Link from "next/link";
import { SmartcommsHero } from "@/components/home/smartcomms-hero";
import { Reveal } from "@/components/home/reveal";
import { TrackedLink } from "@/components/tracked-link";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "IP Paging, PA, Bell & Intercom Systems NZ | SmartComms",
  description:
    "Plan, price and understand IP paging, PA, bell, intercom and emergency communication systems in New Zealand. Free pricing, school funding and finance/leasing tools.",
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
    href: "/industries/aged-care-retirement-villages",
    title: "Aged care & retirement village systems",
    desc: "PA, paging, entrance intercom and staff communication guidance for rest homes and villages, with use-case shortlists and indicative costs.",
  },
  {
    href: "/industries/warehouses-manufacturing-industrial",
    title: "Warehouse, factory & industrial systems",
    desc: "Compare shift and break bells, live paging, horns, intercom, yard coverage and existing-PA upgrade options for warehouses, factories and industrial sites.",
  },
  {
    href: "/contact",
    title: "Not sure what to do next?",
    desc: "Tell us about the site, what you need the system to achieve and your region. We’ll review it and point you towards the most useful next step.",
  },
];


export default function HomePage() {
  return (
    <>
      <SmartcommsHero />

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)]" aria-labelledby="free-planning-tools">
        <div className="sc-container py-12 sm:py-16">
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">Free planning tools</p>
              <h2 id="free-planning-tools" className="sc-section-title mt-2">
                Get a price estimate, check funding, then explore finance
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-[var(--sc-slate)]">
                Three quick tools answer the questions that can otherwise take hours of research and calls. Use one or all three. Results are indicative, there is no sales call required, and you can ask SmartComms who to contact when you are ready to move forward.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              <div className="sc-card bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">1 · Start here</p>
                  <span className="rounded-full bg-[var(--sc-blue-50)] px-2.5 py-1 text-xs font-semibold text-[var(--sc-blue-700)]">30–60 sec</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--sc-blue-900)]">Get a price estimate</h3>
                <p className="mt-2 text-[var(--sc-slate)]">
                  Describe the site, coverage and capability level to get an indicative installed project range before requesting formal quotes.
                </p>
                <Link href="/pricing-tool" className="sc-btn-primary mt-5">Estimate project cost</Link>
              </div>

              <div className="sc-card bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">2 · NZ schools</p>
                  <span className="rounded-full bg-[var(--sc-blue-50)] px-2.5 py-1 text-xs font-semibold text-[var(--sc-blue-700)]">Funding</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--sc-blue-900)]">Check a funding pathway</h3>
                <p className="mt-2 text-[var(--sc-slate)]">
                  See whether fixed paging, bells, emergency communication, intercom or cabling may have a potential school property-funding pathway.
                </p>
                <Link href="/tools/funding-check" className="sc-btn-primary mt-5">Check potential funding</Link>
              </div>

              <div className="sc-card bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">3 · If useful</p>
                  <span className="rounded-full bg-[var(--sc-blue-50)] px-2.5 py-1 text-xs font-semibold text-[var(--sc-blue-700)]">Finance</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--sc-blue-900)]">Explore finance options</h3>
                <p className="mt-2 text-[var(--sc-slate)]">
                  Use the estimated project value to see whether equipment finance or leasing may be worth discussing instead of paying the full cost upfront.
                </p>
                <Link href="/tools/finance-check" className="sc-btn-primary mt-5">Check finance options</Link>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[var(--sc-slate)]">
              <span><strong className="text-[var(--sc-navy)]">Use the tools in any order.</strong> Funding is school-specific; pricing and finance can also help other organisations.</span>
              <Link href="/tools" className="font-semibold text-[var(--sc-blue-700)] underline decoration-[var(--sc-teal)] decoration-2 underline-offset-4 hover:text-[var(--sc-navy)]">
                See how the three tools work together
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sc-container py-10 sm:py-12">
        <Reveal>
          <div className="rounded-2xl bg-[var(--sc-navy)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Ready for a human next step?</p>
            <h2 className="sc-section-title mt-2 text-white">Ask SmartComms who we think you should contact first</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-white/85">
              Send us the project, or complete one of the free tools first. We will review what you need, what is already installed and your region, then reply with the provider or providers in our selected New Zealand network that we think are best suited, including public contact details and why they may fit. You decide who to contact.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <ProjectHelpLauncher
                mode="project_help"
                sourceTopic="homepage_provider_referral"
                buttonLabel="Ask SmartComms who to contact"
                className="sc-btn-light"
              />
              <Link href="/about/disclosure" className="text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">How recommendations work</Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <div className="sc-container py-16">
          <Reveal>
            <h2 className="sc-section-title">
              Choose the path that matches your project
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-[var(--sc-slate)]">
              Start with your site or the problem you are trying to solve. SmartComms covers site-wide paging, scheduled bells and messages, emergency communication, fixed intercoms, indoor and outdoor speakers, and the infrastructure that connects them.
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
            <h2 className="sc-section-title mt-2">Cost, system design and funding in one place</h2>
            <p className="mt-3 max-w-3xl text-lg text-[var(--sc-slate)]">
              The school guide brings together the questions schools usually research separately: what a modern paging and bell system can do, what a small, medium or large project may cost, and whether fixed communications work has a potential 5YA pathway.
            </p>
            <div className="mt-5 sc-actions">
              <TrackedLink href="/schools" event="school_guide_cta_clicked" payload={{ source: "homepage_school_band" }} className="sc-btn-primary">Explore school systems</TrackedLink>
              <TrackedLink href="/pricing" event="pricing_guide_cta_clicked" payload={{ source: "homepage_school_band" }} className="sc-btn-secondary">See indicative school costs</TrackedLink>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="sc-container py-16">
        <Reveal>
          <h2 className="sc-section-title">Built to make the next step easier</h2>
          <p className="mt-3 max-w-3xl text-lg text-[var(--sc-slate)]">
            Whether you are researching a future project or ready to ask for quotes, SmartComms helps you understand the architecture, budget, funding possibilities and questions worth resolving. When you want a human next step, we can also review the project and tell you which providers we think are worth contacting first.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/systems" className="sc-btn-secondary">Compare system architectures</Link>
            <Link href="/guides" className="sc-btn-secondary">Browse practical guides</Link>
            <ProjectHelpLauncher
              mode="project_help"
              sourceTopic="homepage_bottom_cta"
              buttonLabel="Ask who we recommend"
              className="sc-btn-primary"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
