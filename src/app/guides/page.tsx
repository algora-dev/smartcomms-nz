import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guides: Paging, Bells, PA & Intercom for NZ Sites",
  description:
    "Practical NZ guides to IP paging, school bells, PA replacement, zoning, emergency communication and network requirements.",
  path: "/guides",
});

const GUIDES = [
  { title: "IP Paging vs Traditional 100V PA Systems", desc: "How the two architectures differ and when each makes sense.", status: "In development" },
  { title: "Can Existing Speakers and Cabling Be Reused?", desc: "What can carry over to a new system and what usually gets replaced.", status: "In development" },
  { title: "IP Paging Network Requirements for NZ Schools", desc: "VLANs, PoE budgets and bandwidth basics for school networks.", status: "In development" },
  { title: "How to Design Paging Zones", desc: "Splitting a site into zones for bells, announcements and alerts.", status: "In development" },
  { title: "Does It Still Work if the Internet Goes Down?", desc: "What happens to paging, bells and emergency features during outages.", status: "In development" },
  { title: "School Lockdown & Emergency Paging Basics", desc: "Lockdown alerts, tone standards and communication planning.", status: "In development" },
];

export default function GuidesPage() {
  return (
    <div className="sc-container py-16 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Guides</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        Plain-language guides to planning, buying and running communication systems in New Zealand
        schools and large facilities.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <div key={g.title} className="sc-card p-6">
            <h2 className="font-semibold text-[var(--sc-blue-900)]">{g.title}</h2>
            <p className="mt-2 text-sm text-[var(--sc-slate)]">{g.desc}</p>
            <span className="mt-3 inline-block rounded-full bg-[var(--sc-blue-100)] px-2.5 py-1 text-xs font-medium text-[var(--sc-blue-700)]">
              {g.status}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-[var(--sc-slate)]">
        New guides are published as they are completed. In the meantime, see{" "}
        <Link href="/systems">system architectures</Link> or try the{" "}
        <Link href="/tools/system-planner">system estimator</Link>.
      </p>
    </div>
  );
}
