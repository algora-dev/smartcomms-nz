import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Replacing an Old PA System: What to Keep and What to Replace",
  description:
    "Guidance for NZ sites replacing an aging PA system: reusing speakers and cabling, choosing an architecture and planning the upgrade.",
  path: "/systems/traditional-vs-ip",
});

export default function ReplacePaPage() {
  return (
    <div className="sc-container py-16 max-w-3xl sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        Replacing an old PA system
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        If your PA system is aging, failing or no longer supported, the good news is that a full
        rip-out is not always required. This page walks through the practical decisions.
      </p>
      <h2>What can often be kept</h2>
      <ul>
        <li>100V speakers in good condition can usually be retained in a hybrid design</li>
        <li>Existing 100V cabling is frequently reusable if it tests healthy</li>
        <li>Wall speakers, horns and bells may just need a new control layer</li>
      </ul>
      <h2>What usually gets replaced</h2>
      <ul>
        <li>The central amplifier and its scheduler, which tend to be the failure points</li>
        <li>Microphones and desk consoles that are no longer supported</li>
        <li>Any components without spare parts availability</li>
      </ul>
      <h2>Choosing the replacement architecture</h2>
      <p>
        The three main paths are a like-for-like traditional replacement, a full IP system, or a
        hybrid that keeps your working endpoints and replaces the brain. See{" "}
        <Link href="/systems">system architectures</Link> for how they compare.
      </p>
      <h2>Next step</h2>
      <p>
        Use the <Link href="/tools/system-planner">system estimator</Link> to get an indicative
        architecture based on your site.
      </p>
    </div>
  );
}
