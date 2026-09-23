import type { Metadata } from "next";
import Link from "next/link";
import { TableRegion } from "@/components/ui/TableRegion";
import { ProjectHelpPanel } from "@/components/content/ProjectHelpPanel";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import AuthorityHero from "@/components/content/AuthorityHero";

export const metadata: Metadata = buildMetadata({
  title: "Traditional PA vs IP Paging Systems",
  description:
    "Compare traditional 100V PA, full IP and hybrid paging systems: what to reuse, when each architecture wins, and network and cost considerations for NZ sites.",
  path: "/systems/traditional-vs-ip",
});

const COMPARISON: { factor: string; traditional: string; ip: string; hybrid: string }[] = [
  { factor: "One-way paging", traditional: "Strong", ip: "Strong", hybrid: "Strong" },
  { factor: "Fine-grained zoning", traditional: "Moderate", ip: "Excellent", hybrid: "Very good" },
  { factor: "Scheduled bells", traditional: "Requires controller", ip: "Excellent", hybrid: "Excellent" },
  { factor: "Two-way intercom", traditional: "Separate system", ip: "Strong", hybrid: "Strong with IP endpoints" },
  { factor: "Existing speaker reuse", traditional: "Native", ip: "Usually replace or bridge", hybrid: "Excellent" },
  { factor: "Network dependency", traditional: "Low", ip: "High", hybrid: "Moderate" },
  { factor: "Expansion flexibility", traditional: "Moderate", ip: "Excellent", hybrid: "Very good" },
  { factor: "Best fit", traditional: "Simple or basic sites", ip: "Modern distributed sites", hybrid: "Staged retrofit" },
];

const REUSE_ITEMS = [
  ["100V speakers", "Wall speakers, ceiling speakers and horns in good condition can often be retained in a hybrid design."],
  ["Speaker cabling", "Existing 100V cabling is frequently reusable if it tests healthy."],
  ["Amplifier / rack components", "Sometimes reusable, but central amplifiers and schedulers are often the failure points being replaced."],
  ["Ethernet cabling", "Suitable Cat5e/Cat6 runs to endpoint locations can serve IP devices directly."],
  ["Fibre between buildings", "Existing fibre links usually carry IP paging traffic without changes."],
  ["Network switches", "Switches with spare ports and PoE budget may support IP endpoints."],
  ["Endpoint mounting locations", "Existing speaker and intercom positions simplify redesign, whichever architecture is chosen."],
];

