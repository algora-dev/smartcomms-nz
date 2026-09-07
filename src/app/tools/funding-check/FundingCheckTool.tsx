"use client";

/**
 * Funding Check V2.
 * Four short screens + a concise result. The public experience is intentionally
 * non-technical; detailed engineering/accounting questions are deferred to the
 * follow-up project review.
 */

import { useState, type ReactNode } from "react";
import {
  CABLING_STATUS,
  CABLING_TOOLTIP,
  CURRENT_SYSTEMS,
  DISCLAIMER,
  FEATURES,
  PROJECT_STATUSES,
  REASONS,
  RESULT_COPY,
  SCHOOL_TYPES,
  SUPPORTING_ITEM_NOTE,
} from "@/lib/funding-check/config";
import {
  runAssessment,
  type AssessmentAnswers,
  type AssessmentResult,
} from "@/lib/funding-check/engine";

const TOTAL_SCREENS = 4;

interface LeadForm {
  name: string;
  school: string;
  email: string;
  phone: string;
  contactMethod: "email" | "phone";
  cta: "review" | "quote";
}

function InfoDot({ text }: { text: string }) {
  return (
    <span
      className="ml-1.5 inline-flex cursor-help text-[var(--sc-slate)]"
      title={text}
      tabIndex={0}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 11v5M12 7.5h.01" />
      </svg>
      <span className="sr-only">{text}</span>
    </span>
  );
}

