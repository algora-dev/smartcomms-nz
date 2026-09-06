import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "System Planner",
  description:
    "NZ system planning guidance. Estimate an indicative architecture for your paging, bell or intercom project.",
  path: "/tools/system-planner",
});

export default function SystemPlannerPage() {
  return (
    <div className="sc-container py-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        System Planner
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        The interactive system estimator is in development. In the meantime, this page gives you
        the questions the estimator will ask, so you can start gathering the answers.
      </p>
      <div className="mt-8 sc-card p-6">
        <h2 className="text-lg font-semibold text-[var(--sc-blue-900)]">
          What the estimator will ask
        </h2>
        <ul className="mt-3 space-y-2 text-[var(--sc-slate)] list-disc pl-5">
          <li>Site type and approximate size (classrooms, blocks, buildings)</li>
          <li>What you have today: PA, bells, intercom, none of the above</li>
          <li>Whether existing speakers or cabling might be reusable</li>
          <li>Features you need: scheduled bells, zones, lockdown, two-way intercom</li>
          <li>Outdoor areas that need coverage</li>
          <li>Network availability and PoE capacity, if known</li>
        </ul>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/systems" className="sc-btn-primary">See system types</Link>
        <Link href="/pricing" className="sc-btn-secondary">See pricing factors</Link>
      </div>
    </div>
  );
}
