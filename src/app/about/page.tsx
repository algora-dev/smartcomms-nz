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
    <div className="sc-container max-w-3xl py-16 sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">About SmartComms NZ</h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ is a New Zealand information and planning resource for paging, PA, bell, intercom and integrated communication systems. It is designed to make the early project decisions easier: what the system should do, what it may cost, what funding may exist and what to resolve before requesting a final quote.
      </p>
      <h2>What we do</h2>
      <ul>
        <li>Plain-language explanations of system architectures and features</li>
        <li>Indicative NZ pricing examples with disclosed assumptions</li>
        <li>Interactive planning, pricing and school-funding tools</li>
        <li>Guidance for reviewing a proposed system, upgrade or quote</li>
        <li>Introductions to trusted installation or technology partners when a user asks for project delivery</li>
      </ul>
      <h2>Who is behind SmartComms</h2>
      <p>
        SmartComms NZ is operated by {site.operator}. Technical, pricing and specification content is reviewed by {authors.shaun.name} ({authors.shaun.role}). {authors.shaun.note}
      </p>
      <h2>Our standards</h2>
      <p>
        We separate indicative calculator assumptions from formal quotes, link funding guidance back to official sources, and avoid presenting configuration examples as market averages. See our <Link href="/about/methodology">research methodology</Link>, <Link href="/about/disclosure">commercial relationships</Link> and <Link href="/about/editorial-policy">editorial policy</Link> for more detail.
      </p>
    </div>
  );
}
