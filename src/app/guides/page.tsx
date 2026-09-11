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
    title: "5YA Funding for NZ School Communications",
    desc: "How fixed paging, bells, emergency communication, intercoms and cabling may fit the 5YA / 10YPP property process.",
    href: "/funding",
  },
];

export default function GuidesPage() {
  return (
    <div className="sc-container max-w-4xl py-16">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Practical guides</h1>
      <p className="mt-4 max-w-3xl text-lg text-[var(--sc-slate)]">
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
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/pricing-tool" className="sc-btn-primary">Get a ballpark price</Link>
        <Link href="/tools/funding-check" className="sc-btn-secondary">Check school funding</Link>
      </div>
    </div>
  );
}
