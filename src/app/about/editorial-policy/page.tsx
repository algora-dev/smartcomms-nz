import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy",
  description:
    "How SmartComms NZ writes, labels, reviews and maintains guidance about communication systems, pricing and funding.",
  path: "/about/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Editorial policy</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ exists to make a technically confusing category easier to understand. The site should be useful enough that a buyer can make a better next decision, while being clear about what is indicative and what still needs professional confirmation.
      </p>
      <h2>What we publish</h2>
      <ul>
        <li>Guidance grounded in technical documentation, official sources or disclosed project assumptions</li>
        <li>Indicative pricing only when the calculation method and limitations are clear</li>
        <li>Funding guidance that distinguishes a potential fit from formal eligibility or approval</li>
        <li>Named, real reviewers rather than invented experts or personas</li>
      </ul>
      <h2>How content is maintained</h2>
      <p>
        Pricing and funding pages carry explicit review dates. When source rules or pricing assumptions change materially, the relevant page and tool configuration should be updated together.
      </p>
      <h2>What we avoid</h2>
      <ul>
        <li>Fabricated averages, sample sizes or customer outcomes</li>
        <li>Calling an indicative estimate a formal quote</li>
        <li>Calling a funding fit an approval or guarantee</li>
        <li>Recommendations that cannot be explained in plain language</li>
      </ul>
    </div>
  );
}
