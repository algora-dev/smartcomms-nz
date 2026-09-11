import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ContactLauncher } from "@/components/pricing/ContactLauncher";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Send SmartComms NZ a question, correction or project enquiry through our enquiry form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="sc-container py-16 max-w-3xl sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Contact</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        Questions, corrections, or a proposed system you would like us to look at?
        Send us a message and we will get back to you.
      </p>
      <p>We read everything. Corrections to technical or pricing content are prioritised.</p>
      <ContactLauncher />
    </div>
  );
}
