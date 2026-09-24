import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { FundingCheckTool } from "./FundingCheckTool";
import { ToolSuiteNav } from "@/components/tool-suite-nav";

export const metadata: Metadata = buildMetadata({
  title: "NZ School Communications Funding Check",
  description:
    "Free NZ school funding check: see which parts of a paging, PA, bell, intercom or communications project may have a Ministry 5YA / 10YPP funding pathway.",
  path: "/tools/funding-check",
});

export default function FundingCheckPage() {
  // Keep the original explanation in server-rendered fallback HTML too; once
  // the tool resolves, its completed result replaces this introduction.
  const introduction = (
<div className="mb-9">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">NZ state schools</p>
        <h1 className="sc-tool-title mt-2">School communications funding check</h1>
        <p className="mt-3 text-[var(--sc-slate)]">
          Answer a few simple questions to see whether parts of a proposed paging, PA, bell, intercom or communications project appear worth investigating through the Ministry 5YA / 10YPP property pathway.
        </p>
        <p className="mt-2 text-xs text-[var(--sc-slate)]">
          Indicative only. This tool does not approve funding. <Link href="/funding" className="underline">Read how the funding pathway works</Link>.
        </p>
        <ToolSuiteNav current="funding" />
      </div>
  );
  return (
    <div className="sc-container sc-container-prose py-12">
      <Suspense fallback={<>{introduction}<div role="status" className="sc-card p-6 text-sm text-[var(--sc-slate)]">Loading funding checker…</div></>}>
        <FundingCheckTool introduction={introduction} />
      </Suspense>
    </div>
  );
}
