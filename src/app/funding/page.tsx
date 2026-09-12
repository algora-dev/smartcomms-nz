import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "5YA Funding for School PA, Paging & Bell Systems NZ",
  description:
    "How NZ state schools can investigate 5YA / 10YPP funding for paging, PA and bell systems, with published examples of Ministry-funded school projects.",
  path: "/funding",
});

const reviewed = "11 September 2026";

const faqs = [
  {
    q: "Can 5YA potentially fund a school PA, paging or bell system?",
    a: "Potentially, yes. The strongest case is where the project is fixed ICT and communications infrastructure and creates, replaces or substantially upgrades a property asset. Approval still depends on the school&#39;s property plan, priorities, available 5YA allocation and the Ministry property process.",
  },
  {
    q: "Is 5YA a separate grant that the school applies for?",
    a: "Not usually. State schools receive a 5YA capital property allocation. The 10 Year Property Plan, or 10YPP, identifies and prioritises the property projects that use that funding.",
  },
  {
    q: "What parts of a communications project have the strongest funding fit?",
    a: "Fixed paging and announcement infrastructure, bells and scheduled messages, emergency communication, permanently installed intercom points, indoor and outdoor coverage, and fixed communications or network cabling generally have the strongest argument. Movable IT hardware, software, subscriptions, training and ongoing support can need separate budget treatment.",
  },
  {
    q: "Does a strong funding fit mean the project will be approved?",
    a: "No. It means the project appears worth putting through the relevant property process. The school and Ministry property process determine whether the project is accepted and how it is funded.",
  },
  {
    q: "Are there real examples of New Zealand schools using Ministry funding for PA or bell upgrades?",
    a: "Yes. Public school financial statements include examples such as Tāmaki Primary School&#39;s MOE 5YA - PA/Bell project and Lincoln High School&#39;s MOE 5YA Bell/PA Upgrade. These examples show precedent, but they do not guarantee approval for another school.",
  },
];