export default function TraditionalVsIpPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="Decision guide"
        title="Traditional PA vs IP Paging: Which Should You Use?"
        description="Replacing an old PA system does not always mean replacing every speaker and cable. This guide compares traditional 100V, full-IP and hybrid paging systems so you can decide what is worth retaining and what should change."
        tags={["Traditional 100V PA", "IP paging", "Hybrid systems", "Staged upgrades", "Network readiness"]}
        primaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        secondaryCta={{ label: "Compare platforms", href: "/compare" }}
        help={{"label": "Ask about keeping your existing PA", "mode": "system_selection", "sourceTopic": "traditional_vs_ip"}}
        reviewed={reviewedLabel("/systems/traditional-vs-ip")}
        note="NZ-focused guidance"
        breadcrumb={[{ name: "Systems", href: "/systems" }, { name: "Traditional vs IP" }]}
      />

      <article className="sc-container sc-container-reading py-10 sc-prose">
        <h2>Quick comparison</h2>
        <TableRegion label="Traditional 100V, IP and hybrid architecture comparison">
          <table className="sc-standard-table min-w-[660px]">
            <caption className="sr-only">Traditional 100V, full IP and hybrid system capabilities</caption>
            <thead>
              <tr>
                <th scope="col">Factor</th>
                <th scope="col">Traditional 100V</th>
                <th scope="col">Full IP</th>
                <th scope="col">Hybrid</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.factor}>
                  <th scope="row" className="font-medium">{row.factor}</th>
                  <td>{row.traditional}</td>
                  <td>{row.ip}</td>
                  <td>{row.hybrid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableRegion>
        <p className="text-sm">
          Capabilities vary by product and platform, so treat this as an architectural comparison
          rather than a guarantee about any specific system.
        </p>

        <h2>What can often be reused?</h2>
        <p>
          A full rip-out is rarely mandatory. Depending on the existing installation, a hybrid
          design can retain working infrastructure while replacing the control layer and adding IP
          functionality where it delivers the most value.
        </p>
        <ul>
          {REUSE_ITEMS.map(([item, note]) => (
            <li key={item}><strong>{item}:</strong> {note}</li>
          ))}
        </ul>
        <p>
          Reuse must be assessed rather than assumed. Cable testing, speaker condition, impedance
          checks and network capacity all determine what can realistically stay.
        </p>

        <h2>When full IP makes sense</h2>
        <p>Choose a full-IP architecture when several of the following apply:</p>
        <ul>
          <li>It is a new build or major refurbishment with cabling in scope</li>
          <li>The site already has strong Cat5e/Cat6 and PoE infrastructure</li>
          <li>Many separately addressable zones are needed</li>
          <li>Bell schedules, calendars and automated announcements matter</li>
          <li>Emergency and lockdown messaging must integrate with the system</li>
          <li>Endpoint-level control, monitoring or paging station flexibility is required</li>
          <li>Two-way intercom should share the same platform</li>
          <li>The site spans multiple buildings on one network</li>
        </ul>

        <h2>When hybrid is smarter</h2>
        <p>Choose a hybrid architecture when:</p>
        <ul>
          <li>A large, usable 100V speaker estate already exists</li>
          <li>Cable replacement would be difficult or expensive (solid walls, heritage buildings, tight ceilings)</li>
          <li>The upgrade must be phased over time or across budget years</li>
          <li>Modern scheduling and control are required but the speakers still work well</li>
          <li>Only selected locations need IP endpoints or intercom first</li>
        </ul>

        <h2>Reliability and network considerations</h2>
        <p>
          Full-IP systems depend on the site network. Switch capacity, PoE budget, fibre uplinks
          between buildings and power backup all affect availability, and behaviour during a network
          failure depends on the platform, with some endpoints supporting local or offline operation.
          Commissioning and IT involvement should be planned from the start.
        </p>
        <p>
          Our <Link href="/guides/ip-paging-network-readiness">IP paging network readiness guide</Link>{" "}
          walks through the switching, cabling, multicast and resilience checks worth completing
          before specifying a system.
        </p>

        <h2>Cost drivers</h2>
        <p>
          Rather than fixed project numbers, the main drivers that move pricing between sites are:
        </p>
        <ul>
          <li>New cabling requirements versus reuse of existing runs</li>
          <li>Number and type of endpoints (speakers, horns, intercoms, call points)</li>
          <li>Hall and outdoor coverage, which needs more or larger speakers</li>
          <li>Network upgrades such as switches, PoE or fibre</li>
          <li>Retained analogue infrastructure, which reduces replace-and-install work</li>
          <li>Integration requirements such as fire, lockdown or access systems</li>
        </ul>
        <p>
          Use the <Link href="/pricing-tool">ballpark cost calculator</Link> to get an indicative
          installed range for your own configuration.
        </p>

        <h2>Decision guide</h2>
        <ul>
          <li><strong>Consider traditional 100V when:</strong> the requirement is simple one-way paging and the existing analogue system is serviceable or the site only needs a basic installation.</li>
          <li><strong>Consider full IP when:</strong> the network is suitable and advanced control, scheduling, emergency messaging or integration is required.</li>
          <li><strong>Consider hybrid when:</strong> useful existing infrastructure should be retained while controls and features are modernised, or the upgrade needs to be staged.</li>
        </ul>

        <div className="mt-10 sc-actions not-prose">
          <Link href="/pricing-tool" className="sc-btn-primary">Estimate project cost</Link>
          <Link href="/systems" className="sc-btn-secondary">Back to system types</Link>
        </div>
      <ProjectHelpPanel {...{"title": "Not sure what can be retained?", "description": "Describe your current equipment and what the upgraded system needs to do.", "buttonLabel": "Ask about keeping your existing PA", "mode": "system_selection", "sourceTopic": "traditional_vs_ip"}} />
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "Traditional PA vs IP Paging: Which Should You Use?",
              description: "Compare traditional 100V PA, full IP and hybrid paging systems for NZ sites.",
              url: `${site.url}/systems/traditional-vs-ip`,
              datePublished: publishedDate("/systems/traditional-vs-ip"),
              dateModified: reviewedDate("/systems/traditional-vs-ip"),
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "SmartComms NZ", url: site.url },
              { name: "Systems", url: `${site.url}/systems` },
              { name: "Traditional vs IP", url: `${site.url}/systems/traditional-vs-ip` },
            ]),
          ),
        }}
      />
    </div>
  );
}
