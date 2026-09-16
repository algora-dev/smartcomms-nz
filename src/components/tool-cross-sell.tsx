"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

type Variant = "pricing-to-funding" | "funding-to-pricing";

function queryString(params: Record<string, string | number | undefined>): string {
  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") q.set(key, String(value));
  }
  const rendered = q.toString();
  return rendered ? `?${rendered}` : "";
}

export function ToolCrossSell({
  variant,
  estimateLow,
  estimateHigh,
  fundingResult,
  financePrimary = false,
}: {
  variant: Variant;
  estimateLow?: number;
  estimateHigh?: number;
  fundingResult?: string;
  financePrimary?: boolean;
}) {
  if (variant === "pricing-to-funding") {
    const fundingHref = `/tools/funding-check${queryString({
      source: "pricing",
      estimateLow: Math.round(estimateLow ?? 0) || undefined,
      estimateHigh: Math.round(estimateHigh ?? 0) || undefined,
    })}`;
    const financeHref = `/tools/finance-check${queryString({
      source: "pricing",
      estimateLow: Math.round(estimateLow ?? 0) || undefined,
      estimateHigh: Math.round(estimateHigh ?? 0) || undefined,
    })}`;

    return (
      <section className="mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">
          Payment & funding options
        </p>
        <h3 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">
          How might the project be paid for?
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
          If this is a New Zealand school project, a property/funding pathway may be worth checking. Schools and other organisations can also explore equipment finance or leasing if they want to spread the project cost.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={fundingHref}
            className="sc-btn-primary"
            onClick={() => track("pricing_to_funding_clicked")}
          >
            Check school funding
          </Link>
          <Link
            href={financeHref}
            className="sc-btn-secondary"
            onClick={() => track("pricing_to_finance_clicked")}
          >
            Explore finance / leasing
          </Link>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[var(--sc-slate)]">
          Your SmartComms estimate is carried into the next tool so you do not need to enter the project value again.
        </p>
      </section>
    );
  }

  const financeHref = `/tools/finance-check${queryString({
    source: "funding",
    fundingResult,
    estimateLow: Math.round(estimateLow ?? 0) || undefined,
    estimateHigh: Math.round(estimateHigh ?? 0) || undefined,
  })}`;
  const pricingHref = `/pricing-tool${queryString({ source: "funding" })}`;

  return (
    <section className="mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">
        Next options
      </p>
      <h3 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">
        {financePrimary ? "Funding may not be the only route" : "Compare the next ways to progress"}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
        {financePrimary
          ? "The pathway assessed may not be the strongest fit as entered. Equipment finance or leasing can still be worth discussing, and you can also estimate the project cost if it is not yet clear."
          : "A funding pathway and commercial finance are different options. You can estimate the likely project cost or explore finance and leasing without changing this funding result."}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={financeHref}
          className={financePrimary ? "sc-btn-primary" : "sc-btn-secondary"}
          onClick={() => track("funding_to_finance_clicked", { funding_result: fundingResult ?? "unknown" })}
        >
          Explore finance / leasing
        </Link>
        <Link
          href={pricingHref}
          className={financePrimary ? "sc-btn-secondary" : "sc-btn-primary"}
          onClick={() => track("funding_to_pricing_clicked")}
        >
          Estimate project cost
        </Link>
      </div>
      {estimateLow && estimateHigh ? (
        <p className="mt-3 text-xs leading-relaxed text-[var(--sc-slate)]">
          The pricing estimate you brought into this funding check will also carry into the finance checker.
        </p>
      ) : null}
    </section>
  );
}
