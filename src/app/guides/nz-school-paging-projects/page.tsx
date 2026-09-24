import type { Metadata } from "next";
import Link from "next/link";
import AuthorityHero from "@/components/content/AuthorityHero";
import AtAGlance from "@/components/content/AtAGlance";
import ContinuePlanning from "@/components/content/ContinuePlanning";
import { ProjectHelpPanel } from "@/components/content/ProjectHelpPanel";
import { Badge, EvidenceReferences, SectionHeading, TableRegion } from "@/components/ui/comparison";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";
import {
  SCHOOL_PAGING_PROJECTS_PATH,
  SCHOOL_PAGING_PROJECTS_RESEARCH_DATE,
  schoolPagingProjects,
  schoolProjectFaqs,
  schoolProjectSources,
  schoolProjectUseCases,
  type ProjectCapability,
  type SchoolProjectSourceId,
} from "@/lib/content/school-paging-projects";

const PAGE_TITLE = "NZ School Paging Projects: Bells, Lockdowns & PA Examples";
const PAGE_DESCRIPTION =
  "Five published NZ school paging projects compared: bells, zoned announcements, lockdown messages, outdoor coverage, intercom, retrofits and current product lifecycle.";
const pageUrl = `${site.url}${SCHOOL_PAGING_PROJECTS_PATH}`;

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: SCHOOL_PAGING_PROJECTS_PATH,
});

const sourceEntries = Object.entries(schoolProjectSources) as [SchoolProjectSourceId, (typeof schoolProjectSources)[SchoolProjectSourceId]][];
const sourceNumbers = Object.fromEntries(sourceEntries.map(([id], index) => [id, index + 1])) as Record<SchoolProjectSourceId, number>;

function Sources({ ids, label = "Evidence" }: { ids: readonly SchoolProjectSourceId[]; label?: string }) {
  return (
    <EvidenceReferences
      label={label}
      items={ids.map((id) => ({ id, ...schoolProjectSources[id], number: sourceNumbers[id] }))}
    />
  );
}

function capabilityLabel(value: ProjectCapability) {
  if (value === "described") return "Described";
  return "Not stated";
}

