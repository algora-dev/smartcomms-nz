import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Research Methodology",
  description:
    "How SmartComms NZ researches, verifies and labels technical, funding and indicative pricing information.",
  path: "/about/methodology",
});

export default function MethodologyPage() {
  return (
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Research methodology</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ distinguishes between verified rules, indicative assumptions and formal project information so users can see how much confidence to place in a claim.
      </p>
      <h2>Technical and funding research</h2>
      <ul>
        <li>Published manufacturer and provider documentation</li>
        <li>Official New Zealand government guidance and property/funding information</li>
        <li>Practical input from people involved in communication-system projects</li>
        <li>Project examples and completed-job data as they become available and can be verified</li>
      </ul>
      <h2>Pricing methodology</h2>
      <p>
        The current ballpark calculator uses a central pricing configuration with disclosed installation assumptions. Indicative pricing for each feature and product is gathered from two to three independent sources and is not based on any single provider, which is why outputs are indicative ranges rather than exact prices. Those outputs are not represented as market averages. Where we later publish benchmarks based on completed projects, we will state the sample, period and limitations separately.
      </p>
      <h2>Funding methodology</h2>
      <p>
        The funding checker identifies whether the nature of a proposed communications project appears consistent with publicly available Ministry guidance. It does not determine eligibility or approval. Final funding decisions remain with the school and the relevant property/funding process.
      </p>
      <h2>Corrections</h2>
      <p>
        If something on this site is wrong or out of date, use the contact page to tell us what needs changing and why.
      </p>
    </div>
  );
}
