import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Research Methodology",
  description:
    "How SmartComms NZ researches, verifies and labels technical, funding, finance and indicative pricing information.",
  path: "/about/methodology",
});

export default function MethodologyPage() {
  return (
    <div className="sc-container sc-container-prose py-16 sc-prose">
      <h1 className="sc-title">Research methodology</h1>
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
        The calculator is an indicative planning model. It combines current SmartComms equipment and installation assumptions to show the likely order of magnitude for the modelled scope. It is not a formal quote, a statistical market average or a promise that every product architecture will price the same way. Individual assumptions may be informed by multiple supplier or project sources; we do not treat those inputs as a statistically representative market average unless we explicitly publish the sample and method. Where we later publish benchmarks based on completed projects, we will state the sample, period and limitations separately.
      </p>
      <h2>Comparison methodology</h2>
      <p>
        Brand and platform comparisons prioritise first-party manufacturer documentation for capabilities, architecture, limits and supported integrations. Relative price positioning uses public product pricing where comparable examples are available, together with trusted-partner project pricing where public list prices are not published. We separate day-to-day operator ease from technical commissioning complexity, because an enterprise system can be easy for staff to use after it has been professionally configured.
      </p>
      <p>
        Value-for-money ratings are use-case specific rather than absolute. A premium voice-alarm platform may be excellent value where certification and redundancy are required but poor value for a straightforward school bell and paging project. We do not treat isolated online reviews as representative market evidence; public installer feedback is used only as supporting context.
      </p>
      <h2>Funding methodology</h2>
      <p>
        The funding checker identifies whether the nature of a proposed communications project appears consistent with publicly available Ministry guidance. It does not determine eligibility or approval. Final funding decisions remain with the school and the relevant property/funding process.
      </p>
      <h2>Finance-check methodology</h2>
      <p>
        The finance checker is a conversation tool, not a credit or affordability assessment. It uses the organisation type, rough project value, stated payment range and possible upfront contribution to decide what kind of finance conversation may be useful. Every result can still lead to a specialist discussion. SmartComms does not provide finance, quote rates or decide whether an application will be approved.
      </p>
      <h2>Corrections</h2>
      <p>
        If something on this site is wrong or out of date, use the contact page to tell us what needs changing and why.
      </p>
    </div>
  );
}
