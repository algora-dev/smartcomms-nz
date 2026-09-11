import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "System Types: Traditional, IP and Hybrid Architectures",
  description:
    "How traditional 100V PA, full IP/PoE and hybrid paging architectures differ, and which suits your NZ site.",
  path: "/systems",
});

const TYPES = [
  {
    id: "traditional",
    title: "Traditional / 100V PA",
    desc: "A classic amplifier-to-speaker architecture. A central amplifier drives 100-volt speaker lines run throughout the site.",
    points: [
      "Simpler architecture with fewer network dependencies",
      "Often suits basic or existing setups",
      "Zoning and scheduling are more limited",
      "Existing cabling and speakers can sometimes be reused",
    ],
  },
  {
    id: "ip",
    title: "Full IP / PoE",
    desc: "Network-based endpoints where each speaker or intercom is an IP device powered over the network via PoE.",
    points: [
      "Flexible zoning and per-endpoint control",
      "Rich scheduling, calendars and emergency features",
      "Distributed control from any authorised console",
      "Requires suitable network switching and PoE budget",
    ],
  },
  {
    id: "hybrid",
    title: "Hybrid",
    desc: "An IP control layer combined with retained 100V infrastructure, bridging new intelligence with existing speakers and cabling.",
    points: [
      "Combines IP control with retained infrastructure",
      "Useful for staged upgrades and tighter budgets",
      "Keeps working endpoints in service while modernising control",
      "Needs careful design of the bridge between the two layers",
    ],
  },
];

export default function SystemsPage() {
  return (
    <div className="sc-container py-16 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        Communication system architectures
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        Modern site communication systems generally fall into three architectures. Understanding
        which one a proposal describes is the first step to judging whether it fits your site.
      </p>
      <div className="mt-10 space-y-8">
        {TYPES.map((t) => (
          <section key={t.id} id={t.id} className="sc-card p-6 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-[var(--sc-blue-900)]">{t.title}</h2>
            <p className="mt-2 text-[var(--sc-slate)]">{t.desc}</p>
            <ul className="mt-4 space-y-1 text-[var(--sc-slate)] list-disc pl-5">
              {t.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="mt-10">
        <Link href="/pricing-tool" className="sc-btn-primary">Estimate your system</Link>
      </div>
    </div>
  );
}
