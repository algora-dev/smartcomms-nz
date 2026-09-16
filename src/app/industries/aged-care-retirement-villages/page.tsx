import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";
import { calculateEstimate } from "@/lib/pricing/calculate";
import { formatNZD } from "@/lib/pricing/config";
import { buildIndustryToolHref } from "@/lib/industry-context";
import { CARE_PRICING_EXAMPLE, careExamplePricingHref } from "@/lib/content/aged-care-example";
import {
  AGED_CARE_PATH, AGED_CARE_TITLE, AGED_CARE_HEADLINE, AGED_CARE_DESCRIPTION,
  careSources, carePlatforms, careUseCases, careQuestions,
  type CareSourceId, type CarePlatformId,
} from "@/lib/content/aged-care-guide";

/** Server-rendered editorial page. Shared enquiry modal is the only client island. */
export const metadata: Metadata = buildMetadata({
  title: AGED_CARE_TITLE, description: AGED_CARE_DESCRIPTION, path: AGED_CARE_PATH,
});
const pageUrl = `${site.url.replace(/\/$/, "")}${AGED_CARE_PATH}`;
const pricingHref = buildIndustryToolHref("/pricing-tool", { industry: "aged-care", source: "other" });
const financeHref = buildIndustryToolHref("/tools/finance-check", { industry: "aged-care", source: "other" });
const financingHref = buildIndustryToolHref("/financing", { industry: "aged-care", source: "other" });
const evidenceEntries = Object.entries(careSources) as [CareSourceId, (typeof careSources)[CareSourceId]][];
const numbers = Object.fromEntries(evidenceEntries.map(([id], index) => [id, index + 1])) as Record<CareSourceId, number>;
const platformNames = Object.fromEntries(carePlatforms.map(({ id, name }) => [id, name])) as Record<CarePlatformId, string>;
const linkClass = "rounded font-semibold text-[var(--sc-blue-700)] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

