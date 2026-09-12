import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "School Bell Systems & Daily Announcements (NZ)",
  description:
    "How modern school bell and announcement systems work in New Zealand: automated bell schedules, zone control, live paging and what to consider when replacing an old system.",
  path: "/systems/school-bell-announcements",
});

const reviewed = "12 September 2026";

function unusedReviewedGuard() {
  return reviewed;
}
void unusedReviewedGuard;

export default function SchoolBellPage() {
  return (
    <div>
      <AuthorityHero
        eyebrow="School Communications Guide"
        title="School Bell Systems & Daily Announcements"
        description="Modern school bell systems can combine scheduled bells, live paging, emergency announcements and zoned audio across classrooms, halls and outdoor areas. This guide explains how they work, what schools should specify, and how bell requirements connect to pricing, funding and wider communications planning."
        tags={["School bells", "Scheduled announcements", "Zoned paging", "Emergency messaging", "Outdoor coverage"]}
        primaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        secondaryCta={{ label: "Check school funding", href: "/tools/funding-check" }}
        reviewed="12 September 2026"
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
      <article className="sc-container max-w-[800px] py-8 sc-prose">
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
      <h2 id="replacing">Replacing an aging bell system</h2>
      <p>
        Common scenarios we hear about from NZ schools: the old timer is failing and no longer
        supported, a timetable change exposes the limits of a single fixed schedule, or the school
        wants bells that follow zone-level control. In many cases the existing speakers and cabling
        can be kept and only the control layer replaced — see{" "}
        <Link href="/systems/traditional-vs-ip">what to keep when replacing an old PA system</Link>.
      </p>
      <h2 id="emergency">Bells and emergency communication</h2>
      <p>
        Most schools now expect the bell/paging system to also support emergency tones and spoken
        instructions for lockdown or evacuation. That requirement changes the specification
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
        <Link href="/pricing-tool">ballpark cost calculator</Link> for indicative figures, and the{" "}
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
      <ContinuePlanning
        items={[
          { title: "Specification checklist", desc: "Define the scope so every quote covers the same bells, zones and emergency functions.", href: "/guides/school-pa-specification-checklist" },
          { title: "IP intercom & two-way paging", desc: "Add two-way communication at gates, reception and selected classrooms.", href: "/systems/ip-intercom" },
          { title: "5YA funding guide", desc: "How school communications upgrades may fit the 10YPP / 5YA property process.", href: "/funding" },
        ]}
      />
      <p className="mt-8 text-xs text-[var(--sc-slate)]">
        Last reviewed 12 September 2026. General information for NZ schools — not Ministry policy advice.
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: "School Bell Systems & Daily Announcements (NZ)",
              description:
                "How modern school bell and announcement systems work in New Zealand: automated schedules, zone control, live paging and replacement planning.",
              url: `${site.url}/systems/school-bell-announcements`,
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
              { name: "School Bells & Announcements", url: `${site.url}/systems/school-bell-announcements` },
            ])
          ),
        }}
      />
    </article>
    </div>
  );
}
