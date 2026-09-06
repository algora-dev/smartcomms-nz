import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Commercial Relationships",
  description:
    "How SmartComms NZ discloses and manages commercial relationships with providers and partners.",
  path: "/about/disclosure",
});

export default function DisclosurePage() {
  return (
    <div className="sc-container py-16 max-w-3xl sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        Commercial relationships
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ is an independent information resource. This page will always list any
        commercial relationships that could reasonably affect how you interpret our content.
      </p>
      <h2>Current state</h2>
      <p>
        SmartComms NZ is operated by T3 Labs, a software and systems company. As the site develops
        referral or partner relationships with providers, they will be disclosed here in plain
        language before related content is published.
      </p>
      <h2>Our commitments</h2>
      <ul>
        <li>No provider pays for coverage or placement in our guides or comparisons</li>
        <li>Any commercial relationship is disclosed on this page and where relevant in content</li>
        <li>Pricing and technical claims are based on published criteria, not commercial terms</li>
      </ul>
    </div>
  );
}
