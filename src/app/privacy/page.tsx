import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How SmartComms NZ handles information submitted through project, pricing and funding enquiry forms.",
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
        Enquiry forms may collect your name, organisation or school, email address, phone number, site location, project details and any plans, images or documents you choose to attach.
      </p>
      <h2>How it is used</h2>
      <p>
        Information is used to respond to your enquiry, review the project and, where you ask for installation or a formal quote, connect you with a suitable trusted installation or technology partner.
      </p>
      <h2>Sharing with project partners</h2>
      <p>
        If a partner needs your project information to provide the service you requested, relevant details may be shared with that partner. SmartComms NZ does not sell personal information to unrelated third parties.
      </p>
      <h2>Corrections and deletion</h2>
      <p>
        To ask about information you have submitted, request a correction or request deletion, contact <a href="mailto:insights@t3labs.co.uk">insights@t3labs.co.uk</a>.
      </p>
    </div>
  );
}