function OptionCard({
  label,
  tooltip,
  selected,
  onClick,
}: {
  label: string;
  tooltip?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`sc-card w-full p-4 text-left ${selected ? "border-[var(--sc-blue-600)] bg-[var(--sc-blue-50)]" : ""}`}
    >
      <span className="flex items-center text-[var(--sc-charcoal)]">
        <span
          className={`mr-3 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
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
        <span className="text-[0.95rem] font-medium">{label}</span>
        {tooltip && <InfoDot text={tooltip} />}
      </span>
    </button>
  );
}

function CheckLine({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2 text-[var(--sc-slate)]">
      <span className="mt-0.5 font-bold text-emerald-700">✓</span>
      <span>{children}</span>
    </li>
  );
}

export function FundingCheckTool() {
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    reasons: [],
    features: [],
  });
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState<LeadForm>({
    name: "",
    school: "",
    email: "",
    phone: "",
    contactMethod: "email",
    cta: "review",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  function toggle(list: string[], id: string): string[] {
    return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
  }

  function next() {
    setScreen((current) => Math.min(TOTAL_SCREENS - 1, current + 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setScreen((current) => Math.max(0, current - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finish() {
    setResult(runAssessment(answers));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitLead() {
    if (!result) return;
    setSending(true);
    setSendError(null);
    try {
      const response = await fetch("/api/funding-check/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, lead, result }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || "Submission failed");
      setSent(true);
    } catch (error) {
      setSendError(error instanceof Error ? error.message : "Something went wrong - please try again.");
    } finally {
      setSending(false);
    }
  }

  const canContinue =
    (screen === 0 && Boolean(answers.schoolType && answers.projectStatus)) ||
    (screen === 1 && answers.reasons.length > 0) ||
    (screen === 2 && answers.features.length > 0) ||
    (screen === 3 && Boolean(answers.currentSystem && answers.cablingStatus));

  const progress = result ? 100 : Math.round(((screen + 1) / TOTAL_SCREENS) * 100);

  if (result) {
    const caseLabel = result.caseTier === "strong" ? "Strong" : result.caseTier === "moderate" ? "Potential" : "Needs supporting evidence";
    const pathwayHeading =
      result.pathway === "five_ya"
        ? RESULT_COPY.pathway5ya
        : result.pathway === "state_integrated"
          ? RESULT_COPY.stateIntegrated.heading
          : result.pathway === "private"
            ? RESULT_COPY.private.heading
            : RESULT_COPY.newBuild.heading;
    const pathwayBody =
      result.pathway === "five_ya"
        ? RESULT_COPY.pathway5yaBody
        : result.pathway === "state_integrated"
          ? RESULT_COPY.stateIntegrated.body
          : result.pathway === "private"
            ? RESULT_COPY.private.body
            : RESULT_COPY.newBuild.body;

    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">{result.headline}</h1>

        <div className="sc-card mt-6 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">Likely pathway</h2>
          <p className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">{pathwayHeading}</p>
          <p className="mt-2 max-w-2xl text-[var(--sc-slate)]">{pathwayBody}</p>
        </div>

        {result.positiveOverrideMessage && (
          <div className="mt-4 rounded-lg border border-[var(--sc-teal-accent)] bg-[#eefaf8] p-4 text-[var(--sc-charcoal)]">
            {result.positiveOverrideMessage}
          </div>
        )}

        {result.components.strong.length > 0 && (
          <div className="sc-card mt-6 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">
              {result.pathway === "new_build"
                ? "Communications scope worth including"
                : result.pathway === "private"
                  ? "Strong fixed communications scope"
                  : "What could potentially be funded"}
            </h2>
            <ul className="mt-3 space-y-2">
              {result.components.strong.map((component) => (
                <CheckLine key={component}>{component}</CheckLine>
              ))}
            </ul>
            <p className="mt-4 text-sm text-[var(--sc-slate)]">{SUPPORTING_ITEM_NOTE}</p>
          </div>
        )}

        <div className="sc-card mt-6 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">Why this looks worth pursuing</h2>
          <p className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">Project case: {caseLabel}</p>
          {result.supportingFactors.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {result.supportingFactors.map((factor) => (
                <CheckLine key={factor}>{factor}</CheckLine>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[var(--sc-slate)]">
              The fixed communications components still appear worth reviewing, but the funding case may need clearer evidence of condition, coverage, safety or project need.
            </p>
          )}
        </div>

        <div className="sc-card mt-6 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">Existing infrastructure</h2>
          <p className="mt-2 font-semibold text-[var(--sc-blue-900)]">{result.infrastructureSummary.heading}</p>
          <p className="mt-1 text-[var(--sc-slate)]">{result.infrastructureSummary.body}</p>
        </div>

        <div className="mt-8 sc-card p-6">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">{RESULT_COPY.ctaPrimary}</h2>
          <p className="mt-2 text-[var(--sc-slate)]">{RESULT_COPY.ctaPrimaryBody}</p>
          <p className="mt-3 text-sm text-[var(--sc-slate)]">
            The next review can also confirm {result.confirmationsNeeded.slice(0, 2).join(" and ").toLowerCase()}.
          </p>

          {!showLead && !sent && (
            <div className="mt-4 flex flex-wrap gap-4">
              <button
                type="button"
                className="sc-btn-primary"
                onClick={() => {
                  setLead((current) => ({ ...current, cta: "review" }));
                  setShowLead(true);
                }}
              >
                {result.pathway === "state_integrated"
                  ? RESULT_COPY.stateIntegrated.cta
                  : result.pathway === "private"
                    ? RESULT_COPY.private.cta
                    : result.pathway === "new_build"
                      ? RESULT_COPY.newBuild.cta
                      : RESULT_COPY.ctaPrimary}
              </button>
              <button
                type="button"
                className="sc-btn-secondary"
                onClick={() => {
                  setLead((current) => ({ ...current, cta: "quote" }));
                  setShowLead(true);
                }}
              >
                {RESULT_COPY.ctaSecondary}
              </button>
            </div>
          )}

          {showLead && !sent && (
            <form
              className="mt-4 grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                void submitLead();
              }}
            >
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                Your name
                <input
                  required
                  value={lead.name}
                  onChange={(event) => setLead({ ...lead, name: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                School
                <input
                  required
                  value={lead.school}
                  onChange={(event) => setLead({ ...lead, school: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                Email
                <input
                  required
                  type="email"
                  value={lead.email}
                  onChange={(event) => setLead({ ...lead, email: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                Phone (optional)
                <input
                  type="tel"
                  value={lead.phone}
                  onChange={(event) => setLead({ ...lead, phone: event.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                Preferred contact method
                <select
                  value={lead.contactMethod}
                  onChange={(event) => setLead({ ...lead, contactMethod: event.target.value as "email" | "phone" })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </label>
              <div className="sm:col-span-2">
                <p className="text-xs text-[var(--sc-slate)]">Your funding-check answers are attached automatically.</p>
                <button type="submit" disabled={sending} className="sc-btn-primary mt-3 disabled:opacity-50">
                  {sending ? "Sending..." : "Send my request"}
                </button>
                {sendError && <p className="mt-2 text-sm text-red-600">{sendError}</p>}
              </div>
            </form>
          )}

          {sent && (
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
              Thanks - your request has been sent. We will be in touch shortly.
            </p>
          )}
        </div>

        <p className="mt-6 rounded-lg border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-4 text-xs leading-relaxed text-[var(--sc-slate)]">
          {DISCLAIMER}
        </p>

        <button
          type="button"
          className="sc-btn-secondary mt-6"
          onClick={() => {
            setResult(null);
            setSent(false);
            setShowLead(false);
            setScreen(0);
          }}
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium text-[var(--sc-slate)]">
          <span>Step {screen + 1} of {TOTAL_SCREENS}</span>
          <span>Takes about 30-45 seconds</span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--sc-grey)]">
          <div
            className="h-1.5 rounded-full bg-[var(--sc-accent)] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {screen === 0 && (
        <div>
          <fieldset>
            <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">Tell us about the school and project</legend>
            <h3 className="mt-6 font-semibold text-[var(--sc-blue-700)]">What type of school is this?</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {SCHOOL_TYPES.map((option) => (
                <OptionCard
                  key={option.id}
                  label={option.label}
                  tooltip={option.tooltip}
                  selected={answers.schoolType === option.id}
                  onClick={() => setAnswers({ ...answers, schoolType: option.id })}
                />
              ))}
            </div>

            <h3 className="mt-7 font-semibold text-[var(--sc-blue-700)]">What best describes the project?</h3>
            <div className="mt-3 space-y-3">
              {PROJECT_STATUSES.map((option) => (
                <OptionCard
                  key={option.id}
                  label={option.label}
                  selected={answers.projectStatus === option.id}
                  onClick={() => setAnswers({ ...answers, projectStatus: option.id })}
                />
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {screen === 1 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">What is driving the project?</legend>
          <p className="mt-2 text-sm text-[var(--sc-slate)]">Select anything that genuinely applies.</p>
          <div className="mt-6 space-y-3">
            {REASONS.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                selected={answers.reasons.includes(option.id)}
                onClick={() => setAnswers({ ...answers, reasons: toggle(answers.reasons, option.id) })}
              />
            ))}
          </div>
        </fieldset>
      )}

      {screen === 2 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">What would you like the system to provide?</legend>
          <p className="mt-2 text-sm text-[var(--sc-slate)]">Select all that apply. You do not need to know specific products.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((feature) => {
              const selected = answers.features.includes(feature.id);
              return (
                <button
                  key={feature.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAnswers({ ...answers, features: toggle(answers.features, feature.id) })}
                  className={`sc-card p-4 text-left ${selected ? "border-[var(--sc-blue-600)] bg-[var(--sc-blue-50)]" : ""}`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="text-sm font-semibold text-[var(--sc-blue-900)]">{feature.label}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-[var(--sc-slate)]">{feature.description}</span>
                    </span>
                    <span
                      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
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
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {screen === 3 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">What is already there?</legend>

          <h3 className="mt-6 font-semibold text-[var(--sc-blue-700)]">What best describes the current system?</h3>
          <div className="mt-3 space-y-3">
            {CURRENT_SYSTEMS.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                selected={answers.currentSystem === option.id}
                onClick={() => setAnswers({ ...answers, currentSystem: option.id })}
              />
            ))}
          </div>

          <h3 className="mt-7 flex items-center font-semibold text-[var(--sc-blue-700)]">
            Is modern network/data cabling already available?
            <InfoDot text={CABLING_TOOLTIP} />
          </h3>
          <div className="mt-3 space-y-3">
            {CABLING_STATUS.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                selected={answers.cablingStatus === option.id}
                onClick={() => setAnswers({ ...answers, cablingStatus: option.id })}
              />
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex items-center gap-4">
        {screen > 0 && (
          <button type="button" className="sc-btn-secondary" onClick={back}>Back</button>
        )}
        <button
          type="button"
          className="sc-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!canContinue}
          onClick={screen === TOTAL_SCREENS - 1 ? finish : next}
        >
          {screen === TOTAL_SCREENS - 1 ? "Show my funding check" : "Next"}
        </button>
      </div>
    </div>
  );
}
