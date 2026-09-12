import Link from "next/link";

export type AuthorityHeroBreadcrumb = { name: string; href?: string };

export default function AuthorityHero({
  eyebrow,
  title,
  description,
  tags,
  primaryCta,
  secondaryCta,
  reviewed,
  note,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  reviewed: string;
  note?: string;
  breadcrumb?: AuthorityHeroBreadcrumb[];
}) {
  return (
    <section className="sc-container max-w-[1150px] pt-10 pb-6">
      {breadcrumb?.length ? (
        <nav className="text-sm text-[var(--sc-slate)]" aria-label="Breadcrumb">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.name}>
              {i > 0 ? <span aria-hidden> / </span> : null}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-[var(--sc-blue-700)]">
                  {crumb.name}
                </Link>
              ) : (
                <span>{crumb.name}</span>
              )}
            </span>
          ))}
        </nav>
      ) : null}
      <div className="mt-4 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] px-6 py-10 sm:px-10 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-[2.1rem] font-bold leading-[1.1] tracking-tight text-[var(--sc-blue-900)] sm:text-[3rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-[1.125rem] leading-relaxed text-[var(--sc-slate)] sm:text-lg">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--sc-border)] bg-white px-3 py-1 text-xs font-medium text-[var(--sc-slate)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={primaryCta.href} className="sc-btn-primary">
            {primaryCta.label}
          </Link>
          {secondaryCta ? (
            <Link href={secondaryCta.href} className="sc-btn-secondary">
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
        <p className="mt-6 text-xs text-[var(--sc-slate)]">
          Last reviewed {reviewed}
          {note ? <span aria-hidden> · </span> : null}
          {note ? <span className="ml-1 font-medium text-[var(--sc-teal-strong)]">{note}</span> : null}
        </p>
      </div>
    </section>
  );
}
