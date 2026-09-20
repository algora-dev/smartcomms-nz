import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDateStrict, reviewedDateStrict, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";
import { calculateEstimate } from "@/lib/pricing/calculate";
import { formatNZD, PRICING_PROVENANCE } from "@/lib/pricing/config";
import { buildIndustryToolHref } from "@/lib/industry-context";
import { INDUSTRIAL_PRICING_EXAMPLE, industrialExamplePricingHref } from "@/lib/content/industrial-example";
import {
  INDUSTRIAL_PATH, INDUSTRIAL_TITLE, INDUSTRIAL_HEADLINE, INDUSTRIAL_DESCRIPTION,
  industrialSources, industrialPlatforms, industrialUseCases, industrialQuestions, industrialProjects,
  type IndustrialSourceId,
} from "@/lib/content/industrial-guide";

/** Sibling of the school and aged-care comparisons, not a new design system.
 * All substantive content is server-rendered; only the shared enquiry launcher
 * is a client island. No changes to calculators, API contracts or scoring.
 */
export const metadata: Metadata = buildMetadata({
  title: INDUSTRIAL_TITLE, description: INDUSTRIAL_DESCRIPTION, path: INDUSTRIAL_PATH,
});
const pageUrl = `${site.url.replace(/\/$/, "")}${INDUSTRIAL_PATH}`;
const pricingHref = buildIndustryToolHref("/pricing-tool", { industry: "industrial", source: "other" });
const financeHref = buildIndustryToolHref("/tools/finance-check", { industry: "industrial", source: "other" });
const financingHref = buildIndustryToolHref("/financing", { industry: "industrial", source: "other" });
const sourceEntries = Object.entries(industrialSources) as [IndustrialSourceId, (typeof industrialSources)[IndustrialSourceId]][];
const sourceNumbers = Object.fromEntries(sourceEntries.map(([id], index) => [id, index + 1])) as Record<IndustrialSourceId, number>;
const names = Object.fromEntries(industrialPlatforms.map(({ id, name }) => [id, name]));
const linkClass = "rounded font-semibold text-[var(--sc-blue-700)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

