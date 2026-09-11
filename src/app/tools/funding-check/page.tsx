import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { FundingCheckTool } from "./FundingCheckTool";

export const metadata: Metadata = buildMetadata({
  title: "NZ School Communications Funding Check",
  description:
    "Free NZ school funding check: see which parts of a paging, PA, bell, intercom or communications project may have a Ministry 5YA / 10YPP funding pathway.",
  path: "/tools/funding-check",
});

export default function FundingCheckPage() {
  return (
    <div className="sc-container max-w-3xl py-12">
      <div className="mb-9">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">NZ state schools</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)] sm:text-4xl">School communications funding check</h1>
        <p className="mt-3 text-[var(--sc-slate)]">
          Answer a few simple questions to see whether parts of a proposed paging, PA, bell, intercom or communications project appear worth investigating through the Ministry 5YA / 10YPP property pathway.
        </p>
        <p className="mt-2 text-xs text-[var(--sc-slate)]">
          Indicative only. This tool does not approve funding. <Link href="/funding" className="underline">Read how the funding pathway works</Link>.
        </p>
      </div>
      <FundingCheckTool />
    </div>
  );
}
