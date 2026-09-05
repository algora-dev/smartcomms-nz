import Link from "next/link";

const PILLARS = [
  {
    href: "/guides",
    title: "Planning guides",
    desc: "How IP paging, bell scheduling, zoning and emergency systems actually work in NZ schools and large facilities.",
  },
  {
    href: "/pricing",
    title: "NZ Cost Index",
    desc: "Indicative New Zealand pricing ranges for school paging and bell systems by size, with assumptions and dates.",
  },
  {
    href: "/tools/system-planner",
    title: "System Planner",
    desc: "Answer a few questions about your site and get an indicative architecture, equipment categories and cost range.",
  },
  {
    href: "/compare",
    title: "System comparisons",
    desc: "How leading IP paging platforms compare on architecture, zoning, emergency features and NZ cost.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[var(--sc-blue-50)] to-white border-b border-[var(--sc-border)]">
        <div className="sc-container py-20 text-center max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--sc-blue-600)]">
            New Zealand
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            Understand, plan and budget school paging, bell and PA systems
          </h1>
          <p className="mt-5 text-lg text-[var(--sc-slate)]">
            Independent guidance, NZ pricing benchmarks and planning tools for IP paging, school
            bells, intercom and integrated communication systems.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/tools/system-planner" className="sc-btn-primary">
              Estimate your system
            </Link>
            <Link href="/pricing" className="sc-btn-secondary">
              See NZ pricing ranges
            </Link>
          </div>
        </div>
      </section>

      <section className="sc-container py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {PILLARS.map((p) => (
            <Link key={p.href} href={p.href} className="sc-card p-6">
              <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">{p.title}</h2>
              <p className="mt-2 text-[var(--sc-slate)]">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <div className="sc-container py-12 text-sm text-[var(--sc-slate)]">
          <p>
            SmartComms NZ is an information and comparison resource. Product and system assessments
            are based on published criteria, available technical information and practical
            suitability. See our{" "}
            <Link href="/about/methodology">research methodology</Link> and{" "}
            <Link href="/about/disclosure">commercial relationships</Link> pages.
          </p>
        </div>
      </section>
    </>
  );
}
