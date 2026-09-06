import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site, authors } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About SmartComms NZ",
  description:
    "SmartComms NZ provides independent NZ-focused guidance for paging, bell, PA, intercom and integrated communication systems. Operated by T3 Labs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="sc-container py-16 max-w-3xl sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        About SmartComms NZ
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        SmartComms NZ provides NZ-focused guidance for paging, bell, PA, intercom and integrated
        communication systems. We help schools, hospitals, corrections facilities and other large
        sites understand, compare, plan and budget these systems.
      </p>
      <h2>What we do</h2>
      <ul>
        <li>Plain-language explanations of system architectures and features</li>
        <li>NZ-focused pricing research with published assumptions</li>
        <li>Planning tools that turn a vague need into a defined brief</li>
        <li>Guidance for reviewing a proposed system or quote</li>
      </ul>
      <h2>Who is behind SmartComms</h2>
      <p>
        SmartComms NZ is operated by {site.operator}. Technical, pricing and specification content
        is reviewed by {authors.shaun.name} ({authors.shaun.role}). {authors.shaun.note}
      </p>
      <h2>Our standards</h2>
      <p>
        We do not invent pricing data, reviews or experts. See our{" "}
        <Link href="/about/methodology">research methodology</Link>,{" "}
        <Link href="/about/disclosure">commercial relationships</Link> and{" "}
        <Link href="/about/editorial-policy">editorial policy</Link> for how we work.
      </p>
    </div>
  );
}
