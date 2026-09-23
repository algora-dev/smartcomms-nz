import { PageContents } from "@/components/content/PageContents";
import { ProjectHelpPanel } from "@/components/content/ProjectHelpPanel";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { IndustryAwareToolLink } from "@/components/industry-aware-tool-link";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { publishedDate, reviewedDate, reviewedLabel } from "@/lib/content-meta";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "PA, Paging & Intercom Finance & Leasing NZ",
  description:
    "Explore equipment finance, leasing and lease-to-own options for NZ paging, PA, school bell, intercom and communications-system projects, then run a quick finance check.",
  path: "/financing",
});

const faqs = [
  {
    q: "Can a paging, PA, bell or intercom system be financed in New Zealand?",
    a: "Potentially. New Zealand commercial equipment-finance providers publicly finance technology, AV, security and other business equipment. Whether a particular communications project is accepted depends on the organisation, equipment, transaction and finance provider.",
  },
  {
    q: "What finance structures may be available?",
    a: "Depending on the provider and transaction, options can include commercial equipment loans, finance leases, business rentals and other equipment-finance structures. Some providers also use lease-to-own wording for arrangements where ownership transfers at the end of the agreed term.",
  },
  {
    q: "Do I need a deposit?",
    a: "Not always. Some New Zealand equipment-finance providers advertise structures that can finance up to 100% of an equipment invoice, subject to their normal assessment and approval criteria. Other transactions may benefit from or require an upfront contribution.",
  },
  {
    q: "Can schools explore equipment finance or leasing?",
    a: "Yes, some NZ equipment-finance providers specifically work with schools and education organisations. State and state-integrated schools can also have governance, accounting, borrowing or property requirements that need to be checked before entering an agreement.",
  },
  {
    q: "What if I do not know the project price yet?",
    a: "You can still use the finance checker with a rough site size, or use the SmartComms pricing calculator first and carry the indicative project range into the finance check.",
  },
  {
    q: "Can installation costs be included in equipment finance?",
    a: "Sometimes, depending on the provider, equipment and transaction. The finance provider decides which equipment, services and project costs can be included.",
  },
  {
    q: "Can an existing PA or paging system upgrade be financed?",
    a: "Potentially. Replacement, expansion and upgrade projects may be considered by commercial equipment-finance providers depending on the equipment and organisation.",
  },
  {
    q: "Can IP paging systems be leased instead of purchased upfront?",
    a: "Potentially. Commercial equipment finance can include leasing and rental-style structures as well as equipment loans. The available structure depends on the provider and transaction.",
  },
  {
    q: "Can a school bell and PA upgrade be financed?",
    a: "Potentially. Some NZ equipment-finance providers work with education organisations, but schools may also have governance, borrowing and property requirements that need to be considered.",
  },
  {
    q: "Does the SmartComms finance checker approve finance?",
    a: "No. SmartComms does not provide finance or make credit decisions. The checker only helps determine whether a specialist conversation looks useful and gives the SmartComms team enough context to suggest an appropriate next step or provider from its selected network.",
  },
];

