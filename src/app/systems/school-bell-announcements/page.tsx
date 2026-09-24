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
  title: "School Bell, Paging & Announcement Systems NZ",
  description:
    "Plan NZ school bell, paging and announcement systems: schedules, zones, live paging, emergency messages, existing-PA reuse, pricing and funding.",
  path: "/systems/school-bell-announcements",
});

export default function SchoolBellPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="School Communications Guide"
        title="School Bell, Paging & Announcement Systems"
        description="Modern school bell and paging systems can combine scheduled bells, live announcements, emergency messages and zoned audio across classrooms, halls and outdoor areas. This NZ guide explains how the systems work, what schools should specify, what can sometimes be retained, and how bells connect to pricing, funding and wider communications planning."
        tags={["School bells", "Scheduled announcements", "Zoned paging", "Emergency messaging", "Outdoor coverage"]}
        primaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        secondaryCta={{ label: "Check school funding", href: "/tools/funding-check" }}
        help={{"label": "Ask about your school bell project", "mode": "system_selection", "sourceTopic": "school_bell_announcements"}}
        contents={[["#how", "How modern school bell systems work"], ["#schedules", "What schools typically need from a schedule"], ["#announcements", "Live announcements and daily use"], ["#nz-examples", "Published NZ school examples"], ["#replacing", "Replacing an aging bell system"], ["#emergency", "Bells and emergency communication"], ["#requirements", "What the Ministry expects"], ["#cost-funding", "Costs and funding"], ["#specifying", "Specifying the system"], ["#bell-faq", "School bell FAQs"]]}
        reviewed={reviewedLabel("/systems/school-bell-announcements")}
        note="NZ-focused guidance"
        breadcrumb={[{ name: "Systems", href: "/systems" }, { name: "School Bells & Announcements" }]}
      />
      <AtAGlance
        items={[
          { label: "Typical use", value: "Scheduled bells, announcements and day-to-day school communication" },
          { label: "Best fit", value: "Schools replacing standalone bells or combining bells and paging into one platform" },
          { label: "Works with", value: "IP speakers, existing PA infrastructure and hybrid systems" },
          { label: "Next step", value: "Estimate cost or check potential funding" },
        ]}
      />
      <article className="sc-container sc-container-prose py-8 sc-prose">
      <h2 id="how">How modern school bell systems work</h2>
      <p>
        Modern school bells are usually software schedules playing through a paging platform.
        Instead of a dedicated bell timer wired to a relay, the schedule lives in the system&apos;s
        management interface, plays a chime, tone or custom audio file, and can be targeted at any
        combination of zones. On IP-based platforms this is typically per-endpoint; on hybrid
        systems the schedule drives retained 100V speaker lines.
      </p>
      <p>
        The underlying architecture choices are covered in our{" "}
        <Link href="/systems/ip-paging-pa">IP paging and network PA guide</Link>.
      </p>
      <h2 id="schedules">What schools typically need from a schedule</h2>
      <ul>
        <li>
          <strong>Term-aware calendars.</strong> Different timetables for odd/even days, week A/B
          rotations, and automatic suppression during holidays and public holidays.
        </li>
        <li>
          <strong>Multiple zones.</strong> Senior block starts at a different time, or the gym runs
          its own schedule on event days.
        </li>
        <li>
          <strong>Custom tones and music.</strong> Distinct sounds for end of interval, lockout of
          wet weather, or music played at interval — not just one buzzer for everything.
        </li>
        <li>
          <strong>Override controls.</strong> A front-desk console or phone that can pause, advance
          or cancel bells for assembly days and emergencies.
        </li>
        <li>
          <strong>Countdown or pre-warning.</strong> A short warning tone before the final bell to
          help with transitions.
        </li>
      </ul>
      <h2 id="announcements">Live announcements and daily use</h2>
      <p>
        Beyond bells, the same system carries daily announcements. Modern platforms let office
        staff page any zone from a desk console, a phone handset or a software client, with
        priority levels so routine announcements never preempt emergency messaging. Two-way options
        — where a classroom can respond — are covered in our{" "}
        <Link href="/systems/ip-intercom">IP intercom guide</Link>.
      </p>
      <PublishedEvidenceCards
        id="nz-examples"
        title="What published NZ school projects show"
        description="Real projects show that a modern school bell system is usually part of a wider communications design rather than a standalone buzzer. These accounts are attributed to the businesses that published them; SmartComms has not independently audited the installations."
        items={[NZ_PUBLIC_EVIDENCE.threeKings, NZ_PUBLIC_EVIDENCE.ormiston]}
      />
      <p className="not-prose mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">
        Want the wider picture? <Link href="/guides/nz-school-paging-projects" className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Compare five published NZ school paging projects</Link> across bells, zoning, outdoor coverage, emergency messaging, intercom and product lifecycle.
      </p>
      <h2 id="replacing">Replacing an aging bell system</h2>
      <p>
        Common replacement scenarios include an old timer that is failing or no longer supported, a timetable change that exposes the limits of one fixed schedule, or a school that needs different bell behaviour across separate zones. In many cases the existing speakers and cabling
        can be kept and only the control layer replaced — see{" "}
        <Link href="/systems/traditional-vs-ip">what to keep when replacing an old PA system</Link>.
      </p>
      <h2 id="emergency">Bells and emergency communication</h2>
      <p>
        Many school communications briefs ask the bell/paging system to also support emergency tones or spoken instructions for lockdown and evacuation. That requirement changes the specification
        meaningfully — redundant paths, pre-recorded messages and clearly marked activation points.
        Our <Link href="/systems/emergency-lockdown">emergency and lockdown communication guide</Link>{" "}
        covers the planning considerations.
      </p>
      <h2 id="requirements">What the Ministry expects</h2>
      <p>
        School communications systems sit within Ministry property and procurement frameworks. Our{" "}
        <Link href="/guides/nz-school-pa-paging-requirements">
          NZ school PA and paging requirements guide
        </Link>{" "}
        synthesises the relevant Ministry design, cabling and funding documentation in one place.
      </p>
      <h2 id="cost-funding">Costs and funding</h2>
      <p>
        Bell functionality is usually a feature of the platform rather than a separate purchase, so
        cost is driven by endpoint count, zones and cabling state. Use the{" "}
        <Link href="/pricing-tool">Pricing Tool</Link> for indicative figures, and the{" "}
        <Link href="/tools/funding-check">funding checker</Link> to see whether a project might fit
        a 5YA / 10YPP property funding route. No tool on this site can promise funding outcomes.
      </p>
      <h2 id="specifying">Specifying the system</h2>
      <p>
        When comparing quotes, make sure every proposal covers the same bell and announcement scope —
        schedules, zones, override points and emergency tones. The{" "}
        <Link href="/guides/school-pa-specification-checklist">specification checklist</Link> gives
        you a like-for-like comparison framework.
      </p>
      <section id="bell-faq" className="not-prose mt-10 scroll-mt-28">
        <p className="sc-eyebrow">Common questions</p>
        <h2 className="sc-section-title mt-2">School bell and paging FAQs</h2>
        <div className="mt-5 space-y-4">
          {[
            ["What replaces a traditional school bell controller?", "On many modern systems, bell schedules are managed in software within the paging platform. The exact controller may be a server, gateway, scheduler or distributed management application, so quotes should identify the actual control component and what happens if it is unavailable."],
            ["Can a school keep its existing speakers?", "Sometimes. A hybrid design can retain suitable 100V speakers, amplifiers or cabling while replacing the control layer. Reuse depends on condition, coverage, zoning and whether the existing circuits can support the control the school now needs."],
            ["Can school bells use music or spoken announcements instead of a buzzer?", "Yes on many modern platforms. Scheduled WAV/MP3 audio, tones and prerecorded announcements are common capabilities, but the proposed system should be demonstrated with the school's actual timetable and exception-day requirements."],
            ["Can the same system handle bells and lockdown messages?", "Often, yes. Many paging platforms can prioritise prerecorded or live emergency messages over routine bells. The school still needs a documented emergency plan, distinct signals and an agreed activation/cancellation process; paging does not replace required fire-alarm or specialist life-safety systems."],
          ].map(([q, a]) => (
            <div key={q} className="sc-card p-5">
              <h3 className="sc-card-title">{q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <ContinuePlanning
        help={{"title": "Need help with bells or announcements?", "description": "Tell us about your timetable, the areas that need coverage and the system you have now.", "buttonLabel": "Ask about your school bell project", "mode": "system_selection", "sourceTopic": "school_bell_announcements"}}
        items={[
          { title: "Specification checklist", desc: "Define the scope so every quote covers the same bells, zones and emergency functions.", href: "/guides/school-pa-specification-checklist" },
          { title: "Compare school systems", desc: "See which platforms fit bells, paging, intercom, classroom audio and hybrid upgrades.", href: "/compare/schools" },
          { title: "5YA funding guide", desc: "How school communications upgrades may fit the 10YPP / 5YA property process.", href: "/funding" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed {reviewedLabel("/systems/school-bell-announcements")}. General information for NZ schools — not Ministry policy advice.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "School Bell, Paging & Announcement Systems NZ",
              description:
                "How modern school bell, paging and announcement systems work in New Zealand: schedules, zones, live paging, emergency messages, replacement planning and funding context.",
              url: `${site.url}/systems/school-bell-announcements`,
              datePublished: publishedDate("/systems/school-bell-announcements"),
              dateModified: reviewedDate("/systems/school-bell-announcements"),
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
              { name: "School Bells & Announcements", url: `${site.url}/systems/school-bell-announcements` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
