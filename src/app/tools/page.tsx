import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Paging, PA & School Funding Tools NZ",
  description:
    "Free SmartComms tools: get a ballpark installed system price or check whether an NZ school communications project may have a 5YA funding pathway.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="sc-container max-w-4xl py-16">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">SmartComms tools</h1>
      <p className="mt-4 max-w-3xl text-lg text-[var(--sc-slate)]">
        Two quick tools to answer the questions that most often stop a communications project early: what might it cost, and for NZ state schools, could parts of it potentially be funded?
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="sc-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">30-60 seconds</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">Ballpark Cost Calculator</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            Describe the site, areas to cover and desired capability level to get an indicative installed range. No technical design knowledge is required.
          </p>
          <Link href="/pricing-tool" className="sc-btn-primary mt-5">Get a ballpark price</Link>
        </div>

        <div className="sc-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">NZ schools</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">School Communications Funding Check</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            See which parts of a paging, PA, bell, intercom or communications project may have a potential Ministry 5YA / 10YPP funding pathway.
          </p>
          <Link href="/tools/funding-check" className="sc-btn-primary mt-5">Check potential funding</Link>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
        <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">The tools work together</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">
          A school can start by checking funding and then estimate the likely project cost, or start with a budget and discover that fixed communications work may have a funding pathway. Both tools are indicative and designed to make the next conversation with a provider, Property Advisor or project team easier.
        </p>
      </div>
    </div>
  );
}
