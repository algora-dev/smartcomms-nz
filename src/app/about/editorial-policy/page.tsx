import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy",
  description:
    "How SmartComms NZ writes, reviews and maintains guidance content about communication systems.",
  path: "/about/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="sc-container py-16 max-w-3xl sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        Editorial policy
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ exists to make a technically confusing category simpler and more
        trustworthy. Our editorial rules follow from that.
      </p>
      <h2>What we publish</h2>
      <ul>
        <li>Guidance grounded in verifiable technical information</li>
        <li>Pricing claims only when backed by real project data</li>
        <li>Named, real reviewers. No invented experts or personas</li>
      </ul>
      <h2>How content is maintained</h2>
      <p>
        Guides and pricing pages carry dates. When information changes materially, we update the
        content rather than leaving stale claims live. Superseded pricing is replaced, not quietly
        kept.
      </p>
      <h2>What we avoid</h2>
      <ul>
        <li>Fabricated averages, sample sizes or benchmarks</li>
        <li>Promotional language dressed as guidance</li>
        <li>Recommendations we cannot explain in plain language</li>
      </ul>
    </div>
  );
}
