import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "NZ School PA & Paging Requirements: Ministry Standards Explained",
  description:
    "A synthesis of NZ Ministry of Education design, cabling, funding and procurement guidance relevant to school PA, paging, bell and intercom systems — in one place.",
  path: "/guides/nz-school-pa-paging-requirements",
});

export default function NzSchoolPaRequirementsPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="New Zealand School Requirements Guide"
        title="NZ School PA, Paging & Bell System Requirements"
        description="New Zealand Ministry guidance recognises public-address and safety-warning systems as part of modern school infrastructure. This guide brings together the key requirements around paging, bells, safety announcements, speech intelligibility, visual alerts, ICT cabling, property planning and procurement."
        tags={["Ministry guidance", "School PA requirements", "5YA", "10YPP", "Safety communication"]}
        primaryCta={{ label: "Check potential funding", href: "/tools/funding-check" }}
        secondaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        reviewed="12 September 2026"
        note="Independent synthesis, not Ministry advice"
        breadcrumb={[{ name: "Guides", href: "/guides" }, { name: "NZ School PA & Paging Requirements" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Planning or reviewing a school-wide PA, paging or bell project" },
          { label: "Best fit", value: "NZ state schools, IT partners, property teams and consultants" },
          { label: "Covers", value: "Ministry design guidance, ICT infrastructure, 5YA/10YPP and procurement considerations" },
          { label: "Next step", value: "Check funding potential or build an indicative budget" },
        ]}
      />
      <article className="sc-container max-w-[800px] py-8 sc-prose">
      <p className="text-sm border-l-4 border-[var(--sc-teal)] pl-4">
        <strong>Note:</strong> this is our synthesis of publicly available Ministry material. It is
        not Ministry policy advice. Always confirm current requirements on{" "}
        <a href="https://www.education.govt.nz" rel="noopener noreferrer" target="_blank">
          education.govt.nz
        </a>{" "}
        and with your property advisor before committing to a project scope.
      </p>
      <h2 id="property-design">Where paging sits in Ministry property guidance</h2>
      <p>
        School PA, bells and intercom are treated as part of the building services and ICT layers of
        school property, not as curriculum equipment. That matters because funding, design sign-off
        and procurement follow the <em>property</em> rules (10YPP plans, 5YA projects, work
        categories) rather than operational budgets. The funding side is covered in depth on our{" "}
        <Link href="/funding">5YA funding guide</Link>.
      </p>
      <h2 id="design-principles">Design principles the guidance points to</h2>
      <ul>
        <li>
          <strong>Coverage and intelligibility over raw loudness.</strong> Speech must be
          understandable in every teaching space, corridor and outdoor area the system covers —
          quiet and clear beats loud and distorted.
        </li>
        <li>
          <strong>Audibility in all occupied spaces.</strong> Design documentation for school
          communication systems is expected to address spaces with high background noise
          (workshops, gyms, kitchens) and outdoor areas.
        </li>
        <li>
          <strong>Zoning aligned to how the school operates.</strong> Blocks, halls and outdoor
          areas should be separately addressable to support events, hires and emergencies.
        </li>
        <li>
          <strong>Emergency communication capability.</strong> Paging is commonly expected to
          support lockdown and evacuation messaging consistent with the school&apos;s emergency
          management plan — see our{" "}
          <Link href="/systems/emergency-lockdown">emergency communication guide</Link>.
        </li>
        <li>
          <strong>Future-proofing and lifecycle.</strong> Ministry procurement guidance favours
          solutions with local support, spare parts availability and a realistic lifecycle over the
          cheapest option.
        </li>
      </ul>
      <h2 id="cabling">Cabling and network expectations</h2>
      <p>
        Structured cabling in NZ schools follows the same standards as commercial buildings
        (ASNZS/ISO structured cabling families), and IP-based paging rides on the school network.
        In practice this means:
      </p>
      <ul>
        <li>Cabling work is typically a property works item, with associated cost and sign-off implications.</li>
        <li>IP endpoints need VLAN, PoE and QoS consideration on school switches — our{" "}
          <Link href="/guides/ip-paging-network-readiness">network readiness checklist</Link> covers
          what installers will ask about.</li>
        <li>Reusing healthy existing cabling is normal and encouraged where it tests sound — see{" "}
          <Link href="/systems/traditional-vs-ip">what can be kept when replacing an old PA</Link>.</li>
      </ul>
      <h2 id="funding-process">The funding connection: 10YPP and 5YA</h2>
      <p>
        Because paging sits in the property layer, upgrades are usually funded through the 10 Year
        Property Plan (10YPP) process and delivered via 5 Year Agreements (5YA). Audited school
        accounts around the country show line items such as &quot;MOE 5YA Bell/PA Upgrade&quot;,
        which is direct published evidence that this route is used in practice. What the funding
        process expects from you:
      </p>
      <ul>
        <li>A documented problem or need (failing system, coverage gaps, safety requirement)</li>
        <li>A scoped proposal aligned to your 10YPP</li>
        <li>Procurement via an appropriate route (usually a GETS or panel contract for larger works)</li>
      </ul>
      <p>
        Our <Link href="/tools/funding-check">funding checker</Link> gives an indicative read on
        whether your project characteristics fit this pattern — it cannot promise funding outcomes.
      </p>
      <h2 id="procurement">Procurement expectations</h2>
      <p>
        Larger school works generally follow public-sector procurement principles: open
        competition, like-for-like comparison of quotes, and documented value-for-money. The
        practical implication for paging projects is that a clearly written specification is what
        makes quotes comparable at all. That is exactly what our{" "}
        <Link href="/guides/school-pa-specification-checklist">specification checklist</Link> is
        for.
      </p>
      <h2 id="what-to-do">Practical next steps for a school</h2>
      <ol>
        <li>Document the current system&apos;s problems and gaps (photos, incident log, coverage map)</li>
        <li>Check what infrastructure can be retained (speakers, cabling, network)</li>
        <li>Write the scope using the{" "}
          <Link href="/guides/school-pa-specification-checklist">specification checklist</Link></li>
        <li>Get indicative costs with the <Link href="/pricing-tool">ballpark calculator</Link> and
          the funding read with the <Link href="/tools/funding-check">funding checker</Link></li>
        <li>Raise the project with your property advisor for 10YPP / 5YA inclusion</li>
        <li>Compare platform options on the <Link href="/compare">comparison guide</Link> and seek
          comparable quotes</li>
      </ol>
      <h2 id="sources">Primary sources to consult directly</h2>
      <ul>
        <li>
          <a href="https://www.education.govt.nz" rel="noopener noreferrer" target="_blank">
            Ministry of Education — education.govt.nz
          </a>{" "}
          (property guidance, 10YPP, 5YA, ICT standards)
        </li>
        <li>Your school&apos;s current 10 Year Property Plan and recent audited financial statements</li>
        <li>NZ Government procurement rules via{" "}
          <a href="https://www.procurement.govt.nz" rel="noopener noreferrer" target="_blank">
            procurement.govt.nz
          </a>
        </li>
      </ul>
      <ContinuePlanning
        items={[
          { title: "5YA funding guide", desc: "How fixed communications may fit the 5YA / 10YPP property process, with real published examples.", href: "/funding" },
          { title: "Specification checklist", desc: "Turn these requirements into a scope suppliers must quote against.", href: "/guides/school-pa-specification-checklist" },
          { title: "Pricing guide", desc: "Indicative NZ installed ranges and what drives them.", href: "/pricing" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed 12 September 2026. Independent synthesis of public sources; not Ministry of Education
        advice.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "NZ School PA & Paging Requirements: Ministry Standards Explained",
              description:
                "A synthesis of NZ Ministry of Education design, cabling, funding and procurement guidance relevant to school PA, paging, bell and intercom systems.",
              url: `${site.url}/guides/nz-school-pa-paging-requirements`,
              datePublished: "2026-09-12",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Guides", url: `${site.url}/guides` },
              { name: "NZ School PA & Paging Requirements", url: `${site.url}/guides/nz-school-pa-paging-requirements` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
