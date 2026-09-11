import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Compare Paging System Architectures NZ",
  description:
    "Compare traditional 100V, full IP/PoE and hybrid paging architectures by flexibility, network requirements, reuse potential and project fit.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Compare paging system approaches</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        Before comparing brands, it is usually more useful to compare the system architecture. Traditional 100V, full IP/PoE and hybrid systems solve the same communication problem in different ways and can produce very different upgrade paths and costs.
      </p>
      <h2>What to compare first</h2>
      <ul>
        <li>How much existing speaker and cabling infrastructure can be reused</li>
        <li>How flexible zoning, scheduling and emergency messaging need to be</li>
        <li>Whether the site has suitable network and PoE infrastructure</li>
        <li>Whether the project is a staged upgrade or full replacement</li>
        <li>How much local control, intercom and future expansion is required</li>
      </ul>
      <p>
        See the full <Link href="/systems">architecture comparison</Link> or use the pricing tool to see how site conditions change an indicative installed budget.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 not-prose">
        <Link href="/systems" className="sc-btn-primary">Compare architectures</Link>
        <Link href="/pricing-tool" className="sc-btn-secondary">Estimate project cost</Link>
      </div>
    </div>
  );
}
