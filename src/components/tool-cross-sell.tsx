import Link from "next/link";

type Variant = "pricing-to-funding" | "funding-to-pricing";

export function ToolCrossSell({ variant }: { variant: Variant }) {
  if (variant === "pricing-to-funding") {
    return (
      <section className="mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">
          New Zealand state schools
        </p>
        <h3 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">
          Could part of this project be funded?
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
          Fixed paging, bell, emergency communication, intercom and communications infrastructure may have a potential Ministry 5YA / 10YPP funding pathway. A quick check can show which parts of your proposed project are worth investigating.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/tools/funding-check" className="sc-btn-primary">
            Check potential funding
          </Link>
          <Link href="/funding" className="sc-btn-secondary">
            How school funding works
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-6 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sc-blue-700)]">
        Next step
      </p>
      <h3 className="mt-2 text-xl font-semibold text-[var(--sc-blue-900)]">
        See what the project might cost
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
        Funding potential is only one part of the decision. Use the ballpark calculator to get an indicative installed price range for the system you are considering.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/pricing-tool" className="sc-btn-primary">
          Estimate project cost
        </Link>
        <Link href="/pricing" className="sc-btn-secondary">
          Read the NZ pricing guide
        </Link>
      </div>
    </section>
  );
}
