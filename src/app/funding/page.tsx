import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Funding Options for Communication Systems in NZ",
  description:
    "Guidance on potential funding pathways, eligibility and project information needs for paging, bell and PA systems in New Zealand.",
  path: "/funding",
});

export default function FundingPage() {
  return (
    <div className="sc-container py-16 max-w-3xl sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        Funding options for your system
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms is developing guidance to help schools and other organisations understand
        potential funding pathways, what may be eligible, and what information is usually needed
        before a project moves ahead.
      </p>
      <h2 id="eligibility">Likely eligibility</h2>
      <p>
        Eligibility depends on the specific programme. As a general rule, applications are
        stronger when the project is tied to safety, accessibility or essential infrastructure
        outcomes, and when the request is supported by a clear specification.
      </p>
      <h2>Preparing the right project information</h2>
      <ul>
        <li>A plain description of the current system and its problems</li>
        <li>An indicative scope: endpoints, zones, emergency features</li>
        <li>A realistic cost range, ideally from more than one quote</li>
        <li>What happens if the project does not proceed</li>
      </ul>
      <p>
        The <Link href="/tools/system-planner">system estimator</Link> can help you shape the
        scope before you talk to providers.
      </p>
      <div className="mt-8 rounded-xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5 text-sm text-[var(--sc-slate)]">
        SmartComms NZ is not a government agency. Funding information is general guidance only and
        should be confirmed against the relevant programme rules and official sources.
      </div>
    </div>
  );
}
