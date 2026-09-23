import Link from "next/link";
import { ProjectHelpPanel, type ProjectHelpProps } from "./ProjectHelpPanel";

export default function ContinuePlanning({
  items,
  help,
}: {
  items: { title: string; desc: string; href: string }[];
  help?: ProjectHelpProps;
}) {
  return (
    <section className="not-prose mt-14">
      {help && <ProjectHelpPanel {...help} className="mb-8" />}
      <h2 className="sc-section-title">
        Continue planning your project
      </h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="sc-card group p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)] group-hover:text-[var(--sc-blue-700)]">
              {item.title} <span aria-hidden>→</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{item.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
