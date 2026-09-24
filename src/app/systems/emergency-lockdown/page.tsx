import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { PublishedEvidenceCards } from "@/components/content/PublishedEvidenceCards";
import { NZ_PUBLIC_EVIDENCE } from "@/lib/content/nz-public-evidence";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "School Lockdown & Emergency Communication Systems NZ",
  description:
    "Plan NZ school lockdown and emergency communication: paging, distinct alerts, live/prerecorded messages, indoor/outdoor coverage, redundancy and specification questions.",
  path: "/systems/emergency-lockdown",
});

export default function EmergencyLockdownPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="School Safety Communication Guide"
        title="School Lockdown & Emergency Communication Systems"
        description="A school lockdown and emergency communication system needs to deliver clear, fast and intelligible instructions to the right areas during lockdowns, evacuations and other incidents. This NZ guide explains paging, distinct alert signals, prerecorded and live messages, indoor/outdoor coverage, activation points and resilience."
        tags={["Lockdown announcements", "Emergency paging", "Evacuation messages", "Safety warnings", "Site-wide coverage"]}
        primaryCta={{ label: "Discuss the technical scope", href: "/contact" }}
        primaryCtaNode={
          <ProjectHelpLauncher
            mode="system_selection"
            sourceTopic="emergency_lockdown"
            buttonLabel="Discuss the technical scope"
            className="sc-btn-primary"
          />
        }
        secondaryCta={{ label: "Check school funding", href: "/tools/funding-check" }}
        contents={[["#why-paging", "Why the paging system matters"], ["#nz-guidance", "What NZ emergency guidance says"], ["#capabilities", "Common emergency capabilities"], ["#nz-examples", "Published NZ school examples"], ["#redundancy", "Redundancy and failure modes"], ["#vs-other-channels", "How paging fits with other emergency channels"], ["#specifying", "What to specify"], ["#cost-funding", "Costs and funding"], ["#lockdown-faq", "Lockdown communication FAQs"], ["#more", "Related resources"]]}
        reviewed={reviewedLabel("/systems/emergency-lockdown")}
        note="Planning guidance, not procedure advice"
        breadcrumb={[{ name: "Systems", href: "/systems" }, { name: "Emergency & Lockdown Communication" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Lockdown, evacuation and urgent safety communication" },
          { label: "Best fit", value: "Schools needing reliable site-wide emergency messaging alongside normal paging" },
          { label: "Works with", value: "Paging platforms, bells, fixed speakers, outdoor horns and approved safety procedures" },
          { label: "Next step", value: "Review coverage gaps or investigate funding" },
        ]}
      />
      <div className="sc-container sc-container-wide pt-6">
        <p className="rounded-xl border border-[var(--sc-teal)] bg-[var(--sc-blue-50)] px-5 py-4 text-sm font-medium text-[var(--sc-slate)]">
          Paging and PA systems support emergency communication but do not replace required fire
          alarm systems, emergency procedures or specialist life-safety systems.
        </p>
      </div>
      <article className="sc-container sc-container-prose py-8 sc-prose">
      <h2 id="why-paging">Why the paging system is central to school emergencies</h2>
      <p>
        In a lockdown or evacuation, the fastest way to reach every classroom, outdoor area and
        detached building at once is usually the existing speaker system. Unlike emails, apps or
        phone trees, paging reaches rooms instantly and works for visitors and students without any
        device. That makes paging an important communication layer to consider when a school reviews how urgent instructions will reach occupied indoor and outdoor areas.
      </p>
      <section id="nz-guidance" className="not-prose mt-10 scroll-mt-28 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5 sm:p-6">
        <p className="sc-eyebrow">New Zealand planning context</p>
        <h2 className="sc-section-title mt-2">What NZ emergency guidance says about communication</h2>
        <p className="mt-3 leading-relaxed text-[var(--sc-slate)]">
          Ministry of Education emergency-planning guidance requires schools to maintain an emergency plan and specifically asks schools to consider how alerts are heard inside and outside, how staff communicate during lockdown or shelter-in-place, and whether automatic bells could cause confusion during an emergency. That does not prescribe one paging brand or architecture, but it does make coverage, distinct signals and staff communication practical design questions.
        </p>
        <a href="https://www.education.govt.nz/education-professionals/schools-year-0-13/health-safety-and-wellbeing/prepare-emergency-or-traumatic-incident" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--sc-blue-700)] underline decoration-[var(--sc-teal)] decoration-2 underline-offset-4 hover:text-[var(--sc-navy)]">
          Ministry of Education: prepare for an emergency or traumatic incident<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>
      <h2 id="capabilities">Common emergency capabilities on modern platforms</h2>
      <ul>
        <li>
          <strong>Pre-recorded messages.</strong> Calm, consistent, pre-scripted lockdown and
          evacuation announcements, recorded and tested in advance rather than improvised live.
        </li>
        <li>
          <strong>Distinct alert tones.</strong> Different signals for evacuation, lockdown and
          all-clear, so the response is unambiguous.
        </li>
        <li>
          <strong>Zone targeting.</strong> Instruct only the affected building to evacuate while
          others lock down, or page outdoor zones separately.
        </li>
        <li>
          <strong>Multiple activation points.</strong> Office console, designated handsets, wall
          buttons, and in some cases integration with access control or duress systems.
        </li>
        <li>
          <strong>Priority preemption.</strong> Emergency messages automatically override bells and
          routine paging.
        </li>
        <li>
          <strong>Live voice override.</strong> Authorised staff can speak live to all zones when a
          scripted message is not appropriate.
        </li>
      </ul>
      <p>
        These capabilities are features of IP-based platforms in particular — see the{" "}
        <Link href="/systems/ip-paging-pa">IP paging architecture guide</Link> for the underlying
        model.
      </p>
      <PublishedEvidenceCards
        id="nz-examples"
        title="How NZ schools have used paging in emergency planning"
        description="Published project accounts show how emergency communication can sit alongside normal bells and paging. These are installer/distributor accounts, not SmartComms audits or substitutes for each school's emergency plan."
        items={[NZ_PUBLIC_EVIDENCE.threeKings, NZ_PUBLIC_EVIDENCE.ormiston]}
      />
      <p className="not-prose mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">
        For a broader evidence view, <Link href="/guides/nz-school-paging-projects" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">compare five published NZ school paging projects</Link> and see which accounts explicitly describe bells, zoning, outdoor coverage, lockdown or two-way communication.
      </p>
      <h2 id="redundancy">Redundancy and failure modes to ask about</h2>
      <ul>
        <li>What happens to emergency paging if the network switch, server or NVR fails?</li>
        <li>Do endpoints have local storage of emergency messages so they can play without a server?</li>
        <li>Is there battery backup for at least the core endpoints, and for how long?</li>
        <li>Can the system be activated from more than one physical location?</li>
        <li>How is a failed or offline endpoint reported so it is fixed before it matters?</li>
      </ul>
      <p>
        Reliability questions like these are a good differentiator between proposals that look
        otherwise similar on price.
      </p>
      <h2 id="vs-other-channels">How paging fits with other emergency channels</h2>
      <p>
        Paging handles the immediate, in-the-moment instruction. It complements — not replaces —
        text/email notification systems for parents, and duress alarms that alert police or
        security monitoring. A complete school plan considers all three layers. When specifying,
        ask whether the paging platform can be triggered by or integrated with your existing
        security and notification systems.
      </p>
      <h2 id="specifying">What to specify</h2>
      <p>
        Include emergency capability explicitly in your scope: which messages are pre-recorded, how
        many activation points exist and where, what tones mean what, what redundancy is included,
        and how staff training and testing are handled at handover. The{" "}
        <Link href="/guides/school-pa-specification-checklist">school PA specification checklist</Link>{" "}
        includes an emergency section so quotes can be compared like-for-like.
      </p>
      <h2 id="cost-funding">Costs and funding</h2>
      <p>
        Emergency features range from included platform features to significant uplifts when
        redundancy, dedicated hardware and integration are added. Use the{" "}
        <Link href="/pricing-tool">Pricing Tool</Link> to see how emergency functionality
        affects indicative cost, and the <Link href="/tools/funding-check">funding checker</Link> to
        explore whether a safety-motivated upgrade might fit a property funding route.
      </p>
      <section id="lockdown-faq" className="not-prose mt-10 scroll-mt-28">
        <p className="sc-eyebrow">Common questions</p>
        <h2 className="sc-section-title mt-2">School lockdown communication FAQs</h2>
        <div className="mt-5 space-y-4">
          {[
            ["What is a school lockdown communication system?", "It is the combination of procedures and communication channels used to get clear instructions to staff and students during a lockdown or shelter-in-place event. Paging/PA can be one layer because it reaches fixed indoor and outdoor areas without relying on every person carrying a device."],
            ["Should lockdown use the same sound as the fire alarm?", "Schools should follow their approved emergency plan. Ministry guidance asks schools to consider distinct warning systems and whether automatic bells could create confusion. Do not assume one tone is suitable for every emergency."],
            ["Can prerecorded messages be used for lockdowns?", "Many modern paging platforms can store and prioritise prerecorded messages, while still allowing authorised live voice override. The school should decide the approved wording, activation points, cancellation process and testing procedure as part of its emergency plan."],
            ["Does an emergency paging system replace a fire alarm?", "No. Paging can support spoken instructions and other emergency communication, but it does not automatically satisfy required fire-alarm, evacuation or specialist life-safety obligations."],
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
        <li><Link href="/systems/ip-intercom">IP intercom and two-way paging</Link></li>
        <li><Link href="/guides/nz-school-pa-paging-requirements">NZ school PA and paging requirements</Link></li>
      </ul>
      <ContinuePlanning
        help={{"title": "Need help defining the communications brief?", "description": "Tell us about the site, current system and messages that need to reach staff or occupants.", "buttonLabel": "Ask about your communications requirements", "mode": "system_selection", "sourceTopic": "emergency_lockdown"}}
        items={[
          { title: "NZ school PA requirements", desc: "Ministry design, cabling, funding and procurement context for school communications.", href: "/guides/nz-school-pa-paging-requirements" },
          { title: "School systems overview", desc: "Features, indicative costs and upgrade decisions for school communications.", href: "/schools" },
          { title: "5YA funding guide", desc: "How safety-motivated communications upgrades may fit the property funding process.", href: "/funding" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed {reviewedLabel("/systems/emergency-lockdown")}. System-planning information only — not emergency procedure advice.
        Follow your school&apos;s emergency management plan and official Ministry/NZ Police guidance.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "School Lockdown & Emergency Communication Systems NZ",
              description:
                "Planning guidance for school emergency paging, lockdown and evacuation communication in New Zealand: capabilities, activation methods, redundancy and specification.",
              url: `${site.url}/systems/emergency-lockdown`,
              datePublished: publishedDate("/systems/emergency-lockdown"),
              dateModified: reviewedDate("/systems/emergency-lockdown"),
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
              { name: "Emergency & Lockdown Communication", url: `${site.url}/systems/emergency-lockdown` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
