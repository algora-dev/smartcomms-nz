"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import { ProjectEnquiryModal } from "@/components/enquiry/ProjectEnquiryModal";
import {
  DISCLAIMER,
  MONTHLY_BUDGETS,
  ORGANISATION_TYPES,
  PROJECT_VALUE_BANDS,
  SITE_SIZE_BANDS,
  UPFRONT_BANDS,
  WEEKLY_BUDGETS,
  type OrganisationType,
  type PaymentBudget,
  type PaymentFrequency,
  type ProjectValueBand,
  type SiteSizeBand,
  type UpfrontBand,
} from "@/lib/finance-check/config";
import { assessFinanceFit, type FinanceAnswers } from "@/lib/finance-check/engine";

function OptionCard({
  label,
  selected,
  onClick,
  hint,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`sc-card w-full p-4 text-left ${selected ? "border-[var(--sc-blue-600)] bg-[var(--sc-blue-50)]" : ""}`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
            selected ? "border-[var(--sc-blue-600)] bg-[var(--sc-blue-600)]" : "border-[var(--sc-grey)] bg-white"
          }`}
          aria-hidden="true"
        >
          {selected && (
            <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        <span>
          <span className="block text-[0.95rem] font-medium text-[var(--sc-charcoal)]">{label}</span>
          {hint && <span className="mt-1 block text-xs leading-relaxed text-[var(--sc-slate)]">{hint}</span>}
        </span>
      </span>
    </button>
  );
}

function CheckLine({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2 text-sm leading-relaxed text-[var(--sc-slate)]">
      <span className="mt-0.5 font-bold text-emerald-700">✓</span>
      <span>{children}</span>
    </li>
  );
}

function parseMoneyParam(value: string | null): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0 || n > 5_000_000) return undefined;
  return Math.round(n);
}

function labelFrom<T extends readonly { value: string; label: string }[]>(items: T, value?: string): string {
  return items.find((item) => item.value === value)?.label ?? "Not supplied";
}

export function FinanceCheckTool() {
  const searchParams = useSearchParams();
  const carriedLow = parseMoneyParam(searchParams.get("estimateLow"));
  const carriedHigh = parseMoneyParam(searchParams.get("estimateHigh"));
  const hasCarriedEstimate = Boolean(carriedLow && carriedHigh && carriedHigh >= carriedLow);
  const sourceParam = searchParams.get("source");
  const fundingResult = searchParams.get("fundingResult") ?? undefined;

  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<FinanceAnswers>({
    paymentFrequency: "monthly",
    source: sourceParam === "pricing" || sourceParam === "funding" ? sourceParam : "financing",
    fundingResult,
    carriedEstimateLow: carriedLow,
    carriedEstimateHigh: carriedHigh,
    projectValueBand: hasCarriedEstimate ? "smartcomms_estimate" : undefined,
  });
  const [resultReady, setResultReady] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  // Element-targeted scrolling: never rely on page-top because authority
  // content can live above/below the tool.
  const toolTopRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  function scrollToElement(el: HTMLElement | null) {
    requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el?.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  useEffect(() => {
    track("finance_tool_started", { source: answers.source ?? "direct" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const result = useMemo(() => assessFinanceFit(answers), [answers]);
  const paymentOptions = answers.paymentFrequency === "weekly" ? WEEKLY_BUDGETS : MONTHLY_BUDGETS;
  const projectValueUnknown = answers.projectValueBand === "unsure";

  const groupedOrganisations = useMemo(() => {
    const groups = new Map<string, typeof ORGANISATION_TYPES[number][]>();
    for (const item of ORGANISATION_TYPES) {
      const current = groups.get(item.group) ?? [];
      current.push(item);
      groups.set(item.group, current);
    }
    return Array.from(groups.entries());
  }, []);

  function next() {
    setScreen((current) => Math.min(2, current + 1));
    scrollToElement(toolTopRef.current);
  }

  function back() {
    setScreen((current) => Math.max(0, current - 1));
    scrollToElement(toolTopRef.current);
  }

  function finish() {
    setResultReady(true);
    track("finance_check_completed", {
      organisation_type: answers.organisationType,
      project_value: answers.projectValueBand,
      site_size: answers.siteSizeBand,
      payment_frequency: answers.paymentFrequency,
      payment_budget: answers.paymentBudget,
      upfront_band: answers.upfrontBand,
      result_level: result.level,
      source: answers.source,
    });
    scrollToElement(resultRef.current);
  }

  function restart() {
    setScreen(0);
    setResultReady(false);
    setAnswers({
      paymentFrequency: "monthly",
      source: sourceParam === "pricing" || sourceParam === "funding" ? sourceParam : "financing",
      fundingResult,
      carriedEstimateLow: carriedLow,
      carriedEstimateHigh: carriedHigh,
      projectValueBand: hasCarriedEstimate ? "smartcomms_estimate" : undefined,
    });
    scrollToElement(toolTopRef.current);
  }

  const canContinue =
    (screen === 0 && Boolean(answers.organisationType)) ||
    (screen === 1 && Boolean(answers.projectValueBand) && (!projectValueUnknown || Boolean(answers.siteSizeBand))) ||
    (screen === 2 && Boolean(answers.paymentBudget && answers.upfrontBand));

  if (resultReady) {
    const financeContext: Record<string, string> = {
      "Finance-fit result": result.eyebrow,
      Organisation: result.organisationLabel,
      "Project value": result.projectValueLabel,
      "Regular budget": labelFrom(
        answers.paymentFrequency === "weekly" ? WEEKLY_BUDGETS : MONTHLY_BUDGETS,
        answers.paymentBudget,
      ),
      "Payment frequency": answers.paymentFrequency,
      "Upfront contribution": labelFrom(UPFRONT_BANDS, answers.upfrontBand),
      ...(answers.siteSizeBand ? { "Approx. site size": labelFrom(SITE_SIZE_BANDS, answers.siteSizeBand) } : {}),
      ...(answers.source ? { "Journey source": answers.source } : {}),
      ...(answers.fundingResult ? { "Funding-tool result": answers.fundingResult } : {}),
    };

    const isStateSchool = answers.organisationType === "state_school" || answers.organisationType === "state_integrated_school";

    const answerSummary: [string, string][] = [
      ["Organisation", result.organisationLabel],
      ["Project value", result.projectValueLabel],
      ["Regular budget", `${labelFrom(answers.paymentFrequency === "weekly" ? WEEKLY_BUDGETS : MONTHLY_BUDGETS, answers.paymentBudget)} / ${answers.paymentFrequency}`],
      ["Upfront contribution", labelFrom(UPFRONT_BANDS, answers.upfrontBand)],
    ];

    return (
      <div ref={resultRef} className="scroll-mt-6">
        {/* Result hero: the answer is the first thing on screen. */}
        <section className="rounded-2xl border-2 border-[var(--sc-teal)] bg-[var(--sc-blue-50)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sc-blue-700)]">Your finance-check result</p>
          <div className="mt-3">
            <span className="inline-flex rounded-full bg-[var(--sc-navy)] px-4 py-1.5 text-sm font-semibold text-white">{result.eyebrow}</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--sc-blue-900)] md:text-4xl">{result.headline}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-[var(--sc-slate)]">{result.body}</p>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setEnquiryOpen(true);
                track("finance_help_opened", { result_level: result.level });
              }}
              className="sc-btn-primary cursor-pointer"
            >
              Discuss finance options
            </button>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sc-slate)]">
              Want to take the next step? Tell the SmartComms team a little more about the project and we&apos;ll suggest
              the finance provider or specialist we think is most relevant to contact. Your enquiry goes to T3 Labs first;
              a provider receives your contact details only if you agree to a direct introduction.
            </p>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[var(--sc-slate)]">Preliminary guidance only — not an approval or finance offer.</p>
        </section>

        {/* Compact personalised answer summary */}
        <div className="sc-card mt-6 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">Your answers</h3>
          <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {answerSummary.map(([term, value]) => (
              <div key={term} className="flex flex-col sm:flex-row sm:gap-2">
                <dt className="text-sm font-medium text-[var(--sc-slate)]">{term}:</dt>
                <dd className="text-sm font-semibold text-[var(--sc-blue-900)]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="sc-card mt-6 p-6">
          <h3 className="font-semibold text-[var(--sc-blue-900)]">What your answers tell us</h3>
          <ul className="mt-4 space-y-3">
            {result.reasons.map((reason) => <CheckLine key={reason}>{reason}</CheckLine>)}
          </ul>
        </div>

        {isStateSchool && (
          <div className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Also a New Zealand school?</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
              Depending on the project, a state or state-integrated school may also have a separate property/funding pathway worth checking. Finance and Ministry funding are different questions.
            </p>
            <Link
              href={`/tools/funding-check${hasCarriedEstimate ? `?source=finance&estimateLow=${carriedLow}&estimateHigh=${carriedHigh}` : ""}`}
              className="sc-btn-secondary mt-4 inline-flex"
              onClick={() => track("finance_to_funding_clicked")}
            >
              Check school funding pathways
            </Link>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={restart} className="text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Start again</button>
          <Link href="/financing" className="text-sm font-semibold text-[var(--sc-blue-700)] underline underline-offset-2">Read the finance & leasing guide</Link>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-[var(--sc-slate)]">{DISCLAIMER}</p>

        <ProjectEnquiryModal
          open={enquiryOpen}
          mode="finance_help"
          onClose={() => setEnquiryOpen(false)}
          context={financeContext}
          sourceTopic="finance_check"
        />
      </div>
    );
  }

  return (
    <div ref={toolTopRef} className="scroll-mt-6">
      {!resultReady && (
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
      )}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-[var(--sc-slate)]">
          <span>Step {screen + 1} of 3</span>
          <span>{Math.round(((screen + 1) / 3) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-[var(--sc-teal)] transition-all" style={{ width: `${((screen + 1) / 3) * 100}%` }} />
        </div>
      </div>

      {screen === 0 && (
        <div>
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">What type of organisation is this for?</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
            This helps us keep the result relevant and, if you enquire, point you towards the right type of finance specialist.
          </p>
          <div className="mt-6 space-y-6">
            {groupedOrganisations.map(([group, items]) => (
              <div key={group}>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sc-slate)]">{group}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <OptionCard
                      key={item.value}
                      label={item.label}
                      selected={answers.organisationType === item.value}
                      onClick={() => setAnswers((prev) => ({ ...prev, organisationType: item.value as OrganisationType }))}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">Roughly how much finance might the project need?</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
            A rough range is enough. If you do not know yet, tell us approximately how many areas the system needs to cover.
          </p>

          {hasCarriedEstimate && (
            <div className="mt-5">
              <OptionCard
                label={`Use my SmartComms estimate: $${carriedLow!.toLocaleString("en-NZ")}–$${carriedHigh!.toLocaleString("en-NZ")}`}
                hint="Carried across from the pricing calculator so you do not need to enter it again."
                selected={answers.projectValueBand === "smartcomms_estimate"}
                onClick={() => setAnswers((prev) => ({ ...prev, projectValueBand: "smartcomms_estimate" }))}
              />
            </div>
          )}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PROJECT_VALUE_BANDS.map((item) => (
              <OptionCard
                key={item.value}
                label={item.label}
                selected={answers.projectValueBand === item.value}
                onClick={() => setAnswers((prev) => ({ ...prev, projectValueBand: item.value as ProjectValueBand }))}
              />
            ))}
          </div>

          {projectValueUnknown && (
            <div className="mt-6 rounded-xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">No problem — roughly how many areas?</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {SITE_SIZE_BANDS.map((item) => (
                  <OptionCard
                    key={item.value}
                    label={item.label}
                    selected={answers.siteSizeBand === item.value}
                    onClick={() => setAnswers((prev) => ({ ...prev, siteSizeBand: item.value as SiteSizeBand }))}
                  />
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[var(--sc-slate)]">
                If you want a more useful project range first, use the <Link href="/pricing-tool?source=finance" onClick={() => track("finance_to_pricing_clicked")} className="font-semibold underline underline-offset-2">SmartComms pricing calculator</Link> and come back to this checker afterwards.
              </p>
            </div>
          )}
        </div>
      )}

      {screen === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-[var(--sc-blue-900)]">What would feel manageable within your budget?</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sc-slate)]">
            This is not an affordability test. It simply gives a finance specialist a better starting point for the conversation.
          </p>

          <div className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold text-[var(--sc-blue-900)]">Regular payment range</h3>
              <div className="inline-flex rounded-full border border-[var(--sc-border)] bg-slate-50 p-1 text-xs font-semibold">
                {(["weekly", "monthly"] as PaymentFrequency[]).map((frequency) => (
                  <button
                    key={frequency}
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, paymentFrequency: frequency, paymentBudget: undefined }))}
                    className={`rounded-full px-3 py-1.5 capitalize ${answers.paymentFrequency === frequency ? "bg-white text-[var(--sc-blue-900)] shadow-sm" : "text-[var(--sc-slate)]"}`}
                  >
                    {frequency}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {paymentOptions.map((item) => (
                <OptionCard
                  key={`${answers.paymentFrequency}-${item.value}`}
                  label={item.label}
                  selected={answers.paymentBudget === item.value}
                  onClick={() => setAnswers((prev) => ({ ...prev, paymentBudget: item.value as PaymentBudget }))}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-[var(--sc-border)] bg-white p-5">
            <h3 className="font-semibold text-[var(--sc-blue-900)]">Could you contribute anything upfront if it helped?</h3>
            <p className="mt-1 text-xs leading-relaxed text-[var(--sc-slate)]">Nothing upfront is a valid answer. This is context, not a pass/fail question.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {UPFRONT_BANDS.map((item) => (
                <OptionCard
                  key={item.value}
                  label={item.label}
                  selected={answers.upfrontBand === item.value}
                  onClick={() => setAnswers((prev) => ({ ...prev, upfrontBand: item.value as UpfrontBand }))}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        {screen > 0 ? (
          <button type="button" onClick={back} className="text-sm font-semibold text-[var(--sc-slate)] hover:text-[var(--sc-blue-900)]">← Back</button>
        ) : <span />}
        {screen < 2 ? (
          <button type="button" disabled={!canContinue} onClick={next} className="sc-btn-primary cursor-pointer disabled:opacity-40">Next step →</button>
        ) : (
          <button type="button" disabled={!canContinue} onClick={finish} className="sc-btn-primary cursor-pointer disabled:opacity-40">See my result</button>
        )}
      </div>
    </div>
  );
}
