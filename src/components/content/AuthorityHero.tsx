import Link from "next/link";
import { PageContents } from "./PageContents";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import type { EnquiryMode } from "@/components/enquiry/ProjectEnquiryModal";

export type AuthorityHeroBreadcrumb = { name: string; href?: string };

export default function AuthorityHero({
  eyebrow,
  title,
  description,
  tags,
  primaryCta,
  primaryCtaNode,
  secondaryCta,
  reviewed,
  note,
  breadcrumb,
  help,
  contents,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  primaryCta: { label: string; href: string };
  /** Optional custom CTA node (e.g. a modal launcher) that overrides the plain Link. */
  primaryCtaNode?: React.ReactNode;
  secondaryCta?: { label: string; href: string };
  reviewed: string;
  note?: string;
  breadcrumb?: AuthorityHeroBreadcrumb[];
  contents?: readonly (readonly [string, string])[];
  help?: { label: string; mode?: EnquiryMode; sourceTopic: string; context?: Record<string, string> };
}) {
  return (
    <section className="sc-container sc-container-wide pt-10 pb-6">
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
        <p className="sc-eyebrow">
          {eyebrow}
        </p>
        <h1 className="sc-title mt-3">
          {title}
        </h1>
        <p className="sc-lead mt-5">
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
        <div className="sc-actions mt-8">
          {primaryCtaNode ?? (
            <Link href={primaryCta.href} className="sc-btn-primary">
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta ? (
            <Link href={secondaryCta.href} className="sc-btn-secondary">
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
        {help && <ProjectHelpLauncher mode={help.mode ?? "system_selection"} sourceTopic={help.sourceTopic}
          buttonLabel={help.label} className="sc-text-action mt-3" context={help.context} />}
        <p className="mt-6 text-xs text-[var(--sc-slate)]">
          Last reviewed {reviewed}
          {note ? <span aria-hidden> · </span> : null}
          {note ? <span className="ml-1 font-medium text-[var(--sc-teal-strong)]">{note}</span> : null}
        </p>
      </div>
      {contents?.length ? <PageContents items={contents} /> : null}
    </section>
  );
}
