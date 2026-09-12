import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "IP Paging Network Readiness Checklist (NZ Schools & Sites)",
  description:
    "What to check before specifying an IP paging system: PoE budget, VLANs, QoS, switch capacity, cabling state and Wi-Fi independence — a practical checklist for NZ schools and IT partners.",
  path: "/guides/ip-paging-network-readiness",
});

const CHECKS = [
  {
    title: "Switch ports and locations",
    items: [
      "Count available ports at each switch location near where endpoints will be installed",
      "Identify buildings or blocks with no nearby switch — these may need a new switch or fibre/uplink work",
      "Note port speeds: most IP speakers and intercoms are happy on 100 Mbps, but gigabit future-proofs",
    ],
  },
  {
    title: "PoE budget",
    items: [
      "Check the PoE class/wattage each proposed endpoint draws (datasheets vary from ~3W to 15W+)",
      "Total the draw per switch and compare against its PoE budget (e.g. 370W on a typical 48-port PoE+ switch)",
      "Plan headroom of at least 20% for additions and powered-up variants",
      "Outdoor or high-output speakers may need PoE injectors or outdoor-rated supply decisions",
    ],
  },
  {
    title: "VLAN and addressing",
    items: [
      "Decide whether paging endpoints sit on a dedicated voice/IoT VLAN or the general LAN",
      "Confirm enough IP addresses are available in the chosen scope",
      "Document DHCP vs static addressing — many installers prefer static or reserved addresses for endpoints",
    ],
  },
  {
    title: "Quality of Service (QoS)",
    items: [
      "Ensure DSCP prioritisation is applied to paging audio so announcements are not delayed by heavy network use",
      "This matters most on shared school networks during backup or update windows",
    ],
  },
  {
    title: "Cabling state",
    items: [
      "Test existing Cat5e/6 runs to endpoints that will reuse cabling — age and workmanship vary widely in NZ school buildings",
      "Identify runs over 90–100m, which need an intermediate switch or re-route",
      "New cabling work is usually a property works item — see the funding implications on our funding page",
    ],
  },
  {
    title: "Core infrastructure resilience",
    items: [
      "Ask what happens to paging if the switch, server or controller fails — endpoint-local storage of emergency messages is a common mitigation",
      "Confirm UPS coverage for core switches and any paging server",
      "Check that a WAN outage does not take down on-site paging (local survivability matters for emergency use)",
    ],
  },
  {
    title: "Wi-Fi independence",
    items: [
      "IP paging endpoints use cabled connections — do not plan paging over Wi-Fi",
      "If a site has poor cabling but good Wi-Fi, that is a cabling project signal, not a wireless paging plan",
    ],
  },
  {
    title: "Who supports the network layer",
    items: [
      "Agree in writing whether the paging installer or the school's IT partner manages VLANs, QoS and PoE provisioning",
      "This is the single most common cause of deployment delays on school IP paging projects",
    ],
  },
];

export default function NetworkReadinessPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="IT & Network Planning Guide"
        title="Is Your Network Ready for IP Paging?"
        description="IP paging systems rely on the site's data network, but most projects do not need a complete network rebuild. This guide helps schools and IT teams assess cabling, PoE capacity, switch ports, fibre links, multicast, SIP, VLANs, time synchronisation, resilience and remote management before the paging design is finalised."
        tags={["Cat6 cabling", "PoE", "Network switches", "SIP", "Multicast", "VLANs"]}
        primaryCta={{ label: "Estimate an IP paging system", href: "/pricing-tool" }}
        secondaryCta={{ label: "Read the IP paging guide", href: "/systems/ip-paging-pa" }}
        reviewed="12 September 2026"
        note="For school IT teams and MSPs"
        breadcrumb={[{ name: "Guides", href: "/guides" }, { name: "IP Paging Network Readiness" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Checking whether existing network infrastructure can support an IP paging rollout" },
          { label: "Best fit", value: "School IT teams, MSPs, network providers and project consultants" },
          { label: "Check first", value: "Cabling, PoE, switch capacity, inter-building links and network design" },
          { label: "Next step", value: "Identify gaps before requesting a final system quote" },
        ]}
      />
      <article className="sc-container max-w-[800px] py-8 sc-prose">
      {CHECKS.map((section) => (
        <section key={section.title} className="sc-card p-6 not-prose">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">{section.title}</h2>
          <ul className="mt-3 space-y-1 text-[var(--sc-slate)] list-disc pl-5">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
      <h2 id="why-cost">Why this changes cost</h2>
      <p>
        Network readiness is one of the main cost drivers between otherwise similar quotes. A
        network-ready site means endpoint labour; an unready site means switch upgrades, cabling and
        possible fibre work. Our <Link href="/pricing">pricing guide</Link> reflects this split, and
        the <Link href="/pricing-tool">ballpark calculator</Link> asks about it directly.
      </p>
      <h2 id="funding">Funding note for schools</h2>
      <p>
        Cabling and switch work tied to a paging upgrade typically follows the same 10YPP / 5YA
        property route as the paging system itself. See the{" "}
        <Link href="/funding">funding guide</Link> and use the{" "}
        <Link href="/tools/funding-check">funding checker</Link> for an indicative read.
      </p>
      <h2 id="after">After the checklist</h2>
      <p>
        Once you know the network position, write the full project scope with the{" "}
        <Link href="/guides/school-pa-specification-checklist">specification checklist</Link> so
        every quote you receive covers the same work. The Ministry-side context is in the{" "}
        <Link href="/guides/nz-school-pa-paging-requirements">requirements guide</Link>.
      </p>
      <ContinuePlanning
        items={[
          { title: "IP paging architecture guide", desc: "How Audio over IP, PoE endpoints and zoning actually work.", href: "/systems/ip-paging-pa" },
          { title: "Compare paging platforms", desc: "Which platforms fit which networks, budgets and support models.", href: "/compare" },
          { title: "School systems overview", desc: "Features, indicative costs and upgrade decisions for schools.", href: "/schools" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed 12 September 2026. General guidance — always confirm specifics with your network
        administrator and installer.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "IP Paging Network Readiness Checklist (NZ Schools & Sites)",
              description:
                "What to check before specifying an IP paging system: PoE budget, VLANs, QoS, switch capacity, cabling state and support responsibility.",
              url: `${site.url}/guides/ip-paging-network-readiness`,
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
              { name: "IP Paging Network Readiness Checklist", url: `${site.url}/guides/ip-paging-network-readiness` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