export default function FundingPage() {
  return (
    <div>
      <div className="sc-container max-w-4xl py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">New Zealand state schools</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            5YA funding for school paging, PA, bell and communications systems
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--sc-slate)]">
            A school that needs a fixed communications upgrade may have a funding pathway through its Ministry 5 Year Agreement (5YA) and 10 Year Property Plan (10YPP). The opportunity is strongest where the work creates, replaces or substantially upgrades fixed communications infrastructure.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tools/funding-check" className="sc-btn-primary">Check your project</Link>
            <Link href="/pricing-tool" className="sc-btn-secondary">Estimate project cost</Link>
          </div>
          <p className="mt-4 text-xs text-[var(--sc-slate)]">Last reviewed {reviewed}. This page is general guidance, not a funding approval.</p>
        </div>
      </div>

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)]">
        <div className="sc-container max-w-4xl py-14">
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">The short version</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">1. Identify the fixed infrastructure</h3>
              <p className="mt-2 text-sm text-[var(--sc-slate)]">Paging, bells, emergency communication, fixed intercoms and permanent cabling can form part of a capital communications project.</p>
            </div>
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">2. Build the project case</h3>
              <p className="mt-2 text-sm text-[var(--sc-slate)]">End-of-life equipment, unreliable coverage, safety communication gaps and coordination with other property work make the need easier to explain.</p>
            </div>
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">3. Put it through the property process</h3>
              <p className="mt-2 text-sm text-[var(--sc-slate)]">The school discusses the project with its Property Advisor / 10YPP consultant and confirms whether available 5YA funding can support it.</p>
            </div>
          </div>
        </div>
      </section>

      <article className="sc-container max-w-3xl py-14 sc-prose">
        <h2>Why these systems can fit the 5YA framework</h2>
        <p>
          Ministry property guidance distinguishes fixed ICT and communications infrastructure from movable equipment. That gives permanently installed paging, bell, intercom and communications infrastructure a credible capital pathway when the project is a genuine replacement, substantial upgrade or new fixed asset at an existing state school.
        </p>
        <p>
          Ministry school-design guidance also recognises public-address and safety-warning functions including school bells, voiced announcements, paging and emergency communication. That does not make every project automatically funded, but it provides a strong basis for the school to put the need through its property-planning process.
        </p>

        <h2>Published New Zealand school funding examples</h2>
        <p>
          Public school financial reports provide useful real-world evidence that bell, paging and PA work has been funded through Ministry capital programmes. These examples do not guarantee that another school will receive funding, but they show that this type of communications infrastructure has been accepted as capital work in practice.
        </p>
        <div className="not-prose my-7 overflow-x-auto rounded-2xl border border-[var(--sc-border)] bg-white">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-[var(--sc-blue-50)] text-[var(--sc-blue-900)]">
              <tr>
                <th className="px-4 py-3 font-semibold">School</th>
                <th className="px-4 py-3 font-semibold">Published project</th>
                <th className="px-4 py-3 font-semibold">Published amount</th>
                <th className="px-4 py-3 font-semibold">Funding route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--sc-border)] text-[var(--sc-slate)]">
              <tr>
                <td className="px-4 py-3 font-medium text-[var(--sc-blue-900)]">Tāmaki Primary School</td>
                <td className="px-4 py-3">MOE 5YA - PA/Bell</td>
                <td className="px-4 py-3">$38,392 in Ministry receipts reported for 2022</td>
                <td className="px-4 py-3">5YA</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-[var(--sc-blue-900)]">Lincoln High School</td>
                <td className="px-4 py-3">MOE 5YA Bell/PA Upgrade</td>
                <td className="px-4 py-3">$108,492 capital commitment reported at 31 Dec 2024</td>
                <td className="px-4 py-3">5YA</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-[var(--sc-blue-900)]">Greenhithe School</td>
                <td className="px-4 py-3">MOE SIP Bell/Paging</td>
                <td className="px-4 py-3">$7,143 in Ministry receipts reported during 2022</td>
                <td className="px-4 py-3">SIP (not 5YA)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The first two examples are especially relevant because the schools&#39; own audited or annual financial statements explicitly name the projects as 5YA PA/bell upgrades. Greenhithe is included as a separate example of bell/paging work funded through another Ministry capital programme, the School Investment Package (SIP).
        </p>
        <ul>
          <li><a href="https://www.tamakiprimary.school.nz/wp-content/uploads/sites/80/2023/06/Ta%CC%84maki-Primary-Annual-Report-to-31.12.22.pdf">Tāmaki Primary School annual report to 31 December 2022</a></li>
          <li><a href="https://www.lincoln.school.nz/assets/PDF-Financials/Lincoln-High-School-YE-31-December-2024-Audited-Accounts.pdf">Lincoln High School 2024 audited financial statements</a></li>
          <li><a href="https://www.greenhithe.school.nz/wp-content/uploads/sites/63/2024/04/Greenhithe-School-Final-Adjusted-Annual-Report-2022.pdf">Greenhithe School 2022 annual report</a></li>
        </ul>
        <div className="not-prose my-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--sc-blue-700)]">What this means for your school</p>
          <h3 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">There is documented precedent for funding PA and bell infrastructure.</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
            Your own project still needs to fit your property plan, available allocation and Ministry process. The useful next step is to identify the fixed-infrastructure components and build a clear project case. Our <Link href="/guides/nz-school-pa-paging-requirements">NZ school PA and paging requirements guide</Link> covers the Ministry context, and the <Link href="/guides/school-pa-specification-checklist">specification checklist</Link> helps you prepare evidence and scope that can be compared like-for-like.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/tools/funding-check" className="sc-btn-primary">Check your project</Link>
            <Link href="/pricing-tool" className="sc-btn-secondary">Estimate project cost</Link>
          </div>
        </div>

        <h2>What tends to have the strongest funding fit</h2>
        <table>
          <thead>
            <tr><th>Project component</th><th>Initial fit</th></tr>
          </thead>
          <tbody>
            <tr><td>Fixed indoor paging speakers</td><td>Strong</td></tr>
            <tr><td>Outdoor speakers / horns</td><td>Strong</td></tr>
            <tr><td>School bells and scheduled messages</td><td>Strong</td></tr>
            <tr><td>Emergency / lockdown communication</td><td>Strong</td></tr>
            <tr><td>Fixed intercom / call points</td><td>Strong when permanently installed as part of the wider system</td></tr>
            <tr><td>Fixed communications / network cabling</td><td>Strong</td></tr>
            <tr><td>Movable switches, servers or similar IT hardware</td><td>May require separate equipment treatment</td></tr>
            <tr><td>Software, subscriptions, training and ongoing support</td><td>Usually separate from 5YA capital</td></tr>
          </tbody>
        </table>

        <h2>What makes the overall case stronger?</h2>
        <ul>
          <li>The current system is old, unsupported, unreliable or regularly failing.</li>
          <li>Some classrooms, buildings, halls or outdoor areas cannot receive clear announcements.</li>
          <li>Emergency or lockdown communication cannot reliably reach the whole site.</li>
          <li>The school has expanded and the existing infrastructure no longer covers the campus properly.</li>
          <li>Network, cabling, refurbishment or other property work is already planned, making coordination sensible. If cabling is part of your project, our <Link href="/guides/ip-paging-network-readiness">network readiness checklist</Link> helps scope that work.</li>
        </ul>
        <p>
          A project that is mainly routine maintenance or a discretionary technology refresh usually has a weaker 5YA argument than a genuine replacement or substantial fixed-infrastructure upgrade.
        </p>

        <h2>Who actually handles the funding process?</h2>
        <p>
          The supplier can help inspect the system, document the problem, define the likely scope and prepare an indicative budget. The school still owns the property decision. In practice, the school then discusses the project with its Property Advisor and 10YPP consultant so they can confirm the correct property pathway, available funding and procurement process.
        </p>

        <h2>What if the project is only partly fundable?</h2>
        <p>
          Treat the project component by component. Fixed infrastructure may have a stronger capital fit while software, movable IT hardware or ongoing support may need another budget. The useful question is not always whether the entire project is funded from one source, but whether the strongest capital components can be supported through 5YA and reduce the amount the school must find elsewhere.
        </p>

        <h2>New builds and state-integrated schools</h2>
        <p>
          A completely new state-school project is normally better handled inside the wider capital project and technical specification rather than as an ordinary existing-school 5YA upgrade. State-integrated schools also use different property-funding arrangements because the property is generally owned by a proprietor rather than the Ministry.
        </p>

        <h2>Official Ministry starting points</h2>
        <ul>
          <li><a href="https://www.education.govt.nz/education-professionals/schools-year-0-13/property/5-year-agreement-funding">5 Year Agreement funding</a></li>
          <li><a href="https://www.education.govt.nz/education-professionals/schools-year-0-13/property/overview-10-year-property-plan">10 Year Property Plan overview</a></li>
          <li><a href="https://www.education.govt.nz/education-professionals/schools-year-0-13/property/furniture-and-equipment-funding-state-schools/what-items-we-classify-furniture-and-equipment">How the Ministry classifies furniture, equipment and fixed infrastructure</a></li>
        </ul>

        <div className="mt-10 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6 not-prose">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">Check your own project in under a minute</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
            The funding check identifies which parts of a proposed system appear to have the strongest 5YA fit and what would still need to be confirmed before the school progresses the project.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/tools/funding-check" className="sc-btn-primary">Check potential funding</Link>
            <Link href="/pricing-tool" className="sc-btn-secondary">Estimate the likely cost</Link>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-[var(--sc-border)] bg-white p-5 text-sm text-[var(--sc-slate)] not-prose">
          SmartComms NZ is not a government agency. Funding information is general guidance based on publicly available Ministry information and should be confirmed against the school&#39;s actual property circumstances and current Ministry process.
        </div>
      </article>

      <section className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">Funding FAQs</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-[var(--sc-border)] bg-white p-5">
                <h3 className="font-semibold text-[var(--sc-blue-900)]">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
