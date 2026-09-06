import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with the SmartComms NZ team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="sc-container py-16 max-w-3xl sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Contact</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        Questions, corrections, or a proposed system you would like us to look at? Email the{" "}
        {site.name} team at{" "}
        <a href="mailto:insights@t3labs.co.uk">insights@t3labs.co.uk</a>.
      </p>
      <p>
        We read everything. Corrections to technical or pricing content are prioritised.
      </p>
    </div>
  );
}
