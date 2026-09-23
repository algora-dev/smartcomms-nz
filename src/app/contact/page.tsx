import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ContactLauncher } from "@/components/pricing/ContactLauncher";
import { ProjectHelpLauncher } from "@/components/enquiry/ProjectHelpLauncher";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Send SmartComms NZ a question, correction or project enquiry. The SmartComms team reviews project enquiries and suggests the most useful next step.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="sc-container sc-container-prose py-16 sc-prose">
      <h1 className="sc-title">Contact</h1>
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
            A quote or installer, site assessment, system selection, or a funding / project-scope question. The SmartComms team reviews the enquiry and replies with the next step or provider we think is most appropriate to contact.
          </p>
          <ProjectHelpLauncher buttonLabel="Tell us about your project" className="sc-btn-help mt-6" />
        </div>
      </div>
    </div>
  );
}
