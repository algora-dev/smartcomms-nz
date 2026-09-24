import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { PublishedEvidenceCards } from "@/components/content/PublishedEvidenceCards";
import { NZ_PUBLIC_EVIDENCE } from "@/lib/content/nz-public-evidence";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "School & IP Intercom Systems NZ | Two-Way Paging",
  description:
    "Plan IP intercom systems for NZ schools and sites: classroom call points, SIP/VoIP integration, gate and video entry, two-way paging, current NZ examples and pricing considerations.",
  path: "/systems/ip-intercom",
});

export default function IpIntercomPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="Two-Way Communication Guide"
        title="IP Intercom Systems for Schools & NZ Sites"
        description="IP intercom systems add two-way communication to a wider paging network, allowing reception, classrooms, gates, offices and other locations to call or speak back. This NZ guide explains fixed call points, SIP/VoIP integration, classroom call buttons, video entry and how intercom can share infrastructure with paging and announcements."
        tags={["IP intercom", "Two-way paging", "SIP intercom", "Call points", "Video entry"]}
        primaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        secondaryCta={{ label: "Compare system platforms", href: "/compare" }}
        help={{"label": "Ask about your intercom requirements", "mode": "system_selection", "sourceTopic": "ip_intercom"}}
        contents={[["#how", "How IP intercom works"], ["#school-use", "Where intercom earns its place in schools"], ["#sip", "SIP, Teams and VoIP integration"], ["#nz-examples", "Published NZ examples"], ["#vs-one-way", "Two-way vs one-way: specifying the mix"], ["#cost", "Cost impact"], ["#intercom-faq", "IP intercom FAQs"], ["#more", "Related resources"]]}
        reviewed={reviewedLabel("/systems/ip-intercom")}
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
      <article className="sc-container sc-container-prose py-8 sc-prose">
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
        Many IP intercom platforms support SIP, which can allow calls to integrate with a school or
        business phone environment. A gate call may ring a reception handset or SIP client, while
        Microsoft Teams integration can require compatible telephony, an SBC/gateway or another
        supported service rather than working directly from every intercom. When specifying, state
        clearly which phone environment the intercom must integrate with and who supports that
        integration — the paging installer, the phone system vendor, or both.
      </p>
      <PublishedEvidenceCards
        id="nz-examples"
        title="What current NZ intercom evidence shows"
        description="Intercom requirements vary from a single visitor entrance to a wider paging/calling workflow. These examples show a current local product channel and a published NZ project where intercom was designed alongside access control and other security systems."
        items={[NZ_PUBLIC_EVIDENCE.sektorVerso, NZ_PUBLIC_EVIDENCE.summersetStJohns]}
      />
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
        <Link href="/pricing-tool">Pricing Tool</Link> lets you model feature scope against
        indicative NZ installed cost ranges. For a school project, the{" "}
        <Link href="/tools/funding-check">Funding Checker</Link> can indicate whether a property pathway is worth investigating; other organisations can use the{" "}
        <Link href="/tools/finance-check">Finance Checker</Link> to explore finance or leasing.
      </p>
      <section id="intercom-faq" className="not-prose mt-10 scroll-mt-28">
        <p className="sc-eyebrow">Common questions</p>
        <h2 className="sc-section-title mt-2">IP intercom FAQs</h2>
        <div className="mt-5 space-y-4">
          {[
            ["What is an IP intercom?", "An IP intercom is a network-connected call point with a microphone and speaker, often with a call button, camera or access-control interface. It establishes a two-way call to a reception station, phone, software client or other compatible endpoint."],
            ["Do school classrooms all need two-way intercom?", "Usually not. Many projects use one-way paging throughout the site and reserve two-way endpoints for reception, gates, selected classrooms or specialist rooms. The right mix depends on who needs to call whom and how those calls are answered."],
            ["Can an IP intercom work with the existing phone system?", "Often, if the intercom and phone environment share compatible SIP/telephony support. Confirm registration, call routing, licences and support responsibility for the exact PBX or hosted phone service rather than assuming brand-level compatibility."],
            ["Can gate intercom include video and door release?", "Yes on suitable products. A complete entrance design can combine video, two-way audio and relay/access-control functions, but those elements should be quoted and tested as one workflow including the answering location and after-hours behaviour."],
          ].map(([q, a]) => (
            <div key={q} className="sc-card p-5">
              <h3 className="sc-card-title">{q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <h2 id="more">Related resources</h2>
      <ul>
        <li><Link href="/systems/school-bell-announcements">School bells and announcements</Link></li>
        <li><Link href="/systems/emergency-lockdown">Emergency and lockdown communication</Link></li>
        <li><Link href="/compare/schools">IP paging platform comparison</Link></li>
      </ul>
      <ContinuePlanning
        help={{"title": "Work out who needs to call whom", "description": "Tell us about the call points, answering locations and any existing phone or paging system.", "buttonLabel": "Ask about your intercom requirements", "mode": "system_selection", "sourceTopic": "ip_intercom"}}
        items={[
          { title: "Compare system platforms", desc: "Which IP paging and intercom platforms fit NZ sites and budgets.", href: "/compare" },
          { title: "Emergency & lockdown communication", desc: "How intercom call points support school emergency planning.", href: "/systems/emergency-lockdown" },
          { title: "Pricing guide", desc: "Indicative NZ installed ranges and the main cost drivers.", href: "/pricing" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed {reviewedLabel("/systems/ip-intercom")}. General information only - integration feasibility always depends
        on your specific phone system and network.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "School & IP Intercom Systems NZ",
              description:
                "What IP intercoms add to a paging system: two-way audio, SIP integration, classroom call points, gate entry and specification considerations.",
              url: `${site.url}/systems/ip-intercom`,
              datePublished: publishedDate("/systems/ip-intercom"),
              dateModified: reviewedDate("/systems/ip-intercom"),
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
