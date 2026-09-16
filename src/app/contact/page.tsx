import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ContactLauncher } from "@/components/pricing/ContactLauncher";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Send SmartComms NZ a question, correction or project enquiry. T3 Labs reviews every enquiry and suggests the most useful next step.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="sc-container py-16 max-w-3xl sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Contact</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        Ask a question, suggest a correction or tell us about a project. If you need practical project help, give us
        enough information to understand the site and we&apos;ll work out the most useful next step.
      </p>
      <div className="not-prose mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--sc-border)] bg-white p-5">
          <h2 className="font-semibold text-[var(--sc-blue-900)]">General message / correction</h2>
          <p className="mt-2 text-sm text-[var(--sc-slate)]">
            Corrections to technical or pricing content, questions about what we publish, media or general queries.
          </p>
          <ContactLauncher />
        </div>
        <div className="rounded-2xl border border-[var(--sc-border)] bg-white p-5">
          <h2 className="font-semibold text-[var(--sc-blue-900)]">Project help</h2>
          <p className="mt-2 text-sm text-[var(--sc-slate)]">
            A quote or installer, site assessment, system selection, or a funding / project-scope question. T3 Labs
            reviews the enquiry and suggests an appropriate next step or provider from our selected New Zealand network.
          </p>
          <ProjectHelpLauncher buttonLabel="Tell us about your project" className="sc-btn-primary mt-6 inline-flex cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
