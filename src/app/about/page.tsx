import { ProjectHelpPanel } from "@/components/content/ProjectHelpPanel";
import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site, authors } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About SmartComms NZ",
  description:
    "SmartComms NZ provides New Zealand guidance and planning tools for paging, bell, PA, intercom and integrated communication systems. Operated by T3 Labs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="sc-container sc-container-prose py-16 sc-prose">
      <h1 className="sc-title">About SmartComms NZ</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ is a New Zealand information and planning resource for paging, PA, bell, intercom and integrated communication systems. It is designed to make the early project decisions easier: what the system should do, what it may cost, what funding or finance options may be worth exploring and what to resolve before requesting a final quote.
      </p>
      <h2>What we do</h2>
      <ul>
        <li>Plain-language explanations of system architectures and features</li>
        <li>Indicative NZ pricing examples with disclosed assumptions</li>
        <li>Interactive planning, pricing, school-funding and finance/leasing tools</li>
        <li>Guidance for reviewing a proposed system, upgrade or quote</li>
        <li>Help identifying suitable installation, technology or finance providers to contact when a user wants to progress a project</li>
      </ul>
      <h2>How SmartComms works</h2>
      <ol>
        <li><strong>Research the options.</strong> Use our guides, comparisons and planning tools to understand the system, features and architecture that may suit your site.</li>
        <li><strong>Build a realistic project picture.</strong> Use our pricing and, where relevant, funding or finance tools to understand likely scope, budget and questions that still need answering.</li>
        <li><strong>Ask SmartComms for help.</strong> If you want to progress the project, send us enough information to understand what you need.</li>
        <li><strong>Get the right next step.</strong> The SmartComms team reviews the enquiry and, where specialist help is appropriate, replies with the provider or providers we think are most suitable to contact.</li>
      </ol>
      <p>
        SmartComms does not manufacture or install the systems it researches. Our selected provider network does not include every provider in New Zealand.
      </p>
      <h2>Who is behind SmartComms</h2>
      <p>
        SmartComms NZ is operated by {site.operator}. Technical, pricing and specification content is reviewed by {authors.shaun.name} ({authors.shaun.role}). {authors.shaun.note}
      </p>
      <h2>How we get our pricing</h2>
      <p>
        SmartComms pricing is a planning model informed by supplier pricing, product information and installation/project information available to us. It is designed to show a realistic order of magnitude for the modelled scope, not a market average or a quote from every brand. Individual assumptions may be informed by multiple supplier or project sources; we do not treat those inputs as a statistically representative market average unless we explicitly publish the sample and method. Final pricing always depends on the site, the completed design and the installer.
      </p>
      <h2>Our standards</h2>
      <p>
        We separate indicative calculator assumptions from formal quotes, link funding guidance back to official sources, and avoid presenting configuration examples as market averages. See our <Link href="/about/methodology">research methodology</Link>, <Link href="/about/disclosure">commercial relationships</Link> and <Link href="/about/editorial-policy">editorial policy</Link> for more detail.
      </p>
      <ProjectHelpPanel {...{"title": "Have a communications project in mind?", "description": "Tell us a little about the site and the question you need help with.", "buttonLabel": "Ask SmartComms", "mode": "project_help", "sourceTopic": "about"}} />
    </div>
  );
}
