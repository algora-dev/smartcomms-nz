import { ProjectHelpPanel } from "@/components/content/ProjectHelpPanel";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free PA, Paging Pricing, Funding & Finance Tools NZ",
  description:
    "Free SmartComms tools for indicative PA and paging project pricing, NZ school funding pathways, and equipment finance or leasing options.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="sc-container sc-container-reading py-16">
      <h1 className="sc-tool-title">SmartComms tools</h1>
      <p className="sc-lead mt-4">
        Three quick tools for the questions that often stop a communications project early: what might it cost, is there a school funding pathway, and is finance or leasing worth exploring?
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
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

        <div className="sc-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">About a minute</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">Finance & Leasing Check</h2>
          <p className="mt-2 text-[var(--sc-slate)]">
            Tell us who the project is for, the rough value and what sort of regular payment feels manageable. Get a practical starting point without completing a finance application.
          </p>
          <Link href="/tools/finance-check" className="sc-btn-primary mt-5">Check finance options</Link>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
        <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">The tools work together</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--sc-slate)]">
          Start wherever the project is clearest: estimate the likely cost, check a school funding pathway, or explore finance and leasing. The tools are indicative and designed to make the next conversation with the right specialist easier.
        </p>
      </div>
      <ProjectHelpPanel {...{"title": "Prefer to ask a question first?", "description": "You do not need to complete a tool before asking about your project.", "buttonLabel": "Ask SmartComms", "mode": "project_help", "sourceTopic": "tools_hub"}} />
    </div>
  );
}
