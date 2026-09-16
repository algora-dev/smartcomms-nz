import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How SmartComms NZ collects, uses and shares information submitted through project, pricing, funding and finance enquiry forms.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Privacy</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ is operated by T3 Labs. This page explains how information submitted through the site is used.
      </p>
      <h2>Information you may provide</h2>
      <p>
        For project enquiries, name, organisation, email and town/region are required. For a general message, name,
        email and the message are required. Other fields — including phone, brand preference and attachments — are
        optional unless the form specifically says otherwise.
      </p>
      <h2>How enquiries are handled</h2>
      <p>
        Your enquiry goes to SmartComms / T3 Labs first. We use the information to answer your enquiry, understand the
        project requirements, suggest a suitable next step or provider, keep internal enquiry/attribution records, and
        improve the tools and site.
      </p>
      <h2>When information is shared with a provider</h2>
      <p>
        A provider receives personally identifying project information only when you agree to a direct introduction
        (or otherwise where appropriate and disclosed to you). We do not automatically forward your enquiry details to
        any partner. SmartComms NZ does not sell personal information to unrelated third parties.
      </p>
      <h2>Analytics and attribution</h2>
      <ul>
        <li>Google Analytics may load when configured, to measure aggregate site usage.</li>
        <li>
          The site records first- and last-touch attribution in your browser&apos;s local storage for up to 180 days and
          attaches it to enquiry emails so we know which page or tool an enquiry came from.
        </li>
        <li>
          Pricing-tool outputs may be logged without personal information when configured, to improve the model. Finance-check and funding-check answers may be attached to an enquiry when you choose to contact SmartComms, so T3 Labs can understand the context you supplied.
          No names, emails or free-text notes are sent to analytics.
        </li>
      </ul>
      <h2>Service providers</h2>
      <p>
        Where configured, the site uses third-party services to operate — for example an email delivery service (such
        as Resend) to send enquiry notifications and a hosted database service (such as Supabase) for non-personal tool
        output logs. Those providers process information on our behalf to deliver the service.
      </p>
      <h2>Data retention</h2>
      <p>
        {/* TODO(owner): confirm the real operational retention period for enquiry emails and any stored records, then state it here. */}
        We keep enquiry records only as long as needed to respond and maintain accurate internal records. A specific
        retention period will be stated here once confirmed. To ask what we hold about you, <Link href="/contact">send us a message</Link>.
      </p>
      <h2>Corrections and deletion</h2>
      <p>
        To ask about information you have submitted, request a correction or request deletion,{" "}
        <Link href="/contact">send us a message through the contact form</Link> and we will respond to the email
        address you provided.
      </p>
      <p className="text-sm text-[var(--sc-slate)]">
        {/* TODO(owner): insert the correct legal/business name, contact email and business address for privacy disclosures once confirmed. */}
        Formal privacy contact details (legal entity name, contact email and postal address) will be added to this
        page once confirmed.
      </p>
    </div>
  );
}
