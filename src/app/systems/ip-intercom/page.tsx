import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "IP Intercom & Two-Way Paging Systems (NZ)",
  description:
    "What IP intercoms add to a paging system: two-way audio, SIP integration, classroom call points, gate entry and what to consider when specifying intercom for NZ sites.",
  path: "/systems/ip-intercom",
});

export default function IpIntercomPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="Two-Way Communication Guide"
        title="IP Intercom & Two-Way Paging Systems"
        description="IP intercom systems add two-way communication to a wider paging network, allowing reception, classrooms, gates, offices and other locations to call or speak back. This guide explains fixed call points, SIP intercoms, classroom call buttons, video entry and how intercom functions can share the same infrastructure as paging and announcements."
        tags={["IP intercom", "Two-way paging", "SIP intercom", "Call points", "Video entry"]}
        primaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        secondaryCta={{ label: "Compare system platforms", href: "/compare" }}
        reviewed="12 September 2026"
        note="NZ-focused guidance"
        breadcrumb={[{ name: "Systems", href: "/systems" }, { name: "IP Intercom & Two-Way Paging" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Reception, classroom, gate and staff two-way communication" },
          { label: "Best fit", value: "Sites wanting paging and intercom functions within one wider communications platform" },
          { label: "Works with", value: "SIP, IP speakers, call buttons, paging consoles and video entry stations" },
          { label: "Next step", value: "Define the required call points and estimate the project" },
        ]}
      />
      <article className="sc-container max-w-[800px] py-8 sc-prose">
      <h2 id="how">How IP intercom works</h2>
      <p>
        An IP intercom endpoint is a network device with a speaker, a microphone and a call button
        (or a hook-off handset). When activated, it establishes a two-way audio session — usually
        SIP, the same protocol used by VoIP phone systems — to a target: a desk console, a phone
        handset, a software client, or a group of them. Because it rides the network, an intercom
        zone can include any mix of endpoints and can be reconfigured without re-cabling.
      </p>
      <p>
        The underlying architecture is covered in the{" "}
        <Link href="/systems/ip-paging-pa">IP paging and network PA guide</Link>. Endpoints are
        typically PoE-powered, so the same{" "}
        <Link href="/guides/ip-paging-network-readiness">network readiness considerations</Link>{" "}
        apply.
      </p>
      <h2 id="school-use">Where intercom earns its place in schools</h2>
      <ul>
        <li>
          <strong>Classroom call points.</strong> A teacher can summon help or the office without a
          phone call, and the office can respond hands-free.
        </li>
        <li>
          <strong>Gate and visitor entry.</strong> Intercom at the main gate or reception door,
          often combined with access control for after-hours entry.
        </li>
        <li>
          <strong>Staff-only zones.</strong> Boiler rooms, halls and workshops with a way to reach
          the office that does not rely on mobile coverage.
        </li>
        <li>
          <strong>Checking in during lockdown.</strong> Selected endpoints allow rooms to report
          status to the office — subject to your emergency plan&apos;s design.
        </li>
      </ul>
      <p>
        Emergency design considerations generally are covered in the{" "}
        <Link href="/systems/emergency-lockdown">emergency and lockdown communication guide</Link>.
      </p>
      <h2 id="sip">SIP, Teams and VoIP integration</h2>
      <p>
        Because most IP intercom speaks SIP, it can integrate with a school or business phone
        system: a gate call can ring a reception handset, a classroom call can appear on a Teams or
        VoIP client, and missed intercom calls can follow voicemail paths. When specifying, state
        clearly which phone environment the intercom must integrate with and who supports that
        integration — the paging installer, the phone system vendor, or both.
      </p>
      <h2 id="vs-one-way">Two-way vs one-way: specifying the mix</h2>
      <p>
        Most deployments do not need intercom at every speaker location. A common pattern is one-way
        speakers everywhere plus two-way endpoints at gates, reception, and selected classrooms or
        specialist rooms. Intercom endpoints cost more than plain speakers and add call-handling
        complexity, so the specification should list exactly where two-way is required and why.
        The <Link href="/guides/school-pa-specification-checklist">specification checklist</Link>{" "}
        includes an intercom section for this reason.
      </p>
      <h2 id="cost">Cost impact</h2>
      <p>
        Intercom uplift depends on endpoint count and integration work. The{" "}
        <Link href="/pricing-tool">ballpark calculator</Link> lets you model feature scope against
        indicative NZ installed cost ranges, and the{" "}
        <Link href="/tools/funding-check">funding checker</Link> indicates whether an intercom
        component might fit a school property funding route.
      </p>
      <h2 id="more">Related resources</h2>
      <ul>
        <li><Link href="/systems/school-bell-announcements">School bells and announcements</Link></li>
        <li><Link href="/systems/emergency-lockdown">Emergency and lockdown communication</Link></li>
        <li><Link href="/compare">IP paging platform comparison</Link></li>
      </ul>
      <ContinuePlanning
        items={[
          { title: "Compare system platforms", desc: "Which IP paging and intercom platforms fit NZ sites and budgets.", href: "/compare" },
          { title: "Emergency & lockdown communication", desc: "How intercom call points support school emergency planning.", href: "/systems/emergency-lockdown" },
          { title: "Pricing guide", desc: "Indicative NZ installed ranges and the main cost drivers.", href: "/pricing" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed 12 September 2026. General information only — integration feasibility always depends
        on your specific phone system and network.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "IP Intercom & Two-Way Paging Systems (NZ)",
              description:
                "What IP intercoms add to a paging system: two-way audio, SIP integration, classroom call points, gate entry and specification considerations.",
              url: `${site.url}/systems/ip-intercom`,
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
              { name: "Systems", url: `${site.url}/systems` },
              { name: "IP Intercom & Two-Way Paging", url: `${site.url}/systems/ip-intercom` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
