import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Commercial Relationships",
  description:
    "How SmartComms NZ works with installers and technology partners while keeping its guidance clear and transparent.",
  path: "/about/disclosure",
});

export default function DisclosurePage() {
  return (
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Commercial relationships</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ is an information and planning resource operated by T3 Labs. Where a user wants a formal quote, installation or site assessment, we may introduce them to a trusted installation or technology partner that can carry out the work.
      </p>
      <h2>How referrals work</h2>
      <p>
        Using a SmartComms partner is optional. Customers are free to use any provider they choose. T3 Labs is not paid a referral commission or placement fee for sending SmartComms NZ enquiries to installation partners. <em>(True as at the date of this page. If referral fees, sponsored placements or other material commercial arrangements are introduced later, this disclosure will be updated before those arrangements affect the site.)</em>
      </p>
      <h2>Editorial coverage and referral relationships are separate</h2>
      <p>
        SmartComms may research and discuss manufacturers, installers, distributors and public projects that are not members of our referral network. Editorial inclusion does not imply a commercial relationship. Being part of the referral network does not purchase a favourable product comparison or guaranteed recommendation.
      </p>
      <p>
        When a user asks for practical help, T3 Labs recommends from the providers available in its selected network based on the information supplied, the project type, location and provider capability. This is not represented as a search of every provider in New Zealand.
      </p>
      <h2>Our commitments</h2>
      <ul>
        <li>Technical and funding guidance is written to explain the project, not to force a specific supplier.</li>
        <li>Indicative pricing is based on disclosed calculator assumptions and should not be treated as a formal quote.</li>
        <li>Where a named provider or product is discussed, relevant commercial or supply relationships should be stated clearly.</li>
        <li>Customers remain free to seek other quotes and choose another installer or technology platform.</li>
      </ul>
    </div>
  );
}