export default function FinancingPage() {
  const reviewed = reviewedLabel("/financing");
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({
        headline: "Finance and leasing options for paging, PA, bell and intercom systems in New Zealand",
        description: "Equipment finance, leasing and lease-to-own options for NZ communications-system projects, plus a quick SmartComms finance check.",
        url: `${site.url}/financing`,
        datePublished: publishedDate("/financing"),
        dateModified: reviewedDate("/financing"),
      })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "SmartComms NZ", url: site.url },
        { name: "Finance & leasing", url: `${site.url}/financing` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }) }} />

      <header className="sc-container sc-container-reading py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">New Zealand project payment options</p>
          <h1 className="sc-title mt-2">
            Finance and leasing for paging, PA, bell and intercom systems
          </h1>
          <p className="sc-lead mt-4">
            Paying the full project cost upfront is not the only possible route. Commercial equipment finance, leasing and lease-to-own-style structures may let an eligible organisation spread the cost of a communications-system project over regular payments.
          </p>
          <div className="mt-6 sc-actions">
            <Suspense><IndustryAwareToolLink to="/tools/finance-check" className="sc-btn-primary">Check whether finance is worth exploring</IndustryAwareToolLink></Suspense>
            <Suspense><IndustryAwareToolLink to="/pricing-tool" className="sc-btn-secondary">Estimate the project cost first</IndustryAwareToolLink></Suspense>
          </div>
          <ProjectHelpLauncher mode="finance_help" sourceTopic="financing_guide" buttonLabel="Discuss finance options" className="sc-text-action mt-3" />
          <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">
            Last reviewed {reviewed}. SmartComms does not provide finance, quote interest rates or make credit decisions. Actual options and approval are determined by the relevant finance provider.
          </p>
        </div>
        <PageContents items={[["#finance-structures", "Types of finance"], ["#finance-scope", "Project scope"], ["#finance-school-scope", "School considerations"], ["#finance-next-step", "What happens next"], ["#finance-questions", "Finance questions"]]} />
      </header>

      <section className="border-y border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container sc-container-reading">
          <h2 className="sc-section-title">The short version</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">1. Work out the rough project value</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Use an existing supplier estimate or the SmartComms pricing calculator. A broad range is enough to start the conversation.</p>
            </div>
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">2. Decide what feels manageable</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Think about the regular payment range the organisation could accommodate and whether any upfront contribution is available.</p>
            </div>
            <div className="sc-card bg-white p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">3. Discuss the actual structure</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A finance specialist can then explain which structures may be relevant and what information is needed for a real application.</p>
            </div>
          </div>
        </div>
      </section>

      <article className="sc-container sc-container-prose py-14 sc-prose">
        <h2>What can equipment finance help with?</h2>
        <p>
          Commercial equipment finance is used to spread the cost of business and organisational assets over time. In New Zealand, finance providers publicly offer finance and leasing for technology, audio-visual equipment, security systems, medical equipment and other commercial assets. A paging or intercom project may include a mixture of hardware, software, installation and related work, so the exact financeable scope needs to be confirmed with the provider.
        </p>

        <h2 id="finance-structures">Finance lease, rental or equipment loan?</h2>
        <p>
          Different providers use different structures. Common NZ commercial-equipment options include finance leases, business rentals and commercial equipment loans. “Lease to own” is also used in the market for some finance-lease arrangements where ownership transfers at the end of the agreed term. The right structure depends on the organisation and transaction, so SmartComms does not attempt to choose the contract type inside the checker.
        </p>

        <h2>Who might explore finance?</h2>
        <p>
          Equipment-finance providers in New Zealand publicly work with businesses, schools and education organisations, healthcare providers, government and local-government organisations, charities and other commercial entities. Provider appetite and approval criteria differ, which is why the SmartComms tool focuses on whether there is a useful conversation to have rather than trying to approve or reject an application.
        </p>

        <h2>What if the project cannot be paid upfront?</h2>
        <p>
          That is one of the main reasons to investigate finance or leasing. An organisation may want to preserve cash, spread the project cost, stage an upgrade or compare finance against another capital pathway. A low upfront contribution does not automatically mean there is no option: some NZ providers advertise up to 100% equipment finance for qualifying transactions, while other providers or structures may require different terms.
        </p>

        <h2 id="finance-school-scope">Schools: funding and finance are different questions</h2>
        <p>
          New Zealand state schools may have property or capital-funding pathways for eligible projects, while finance or leasing is a separate commercial arrangement. School boards can also have specific governance, accounting and borrowing requirements. A school should therefore check the relevant Ministry/property position and the proposed finance structure rather than treating finance as a substitute for a funding approval.
        </p>

        <h2 id="finance-scope">What parts of a PA, paging or intercom project may be financed?</h2>
        <p>
          Depending on the provider and transaction, a communications project can include items such as central paging or control hardware, IP paging speakers and horns, PA amplifiers and passive speakers, school bell and scheduling hardware or software, intercom and entrance communication equipment, network interfaces and gateways, installation and commissioning where accepted by the finance provider, and related project equipment. The finance provider decides which equipment, services and project costs it will include. SmartComms does not determine what is financeable.
        </p>

        <h2>Pay upfront, use a funding pathway or spread the cost?</h2>
        <div className="not-prose my-7 grid gap-5 md:grid-cols-3">
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Pay upfront</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Useful where the organisation already has capital available and wants no ongoing finance commitment.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Funding</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Relevant mainly where a genuine funding or capital pathway applies — particularly the <Link href="/funding">school property pathways</Link> covered elsewhere on SmartComms.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Finance / leasing</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Relevant where the organisation wants to spread the cost or does not want to fund the entire project upfront. Start with the <Link href="/tools/finance-check">finance check</Link>.</p>
          </div>
        </div>
        <p>No option is universally better. The right answer depends on the organisation, the project and the pathways genuinely available to it.</p>

        <h2>Why organisations explore finance for communications systems</h2>
        <div className="not-prose my-7 grid gap-5 sm:grid-cols-2">
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Schools and education</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A communications upgrade may be needed before a preferred capital or funding timetable, or where a different payment structure is being considered.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Aged care and healthcare</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A site may need to replace or improve communications while preserving capital for other facility priorities.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Commercial and industrial sites</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">A business may prefer predictable regular payments while replacing or expanding paging or intercom infrastructure.</p>
          </div>
          <div className="sc-card bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Public and community facilities</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">Councils, venues, charities and other organisations may want to compare purchase and equipment-finance structures.</p>
          </div>
        </div>
        <p>These examples do not mean every organisation in these categories qualifies for finance. Provider assessment and approval criteria always apply.</p>

        <h2 id="finance-next-step">What happens after the finance check?</h2>
        <ol>
          <li><strong>Get your preliminary result.</strong> SmartComms shows whether a specialist finance conversation looks useful.</li>
          <li><strong>Ask SmartComms for the next step.</strong> If you want help, send enough information for the SmartComms team to understand the project.</li>
          <li><strong>Contact the provider SmartComms suggests.</strong> SmartComms replies with the provider or providers it thinks may be appropriate, their public contact details and why they may fit. You decide whether to contact them.</li>
        </ol>

        <p>
          Useful companions along the way: estimate the project first with the <Link href="/pricing-tool">pricing calculator</Link> or the <Link href="/pricing">pricing guide</Link>, check the <Link href="/tools/funding-check">school funding checker</Link> if a funding pathway may apply, compare equipment options in the <Link href="/compare">platform comparison</Link>, or revisit the <Link href="/systems/ip-paging-pa">IP paging architecture guide</Link>.
        </p>

        <div className="not-prose mt-10 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">Check in about a minute</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
            Tell us who the project is for, roughly how much finance may be needed and what sort of regular payment feels manageable. The result is designed to show whether a specialist conversation looks useful — not to decide whether finance will be approved.
          </p>
          <Link href="/tools/finance-check" className="sc-btn-primary mt-4 inline-flex">Run the finance check</Link>
        </div>

        <h2>Sources and market context</h2>
        <p>
          The descriptions above are based on publicly available New Zealand equipment-finance information. They establish that these kinds of commercial structures exist; they do not mean SmartComms has a commercial relationship with every provider referenced.
        </p>
        <ul>
          <li><a href="https://www.eleasing.co.nz/customers/">eLeasing — NZ commercial equipment finance and leasing options</a></li>
          <li><a href="https://www.westpac.co.nz/business/loans-and-finance/equipment-finance/">Westpac NZ — business equipment finance</a></li>
          <li><a href="https://mtlfinance.co.nz/">MTL Finance — equipment leasing for NZ schools and businesses</a></li>
          <li><a href="https://www.education.govt.nz/education-professionals/schools-year-0-13/funding-and-financials/day-day-financial-management">Ministry of Education — school financial management and borrowing guidance</a></li>
        </ul>

        <div className="not-prose mt-8 rounded-xl border border-[var(--sc-border)] bg-white p-5 text-sm leading-relaxed text-[var(--sc-slate)]">
          SmartComms NZ is an information and planning resource operated by T3 Labs. It does not provide financial advice, finance products, credit assessment or approval. If you ask for practical help, the SmartComms team can review the information supplied and suggest an appropriate next step or provider to contact.
        </div>

        <div className="not-prose mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6 text-center">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">Not sure whether finance is worth exploring?</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">It takes about a minute to get a preliminary result.</p>
          <Suspense><IndustryAwareToolLink to="/tools/finance-check" className="sc-btn-primary mt-4 inline-flex">Run the finance check</IndustryAwareToolLink></Suspense>
        </div>
      </article>

      <section className="border-t border-[var(--sc-border)] bg-[var(--sc-blue-50)] py-14">
        <div className="sc-container sc-container-prose">
          <h2 id="finance-questions" className="sc-section-title">Finance & leasing FAQs</h2>
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
      <div className="sc-container sc-container-reading pb-12">
        <ProjectHelpPanel {...{"title": "Prefer to discuss payment options directly?", "description": "Tell us the rough project value and what you need help understanding. You do not need to finish the checker first.", "buttonLabel": "Discuss finance options", "mode": "finance_help", "sourceTopic": "financing_guide"}} />
      </div>
    </div>
  );
}
