import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { FinanceCheckTool } from "./FinanceCheckTool";

export const metadata: Metadata = buildMetadata({
  title: "Equipment Finance & Leasing Check NZ | SmartComms",
  description:
    "Quick NZ finance check for paging, PA, bell, intercom and communications systems. See whether equipment finance or leasing is worth discussing and what to do next.",
  path: "/tools/finance-check",
});

export default function FinanceCheckPage() {
  return (
    <div className="sc-container max-w-3xl py-12">
      <div className="mb-9">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">New Zealand equipment finance</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)] sm:text-4xl">
          Is finance or leasing worth exploring for your communications project?
        </h1>
        <p className="mt-3 text-[var(--sc-slate)]">
          Answer three short questions about the organisation, rough project value and budget. We&apos;ll give you a practical starting point and, if you want, help identify an appropriate finance specialist to speak with.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-[var(--sc-slate)]">
          Preliminary guidance only — not a finance application, credit assessment or approval. <Link href="/financing" className="underline">Read how equipment finance and leasing can work</Link>.
        </p>
      </div>
      <Suspense fallback={<div className="sc-card p-6 text-sm text-[var(--sc-slate)]">Loading finance checker…</div>}>
        <FinanceCheckTool />
      </Suspense>
    </div>
  );
}
