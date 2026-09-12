import type { Metadata } from "next";
import Link from "next/link";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Emergency & Lockdown Communication Systems for NZ Schools",
  description:
    "Planning guidance for school emergency paging, lockdown and evacuation communication in New Zealand: capabilities, activation methods, redundancy and specification considerations.",
  path: "/systems/emergency-lockdown",
});

const reviewed = "12 September 2026";

export default function EmergencyLockdownPage() {
  return (
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <nav className="text-sm text-[var(--sc-slate)]" aria-label="Breadcrumb">
        <Link href="/systems" className="hover:text-[var(--sc-blue-700)]">Systems</Link>
        <span aria-hidden> / </span>
        <span>Emergency &amp; Lockdown Communication</span>
      </nav>
      <h1>Emergency and lockdown communication systems</h1>
      <p className="text-lg">
        Modern paging platforms are increasingly asked to do more than bells and announcements: they
        are part of a school&apos;s emergency response. This page is system-planning guidance — what
        capabilities exist, how they are activated, and what to specify. It is not emergency
        procedure advice; always follow your school&apos;s emergency management plan and Ministry
        guidance for procedures themselves.
      </p>
      <h2 id="why-paging">Why the paging system is central to school emergencies</h2>
      <p>
        In a lockdown or evacuation, the fastest way to reach every classroom, outdoor area and
        detached building at once is usually the existing speaker system. Unlike emails, apps or
        phone trees, paging reaches rooms instantly and works for visitors and students without any
        device. That is why emergency capability has become a standard part of school paging
        specifications in New Zealand.
      </p>
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
        <Link href="/pricing-tool">ballpark calculator</Link> to see how emergency functionality
        affects indicative cost, and the <Link href="/tools/funding-check">funding checker</Link> to
        explore whether a safety-motivated upgrade might fit a property funding route.
      </p>
      <h2 id="more">Related resources</h2>
      <ul>
        <li><Link href="/systems/school-bell-announcements">School bells and announcements</Link></li>
        <li><Link href="/systems/ip-intercom">IP intercom and two-way paging</Link></li>
        <li><Link href="/guides/nz-school-pa-paging-requirements">NZ school PA and paging requirements</Link></li>
      </ul>
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed {reviewed}. System-planning information only — not emergency procedure advice.
        Follow your school&apos;s emergency management plan and official Ministry/NZ Police guidance.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "Emergency & Lockdown Communication Systems for NZ Schools",
              description:
                "Planning guidance for school emergency paging, lockdown and evacuation communication in New Zealand: capabilities, activation methods, redundancy and specification.",
              url: `${site.url}/systems/emergency-lockdown`,
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
              { name: "Emergency & Lockdown Communication", url: `${site.url}/systems/emergency-lockdown` },
            ])
          ),
        }}
      />
    </div>
  );
}
