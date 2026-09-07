"use client";

/**
 * Funding Pre-Qualification wizard.
 * 7 screens + result. All content driven by ../lib config; scoring by engine.
 * Answers live in React state (Back never loses data). No login required.
 */

import { useMemo, useState } from "react";
import {
  CABLING_STATUS,
  CABLING_TOOLTIP,
  CURRENT_SYSTEMS,
  DISCLAIMER,
  FEATURES,
  MINISTRY_OWNERSHIP,
  POE_OPTIONS,
  POE_TOOLTIP,
  PROJECT_STATUSES,
  REASONS,
  RELATED_WORKS,
  RESULT_COPY,
  REUSABLE_ITEMS,
  SCHOOL_TYPES,
  TEN_YEAR_PLAN,
  type FitTier,
} from "@/lib/funding-check/config";
import {
  runAssessment,
  answersToSummary,
  type AssessmentAnswers,
  type AssessmentResult,
} from "@/lib/funding-check/engine";

const TOTAL_SCREENS = 8; // 7 questions + features counted once; result handled separately

interface LeadForm {
  name: string;
  school: string;
  email: string;
  phone: string;
  contactMethod: "email" | "phone";
  cta: "review" | "quote";
}

const FIT_LABEL: Record<FitTier, string> = {
  strong: "Strong funding fit",
  moderate: "Moderate / needs review",
  weak: "Weak for 5YA",
};

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

