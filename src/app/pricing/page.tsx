import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing: What Communication Systems Cost in NZ",
  description:
    "What drives the cost of paging, bell, PA and intercom systems in New Zealand, and how to estimate your project.",
  path: "/pricing",
});

const FACTORS = [
  { title: "Endpoints", desc: "The number of speakers, horns, clocks and intercom stations is usually the single biggest cost driver." },
  { title: "Zones", desc: "More zones mean more design work, more control configuration and sometimes more amplification." },
  { title: "Emergency features", desc: "Lockdown alerts, emergency tones and monitored endpoints add capability and cost." },
  { title: "Network", desc: "IP systems need suitable switching, VLANs and PoE budget. Network upgrades can form part of the project." },
  { title: "Existing infrastructure", desc: "Reusing healthy 100V speakers and cabling in a hybrid design can significantly reduce cost." },
  { title: "Installation", desc: "Ceiling access, height, heritage buildings and after-hours work all affect installation cost." },
];

export default function PricingPage() {
  return (
    <div className="sc-container py-16 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        What does a system cost?
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        There is no single answer: paging, bell and intercom projects range from small replacements
        to site-wide installations. What we can tell you today is what drives the price.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {FACTORS.map((f) => (
          <div key={f.title} className="sc-card p-6">
            <h2 className="font-semibold text-[var(--sc-blue-900)]">{f.title}</h2>
            <p className="mt-2 text-sm text-[var(--sc-slate)]">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 sc-card p-6 bg-[var(--sc-blue-50)]">
        <h2 className="text-lg font-semibold text-[var(--sc-blue-900)]">NZ Cost Index</h2>
        <p className="mt-2 text-[var(--sc-slate)]">
          We are building a NZ project pricing dataset with published assumptions, sample sizes and
          update dates. We will not publish averages until the data behind them is real.
        </p>
        <Link href="/tools/system-planner" className="sc-btn-primary mt-4">Estimate your system</Link>
      </div>
    </div>
  );
}
