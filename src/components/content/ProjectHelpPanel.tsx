import Link from "next/link";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";
import type { EnquiryMode } from "@/components/enquiry/ProjectEnquiryModal";

export type ProjectHelpProps = {
  title: string;
  description: string;
  buttonLabel: string;
  mode?: EnquiryMode;
  sourceTopic: string;
  context?: Record<string, string>;
  secondary?: { href: string; label: string };
};

/** Optional help at a decision point; never a lead gate or a replacement for the page's answer. */
export function ProjectHelpPanel({ title, description, buttonLabel, mode = "project_help", sourceTopic,
  context, secondary, className = "mt-10" }: ProjectHelpProps & { className?: string }) {
  return <aside aria-label={title} className={`not-prose rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5 sm:p-6 ${className}`}>
    <h2 className="sc-card-title">{title}</h2>
    <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-[var(--sc-slate)]">{description}</p>
    <div className="sc-actions mt-4">
      <ProjectHelpLauncher mode={mode} sourceTopic={sourceTopic} buttonLabel={buttonLabel}
        className="sc-btn-help" context={context} />
      {secondary && <Link href={secondary.href} className="sc-btn-secondary">{secondary.label}</Link>}
    </div>
  </aside>;
}
