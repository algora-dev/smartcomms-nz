import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tools: System Estimator & Requirements Builder",
  description:
    "Free NZ planning tools: estimate an indicative communication system architecture or build a requirements brief.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="sc-container py-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        SmartComms tools
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        Practical tools to help you scope, plan and budget a communication system before you talk
        to providers.
      </p>
      <div className="mt-10 space-y-6">
        <div className="sc-card p-6">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">Funding Pre-Qualification Check</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            A free 60-second check for NZ schools: see whether your paging, PA, bell or communications
            project may have a Ministry 5YA funding pathway, which parts of your project fit strongly,
            and what still needs confirmation.
          </p>
          <Link href="/tools/funding-check" className="sc-btn-primary mt-4">
            Check your funding pathway
          </Link>
        </div>
        <div className="sc-card p-6">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">System Estimator</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            Answer a few questions about your site and get an indicative architecture, equipment
            categories and, once pricing data is available, a likely price range.
          </p>
          <Link href="/tools/system-planner" className="sc-btn-primary mt-4">
            Estimate your system
          </Link>
        </div>
        <div className="sc-card p-6">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">
            Requirements Builder{" "}
            <span className="ml-2 rounded-full bg-[var(--sc-blue-100)] px-2.5 py-1 text-xs font-medium text-[var(--sc-blue-700)]">
              In development
            </span>
          </h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            Build a practical communication-system brief to guide quotes and planning.
          </p>
        </div>
      </div>
    </div>
  );
}
