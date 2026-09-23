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
    <div className="sc-container sc-container-prose py-16 sc-prose">
      <h1 className="sc-title">Commercial relationships</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ is an information and planning resource operated by T3 Labs. Where a user wants a formal quote, installation or site assessment, SmartComms may recommend one or more suitable providers and give the user those providers&apos; public contact details.
      </p>
      <h2>How provider recommendations work</h2>
      <p>
        Using a provider suggested by SmartComms is optional. Customers are free to use any provider they choose. SmartComms reviews the information supplied and may recommend one or more providers based on project type, location, requirements and known provider capability. SmartComms sends the recommendation to the customer; it does not forward the customer&apos;s enquiry or personal information to the provider. T3 Labs is not currently paid a referral commission or placement fee for recommending providers to SmartComms users. <em>(True as at the date of this page. If referral fees, sponsored placements or other material commercial arrangements are introduced later, this disclosure will be updated before those arrangements affect the site.)</em>
      </p>
      <h2>Editorial coverage and provider relationships are separate</h2>
      <p>
        SmartComms may research and discuss manufacturers, installers, distributors and public projects that are not members of our selected provider network. Editorial inclusion does not imply a commercial relationship. Being part of the selected provider network does not purchase a favourable product comparison or guaranteed recommendation.
      </p>
      <p>
        When a user asks for practical help, SmartComms recommends from the providers available in its selected network based on the information supplied, project type, location and known provider capability. This is not represented as a search of every provider in New Zealand.
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
