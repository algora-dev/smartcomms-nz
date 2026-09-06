import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Research Methodology",
  description:
    "How SmartComms NZ researches, verifies and publishes information about communication systems and pricing.",
  path: "/about/methodology",
});

export default function MethodologyPage() {
  return (
    <div className="sc-container py-16 max-w-3xl sc-prose">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--sc-blue-900)]">
        Research methodology
      </h1>
      <p className="mt-4 text-lg text-[var(--sc-slate)]">
        Everything published on SmartComms NZ follows one rule: if we cannot support it, we do not
        publish it.
      </p>
      <h2>How we research</h2>
      <ul>
        <li>Published technical documentation from manufacturers and providers</li>
        <li>Publicly available standards and guidance relevant to New Zealand sites</li>
        <li>Real project pricing, only when we have enough verified samples to be meaningful</li>
        <li>Practical experience from designing and delivering communication systems</li>
      </ul>
      <h2>Pricing data standards</h2>
      <p>
        Any pricing figures we publish will state the sample size, the date, the assumptions and
        the limitations of the data. Where we do not yet have real data, we say so plainly rather
        than publishing estimates dressed up as averages.
      </p>
      <h2>Corrections</h2>
      <p>
        If something on this site is wrong, we want to fix it. Use the contact page to tell us
        what and why.
      </p>
    </div>
  );
}
