import { ProjectHelpPanel } from "@/components/content/ProjectHelpPanel";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guides: IP Paging, PA, Bells & Funding NZ",
  description:
    "Practical New Zealand guides to paging system architecture, replacing old PA systems, installed pricing and school communications funding.",
  path: "/guides",
});

const GUIDES = [
  {
    title: "Warehouse, Factory & Industrial PA Comparison",
    desc: "Shift bells, announcements, horns, intercom and existing-PA reuse, with noise considerations, use-case shortlists and pricing.",
    href: "/industries/warehouses-manufacturing-industrial",
  },
  {
    title: "Aged Care & Retirement Village PA/Intercom Guide",
    desc: "PA, paging, entrance intercom and staff communication for NZ rest homes and retirement villages, with use-case shortlists and indicative costs.",
    href: "/industries/aged-care-retirement-villages",
  },
  {
    title: "NZ School PA & Paging Requirements",
    desc: "What Ministry design, cabling, funding and procurement guidance means for school PA, bells, intercom and emergency communications.",
    href: "/guides/nz-school-pa-paging-requirements",
  },
  {
    title: "IP Paging Network Readiness Checklist",
    desc: "PoE budget, VLANs, QoS, cabling state and support responsibility — check these before asking for IP paging quotes.",
    href: "/guides/ip-paging-network-readiness",
  },
  {
    title: "School PA Specification Checklist",
    desc: "A pre-procurement checklist so every PA, bell or intercom quote you receive covers the same scope and compares fairly.",
    href: "/guides/school-pa-specification-checklist",
  },
  {
    title: "IP Paging & PA Systems: 2026 Buyer’s Guide",
    desc: "Compare integrated school platforms, SIP-first options, browser-managed audio, hybrid approaches and specialist architectures for NZ buyers.",
    href: "/compare/schools",
  },
  {
    title: "School PA, Paging, Bell & Intercom Systems",
    desc: "A single guide to school communication features, indicative costs, upgrade decisions and potential 5YA funding.",
    href: "/schools",
  },
  {
    title: "Traditional, IP and Hybrid Paging Systems",
    desc: "Understand the three common architectures and where each approach makes sense.",
    href: "/systems",
  },
  {
    title: "Replacing an Old PA System",
    desc: "What may be reusable, what usually changes and how to plan the replacement.",
    href: "/systems/traditional-vs-ip",
  },
  {
    title: "What Do Paging and Intercom Systems Cost?",
    desc: "Indicative NZ installed ranges, the main cost drivers and a calculator for your own site.",
    href: "/pricing",
  },
  {
    title: "Finance & Leasing for PA, Paging & Intercom Projects",
    desc: "How equipment finance and leasing can help NZ organisations spread project cost, plus a quick finance checker.",
    href: "/financing",
  },
  {
    title: "5YA Funding for NZ School Communications",
    desc: "How fixed paging, bells, emergency communication, intercoms and cabling may fit the 5YA / 10YPP property process.",
    href: "/funding",
  },
];

export default function GuidesPage() {
  return (
    <div className="sc-container sc-container-reading py-16">
      <h1 className="sc-title">Practical guides</h1>
      <p className="sc-lead mt-4">
        Plain-language resources for planning, pricing and reviewing paging, PA, bell, intercom and emergency communication systems in New Zealand.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {GUIDES.map((guide) => (
          <Link key={guide.href} href={guide.href} className="sc-card group p-6">
            <h2 className="font-semibold text-[var(--sc-blue-900)] group-hover:text-[var(--sc-blue-700)]">
              {guide.title} <span aria-hidden>→</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--sc-slate)]">{guide.desc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 sc-actions">
        <Link href="/pricing-tool" className="sc-btn-primary">Use the pricing tool</Link>
        <Link href="/tools/funding-check" className="sc-btn-secondary">Check school funding</Link>
        <Link href="/tools/finance-check" className="sc-btn-secondary">Check finance options</Link>
      </div>
      <ProjectHelpPanel {...{"title": "Have a question about your own site?", "description": "Tell us what you are trying to work out and which part needs a clearer next step.", "buttonLabel": "Ask about your project", "mode": "project_help", "sourceTopic": "guides_hub"}} />
    </div>
  );
}
