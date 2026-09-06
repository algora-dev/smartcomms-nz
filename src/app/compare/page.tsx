import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "System Comparisons",
  description:
    "How paging, bell and intercom platforms compare on architecture, zoning, emergency features and NZ cost.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <div className="sc-container py-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        System comparisons
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        We compare communication platforms on architecture, zoning, emergency features and NZ
        cost. Brand-level comparisons are in development.
      </p>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        Until then, the most useful comparison is between architecture types: traditional 100V, full
        IP and hybrid. That choice drives more of your cost and capability than the brand does.
      </p>
      <div className="mt-8">
        <Link href="/systems" className="sc-btn-primary">Compare system architectures</Link>
      </div>
    </div>
  );
}
