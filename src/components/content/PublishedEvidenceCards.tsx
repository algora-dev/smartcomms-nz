import type { NzPublicEvidenceItem } from "@/lib/content/nz-public-evidence";

export function PublishedEvidenceCards({
  id,
  title,
  description,
  items,
}: {
  id: string;
  title: string;
  description: string;
  items: readonly NzPublicEvidenceItem[];
}) {
  return (
    <section id={id} className="not-prose mt-10 scroll-mt-28">
      <p className="sc-eyebrow">Published NZ evidence</p>
      <h2 className="sc-section-title mt-2">{title}</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-[var(--sc-slate)]">{description}</p>
      <div className={`mt-5 grid gap-4 ${items.length > 1 ? "md:grid-cols-2" : ""}`}>
        {items.map((item) => (
          <article key={item.id} className="sc-card p-5">
            <h3 className="sc-card-title">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">{item.summary}</p>
            {item.note ? <p className="mt-3 text-xs leading-relaxed text-[var(--sc-slate)]">{item.note}</p> : null}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--sc-blue-700)] underline decoration-[var(--sc-teal)] decoration-2 underline-offset-4 hover:text-[var(--sc-navy)]"
            >
              View source: {item.source}<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
