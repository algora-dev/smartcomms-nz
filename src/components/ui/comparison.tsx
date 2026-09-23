import type { ReactNode } from "react";
export { TableRegion } from "./TableRegion";

/** Presentation only. Page-level evidence data and editorial judgement remain authoritative. */
export function SectionHeading({ id, eyebrow, children, description }: {
  id: string; eyebrow: string; children: ReactNode; description?: string;
}) {
  return <div className="max-w-4xl">
    <p className="sc-eyebrow">{eyebrow}</p>
    <h2 id={id} className="sc-section-title mt-2">{children}</h2>
    {description && <p className="mt-3 max-w-[70ch] leading-relaxed text-[var(--sc-slate)]">{description}</p>}
  </div>;
}

export function Badge({ children, tone = "slate" }: {
  children: ReactNode; tone?: "blue" | "teal" | "slate";
}) {
  const tones = { blue: "sc-badge-blue", teal: "sc-badge-teal", slate: "sc-badge-slate" };
  return <span className={`sc-badge ${tones[tone]}`}>{children}</span>;
}

export type EvidenceLink = { id: string; label: string; href: string; kind: string; number: number };
export function EvidenceReferences({ items, label = "Evidence" }: {
  items: readonly EvidenceLink[]; label?: string;
}) {
  if (!items.length) return null;
  return <span className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs leading-relaxed text-[var(--sc-slate)]">
    <span>{label}:</span>
    {items.map((source) => <a key={source.id} href={source.href} target="_blank" rel="noopener noreferrer"
      className="rounded px-0.5 py-1 font-semibold text-[var(--sc-blue-700)] underline underline-offset-2"
      aria-label={`${source.label} (source ${source.number}, opens in a new tab)`}
      title={`${source.kind}: ${source.label}`}>[{source.number}]</a>)}
  </span>;
}
