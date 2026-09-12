import type { Metadata } from "next";
import Link from "next/link";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "IP Paging & Network PA Systems: How They Work",
  description:
    "A plain-language explanation of IP paging and network PA systems for NZ sites: Audio over IP, PoE endpoints, zoning, scheduling and how they compare with traditional 100V PA.",
  path: "/systems/ip-paging-pa",
});

const reviewed = "12 September 2026";

export default function IpPagingPaPage() {
  return (
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <nav className="text-sm text-[var(--sc-slate)]" aria-label="Breadcrumb">
        <Link href="/systems" className="hover:text-[var(--sc-blue-700)]">Systems</Link>
        <span aria-hidden> / </span>
        <span>IP Paging &amp; Network PA</span>
      </nav>
      <h1>IP paging and network PA systems</h1>
      <p className="text-lg">
        IP paging is the modern replacement for the traditional central-amplifier PA system. Instead
        of running speaker wires back to one rack, every speaker, intercom and call point becomes a
        device on your computer network. This page explains the architecture in plain language, what
        it needs to work well, and where it fits against traditional and hybrid designs.
      </p>
      <h2 id="what-is">What &quot;Audio over IP&quot; actually means</h2>
      <p>
        In a traditional PA system, audio travels as an analogue signal from a microphone or source
        through a central amplifier, then out over 100-volt speaker lines to every speaker. In an IP
        paging system, the audio is converted to digital packets at the source and sent over the
        same network that carries your computers, printers and phones. Each endpoint decodes the
        packets and plays the audio locally.
      </p>
      <p>
        The practical consequences are significant. Any endpoint can be addressed individually or in
        any group you define, announcements can originate from any authorised phone, console or
        software client, and the system grows building by building rather than amplifier by
        amplifier.
      </p>
      <h2 id="poe">Power over Ethernet (PoE) endpoints</h2>
      <p>
        Most modern IP speakers and intercoms are powered by the network cable itself, using Power
        over Ethernet. This means one cable per endpoint carries both audio and power, which usually
        removes the need for an electrician to wire a 240V point at every speaker location.
      </p>
      <p>
        The trade-off is that your network switches must supply enough PoE power for every connected
        endpoint. A modest school deployment can easily need a dedicated PoE switch, or switch
        upgrades, which is one of the main cost drivers in an IP project. Our{" "}
        <Link href="/guides/ip-paging-network-readiness">network readiness checklist</Link> covers
        what to check before specifying an IP system.
      </p>
      <h2 id="zoning">Zoning, scheduling and per-endpoint control</h2>
      <ul>
        <li>
          <strong>Zones are software-defined.</strong> A &quot;zone&quot; can be one classroom, one
          building, or the whole site, and can be changed without re-cabling.
        </li>
        <li>
          <strong>Calendars and schedules.</strong> Bell schedules, period changes and pre-recorded
          messages can follow timetables, including public holidays and term breaks.
        </li>
        <li>
          <strong>Per-endpoint volume and prioritisation.</strong> A hall can run quieter than a
          workshop, and emergency messages can preempt routine paging automatically.
        </li>
        <li>
          <strong>Remote management.</strong> Endpoint health, firmware and configuration are
          monitored from a web interface rather than a site visit.
        </li>
      </ul>
      <p>
        For schools, these capabilities map directly onto bell and announcement requirements — see
        our <Link href="/systems/school-bell-announcements">school bells and announcements guide</Link>.
      </p>
      <h2 id="emergency">Emergency and lockdown capability</h2>
      <p>
        Because messages are digital, IP platforms can store pre-recorded emergency announcements,
        trigger them from multiple points, and target specific zones. Many platforms integrate with
        existing security systems or provide dedicated lockdown buttons. Planning guidance is in our{" "}
        <Link href="/systems/emergency-lockdown">emergency and lockdown communication guide</Link>.
      </p>
      <h2 id="intercom">Two-way communication and intercom</h2>
      <p>
        IP intercom endpoints add two-way audio, so classrooms or gates can talk back to the office.
        Many schools use a mix of one-way speakers and two-way intercom units. See the{" "}
        <Link href="/systems/ip-intercom">IP intercom guide</Link> for how two-way paging works and
        what it adds to a deployment.
      </p>
      <h2 id="vs-traditional">IP vs traditional vs hybrid</h2>
      <p>
        A full IP system gives the most flexibility but assumes a capable network. A traditional
        100V system is simple and cheap for basic paging but limited. A hybrid keeps working 100V
        speakers and cabling while replacing the control layer with IP — often the most
        cost-effective path for staged upgrades. The{" "}
        <Link href="/systems">architecture comparison</Link> covers the trade-offs, and{" "}
        <Link href="/systems/traditional-vs-ip">what to keep when replacing an old PA</Link> deals
        specifically with reuse.
      </p>
      <h2 id="cost">What IP paging tends to cost</h2>
      <p>
        Endpoint count, indoor/outdoor mix, cabling state and network readiness are the main cost
        drivers. Indicative NZ installed ranges and a calculator for your own site are on the{" "}
        <Link href="/pricing">pricing page</Link>.
      </p>
      <h2 id="platforms">Choosing a platform</h2>
      <p>
        SPON, Algo, Axis, TOA, AtlasIED and Bosch all take the IP approach but differ in cost,
        ecosystem fit and complexity. Our{" "}
        <Link href="/compare">platform comparison guide</Link> compares them on those dimensions for
        NZ buyers.
      </p>
      <h2 id="next">Next steps</h2>
      <ul>
        <li>
          Check your network against the{" "}
          <Link href="/guides/ip-paging-network-readiness">network readiness checklist</Link>
        </li>
        <li>
          Write your scope with the{" "}
          <Link href="/guides/school-pa-specification-checklist">specification checklist</Link>
        </li>
        <li>
          Get an indicative cost with the <Link href="/pricing-tool">ballpark calculator</Link>, or{" "}
          <Link href="/tools/funding-check">check potential school funding</Link>
        </li>
      </ul>
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed {reviewed}. General information only — not design or compliance advice for any
        specific site.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "IP Paging & Network PA Systems: How They Work",
              description:
                "A plain-language explanation of IP paging and network PA systems for NZ sites: Audio over IP, PoE endpoints, zoning, scheduling and architecture trade-offs.",
              url: `${site.url}/systems/ip-paging-pa`,
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
              { name: "IP Paging & Network PA", url: `${site.url}/systems/ip-paging-pa` },
            ])
          ),
        }}
      />
    </div>
  );
}