function Sources({ ids }: { ids: readonly CareSourceId[] }) {
  if (!ids.length) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs leading-relaxed text-[var(--sc-slate)]">
      <span>Evidence:</span>
      {ids.map((id) => (
        <a key={id} href={careSources[id].href} target="_blank" rel="noopener noreferrer" className={linkClass}
          aria-label={`${careSources[id].label}, source ${numbers[id]} (opens in a new tab)`}
          title={careSources[id].label}>[{numbers[id]}]</a>
      ))}
    </div>
  );
}
function Heading({ id, eyebrow, children, description }: { id: string; eyebrow: string; children: ReactNode; description?: string }) {
  return <div className="max-w-4xl">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">{eyebrow}</p>
    <h2 id={id} className="mt-2 text-2xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-3xl">{children}</h2>
    {description && <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">{description}</p>}
  </div>;
}
function Help({ useCase, label = "Ask who to contact", className }: { useCase: string; label?: string; className?: string }) {
  return <ProjectHelpLauncher mode="system_selection" sourceTopic="aged_care_retirement_villages" buttonLabel={label}
    className={className ?? "sc-btn-primary cursor-pointer"}
    context={{ industry: "Aged care / retirement village", sourcePage: AGED_CARE_PATH, topic: useCase }} />;
}
function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default function AgedCareRetirementVillagesPage() {
  const example = calculateEstimate(CARE_PRICING_EXAMPLE);
  const exampleFinanceHref = buildIndustryToolHref("/tools/finance-check", {
    industry: "aged-care", source: "pricing", estimate: { low: example.low, high: example.high },
  });
  const article = {
    ...articleSchema({ headline: AGED_CARE_HEADLINE, description: AGED_CARE_DESCRIPTION, url: pageUrl,
      datePublished: publishedDate(AGED_CARE_PATH), dateModified: reviewedDate(AGED_CARE_PATH) }),
    "@id": `${pageUrl}#article`, inLanguage: "en-NZ",
    about: [
      { "@type": "Thing", name: "Aged-care and retirement-village public address systems" },
      { "@type": "Thing", name: "IP paging and entrance intercom" },
    ],
    citation: evidenceEntries.map(([, source]) => source.href),
  };
  return (
    <article aria-labelledby="care-title">
      <header className="sc-container max-w-5xl py-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">New Zealand · Aged care & retirement villages</p>
        <h1 id="care-title" className="mt-3 max-w-4xl text-4xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-5xl">{AGED_CARE_HEADLINE}</h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-[var(--sc-slate)]">
          Planning a rest-home PA upgrade, retirement-village announcement system or entrance intercom? Compare the systems against the job you need done: reaching the right areas, answering visitors, supporting staff and keeping everyday communication easy to manage.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#care-shortlists" className="sc-btn-primary">Find your shortlist</a>
          <Link href={pricingHref} className="sc-btn-secondary">Estimate project cost</Link>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--sc-slate)]">Compare <strong>Axis, 2N, Algo, TOA, SPON, Bosch PROSPERO, ITC and FrontRow</strong> for common areas, visitor access and general two-way calling. Specialist nurse call is explained separately.</p>
        <p className="mt-4 text-sm text-[var(--sc-slate)]">Already have a project? <Help useCase="General care-site communications enquiry" label="Ask SmartComms who to contact" className={`${linkClass} cursor-pointer bg-transparent`} /></p>
        <p className="mt-5 text-xs leading-relaxed text-[var(--sc-slate)]">
          SmartComms editorial guide · Reviewed <time dateTime={reviewedDate(AGED_CARE_PATH)}>{reviewedLabel(AGED_CARE_PATH)}</time> · Document-based recommendations, not hands-on test scores. <a href="#care-methodology" className={linkClass}>How we compare</a>
        </p>
        <nav aria-label="Aged-care guide contents" className="mt-6 border-t border-[var(--sc-border)] pt-5">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {[["#care-shortlists", "Best fit by use case"], ["#care-scope", "PA or nurse call?"], ["#care-platforms", "Platform profiles"], ["#care-cost", "Cost example"], ["#care-finance", "Finance & leasing"], ["#care-questions", "Buyer questions"]].map(([href, label]) => <li key={href}><a href={href} className={linkClass}>{label}</a></li>)}
          </ul>
        </nav>
      </header>

      <section id="care-shortlists" aria-labelledby="care-shortlists-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
        <div className="sc-container max-w-6xl">
          <Heading id="care-shortlists-title" eyebrow="The answer changes with the brief">Which system would we shortlist first?</Heading>
          <p className="mt-4 max-w-4xl leading-relaxed text-[var(--sc-slate)]">
            <strong>Axis</strong> is our first look for reception-led network audio; <strong>2N</strong> for entrance communication; <strong>Algo</strong> for a SIP/legacy-PA upgrade; and <strong>SPON</strong> for integrated PA with general intercom. <strong>TOA</strong> moves first when dedicated audio intercom stations are the priority.
          </p>
          <Sources ids={["axis-edge", "2n-entry", "algo-adapter", "spon-control", "toa-intercom"]} />
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--sc-slate)]">The numbered options below are our editorial order for each stated brief. They are not measured reliability, price or care-quality rankings. Existing equipment, the exact package and demonstrated local support can change the order.</p>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {careUseCases.map((useCase) => (
              <section id={useCase.id} key={useCase.id} aria-labelledby={`${useCase.id}-heading`} className="sc-card scroll-mt-24 bg-white p-5 md:p-6">
                <h3 id={`${useCase.id}-heading`} className="text-xl font-bold text-[var(--sc-blue-900)]">{useCase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{useCase.brief}</p>
                <ol className="mt-5 space-y-3">
                  {useCase.choices.map((choice, index) => (
                    <li key={choice.platform} className="flex items-start gap-3">
                      <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--sc-blue-50)] text-sm font-bold text-[var(--sc-blue-900)]">{index + 1}</span>
                      <p className="text-sm leading-relaxed text-[var(--sc-slate)]"><span className="sr-only">Option {index + 1}: </span><a href={`#care-${choice.platform}`} className={linkClass}>{platformNames[choice.platform]}</a><span className="block">{choice.reason}</span></p>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 border-t border-[var(--sc-border)] pt-4 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>What changes the order?</strong> {useCase.changes}</p>
                <Sources ids={useCase.sources} />
                <div className="mt-4"><Help useCase={useCase.title} label="Help with this requirement" className={`${linkClass} cursor-pointer bg-transparent text-sm`} /></div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="care-scope" aria-labelledby="care-scope-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
        <Heading id="care-scope-title" eyebrow="Define the system before the brand">PA, staff paging and nurse call are different jobs</Heading>
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">A search for “aged-care paging systems” can mean loudspeaker announcements, private messages to staff, or a resident’s call for assistance. Specify which you need. Dedicated nurse-call suppliers such as Rictech and Rauland describe specialist call and staff-notification functions that go beyond a general PA/intercom quote.</p>
        <Sources ids={["rictech", "rauland"]} />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["PA and announcements", "Live or scheduled audio to chosen common areas, staff areas or outdoor locations. This is the main cost/comparison scope here."],
            ["Entrance and general intercom", "Two-way communication with a defined answering point. Quote visitor video, access hardware and optional room calling explicitly."],
            ["Nurse call and staff alerts", "Resident assistance, pendants, call escalation or staff-device alerts need a separately specified response system—not just a speaker with a microphone."],
          ].map(([title, text]) => <div key={title} className="sc-card p-5"><h3 className="font-bold text-[var(--sc-blue-900)]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{text}</p></div>)}
        </div>
        <div className="mt-6 rounded-xl border border-[var(--sc-border)] bg-slate-50 p-5">
          <h3 className="font-bold text-[var(--sc-blue-900)]">A useful NZ example: quieter staff notification</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">In its September 2017 account of a Levin memory-care centre, Summerset describes silent nurse-call paging carried by staff. It illustrates why more overhead announcements are not always the right answer. This is a historical operator-published example, not an audit of the current installation or an endorsement of any PA brand in this guide.</p>
          <Sources ids={["summerset"]} />
        </div>
        <details className="mt-6 rounded-xl border border-[var(--sc-border)] p-5">
          <summary className={`cursor-pointer ${linkClass}`}>Independent village, residential care or a mixed site?</summary>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">Health New Zealand distinguishes retirement-village living from aged residential care. Our planning recommendation is to reflect that distinction in the communications brief: an independent-living village may prioritise entrances and shared spaces; a care facility needs its care-response systems scoped alongside general PA; a mixed village should identify where the systems connect and where they remain separate.</p>
          <Sources ids={["care-scope"]} />
        </details>
        <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">An emergency-announcement function is also not proof that a product meets a required fire/evacuation specification. Keep that engineered scope separate. Unsure which system you are asking for? <Help useCase="Distinguish PA, intercom, nurse call or specialist alerts" label="Tell us what needs to happen" className={`${linkClass} cursor-pointer bg-transparent`} />.</p>
      </section>

      <section id="care-platforms" aria-labelledby="care-platforms-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
        <div className="sc-container max-w-5xl">
          <Heading id="care-platforms-title" eyebrow="Same brands, a different job" description="Compare the actual product family and the supported design. A NZ listing establishes a route for enquiry, not guaranteed stock, nationwide service or a care-sector market share.">Platform comparison and New Zealand support evidence</Heading>
          <div className="mt-7 space-y-5">
            {carePlatforms.map((platform) => (
              <section id={`care-${platform.id}`} key={platform.id} aria-labelledby={`care-${platform.id}-title`} className="sc-card scroll-mt-24 bg-white p-5 md:p-7">
                <h3 id={`care-${platform.id}-title`} className="text-2xl font-bold text-[var(--sc-blue-900)]">{platform.name}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--sc-blue-700)]">{platform.family}</p>
                <p className="mt-4 font-semibold text-[var(--sc-blue-900)]">{platform.fit}</p>
                <p className="mt-2 leading-relaxed text-[var(--sc-slate)]">{platform.summary}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>Trade-off:</strong> {platform.caution}</p>
                <Sources ids={platform.sources} />
                <details className="mt-4 border-t border-[var(--sc-border)] pt-4">
                  <summary className={`cursor-pointer text-sm ${linkClass}`}>Quote scope and local evidence</summary>
                  <dl className="mt-4 space-y-4 text-sm leading-relaxed">
                    <div><dt className="font-semibold text-[var(--sc-blue-900)]">What to put in the proposal</dt><dd className="mt-1 text-[var(--sc-slate)]">{platform.quote}</dd></div>
                    <div><dt className="font-semibold text-[var(--sc-blue-900)]">NZ route and evidence boundary</dt><dd className="mt-1 text-[var(--sc-slate)]">{platform.nz}</dd></div>
                  </dl>
                  <Sources ids={platform.nzSources} />
                </details>
              </section>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--sc-border)] bg-white p-5">
              <h3 className="text-lg font-bold text-[var(--sc-blue-900)]">AtlasIED and Bosch PRAESENSA</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Broaden the brief for a large-campus announcement platform or supervised voice-alarm design. GLOBALCOM and PRAESENSA belong in those specialist discussions. AtlasIED has an ANZ route through NAS; this shorter treatment is about scope, not absence from New Zealand.</p>
              <Sources ids={["atlas-system", "atlas-nz", "praesensa"]} />
            </div>
            <div className="rounded-xl border border-[var(--sc-border)] bg-white p-5">
              <h3 className="text-lg font-bold text-[var(--sc-blue-900)]">A simple 100V system can still be enough</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Keep a simple amplifier-and-speaker proposal in the comparison when the requirement is modest one-way PA. Ask what can be retained before choosing a full IP replacement. Neither “IP” nor a long feature list is a reason to buy functions the site does not need.</p>
              <Link href="/systems/traditional-vs-ip" className={`mt-3 inline-block text-sm ${linkClass}`}>Compare analogue, IP and hybrid approaches</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="care-design" aria-labelledby="care-design-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
        <Heading id="care-design-title" eyebrow="Design around people">What should the installer demonstrate?</Heading>
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">Our suggested acceptance brief is based on staff tasks rather than a generic speaker count. Include your care, facilities and IT teams where the scope crosses their responsibilities.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["The right places, not every room", "Page a lounge, a staff area and the outdoor space separately. Agree whether resident bedrooms receive routine announcements at all; do not use bed count as an automatic speaker quantity."],
            ["Quiet hours and clear speech", "Demonstrate the routine timetable, message priority and authorised overrides. Include hearing-accessibility needs in the brief rather than assuming more volume solves them."],
            ["Calls that reach someone", "Show who answers an entrance or general intercom call, what happens when reception is busy and the after-hours arrangement. Clinical escalation remains a separate nurse-call requirement."],
            ["Recovery and ongoing support", "Test internet, local-server, network-switch and power failures separately. Specify backups, software responsibility, replacement lead times and a supported upgrade path."],
          ].map(([title, text]) => <div key={title} className="sc-card p-5"><h3 className="font-bold text-[var(--sc-blue-900)]">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{text}</p></div>)}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">For microphone-equipped devices, agree who can initiate a call, where audio is heard and whether any recording is proposed. For network planning, use the <Link href="/guides/ip-paging-network-readiness" className={linkClass}>IP paging network-readiness checklist</Link>.</p>
        <div className="mt-5"><Help useCase="Care-site installer demonstration and project scope" label="Help me find the right provider" /></div>
      </section>

      <section id="care-cost" aria-labelledby="care-cost-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12">
        <div className="sc-container max-w-5xl">
          <Heading id="care-cost-title" eyebrow="A useful starting budget">What could an aged-care PA and intercom upgrade cost?</Heading>
          <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">The SmartComms calculator can model the <strong>general paging and optional intercom</strong> part of the project. Start with the actual rooms and outdoor areas that need coverage, then adjust calling and other options. It is not a per-bed price or a quotation for the entire care-communications system.</p>
          <div className="mt-6 rounded-2xl border border-[var(--sc-border)] bg-white p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">Illustrative common-area project · not a real installation</p>
            <h3 className="mt-2 text-xl font-bold text-[var(--sc-blue-900)]">Six small indoor areas, one large lounge, one outdoor area and one voice-entry point</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Assumes suitable existing data cabling, the Essential package, no room-call buttons and no monitoring service. These are eight audio coverage areas plus an entrance—not nine speakers or nine software zones. The calculator applies its normal speaker-quantity assumptions.</p>
            <p className="mt-5 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-4xl">{formatNZD(example.low)}–{formatNZD(example.high)}<span className="mt-1 block text-sm font-medium tracking-normal text-[var(--sc-slate)]">NZD, excluding GST · indicative installed planning range</span></p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Calculated from the existing SmartComms model, including its central-platform and installation allowances. It is not a measured multi-brand average or a promise of a provider quote at this price. Different architectures and site conditions can fall outside it.</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]"><strong>Not included:</strong> site-wide cabling, a clinical nurse-call/pendant system, a complete door/access-control project or an engineered fire/evacuation system. Those require their own scope. Confirm network capacity, installation access and any additional works.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={careExamplePricingHref()} className="sc-btn-primary">Adjust this example</Link>
              <Link href={pricingHref} className="sc-btn-secondary">Start my own estimate</Link>
            </div>
            <p className="mt-4 text-sm"><Link href={exampleFinanceHref} className={linkClass}>Explore payment options for this example</Link></p>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">Existing 100V equipment may change the best approach substantially. The calculator models a particular new-system scope; a hybrid-reuse quote may be different. Read the <Link href="/pricing" className={linkClass}>pricing assumptions and exclusions</Link>, or <Help useCase="Cost or reuse scope for an aged-care project" label="ask who to contact about your scope" className={`${linkClass} cursor-pointer bg-transparent`} />.</p>
        </div>
      </section>

      <section id="care-finance" aria-labelledby="care-finance-title" className="sc-container max-w-5xl scroll-mt-24 py-12">
        <Heading id="care-finance-title" eyebrow="Payment options">Finance and leasing for a village communications upgrade</Heading>
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">An equipment-finance conversation may be useful when the organisation prefers to spread a project’s cost. NZ providers publish technology/AV and healthcare equipment-finance offerings. The actual borrower, equipment, installation costs, security and ownership terms still need assessment by the provider.</p>
        <Sources ids={["finance-market"]} />
        <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">The SmartComms check asks for a little project and budget context; it does not approve finance, quote repayments or reject an enquiry because the deposit or budget is uncertain. You can request the next step at every result level.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={financeHref} className="sc-btn-primary">Explore payment options</Link>
          <Link href={financingHref} className="sc-btn-secondary">Read about finance and leasing</Link>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">This is commercial equipment planning for the organisation, not residential-care subsidy advice. School property funding is not part of this aged-care journey.</p>
      </section>

      <section id="care-questions" aria-labelledby="care-questions-title" className="scroll-mt-24 border-y border-[var(--sc-border)] bg-slate-50 py-12">
        <div className="sc-container max-w-4xl">
          <Heading id="care-questions-title" eyebrow="Buyer questions">Rest-home and retirement-village communications FAQs</Heading>
          <div className="mt-5 divide-y divide-[var(--sc-border)]">
            {careQuestions.map((faq) => <section id={faq.id} key={faq.id} className="scroll-mt-24 py-5" aria-labelledby={`${faq.id}-title`}>
              <h3 id={`${faq.id}-title`} className="text-lg font-bold text-[var(--sc-blue-900)]">{faq.question}</h3>
              <p className="mt-2 leading-relaxed text-[var(--sc-slate)]">{faq.answer}</p>
              <Sources ids={faq.sources} />
            </section>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="care-next-title" className="bg-[var(--sc-blue-900)] py-12 text-white">
        <div className="sc-container max-w-4xl text-center">
          <h2 id="care-next-title" className="text-3xl font-bold">Not sure which approach fits your site?</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-blue-100">Tell us what you need to happen, what is already installed and your region. The SmartComms team will review your enquiry and reply with suitable providers to contact and why we suggest them.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Help useCase="Aged-care or retirement-village project next step" label="Ask SmartComms who to contact" className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--sc-blue-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" />
            <Link href={pricingHref} className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white! hover:bg-white/10">Estimate project cost</Link>
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-blue-100">Your enquiry stays with SmartComms; we do not send your information to recommended providers. You choose whether to contact them. Please describe the facilities project without including resident names, medical details or security-sensitive records.</p>
        </div>
      </section>

      <section id="care-methodology" aria-labelledby="care-methodology-title" className="sc-container max-w-5xl scroll-mt-24 py-10">
        <h2 id="care-methodology-title" className="text-xl font-bold text-[var(--sc-blue-900)]">How we reached these recommendations</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">We matched documented product functions to four defined care/village communications briefs, then checked for a NZ-facing supply or integration route. The order favours a direct fit with the stated task; different integration needs can reverse it. We have not conducted a hands-on group test, measured market share or compared complete competitive tenders.</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">Manufacturer documents support capability, not universal superiority. Local listings and overseas case studies have their limits labelled. Editorial coverage is separate from SmartComms’ selected provider network, which does not cover the entire market. No business named here is being represented as a partner or endorser merely because it is cited. See our <Link href="/about/editorial-policy" className={linkClass}>editorial policy</Link> and <Link href="/about/disclosure" className={linkClass}>commercial disclosure</Link>.</p>
        <details id="care-sources" className="mt-6 scroll-mt-24 rounded-xl border border-[var(--sc-border)] p-5 md:p-6">
          <summary className={`cursor-pointer ${linkClass}`}>Sources and evidence register ({evidenceEntries.length})</summary>
          <p className="mt-4 text-sm leading-relaxed text-[var(--sc-slate)]">Research checked 16 September 2026. Product revisions, supply and service terms need confirmation in a current proposal. References open the original publisher’s material.</p>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {evidenceEntries.map(([id, source]) => <li key={id} className="min-w-0 rounded-lg border border-[var(--sc-border)] p-3">
              <a href={source.href} target="_blank" rel="noopener noreferrer" className={`text-sm ${linkClass}`}>[{numbers[id]}] {source.label}<span className="sr-only"> (opens in a new tab)</span></a>
              <span className="mt-1 block text-xs leading-relaxed text-[var(--sc-slate)]">{source.kind}</span>
            </li>)}
          </ol>
        </details>
      </section>
      <JsonLd data={article} />
      <JsonLd data={breadcrumbSchema([{ name: "SmartComms NZ", url: site.url }, { name: "Aged care & retirement villages", url: pageUrl }])} />
    </article>
  );
}