export function FundingCheckTool() {
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    reasons: [],
    reusable: [],
    features: [],
    relatedWorks: [],
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

  const poeAsked =
    answers.cablingStatus === "modern_most" || answers.cablingStatus === "some_areas";

  function toggle(list: string[], id: string): string[] {
    return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  }

  function next() {
    setScreen((s) => s + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }
  function back() {
    setScreen((s) => Math.max(0, s - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  function finish() {
    setResult(runAssessment(answers));
    next();
  }

  async function submitLead() {
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/funding-check/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, lead, result }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");
      setSent(true);
    } catch (e) {
      setSendError(e instanceof Error ? e.message : "Something went wrong - please try again.");
    } finally {
      setSending(false);
    }
  }

  const progress = Math.round((screen / TOTAL_SCREENS) * 100);
  const summary = useMemo(() => (result ? answersToSummary(answers) : null), [result, answers]);

  if (result && screen === TOTAL_SCREENS) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--sc-blue-900)]">
          {result.headline}
        </h1>

        {/* Pathway */}
        <div className="sc-card mt-6 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">
            Likely funding pathway
          </h2>
          <p className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">
            {result.pathway === "five_ya" && RESULT_COPY.pathway5ya}
            {result.pathway === "state_integrated" && RESULT_COPY.stateIntegrated.heading}
            {result.pathway === "private" && RESULT_COPY.private.heading}
            {result.pathway === "new_build" && RESULT_COPY.newBuild.heading}
          </p>
          {(result.pathway === "state_integrated" || result.pathway === "private" || result.pathway === "new_build") && (
            <p className="mt-2 text-[var(--sc-slate)]">
              {result.pathway === "state_integrated" && RESULT_COPY.stateIntegrated.body}
              {result.pathway === "private" && RESULT_COPY.private.body}
              {result.pathway === "new_build" && RESULT_COPY.newBuild.body}
            </p>
          )}
        </div>

        {result.positiveOverrideMessage && (
          <div className="mt-4 rounded-lg border border-[var(--sc-teal-accent)] bg-[#eefaf8] p-4 text-[var(--sc-charcoal)]">
            {result.positiveOverrideMessage}
          </div>
        )}

        {/* Component breakdown */}
        <div className="sc-card mt-6 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">
            Component breakdown
          </h2>
          {result.components.strong.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold text-emerald-700">Strong funding fit</h3>
              <ul className="mt-1 list-disc pl-5 text-[var(--sc-slate)]">
                {result.components.strong.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          )}
          {result.components.moderate.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold text-amber-600">Needs further assessment</h3>
              <ul className="mt-1 list-disc pl-5 text-[var(--sc-slate)]">
                {result.components.moderate.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          )}
          {result.components.weak.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold text-[var(--sc-slate)]">Likely separate funding</h3>
              <ul className="mt-1 list-disc pl-5 text-[var(--sc-slate)]">
                {result.components.weak.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Overall project case */}
        <div className="sc-card mt-6 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">
            Overall project case
          </h2>
          <p className="mt-2 text-lg font-semibold text-[var(--sc-blue-900)]">
            Project case: {result.caseTier.charAt(0).toUpperCase() + result.caseTier.slice(1)}
          </p>
          {result.supportingFactors.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-[var(--sc-slate)]">
              {result.supportingFactors.map((f) => <li key={f}>{f}</li>)}
            </ul>
          )}
        </div>

        {/* Infrastructure summary */}
        <div className="sc-card mt-6 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">
            Infrastructure summary
          </h2>
          <p className="mt-2 font-semibold text-[var(--sc-blue-900)]">
            {result.infrastructureSummary.heading}
          </p>
          <p className="mt-1 text-[var(--sc-slate)]">{result.infrastructureSummary.body}</p>
        </div>

        {/* What still needs confirmation */}
        <div className="sc-card mt-6 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--sc-slate)]">
            What still needs confirmation
          </h2>
          <ul className="mt-2 list-disc pl-5 text-[var(--sc-slate)]">
            {result.confirmationsNeeded.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>

        {/* CTAs */}
        <div className="mt-8 sc-card p-6">
          <h2 className="text-xl font-semibold text-[var(--sc-blue-900)]">{RESULT_COPY.ctaPrimary}</h2>
          <p className="mt-2 text-[var(--sc-slate)]">{RESULT_COPY.ctaPrimaryBody}</p>
          {!showLead && !sent && (
            <div className="mt-4 flex flex-wrap gap-4">
              <button
                type="button"
                className="sc-btn-primary"
                onClick={() => { setLead((l) => ({ ...l, cta: "review" })); setShowLead(true); }}
              >
                {result.pathway === "state_integrated" ? RESULT_COPY.stateIntegrated.cta
                  : result.pathway === "private" ? RESULT_COPY.private.cta
                  : result.pathway === "new_build" ? RESULT_COPY.newBuild.cta
                  : RESULT_COPY.ctaPrimary}
              </button>
              <button
                type="button"
                className="sc-btn-secondary"
                onClick={() => { setLead((l) => ({ ...l, cta: "quote" })); setShowLead(true); }}
              >
                {RESULT_COPY.ctaSecondary}
              </button>
            </div>
          )}
          {showLead && !sent && (
            <form
              className="mt-4 grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                void submitLead();
              }}
            >
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                Your name
                <input
                  required
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                School
                <input
                  required
                  value={lead.school}
                  onChange={(e) => setLead({ ...lead, school: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                Email
                <input
                  required
                  type="email"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                Phone (optional)
                <input
                  type="tel"
                  value={lead.phone}
                  onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                />
              </label>
              <label className="text-sm font-medium text-[var(--sc-slate)]">
                Preferred contact method
                <select
                  value={lead.contactMethod}
                  onChange={(e) => setLead({ ...lead, contactMethod: e.target.value as "email" | "phone" })}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-grey)] px-3 py-2 text-[var(--sc-charcoal)] focus:border-[var(--sc-accent)] focus:outline-none"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </label>
              <div className="sm:col-span-2">
                <p className="text-xs text-[var(--sc-slate)]">
                  Your questionnaire answers are attached automatically.
                </p>
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
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium text-[var(--sc-slate)]">
          <span>
            Step {Math.min(screen + 1, TOTAL_SCREENS)} of {TOTAL_SCREENS}
          </span>
          <span>Takes about 60 seconds</span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-[var(--sc-grey)]">
          <div
            className="h-1.5 rounded-full bg-[var(--sc-accent)] transition-all"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      </div>

      {/* Screen 1 - school type */}
      {screen === 0 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            What type of school is this?
          </legend>
          <div className="mt-6 space-y-3">
            {SCHOOL_TYPES.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                tooltip={o.tooltip}
                selected={answers.schoolType === o.id}
                onClick={() => { setAnswers({ ...answers, schoolType: o.id }); setTimeout(next, 250); }}
              />
            ))}
          </div>
        </fieldset>
      )}

      {/* Screen 2 - project status */}
      {screen === 1 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            What best describes the project?
          </legend>
          <div className="mt-6 space-y-3">
            {PROJECT_STATUSES.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                selected={answers.projectStatus === o.id}
                onClick={() => { setAnswers({ ...answers, projectStatus: o.id }); setTimeout(next, 250); }}
              />
            ))}
          </div>
        </fieldset>
      )}

      {/* Screen 3 - reasons (multi) */}
      {screen === 2 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            Why are you considering an upgrade?
          </legend>
          <p className="mt-2 text-sm text-[var(--sc-slate)]">Select all that apply.</p>
          <div className="mt-6 space-y-3">
            {REASONS.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                selected={answers.reasons.includes(o.id)}
                onClick={() => setAnswers({ ...answers, reasons: toggle(answers.reasons, o.id) })}
              />
            ))}
          </div>
        </fieldset>
      )}

      {/* Screen 4 - infrastructure */}
      {screen === 3 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            Current infrastructure
          </legend>

          <h3 className="mt-6 font-semibold text-[var(--sc-blue-700)]">
            What communication system is currently installed?
          </h3>
          <div className="mt-3 space-y-3">
            {CURRENT_SYSTEMS.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                selected={answers.currentSystem === o.id}
                onClick={() => setAnswers({ ...answers, currentSystem: o.id })}
              />
            ))}
          </div>

          <h3 className="mt-6 font-semibold text-[var(--sc-blue-700)]">
            What network/data cabling is available in the areas you want covered?
            <InfoDot text={CABLING_TOOLTIP} />
          </h3>
          <div className="mt-3 space-y-3">
            {CABLING_STATUS.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                selected={answers.cablingStatus === o.id}
                onClick={() => setAnswers({ ...answers, cablingStatus: o.id, poeStatus: undefined })}
              />
            ))}
          </div>

          {poeAsked && (
            <div className="mt-6">
              <h3 className="font-semibold text-[var(--sc-blue-700)]">
                Does the existing network support Power over Ethernet (PoE)?
                <InfoDot text={POE_TOOLTIP} />
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {POE_OPTIONS.map((o) => (
                  <OptionCard
                    key={o.id}
                    label={o.label}
                    selected={answers.poeStatus === o.id}
                    onClick={() => setAnswers({ ...answers, poeStatus: o.id })}
                  />
                ))}
              </div>
            </div>
          )}

          <h3 className="mt-6 font-semibold text-[var(--sc-blue-700)]">
            What existing infrastructure might be reusable?
            <span className="ml-2 text-sm font-normal text-[var(--sc-slate)]">(optional)</span>
          </h3>
          <div className="mt-3 space-y-3">
            {REUSABLE_ITEMS.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                selected={answers.reusable.includes(o.id)}
                onClick={() => setAnswers({ ...answers, reusable: toggle(answers.reusable, o.id) })}
              />
            ))}
          </div>
        </fieldset>
      )}

      {/* Screen 5 - features */}
      {screen === 4 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            What would you like the system to provide?
          </legend>
          <p className="mt-2 text-sm text-[var(--sc-slate)]">Select all that apply.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const selected = answers.features.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAnswers({ ...answers, features: toggle(answers.features, f.id) })}
                  className={`sc-card p-4 text-left ${selected ? "border-[var(--sc-blue-600)] bg-[var(--sc-blue-50)]" : ""}`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[var(--sc-blue-900)]">
                      {f.label}
                      <InfoDot text={f.description} />
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
                  <span className="mt-1 block text-xs text-[var(--sc-slate)]">{f.description}</span>
                  {f.note && <span className="mt-1 block text-xs italic text-amber-600">{f.note}</span>}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Screen 6 - related work */}
      {screen === 5 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            Is any other work planned at the same time?
          </legend>
          <p className="mt-2 text-sm text-[var(--sc-slate)]">Select all that apply.</p>
          <div className="mt-6 space-y-3">
            {RELATED_WORKS.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                selected={answers.relatedWorks.includes(o.id)}
                onClick={() => setAnswers({ ...answers, relatedWorks: toggle(answers.relatedWorks, o.id) })}
              />
            ))}
          </div>
        </fieldset>
      )}

      {/* Screen 7 - optional property questions */}
      {screen === 6 && (
        <fieldset>
          <legend className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            Optional property questions
          </legend>
          <p className="mt-2 text-sm text-[var(--sc-slate)]">
            These help the assessment but are not required.
          </p>

          <h3 className="mt-6 font-semibold text-[var(--sc-blue-700)]">
            Do you know whether the affected buildings are Ministry-owned?
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {MINISTRY_OWNERSHIP.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                selected={answers.ministryOwnership === o.id}
                onClick={() => setAnswers({ ...answers, ministryOwnership: o.id })}
              />
            ))}
          </div>

          <h3 className="mt-6 font-semibold text-[var(--sc-blue-700)]">
            Is this project already included in your 10 Year Property Plan?
          </h3>
          <div className="mt-3 space-y-3">
            {TEN_YEAR_PLAN.map((o) => (
              <OptionCard
                key={o.id}
                label={o.label}
                selected={answers.tenYearPlan === o.id}
                onClick={() => setAnswers({ ...answers, tenYearPlan: o.id })}
              />
            ))}
          </div>
        </fieldset>
      )}

      {/* Screen 8 - confirm */}
      {screen === 7 && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--sc-blue-900)]">
            Ready to see your funding check
          </h2>
          <p className="mt-3 text-[var(--sc-slate)]">
            We will show which parts of your project may have a funding pathway, how strong the
            overall case looks, and what still needs confirmation. No sign-up required.
          </p>
          <button type="button" className="sc-btn-primary mt-6" onClick={finish}>
            Show my result
          </button>
        </div>
      )}

      {/* Nav */}
      <div className="mt-8 flex items-center gap-4">
        {screen > 0 && (
          <button type="button" className="sc-btn-secondary" onClick={back}>
            Back
          </button>
        )}
        {(screen === 2 || screen === 3 || screen === 4 || screen === 5 || screen === 6) && (
          <button type="button" className="sc-btn-primary" onClick={next}>
            {screen === 6 ? "Continue" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}