function projectFor(id: string) {
  const project = schoolPagingProjects.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown school project id: ${id}`);
  return project;
}

const researchDateLabel = new Intl.DateTimeFormat("en-NZ", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${SCHOOL_PAGING_PROJECTS_RESEARCH_DATE}T00:00:00Z`));

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export default function NzSchoolPagingProjectsPage() {
  const article = articleSchema({
    headline: "How New Zealand schools are using paging systems for bells, lockdowns and emergency communication",
    description: PAGE_DESCRIPTION,
    url: pageUrl,
    datePublished: publishedDate(SCHOOL_PAGING_PROJECTS_PATH),
    dateModified: reviewedDate(SCHOOL_PAGING_PROJECTS_PATH),
  });

  const projectList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#projects`,
    name: "Published New Zealand school paging project examples",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: schoolPagingProjects.length,
    itemListElement: schoolPagingProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${pageUrl}#${project.id}`,
      name: `${project.school} — ${project.system}`,
      description: project.summary,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: schoolProjectFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div>
      <AuthorityHero
        eyebrow="NZ project evidence"
        title="How NZ schools are using paging systems for bells, lockdowns & emergency communication"
        description="Five published New Zealand projects show how schools are combining automated bells, zoned paging, outdoor coverage, emergency messages and — in some cases — two-way classroom communication. SmartComms compares the projects side by side, adds current lifecycle context and extracts the questions another school should ask before copying the architecture."
        tags={["5 published NZ projects", "School bells", "Zoned paging", "Lockdown messaging", "Intercom"]}
        primaryCta={{ label: "Compare school systems", href: "/compare/schools" }}
        secondaryCta={{ label: "Estimate project cost", href: "/pricing-tool" }}
        help={{ label: "Ask about your school project", mode: "system_selection", sourceTopic: "nz_school_paging_projects" }}
        reviewed={reviewedLabel(SCHOOL_PAGING_PROJECTS_PATH)}
        note="Published project analysis · not independent installation audits"
        breadcrumb={[{ name: "Guides", href: "/guides" }, { name: "NZ school paging projects" }]}
        contents={[
          ["#answer", "What the projects show"],
          ["#matrix", "Project comparison"],
          ["#find-your-example", "Find the relevant example"],
          ["#projects", "Five project analyses"],
          ["#patterns", "Patterns across the projects"],
          ["#emergency-context", "Emergency-planning boundary"],
          ["#questions-to-ask", "Questions for your own school"],
          ["#project-faq", "Project FAQs"],
          ["#sources", "Sources and method"],
        ]}
      />

      <AtAGlance
        items={[
          { label: "Projects reviewed", value: "5 published New Zealand school project accounts" },
          { label: "System families", value: "2N, FrontRow, SPON, ZYCOO and Axis" },
          { label: "Common pattern", value: "Bells + zoned paging + clearer emergency communication" },
          { label: "Important caveat", value: "Published accounts are evidence, not SmartComms installation audits" },
        ]}
      />

      <main>
        <section id="answer" className="sc-container sc-container-reading scroll-mt-28 py-12">
          <SectionHeading
            id="answer-title"
            eyebrow="The answer in one minute"
            description="The projects are useful because they solve different versions of the same problem. The strongest lesson is not that one brand wins: it is that schools are increasingly asking one communications layer to handle routine scheduling, targeted announcements and urgent messages without making staff operate several unrelated systems."
          >
            What five NZ school projects show
          </SectionHeading>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Bells are becoming scheduled audio", "Several projects treat bells as scheduled tones, music or messages inside the paging platform rather than a standalone timer."],
              ["Zoning is an operational requirement", "Projects repeatedly separate classrooms, blocks, outdoor areas or selected groups so every announcement does not interrupt the whole school."],
              ["Emergency messages share the platform", "Lockdown and other priority messages often use the same speakers and controls, but require distinct activation, priority and cancellation rules."],
              ["Outdoor coverage needs deliberate design", "Three Kings, Cotswold Mātāhae and Thorndon explicitly include outdoor coverage rather than assuming classroom speakers will cover playgrounds or fields."],
              ["IP control does not mean all-IP speakers", "Ormiston shows network decoders feeding amplifier-driven zones, while other projects use network endpoints directly. Mixed network-control and amplifier-fed architectures can both be valid."],
              ["Product lifecycle matters", "A project can remain a useful architecture example after its original equipment has been superseded. New quotes should use current supported products, not copy an old bill of materials."],
            ].map(([title, text]) => (
              <article key={title} className="sc-card p-5">
                <h3 className="sc-card-title">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="matrix" className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12 scroll-mt-28">
          <div className="sc-container sc-container-wide">
            <SectionHeading
              id="matrix-title"
              eyebrow="Published project comparison"
              description="A feature is marked only when the published project account establishes it. “Not stated” does not mean the installed system could not do it. This keeps project evidence separate from manufacturer capability claims."
            >
              What each project actually describes
            </SectionHeading>
            <TableRegion label="Published New Zealand school paging project comparison">
              <table className="w-full min-w-[1180px] text-left text-sm leading-relaxed">
                <caption className="border-b border-[var(--sc-border)] px-4 py-3 text-left text-xs text-[var(--sc-slate)]">
                  Published features in five NZ projects. The design-angle column describes the architecture or delivery issue evidenced by that project; it is not a score.
                </caption>
                <thead className="bg-[var(--sc-blue-900)] text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3">Project</th>
                    <th scope="col" className="px-4 py-3">System</th>
                    <th scope="col" className="px-4 py-3">Project design angle</th>
                    <th scope="col" className="px-4 py-3">Bells</th>
                    <th scope="col" className="px-4 py-3">Zoned paging</th>
                    <th scope="col" className="px-4 py-3">Outdoor</th>
                    <th scope="col" className="px-4 py-3">Emergency / lockdown</th>
                    <th scope="col" className="px-4 py-3">Two-way</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolPagingProjects.map((project, index) => (
                    <tr key={project.id} className={`border-t border-[var(--sc-border)] align-top ${index % 2 ? "bg-slate-50" : "bg-white"}`}>
                      <th scope="row" className="px-4 py-4">
                        <a href={`#${project.id}`} className="font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">{project.school}</a>
                        <span className="mt-1 block text-xs font-normal text-[var(--sc-slate)]">Published by {project.publisher}</span>
                      </th>
                      <td className="px-4 py-4 text-[var(--sc-slate)]">{project.system}</td>
                      <td className="max-w-[280px] px-4 py-4 text-[var(--sc-slate)]">{project.designAngle}</td>
                      <td className="px-4 py-4 text-[var(--sc-slate)]">{capabilityLabel(project.capabilities.bells)}</td>
                      <td className="px-4 py-4 text-[var(--sc-slate)]">{capabilityLabel(project.capabilities.zonedPaging)}</td>
                      <td className="px-4 py-4 text-[var(--sc-slate)]">{capabilityLabel(project.capabilities.outdoor)}</td>
                      <td className="px-4 py-4 text-[var(--sc-slate)]">{capabilityLabel(project.capabilities.emergency)}</td>
                      <td className="px-4 py-4 text-[var(--sc-slate)]">{capabilityLabel(project.capabilities.twoWay)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableRegion>
          </div>
        </section>

        <section id="find-your-example" className="sc-container sc-container-reading scroll-mt-28 py-12">
          <SectionHeading
            id="find-your-example-title"
            eyebrow="Match the problem, not the brand"
            description="No project here is a universal template. Use the examples that match the design problem you are trying to solve, then verify the current products, support and site conditions separately."
          >
            Which published example is most relevant to your school?
          </SectionHeading>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {schoolProjectUseCases.map((useCase) => (
              <article key={useCase.title} className="sc-card p-5 md:p-6">
                <h3 className="sc-card-title">{useCase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{useCase.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-slate)]">Relevant published examples</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {useCase.projectIds.map((id) => {
                    const project = projectFor(id);
                    return (
                      <a key={id} href={`#${id}`} className="rounded-full border border-[var(--sc-border)] bg-[var(--sc-blue-50)] px-3 py-2 text-sm font-semibold text-[var(--sc-blue-700)] underline-offset-2 hover:underline">
                        {project.school}
                      </a>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[var(--sc-slate)]">
            This section maps published architecture examples to buyer problems; it is not a product ranking or a claim that the named system is the best choice for a new project.
          </p>
        </section>

        <section id="projects" className="sc-container sc-container-reading scroll-mt-28 py-12">
          <SectionHeading
            id="projects-title"
            eyebrow="Five published NZ examples"
            description="Each section separates what the publisher says from SmartComms' analysis. We do not copy the original case-study prose or reuse its photographs. Follow the evidence links for the publisher's complete account."
          >
            What another school can learn from each project
          </SectionHeading>
          <div className="mt-7 space-y-6">
            {schoolPagingProjects.map((project) => (
              <article id={project.id} key={project.id} aria-labelledby={`${project.id}-title`} className="sc-card scroll-mt-28 p-5 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sc-slate)]">Published NZ project evidence</p>
                    <h3 id={`${project.id}-title`} className="mt-1 text-2xl font-bold text-[var(--sc-blue-900)]">{project.school}</h3>
                    <p className="mt-1 text-sm font-semibold text-[var(--sc-blue-700)]">{project.system}</p>
                  </div>
                  <Badge>{project.evidenceLabel}</Badge>
                </div>

                <dl className="mt-5 grid gap-x-5 gap-y-3 rounded-xl border border-[var(--sc-border)] bg-slate-50 p-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-[var(--sc-blue-900)]">Published by</dt>
                    <dd className="mt-1 text-[var(--sc-slate)]">{project.publisher} · {project.publisherRole}</dd>
                  </div>
                  {project.integrator ? (
                    <div>
                      <dt className="font-semibold text-[var(--sc-blue-900)]">{project.integratorLabel ?? "Delivery party"}</dt>
                      <dd className="mt-1 text-[var(--sc-slate)]">{project.integrator}</dd>
                    </div>
                  ) : null}
                  {project.projectTiming ? (
                    <div>
                      <dt className="font-semibold text-[var(--sc-blue-900)]">Project timing</dt>
                      <dd className="mt-1 text-[var(--sc-slate)]">{project.projectTiming}</dd>
                    </div>
                  ) : null}
                  {project.publicationTiming ? (
                    <div>
                      <dt className="font-semibold text-[var(--sc-blue-900)]">Source publication</dt>
                      <dd className="mt-1 text-[var(--sc-slate)]">{project.publicationTiming}</dd>
                    </div>
                  ) : null}
                  <div className="sm:col-span-2">
                    <dt className="font-semibold text-[var(--sc-blue-900)]">Design angle evidenced by this project</dt>
                    <dd className="mt-1 text-[var(--sc-slate)]">{project.designAngle}</dd>
                  </div>
                </dl>
                <p className="mt-2 text-xs leading-relaxed text-[var(--sc-slate)]">{project.timingNote}</p>
                <p className="mt-4 leading-relaxed text-[var(--sc-slate)]">{project.summary}</p>
                <Sources ids={project.sources} />

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-[var(--sc-blue-900)]">What the published account establishes</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">
                      {project.publishedFacts.map((fact) => <li key={fact}>{fact}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5">
                    <h4 className="font-semibold text-[var(--sc-blue-900)]">SmartComms analysis</h4>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{project.smartcommsLesson}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  <div>
                    <h4 className="font-semibold text-[var(--sc-blue-900)]">Questions for a similar school</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">
                      {project.buyerQuestions.map((question) => <li key={question}>{question}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--sc-blue-900)]">Current-specification note</h4>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{project.lifecycleNote}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="patterns" className="border-y border-[var(--sc-border)] bg-slate-50 py-12 scroll-mt-28">
          <div className="sc-container sc-container-reading">
            <SectionHeading
              id="patterns-title"
              eyebrow="Cross-project analysis"
              description="The value of comparing several projects is seeing the design decisions that repeat even when the brand and integrator change."
            >
              Patterns that are easy to miss in a single case study
            </SectionHeading>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ["The control workflow matters as much as the speaker", "The projects repeatedly describe office consoles, GUIs, browser tools or paging phones. Ask staff to demonstrate a timetable change, a selected-zone announcement and an emergency activation before accepting the system."],
                ["IP control does not dictate one loudspeaker architecture", "Ormiston uses network decoders feeding conventional amplifier channels, while other projects use network-connected endpoints. Decide what needs individual network control before assuming every room needs the same endpoint type."],
                ["Staged property work can change the architecture brief", "Lincoln is specifically about equipment planned for later removal and re-installation. That is a relocation requirement, not evidence that an existing speaker or cable plant was retained."],
                ["Outdoor coverage is not just 'turn it up'", "Projects that explicitly address playgrounds and grounds use dedicated outdoor zones or horn speakers. Outdoor audibility should be designed and tested rather than inferred from indoor coverage."],
                ["Emergency capability must stay tied to the emergency plan", "Several projects combine normal bells with priority messages. The technology should implement the school's agreed signals and procedures rather than define the emergency plan by itself."],
              ].map(([title, text]) => (
                <article key={title} className="sc-card bg-white p-5">
                  <h3 className="sc-card-title">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="emergency-context" className="sc-container sc-container-reading scroll-mt-28 py-12">
          <SectionHeading
            id="emergency-context-title"
            eyebrow="Safety boundary"
            description="A paging system can make emergency instructions easier to deliver, but it does not replace the school's emergency-management responsibilities."
          >
            Lockdown communication is one part of the emergency plan
          </SectionHeading>
          <div className="mt-6 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5 md:p-6">
            <p className="leading-relaxed text-[var(--sc-slate)]">
              Ministry of Education guidance says school boards must maintain an emergency management plan, including roles, evacuation procedures and communication arrangements. Its emergency-planning guidance also asks schools to consider whether distinct alert signals can be heard inside and outside the site. For a communications project, that means the brief should begin with the school&apos;s approved procedures and the areas/people that must receive each message — not with a brand or speaker count.
            </p>
            <Sources ids={["moe-emergency", "moe-emergency-guide"]} label="Official guidance" />
          </div>
          <div className="mt-5 sc-actions">
            <Link href="/systems/emergency-lockdown" className="sc-btn-secondary">Read the emergency communication guide</Link>
            <Link href="/guides/school-pa-specification-checklist" className="sc-btn-secondary">Use the specification checklist</Link>
          </div>
        </section>

        <section id="questions-to-ask" className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-12 scroll-mt-28">
          <div className="sc-container sc-container-reading">
            <SectionHeading id="questions-to-ask-title" eyebrow="Turn examples into a brief">
              Questions to ask before copying any of these projects
            </SectionHeading>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Which rooms, blocks and outdoor areas must be independently addressable?",
                "Which messages are routine, priority or emergency — and who is allowed to trigger each one?",
                "Do any classrooms need two-way calling, or is one-way paging sufficient?",
                "What existing speakers, amplifiers, cabling or network infrastructure are worth keeping?",
                "What still works if the internet, a server, a switch or mains power fails?",
                "How are timetable exceptions, holidays and special-event bell schedules managed by normal school staff?",
                "Which product families in the proposal are current and supported in New Zealand today?",
                "What will the school own after commissioning: admin credentials, backups, documentation, licences and support contacts?",
              ].map((question, index) => (
                <li key={question} className="sc-card flex gap-3 bg-white p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--sc-blue-900)] text-sm font-bold text-white">{index + 1}</span>
                  <span className="pt-1 text-sm leading-relaxed text-[var(--sc-slate)]">{question}</span>
                </li>
              ))}
            </ol>
            <ProjectHelpPanel
              title="Planning a similar school upgrade?"
              description="Tell the SmartComms team what is installed now, what needs to work better and your region. We can help identify the most useful next step or provider to contact."
              buttonLabel="Ask about your school project"
              mode="system_selection"
              sourceTopic="nz_school_paging_projects"
              context={{ sourcePage: SCHOOL_PAGING_PROJECTS_PATH, topic: "NZ school paging project examples" }}
              secondary={{ href: "/pricing-tool", label: "Estimate project cost" }}
            />
          </div>
        </section>

        <section id="project-faq" className="sc-container sc-container-reading scroll-mt-28 py-12">
          <SectionHeading id="project-faq-title" eyebrow="Buyer questions">
            NZ school paging project FAQs
          </SectionHeading>
          <div className="mt-6 divide-y divide-[var(--sc-border)]">
            {schoolProjectFaqs.map((faq) => (
              <section key={faq.question} className="py-5">
                <h3 className="text-lg font-semibold text-[var(--sc-blue-900)]">{faq.question}</h3>
                <p className="mt-2 leading-relaxed text-[var(--sc-slate)]">{faq.answer}</p>
              </section>
            ))}
          </div>
        </section>

        <section id="sources" className="border-t border-[var(--sc-border)] bg-slate-50 py-12 scroll-mt-28">
          <div className="sc-container sc-container-reading">
            <SectionHeading
              id="sources-title"
              eyebrow="Method and evidence"
              description="Project facts come from the linked public accounts. SmartComms adds cross-project comparison, current lifecycle checks and buyer-focused analysis. We have not independently inspected the installations or reproduced the publishers' photographs or case-study prose."
            >
              Sources and limitations
            </SectionHeading>
            <div className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5 md:p-6">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">How this page handles evidence</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--sc-slate)]">
                <li>Project facts are limited to what the named public project account establishes; missing features stay “Not stated”.</li>
                <li>Publication dates and project/completion dates are kept separate so an article date is not presented as an installation date.</li>
                <li>Publisher, named dealer and integrator roles are shown separately where the source makes that distinction.</li>
                <li>Historical project equipment is checked against current manufacturer/lifecycle evidence before it is discussed as a specification reference.</li>
                <li>SmartComms analysis and buyer questions are editorial synthesis, not statements attributed to the original project publisher.</li>
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">Evidence rechecked {researchDateLabel}.</p>
            </div>

            <details className="mt-5 rounded-xl border border-[var(--sc-border)] bg-white p-5 md:p-6">
              <summary className="cursor-pointer rounded text-lg font-bold text-[var(--sc-blue-900)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                Evidence register ({sourceEntries.length})
              </summary>
              <ol className="mt-5 grid gap-3 md:grid-cols-2">
                {sourceEntries.map(([id, source]) => (
                  <li key={id} className="rounded-lg border border-[var(--sc-border)] p-3">
                    <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">
                      [{sourceNumbers[id]}] {source.label}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <span className="mt-1 block text-xs text-[var(--sc-slate)]">{source.kind} · checked {researchDateLabel}</span>
                  </li>
                ))}
              </ol>
            </details>

            <ContinuePlanning
              help={{
                title: "Need to turn the research into your own school brief?",
                description: "Use the comparison, pricing and funding tools — or ask SmartComms about the requirement you are trying to solve.",
                buttonLabel: "Ask about your school project",
                mode: "system_selection",
                sourceTopic: "nz_school_paging_projects",
              }}
              items={[
                { title: "Compare school platforms", desc: "See how current school paging, bell and intercom platforms differ.", href: "/compare/schools" },
                { title: "Pricing Tool", desc: "Build an indicative installed project range for your own school.", href: "/pricing-tool" },
                { title: "School funding", desc: "Check whether the project may have a relevant 5YA / 10YPP pathway.", href: "/tools/funding-check" },
                { title: "School bell guide", desc: "Plan schedules, zones, announcements and replacement of older bell systems.", href: "/systems/school-bell-announcements" },
                { title: "Emergency communication", desc: "Plan lockdown and priority-message requirements around the school's emergency procedures.", href: "/systems/emergency-lockdown" },
                { title: "Specification checklist", desc: "Turn the lessons into a like-for-like project brief for suppliers.", href: "/guides/school-pa-specification-checklist" },
              ]}
            />
          </div>
        </section>
      </main>

      <JsonLd data={article} />
      <JsonLd data={breadcrumbSchema([
        { name: "SmartComms NZ", url: site.url },
        { name: "Guides", url: `${site.url}/guides` },
        { name: "NZ school paging projects", url: pageUrl },
      ])} />
      <JsonLd data={projectList} />
      <JsonLd data={faqPage} />
    </div>
  );
}