function Sources({ ids }: { ids: readonly IndustrialSourceId[] }) {
  if (!ids.length) return null;
  return <span className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs leading-relaxed text-[var(--sc-slate)]">
    <span>Evidence:</span>
    {ids.map((id) => <a key={id} href={industrialSources[id].href} target="_blank" rel="noopener noreferrer"
      className={linkClass} title={`${industrialSources[id].kind}: ${industrialSources[id].label}`}
      aria-label={`${industrialSources[id].label}, source ${sourceNumbers[id]} (opens in a new tab)`}>[{sourceNumbers[id]}]</a>)}
  </span>;
}
function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold leading-relaxed text-slate-700">{children}</span>;
}
function SectionHeading({ id, eyebrow, children, description }: { id: string; eyebrow: string; children: ReactNode; description?: string }) {
  return <div className="max-w-4xl">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">{eyebrow}</p>
    <h2 id={id} className="mt-2 text-2xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-3xl">{children}</h2>
    {description && <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">{description}</p>}
  </div>;
}
function TableRegion({ label, children }: { label: string; children: ReactNode }) {
  return <div className="mt-6">
    <p className="mb-2 text-xs text-[var(--sc-slate)] lg:hidden">Scroll across the table to compare all columns.</p>
    <div role="region" aria-label={label} tabIndex={0}
      className="overflow-x-auto rounded-xl border border-[var(--sc-border)] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sc-blue-700)]">{children}</div>
  </div>;
}
function Help({ topic, label = "Ask SmartComms who to contact", className }: { topic: string; label?: string; className?: string }) {
  return <ProjectHelpLauncher mode="system_selection" sourceTopic="warehouses_manufacturing_industrial"
    buttonLabel={label} className={className ?? "sc-btn-primary cursor-pointer"}
    context={{ industry: "Warehouse / industrial / manufacturing", sourcePage: INDUSTRIAL_PATH, topic }} />;
}
function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default function IndustrialComparisonPage() {
  const example = calculateEstimate(INDUSTRIAL_PRICING_EXAMPLE);
  const exampleFinanceHref = buildIndustryToolHref("/tools/finance-check", {
    industry: "industrial", source: "pricing", estimate: { low: example.low, high: example.high },
  });
  const article = {
    ...articleSchema({ headline: INDUSTRIAL_HEADLINE, description: INDUSTRIAL_DESCRIPTION, url: pageUrl,
      datePublished: publishedDateStrict(INDUSTRIAL_PATH), dateModified: reviewedDateStrict(INDUSTRIAL_PATH) }),
    "@id": `${pageUrl}#article`, inLanguage: "en-NZ",
    about: [
      { "@type": "Thing", name: "Warehouse and factory public address and IP paging systems" },
      { "@type": "Thing", name: "Industrial intercom, shift bells and operational announcements" },
    ],
    citation: sourceEntries.map(([, source]) => source.href),
  };
  const shortlist = {
    "@context": "https://schema.org", "@type": "ItemList", "@id": `${pageUrl}#shortlist`,
    name: "NZ warehouse, manufacturing and industrial communications comparison",
    itemListOrder: "https://schema.org/ItemListUnordered", numberOfItems: industrialPlatforms.length,
    itemListElement: industrialPlatforms.map((platform, index) => ({
      "@type": "ListItem", position: index + 1, name: `${platform.name}: ${platform.family}`,
      url: `${pageUrl}#industrial-${platform.id}`, description: platform.verdict,
    })),
  };
  return <article aria-labelledby="industrial-title">
    <header className="sc-container max-w-5xl py-12 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">New Zealand · Warehouses, manufacturing & industrial sites</p>
      <h1 id="industrial-title" className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-5xl">{INDUSTRIAL_HEADLINE}</h1>
      <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[var(--sc-slate)]">Planning warehouse announcements, factory break bells, workshop intercom or loading-yard paging? Start with what staff need to hear and do: a live callout, a timed signal, a two-way conversation or a visible message.</p>
      <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">Compare <strong>Algo, Axis, SPON, TOA, AtlasIED, Bosch PROSPERO and ITC</strong>, with <strong>2N</strong> for entrance communication and a simpler bell-only option below. The best starting point changes with the site, existing equipment and operating conditions.</p>
      <div className="mt-6 flex flex-wrap gap-3"><Link href={pricingHref} className="sc-btn-primary">Estimate project cost</Link><a href="#industrial-shortlists" className="sc-btn-secondary">Compare the shortlist</a></div>
      <p className="mt-5 text-xs leading-relaxed text-[var(--sc-slate)]">SmartComms editorial guide · Reviewed <time dateTime={reviewedDateStrict(INDUSTRIAL_PATH)}>{reviewedLabel(INDUSTRIAL_PATH)}</time> · Document-based recommendations, not hands-on test scores. <a href="#industrial-methodology" className={linkClass}>How we compare</a></p>
      <nav aria-label="Industrial comparison contents" className="mt-7 border-t border-[var(--sc-border)] pt-5">
        <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {[["#industrial-shortlists", "Which system fits?"], ["#industrial-capabilities", "Feature comparison"], ["#industrial-noise", "Noise & coverage"], ["#industrial-platforms", "Platform profiles"], ["#industrial-alternatives", "Simpler / specialist options"], ["#industrial-projects", "Real examples"], ["#industrial-cost", "Cost example"], ["#industrial-questions", "Buyer questions"], ["#industrial-sources", "Sources"]].map(([href, label]) => <li key={href}><a href={href} className={linkClass}>{label}</a></li>)}
        </ul>
      </nav>
    </header>

    <section id="industrial-shortlists" aria-labelledby="industrial-shortlists-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
      <div className="sc-container max-w-6xl">
        <SectionHeading id="industrial-shortlists-title" eyebrow="Start with the job, not the logo">Which system belongs on your industrial shortlist?</SectionHeading>
        <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]"><strong>For routine SIP paging and break schedules, start by comparing Algo, TOA and Axis.</strong> For a wider PA and audio/video intercom brief, compare SPON, TOA and Axis. A gate-only or display-led requirement has a different first choice. There is no measured overall winner or verified whole-system price ranking here.</p>
        <TableRegion label="Industrial use-case shortlists; scroll horizontally on smaller screens.">
          <table className="w-full min-w-[760px] text-left text-sm leading-relaxed">
            <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">Three starting points per brief, in editorial order. The reason and exceptions matter more than the position.</caption>
            <thead className="bg-[var(--sc-blue-900)] text-white"><tr><th scope="col" className="w-1/4 px-4 py-3">What matters most</th><th scope="col" className="w-1/5 px-4 py-3">Start by comparing</th><th scope="col" className="px-4 py-3">Why / what changes the order</th></tr></thead>
            <tbody>{industrialUseCases.map((useCase, index) => <tr key={useCase.id} id={`industrial-use-${useCase.id}`} className={`scroll-mt-24 border-t border-[var(--sc-border)] align-top ${index % 2 ? "bg-slate-50" : "bg-white"}`}>
              <th scope="row" className="px-4 py-4 font-semibold text-[var(--sc-blue-900)]">{useCase.title}</th>
              <td className="px-4 py-4"><ol className="list-decimal space-y-2 pl-4">{useCase.startingPoints.map((id) => <li key={id}><a href={`#industrial-${id}`} className={linkClass}>{names[id]}</a></li>)}</ol></td>
              <td className="px-4 py-4 text-[var(--sc-slate)]"><p>{useCase.why}</p><p className="mt-2 text-xs">{useCase.changes}</p><Sources ids={useCase.sources} /></td>
            </tr>)}</tbody>
          </table>
        </TableRegion>
        <div className="mt-5 text-sm text-[var(--sc-slate)]">Not sure which brief describes your site? <Help topic="Choosing an industrial shortlist" label="Ask about your project" className={`${linkClass} cursor-pointer`} /></div>
        <TableRegion label="Overall industrial platform comparison; scroll horizontally on smaller screens.">
          <table className="w-full min-w-[780px] text-left text-sm leading-relaxed">
            <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">Eight options with different scopes. This table is not a ranking; 2N is an entrance specialist rather than a whole-site bell system.</caption>
            <thead className="bg-[var(--sc-blue-900)] text-white"><tr><th scope="col" className="px-4 py-3">System / family</th><th scope="col" className="px-4 py-3">When it makes sense</th><th scope="col" className="px-4 py-3">Where value comes from</th><th scope="col" className="px-4 py-3">What to include in the quote</th></tr></thead>
            <tbody>{industrialPlatforms.map((p, i) => <tr key={p.id} className={`border-t border-[var(--sc-border)] align-top ${i % 2 ? "bg-slate-50" : "bg-white"}`}><th scope="row" className="px-4 py-4 font-normal"><a href={`#industrial-${p.id}`} className={linkClass}>{p.name}</a><span className="mt-1 block text-xs text-[var(--sc-slate)]">{p.category}</span></th><td className="px-4 py-4 text-[var(--sc-slate)]">{p.verdict}</td><td className="px-4 py-4 text-[var(--sc-slate)]">{p.value}</td><td className="px-4 py-4 text-[var(--sc-slate)]">{p.costWatch}</td></tr>)}</tbody>
          </table>
        </TableRegion>
      </div>
    </section>

    <section id="industrial-capabilities" aria-labelledby="industrial-capabilities-title" className="sc-container max-w-6xl scroll-mt-24 py-12">
      <SectionHeading id="industrial-capabilities-title" eyebrow="Apples to apples" description="Compare the specified family and software, not every product a manufacturer has ever made. Confirm the exact local package before committing.">Factory paging, shift bells, intercom and visual alerts compared</SectionHeading>
      <TableRegion label="Industrial capability comparison; scroll horizontally on smaller screens.">
        <table className="w-full min-w-[920px] text-left text-sm leading-relaxed">
          <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">Capabilities are descriptions, not test scores. Video calling, text displays and warning strobes solve different tasks.</caption>
          <thead className="bg-[var(--sc-blue-900)] text-white"><tr><th scope="col" className="px-4 py-3">Platform</th><th scope="col" className="px-4 py-3">Paging / schedules</th><th scope="col" className="px-4 py-3">Two-way calling</th><th scope="col" className="px-4 py-3">Visual communication</th><th scope="col" className="px-4 py-3">Integration / reuse</th></tr></thead>
          <tbody>{industrialPlatforms.map((p, i) => <tr key={p.id} className={`border-t border-[var(--sc-border)] align-top ${i % 2 ? "bg-slate-50" : "bg-white"}`}><th scope="row" className="px-4 py-4"><a href={`#industrial-${p.id}`} className={linkClass}>{p.name}</a></th><td className="px-4 py-4 text-[var(--sc-slate)]">{p.paging}</td><td className="px-4 py-4 text-[var(--sc-slate)]">{p.calling}</td><td className="px-4 py-4 text-[var(--sc-slate)]">{p.visual}</td><td className="px-4 py-4 text-[var(--sc-slate)]">{p.integration}<Sources ids={[...p.sources, ...p.nzSources]} /></td></tr>)}</tbody>
        </table>
      </TableRegion>
      <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">A horn’s watts, an IP rating or a product’s emergency label does not establish how well a complete installed system will work. The practical checks below are part of the buying decision—not an optional extra after choosing the brand.</p>
    </section>

    <section id="industrial-noise" aria-labelledby="industrial-noise-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
      <div className="sc-container max-w-5xl">
        <SectionHeading id="industrial-noise-title" eyebrow="What changes in a working industrial site">Clear messages, not just more volume</SectionHeading>
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">WorkSafe flags difficulty hearing warnings or instructions as a reason to investigate workplace noise. For PA selection, that means checking real listening positions and operating conditions. Adding volume is not a substitute for controlling harmful noise.<Sources ids={["noise", "noise-controls"]} /></p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            ["Warehouses & distribution centres", "Map aisles, racking, picking positions, dispatch and driver waiting areas. A loudspeaker above a rack may not give useful speech behind it. Separate music quality from voice-only paging needs."],
            ["Factories & manufacturing", "Assess machinery noise, required hearing protection, shift changes, workshop calling and shutdown periods. Test recognisable messages with the actual workforce rather than in an empty, quiet building."],
            ["Yards, depots & loading areas", "Consider wind, weather, speaker direction, driver positions and noise reaching neighbours. An outdoor rating alone does not establish resistance to every washdown, chemical or temperature condition."],
          ].map(([title, text]) => <div key={title} className="sc-card bg-white p-5"><h3 className="font-semibold text-[var(--sc-blue-900)]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{text}</p></div>)}
        </div>
        <Sources ids={["algo-design", "noise", "noise-controls"]} />
        <details className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5 md:p-6">
          <summary className="cursor-pointer rounded font-semibold text-[var(--sc-blue-900)]">Three specification traps that can change the design</summary>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--sc-slate)]">
            <p><strong>Satellite horns share power.</strong> Algo documents 16 W shared across the 8196 and its connected satellite horns. Adding three satellites does not create four independent full-power IP speakers.<Sources ids={["algo-8196"]} /></p>
            <p><strong>Power source changes output.</strong> SPON’s GEN-6393A03 table specifies 30 W on 24 V DC and 15 W on PoE/PoE+. Quote the actual power arrangement, not just the largest headline wattage.<Sources ids={["spon-horn"]} /></p>
            <p><strong>Areas, zones and endpoints are different.</strong> Axis Edge’s 20-zone / 200-speaker tier can serve more than 20 physical areas if suitable areas share a zone. It does not provide unlimited independent groups.<Sources ids={["axis-edge"]} /></p>
          </div>
        </details>
        <div className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5 text-sm leading-relaxed text-[var(--sc-slate)]">
          <h3 className="font-semibold text-[var(--sc-blue-900)]">Hazardous areas and evacuation systems need a separate specification</h3>
          <p className="mt-2">Flammable gas or combustible-dust areas require specialist equipment selection. An IP66 ingress rating is not explosion protection. Likewise, ordinary PA and an emergency-message button do not establish compliance with a required fire/evacuation system. The responsible designer must define those requirements.</p>
          <Sources ids={["hazardous", "emergency", "axis-ex", "praesensa"]} />
          <div className="mt-3">That does not end the conversation: <Help topic="Specialist industrial environment or emergency-system scope" label="ask who can help define the scope" className={`${linkClass} cursor-pointer`} />.</div>
        </div>
      </div>
    </section>

    <section id="industrial-platforms" aria-labelledby="industrial-platforms-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
      <SectionHeading id="industrial-platforms-title" eyebrow="The system behind the brand" description="These profiles separate technical capability from local supply evidence. A NZ listing establishes a route for enquiry—not stock, market share or compatibility between all products under one brand.">Detailed platform comparison and NZ market fit</SectionHeading>
      <div className="mt-7 space-y-5">{industrialPlatforms.map((p) => <article id={`industrial-${p.id}`} key={p.id} aria-labelledby={`industrial-${p.id}-title`} className="sc-card scroll-mt-24 bg-white p-5 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 id={`industrial-${p.id}-title`} className="text-2xl font-bold text-[var(--sc-blue-900)]">{p.name}</h3><p className="mt-1 text-sm font-medium text-[var(--sc-blue-700)]">{p.family}</p></div><Badge>{p.category}</Badge></div>
        <p className="mt-4 font-semibold text-[var(--sc-blue-900)]">{p.fit}</p><p className="mt-2 leading-relaxed text-[var(--sc-slate)]">{p.summary}</p><Sources ids={p.sources} />
        <div className="mt-5 grid gap-5 md:grid-cols-2"><div><h4 className="font-semibold text-[var(--sc-blue-900)]">Where it earns its place</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">{p.strengths.map((text) => <li key={text}>{text}</li>)}</ul></div><div><h4 className="font-semibold text-[var(--sc-blue-900)]">Trade-offs to check</h4><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">{p.tradeoffs.map((text) => <li key={text}>{text}</li>)}</ul></div></div>
        <div className="mt-5 rounded-lg border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-4"><h4 className="text-sm font-semibold text-[var(--sc-blue-900)]">NZ market fit / local ecosystem</h4><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{p.nz}</p><Sources ids={p.nzSources} /></div>
        <details className="mt-5 border-t border-[var(--sc-border)] pt-4"><summary className="cursor-pointer rounded font-semibold text-[var(--sc-blue-700)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Design detail: endpoints, controls and quote scope</summary>
          <dl className="mt-4 grid gap-x-6 gap-y-4 text-sm leading-relaxed md:grid-cols-2">{[["Core / control", p.core], ["Audio / horn selection", p.audio], ["Calling / answering", p.call], ["What to demonstrate", p.quote]].map(([label, text]) => <div key={label}><dt className="font-semibold text-[var(--sc-blue-900)]">{label}</dt><dd className="mt-1 text-[var(--sc-slate)]">{text}</dd></div>)}</dl>
          <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">Component examples are not a bill of materials or a guarantee of cross-family compatibility.</p><Sources ids={[...p.sources, ...p.nzSources]} />
        </details>
      </article>)}</div>
    </section>

    <section id="industrial-alternatives" aria-labelledby="industrial-alternatives-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-slate-50 py-12">
      <div className="sc-container max-w-5xl">
        <SectionHeading id="industrial-alternatives-title" eyebrow="When the brief is different">A break buzzer, a simple PA or a specialist system?</SectionHeading>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="sc-card p-5"><h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">Only need shift or break bells? Compare Netbell.</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A factory wanting scheduled tones may not need a full PA/intercom platform. Linortek’s Netbell family includes dedicated bell/buzzer controllers; Edwards NZ lists the KMB multi-tone system. Specify tone-only versus live voice explicitly: a buzzer package is not automatically a two-way intercom. Linortek also offers separate IP-paging products.</p><Sources ids={["netbell", "netbell-nz"]} /></div>
          <div className="sc-card p-5"><h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">Traditional 100V or hybrid PA</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A microphone, suitable amplifier and passive speakers can still answer a simple one-way brief. A hybrid adds network control without replacing every speaker. The useful comparison is total installed scope and control—not whether a system is labelled old or new.</p><Link href="/systems/traditional-vs-ip" className={`mt-3 inline-block text-sm ${linkClass}`}>Compare analogue, IP and hybrid PA</Link></div>
          <div className="sc-card p-5"><h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">PRAESENSA and hazardous-area equipment</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Bosch PRAESENSA addresses supervised PA/voice-alarm designs. Separately, Axis XC1311 is an example of an explosion-protected horn. These are different specialist decisions; neither a family name nor one certificate covers an entire site. Have the applicable system and area requirements established before quoting.</p><Sources ids={["praesensa", "axis-ex", "hazardous"]} /></div>
          <div className="sc-card p-5"><h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">FrontRow in an existing training environment</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">FrontRow Conductor remains relevant where an existing classroom/training-room audio installation makes its ecosystem useful. It is not our default greenfield factory-floor shortlist. That is a scope choice, not a finding that FrontRow lacks paging or intercom.</p><Sources ids={["frontrow"]} /></div>
        </div>
      </div>
    </section>

    <section id="industrial-projects" aria-labelledby="industrial-projects-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
      <SectionHeading id="industrial-projects-title" eyebrow="Published project examples" description="Different projects illustrate different design choices. These are attributed public accounts, not SmartComms installations or independent performance audits.">What real warehouse and industrial projects can teach us</SectionHeading>
      <div className="mt-6 grid gap-5 md:grid-cols-3">{industrialProjects.map((project) => <article key={project.id} className="sc-card p-5"><p className="text-xs font-semibold leading-relaxed text-[var(--sc-blue-700)]">{project.label}</p><h3 className="mt-3 text-lg font-semibold text-[var(--sc-blue-900)]">{project.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{project.body}</p><p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>Buying lesson:</strong> {project.lesson}</p><Sources ids={project.sources} /></article>)}</div>
    </section>

    <section id="industrial-cost" aria-labelledby="industrial-cost-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
      <div className="sc-container max-w-5xl">
        <SectionHeading id="industrial-cost-title" eyebrow="Price, scope and value">What might a warehouse PA or intercom upgrade cost?</SectionHeading>
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">Start with a planning range, then ask a provider to confirm speaker placement, access, power, network and retained equipment. A small workplace and a noisy, high-bay or hazardous process plant should not be priced as the same installation.</p>
        <div className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5 md:p-7">
          <h3 className="text-xl font-semibold text-[var(--sc-blue-900)]">Illustrative small-workplace configuration</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Four office/staff rooms, one large indoor work area modelled with four speakers, one sheltered loading area with two horns, and one voice-entry point. Existing suitable local cabling, Essential package, no room-call buttons or monitoring. These are example quantities—not a coverage design for an unspecified warehouse.</p>
          <p className="mt-5 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">NZ{formatNZD(example.low)}–{formatNZD(example.high)}</p>
          <p className="mt-1 text-sm text-[var(--sc-slate)]">Indicative modelled installed range · excluding GST · {example.endpoints} modelled endpoints</p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">Calculated by the same SmartComms pricing engine as the public tool. This is not a supplier quote, real project price or validated industrial bill of materials. It does not price specialist acoustic engineering, high-bay access, hazardous-area equipment, a certified evacuation system, or site-wide structured cabling.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href={industrialExamplePricingHref()} className="sc-btn-primary">Adjust this example</Link><Link href={pricingHref} className="sc-btn-secondary">Start my own estimate</Link></div>
          <p className="mt-4 text-xs text-[var(--sc-slate)]">Pricing model: {PRICING_PROVENANCE.modelVersion}. Model review date: {PRICING_PROVENANCE.reviewedAt}. Article research dates do not imply the pricing assumptions were revalidated.</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{[["Coverage and environment", "Racking, sound levels, PPE, exposed yards, washdown and mounting access can change equipment and labour."], ["Reuse and network", "Condition of speaker lines, amplifier inputs, PoE capacity, fibre/backhaul and independent zones change the design."], ["Operation and support", "Specify shift calendars, consoles, intercom, visual messages, licences, backups and replacement arrangements."]].map(([title, text]) => <div key={title} className="sc-card bg-white p-5"><h3 className="font-semibold text-[var(--sc-blue-900)]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{text}</p></div>)}</div>
        <div className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">A difficult-to-price scope is still worth discussing. <Help topic="Industrial pricing scope or existing quote" label="Ask who can help with a formal quote" className={`${linkClass} cursor-pointer`} /> or read <Link href="/pricing" className={linkClass}>how the pricing model works</Link>.</div>
      </div>
    </section>

    <section id="industrial-finance" aria-labelledby="industrial-finance-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
      <SectionHeading id="industrial-finance-title" eyebrow="Payment options">Finance and leasing for workplace communications</SectionHeading>
      <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">NZ equipment-finance providers publish options for business technology and AV equipment. Whether a particular paging project, installation cost or lease structure can be included is a provider decision. The SmartComms checker is a quick way to prepare for that conversation, not a finance offer or credit assessment.<Sources ids={["finance-nz"]} /></p>
      <div className="mt-5 flex flex-wrap gap-3"><Link href={exampleFinanceHref} className="sc-btn-primary">Explore payment options for this example</Link><Link href={financeHref} className="sc-btn-secondary">Check my own project</Link></div>
      <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">Read about <Link href={financingHref} className={linkClass}>finance and leasing for PA, paging and intercom</Link>. Not knowing the final cost or upfront contribution does not stop you asking SmartComms for a useful next step.</p>
    </section>

    <section id="industrial-design" aria-labelledby="industrial-design-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-slate-50 py-12">
      <div className="sc-container max-w-5xl">
        <SectionHeading id="industrial-design-title" eyebrow="Compare proposals, not brochures">Ask every provider to demonstrate the same workplace tasks</SectionHeading>
        <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed text-[var(--sc-slate)]">
          <li>Page dispatch only, the work floor only and the intended all-call group. Include loading areas and occupied spaces behind racking.</li>
          <li>Check speech recognition under representative noise and with required hearing protection in place. Agree whether visible or personal notification is also needed.</li>
          <li>Change a shift/break schedule, add an exception and suspend it for shutdown without altering unrelated schedules.</li>
          <li>Test an intercom call from the actual station or driver position, including a busy receiving point and after-hours handling.</li>
          <li>Demonstrate authorised message priority, cancellation and fault reporting. Coordinate tests so they are not mistaken for a real emergency.</li>
          <li>Document internet, controller, switch and power failures separately; show backups, administrative ownership and replacement arrangements.</li>
        </ol>
        <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">This is a proposed purchasing checklist, not a compliance test. Use the <Link href="/guides/ip-paging-network-readiness" className={linkClass}>IP paging network-readiness guide</Link> and have the responsible specialists define any safety-system requirements.<Sources ids={["noise", "emergency"]} /></p>
      </div>
    </section>

    <section id="industrial-questions" aria-labelledby="industrial-questions-title" className="sc-container max-w-4xl scroll-mt-24 py-12">
      <SectionHeading id="industrial-questions-title" eyebrow="Buyer questions">Warehouse and factory PA, paging and intercom FAQs</SectionHeading>
      <div className="mt-6 divide-y divide-[var(--sc-border)]">{industrialQuestions.map((q) => <section id={`industrial-faq-${q.id}`} key={q.id} aria-labelledby={`industrial-faq-${q.id}-title`} className="scroll-mt-24 py-5"><h3 id={`industrial-faq-${q.id}-title`} className="text-lg font-semibold text-[var(--sc-blue-900)]">{q.question}</h3><p className="mt-2 leading-relaxed text-[var(--sc-slate)]">{q.answer}</p><Sources ids={q.sources} /></section>)}</div>
    </section>

    <section aria-labelledby="industrial-next-title" className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-900)] py-12 text-white">
      <div className="sc-container max-w-4xl text-center"><h2 id="industrial-next-title" className="text-3xl font-bold">Define what staff need to hear and do. Then choose the system.</h2><p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/80">Tell us your region, what is already installed and the problem you need to solve. You do not need a finished specification to ask who could help.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Help topic="Industrial communications project" className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[var(--sc-blue-900)]" /><Link href={pricingHref} className="inline-flex items-center justify-center rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Estimate project cost</Link></div></div>
    </section>

    <section id="industrial-methodology" aria-labelledby="industrial-methodology-title" className="sc-container max-w-5xl scroll-mt-24 py-10">
      <h2 id="industrial-methodology-title" className="text-xl font-bold text-[var(--sc-blue-900)]">How this comparison was prepared</h2>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">The shortlist orders are SmartComms editorial judgements for the stated tasks. We prioritise relevant current manufacturer documentation, then attribute NZ product/channel evidence and published projects separately. This is not a hands-on group test, market-share survey, credit assessment or verified brand-wide price ranking.</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">We have not compared every industrial communication product. Confirm firmware, power, environmental suitability, licences and local support for the proposed system. A video intercom, a warning strobe and a readable display are not interchangeable. General communication is not a substitute for a separately required safety system.</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Editorial inclusion does not mean a business is a SmartComms provider partner. SmartComms can review an enquiry and suggest providers from its selected network for the user to contact; we do not send that enquiry to the suggested providers. See <Link href="/about/disclosure" className={linkClass}>our approach to provider relationships</Link>.</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">For other settings, use the <Link href="/compare/schools" className={linkClass}>school comparison</Link>, <Link href="/industries/aged-care-retirement-villages" className={linkClass}>aged-care comparison</Link> or <Link href="/compare" className={linkClass}>comparison hub</Link>.</p>
      <details id="industrial-sources" className="mt-6 scroll-mt-24 rounded-xl border border-[var(--sc-border)] bg-white p-5 md:p-6"><summary className="cursor-pointer rounded text-lg font-bold text-[var(--sc-blue-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Sources and evidence register ({sourceEntries.length})</summary><p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">Research reviewed {reviewedLabel(INDUSTRIAL_PATH)}. References link to the original publisher. Listings and project accounts do not independently establish present stock, performance or compatibility.</p><ol className="mt-5 grid gap-3 md:grid-cols-2">{sourceEntries.map(([id, source]) => <li key={id} className="rounded-lg border border-[var(--sc-border)] p-3"><a href={source.href} target="_blank" rel="noopener noreferrer" className={`text-sm ${linkClass}`}>[{sourceNumbers[id]}] {source.label}<span className="sr-only"> (opens in a new tab)</span></a><span className="mt-1 block text-xs text-[var(--sc-slate)]">{source.kind}</span></li>)}</ol></details>
    </section>
    <JsonLd data={article} />
    <JsonLd data={breadcrumbSchema([{ name: "SmartComms NZ", url: site.url }, { name: "Compare systems", url: `${site.url}/compare` }, { name: "Warehouses and industrial sites", url: pageUrl }])} />
    <JsonLd data={shortlist} />
  </article>;
}
