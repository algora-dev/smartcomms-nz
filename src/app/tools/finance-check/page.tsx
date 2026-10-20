import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { FinanceCheckTool } from "./FinanceCheckTool";
import { ToolSuiteNav } from "@/components/tool-suite-nav";

export const metadata: Metadata = buildMetadata({
  title: "Communications System Finance Checker NZ",
  description:
    "Check whether equipment finance or leasing is worth exploring for an NZ paging, PA, school bell, intercom or communications-system project.",
  path: "/tools/finance-check",
});

export default function FinanceCheckPage() {
  const introduction = (
    <div className="mb-9">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">New Zealand communications projects</p>
      <h1 className="sc-tool-title mt-2">Communications system finance checker</h1>
      <p className="mt-3 text-[var(--sc-slate)]">
        Answer three short questions to see whether equipment finance or leasing is worth discussing for a paging, PA, school bell, intercom or integrated communications project.
      </p>
      <p className="mt-2 text-xs leading-relaxed text-[var(--sc-slate)]">
        Preliminary guidance only, not a finance application, credit assessment or approval. If the result suggests a conversation may be useful, SmartComms can help identify an appropriate finance specialist for you to contact. <Link href="/financing" className="underline">Read how communications-system finance can work</Link>.
      </p>
      <ToolSuiteNav current="finance" />
    </div>
  );
  return (
    <div className="sc-container sc-container-prose py-12">
      <Suspense fallback={<>{introduction}<div role="status" className="sc-card p-6 text-sm text-[var(--sc-slate)]">Loading finance checker...</div></>}>
        <FinanceCheckTool introduction={introduction} />
      </Suspense>
    </div>
  );
}
