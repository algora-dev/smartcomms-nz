import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How SmartComms NZ collects and uses information submitted through project, pricing, funding and finance enquiry forms.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">Privacy</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ collects information that you choose to submit through this website, including project, pricing,
        funding and finance enquiry forms.
      </p>
      <h2>Information you may provide</h2>
      <p>
        For project enquiries, name, organisation, email and town/region are required. For a general message, name,
        email and the message are required. Other fields, including phone, brand preference and attachments, are
        optional unless the form specifically says otherwise.
      </p>
      <h2>How we use your information</h2>
      <p>We use the information you provide to:</p>
      <ul>
        <li>respond to your enquiry;</li>
        <li>understand your project or question;</li>
        <li>suggest suitable next steps or providers for you to contact;</li>
        <li>maintain useful project history and follow-up;</li>
        <li>improve SmartComms tools and content.</li>
      </ul>
      <h2>Provider recommendations</h2>
      <p>
        SmartComms does not send your enquiry, contact details, project information, uploaded files or tool answers to
        the providers we recommend. Where appropriate, we reply to you with the public contact details of the provider
        or providers we think may be suitable and explain why. You decide whether to contact them. SmartComms does not
        sell personal information to unrelated third parties.
      </p>
      <h2>Analytics and attribution</h2>
      <ul>
        <li>Google Analytics may load when configured, to measure aggregate site usage.</li>
        <li>
          The site records first- and last-touch attribution in your browser&apos;s local storage for up to 180 days and
          attaches it to enquiry emails so we know which page or tool an enquiry came from.
        </li>
        <li>
          Pricing-tool outputs may be logged without personal information when configured, to improve the model.
          Finance-check and funding-check answers may be attached to an enquiry when you choose to contact SmartComms,
          so the SmartComms team can understand the context you supplied. No names, emails or free-text notes are sent
          to analytics.
        </li>
      </ul>
      <h2>Service providers</h2>
      <p>
        SmartComms may use third-party services to operate the website, including hosting, email delivery and database
        services. Those services may process information on SmartComms&apos; behalf for the purpose of operating the
        site and enquiry service. They are not receiving your enquiry as recommended installers, finance providers or
        project partners.
      </p>
      <h2>Retention</h2>
      <p>
        We keep enquiry information only for as long as reasonably necessary to respond, maintain useful project
        history and deal with follow-up. Information that is no longer required is deleted or anonymised.
      </p>
      <h2>Access and correction</h2>
      <p>
        You can ask SmartComms to provide access to personal information held about you, or request that incorrect
        information be corrected. Email the Privacy Officer below and we will respond to the email address you
        provided.
      </p>
      <h2>Privacy contact</h2>
      <p>
        <strong>SmartComms NZ</strong>
        <br />
        <strong>Privacy Officer:</strong> Cece
        <br />
        <strong>Email:</strong>{" "}
        <a href="mailto:insights@t3labs.co.nz">insights@t3labs.co.nz</a>
        <br />
        <strong>Address:</strong> 85 Tongariro Street, Halswell, Christchurch 8025, New Zealand
      </p>
    </div>
  );
}
