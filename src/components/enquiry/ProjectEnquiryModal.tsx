"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { track } from "@/lib/analytics";
import { attributionForSubmission } from "@/lib/attribution";

/**
 * Site-wide SmartComms project enquiry modal.
 *
 * Enquiries are reviewed by the SmartComms team. SmartComms replies to the
 * user with suitable provider recommendations and public contact details.
 * Customer enquiry data is not forwarded to recommended providers.
 */

export type EnquiryMode =
  | "project_help"
  | "quote_help"
  | "funding_help"
  | "finance_help"
  | "site_assessment"
  | "cabling_help"
  | "system_selection"
  | "general_message";

const HELP_OPTIONS = [
  { value: "choosing_system", label: "Help choosing a system" },
  { value: "understanding_estimate", label: "Help understanding an estimate" },
  { value: "formal_quote", label: "Provider recommendation / formal quote" },
  { value: "site_assessment", label: "Site assessment" },
  { value: "funding_scope", label: "Funding / project-scope question" },
  { value: "finance_options", label: "Finance / leasing question" },
  { value: "cabling_network", label: "Network / cabling question" },
  { value: "quote_review", label: "Existing design / quote review" },
  { value: "general_question", label: "General question" },
] as const;

const DEFAULT_HELP: Record<EnquiryMode, string> = {
  project_help: "choosing_system",
  quote_help: "formal_quote",
  funding_help: "funding_scope",
  finance_help: "finance_options",
  site_assessment: "site_assessment",
  cabling_help: "cabling_network",
  system_selection: "choosing_system",
  general_message: "general_question",
};

const EXISTING_PROVIDER_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
] as const;

const MODE_COPY: Record<EnquiryMode, { title: string; blurb: string; submit: string }> = {
  project_help: {
    title: "Get project help",
    blurb:
      "Tell us enough to understand the project. SmartComms will review it and reply with the provider or providers in our selected New Zealand network that look best suited, including their public contact details and why they may fit. You decide who to contact.",
    submit: "Send project for review",
  },
  quote_help: {
    title: "Find providers for a formal quote",
    blurb:
      "Your project information comes to SmartComms, not an installer. We'll review it and reply with the providers we think are best suited to quote the project, with their public contact details.",
    submit: "Send project for provider recommendations",
  },
  funding_help: {
    title: "Get help scoping the project",
    blurb:
      "SmartComms cannot approve or confirm Ministry funding. We can review the technical scope and suggest providers who may be able to help turn it into a quote-ready project. We'll send their contact details to you.",
    submit: "Send project for scope review",
  },
  finance_help: {
    title: "Find the right finance contact",
    blurb:
      "Tell us a little about the communications project. We'll review it and, where appropriate, reply with a finance specialist or provider from our selected New Zealand network for you to contact directly.",
    submit: "Send finance question",
  },
  site_assessment: {
    title: "Find help with a site assessment",
    blurb:
      "A short site review can narrow the scope and estimate. Tell us about the site and region and we'll reply with the provider or providers we think are best suited to assess it.",
    submit: "Find a site-assessment provider",
  },
  cabling_help: {
    title: "Find help with network cabling",
    blurb:
      "Site-wide structured cabling is excluded from our calculator and needs separate scoping. Give us a few details and we'll reply with suitable people for your site and region.",
    submit: "Find a cabling provider",
  },
  system_selection: {
    title: "Get help choosing the right system",
    blurb:
      "Tell us what the system needs to do, your region and what is already installed. We'll review it and reply with the next step or suitable providers for you to contact.",
    submit: "Send project for review",
  },
  general_message: {
    title: "Send us a message",
    blurb:
      "Questions, corrections, or a proposed system you would like us to look at. We read everything.",
    submit: "Send message",
  },
};

export function ProjectEnquiryModal({
  open,
  mode,
  onClose,
  estimateSummary,
  estimateLink,
  context,
  sourceTopic,
}: {
  open: boolean;
  mode: EnquiryMode;
  onClose: () => void;
  /** e.g. "$11,845 - $14,214 ex GST" */
  estimateSummary?: string;
  estimateLink?: string;
  /** Structured tool/page context lines attached automatically (non-PII). */
  context?: Record<string, string>;
  /** e.g. "emergency_lockdown", "compare" */
  sourceTopic?: string;
}) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const successId = useId();
  const isProject = mode !== "general_message";
  const showHelpType = mode === "project_help";
  const hasStructuredContext = Boolean(estimateSummary || Object.values(context ?? {}).some(Boolean));
  const [helpType, setHelpType] = useState<string>(DEFAULT_HELP[mode]);
  const [existingProvider, setExistingProvider] = useState<string>("");
  const [providerName, setProviderName] = useState("");

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    queueMicrotask(() => {
      setDone(false);
      setError(null);
      setHelpType(DEFAULT_HELP[mode]);
      setExistingProvider("");
      setProviderName("");
    });
    document.body.style.overflow = "hidden";
    // Native showModal provides an inert background and keyboard focus containment.
    if (!dialog.open) dialog.showModal();
    track("project_help_opened", { enquiry_type: mode, source_page: window.location.pathname });
    const frame = requestAnimationFrame(() => {
      if (panelRef.current) panelRef.current.scrollTop = 0;
      titleRef.current?.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [open, mode]);

  useEffect(() => {
    if (!open || !done) return;
    const frame = requestAnimationFrame(() => {
      if (panelRef.current) panelRef.current.scrollTop = 0;
      successRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [open, done]);

  if (!open || typeof document === "undefined") return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Validate attachments against the honest hosting-supported limit before
    // upload (SC-05.A): 4MB combined across all files.
    const chosen = [...e.currentTarget.querySelectorAll<HTMLInputElement>('input[name="attachments"]')]
      .flatMap((input) => Array.from(input.files ?? []));
    const totalBytes = chosen.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > 4_000_000) {
      setError("Attachments are too large in total. Please keep combined uploads under 4MB.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("mode", mode);
      fd.set("helpType", helpType);
      if (existingProvider) fd.set("existingProvider", existingProvider);
      if (existingProvider === "yes" && providerName) fd.set("providerName", providerName);
      if (estimateSummary) fd.set("estimate", estimateSummary);
      if (estimateLink) fd.set("estimateLink", estimateLink);
      if (sourceTopic) fd.set("sourceTopic", sourceTopic);
      for (const [key, value] of Object.entries(context ?? {})) {
        if (value) fd.set(`ctx_${key}`, value);
      }
      fd.set("pageUrl", window.location.href);
      fd.set("referrer", document.referrer);
      for (const [key, value] of Object.entries(attributionForSubmission())) {
        fd.set(`attr_${key}`, value);
      }
      const res = await fetch("/api/inquiry", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Send failed");
      setDone(true);
      track("project_help_submitted", {
        enquiry_type: mode,
        help_type: helpType,
        existing_provider: existingProvider || "not_answered",
        source_page: window.location.pathname,
      });
    } catch (err) {
      track("project_help_failed", { enquiry_type: mode, source_page: window.location.pathname });
      setError(
        err instanceof Error && err.message && err.message !== "Send failed"
          ? err.message
          : "We couldn't submit your enquiry. Please try the form again in a few minutes.",
      );
    } finally {
      setSending(false);
    }
  }

  const { title, blurb, submit: submitLabel } = MODE_COPY[mode];
  const contextLines = Object.entries(context ?? {}).filter(([, v]) => v);

  const inputClass = "sc-input";

  return createPortal(
    <dialog ref={dialogRef} className="sc-dialog not-prose" aria-modal="true"
      aria-labelledby={done ? successId : titleId} aria-describedby={done ? undefined : descriptionId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={panelRef} className="sc-dialog-panel" data-clarity-mask="true">
        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sc-teal)]/10 text-2xl text-[var(--sc-teal)]">✓</div>
            <h3 id={successId} ref={successRef} tabIndex={-1} className="sc-dialog-title mt-4 text-xl font-semibold text-[var(--sc-navy)]">Thanks, we&apos;ve received your enquiry</h3>
            <p className="mt-2 text-sm text-[var(--sc-slate)]">
              The SmartComms team will review what you sent and reply with the provider or providers we think are the
              best fit, including their public contact details and why they may suit your requirements.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="sc-btn-primary mt-6"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id={titleId} ref={titleRef} tabIndex={-1} className="sc-dialog-title text-xl font-semibold text-[var(--sc-navy)]">{title}</h3>
                <p id={descriptionId} className="mt-1 text-sm text-[var(--sc-slate)]">{blurb}</p>
                {estimateSummary && (
                  <p className="mt-2 rounded-full bg-[var(--sc-blue-50)] px-3 py-1 text-xs font-medium text-[var(--sc-navy)]">
                    Your estimate: {estimateSummary} ex GST
                  </p>
                )}
                {contextLines.length > 0 && (
                  <p className="mt-2 rounded-lg bg-[var(--sc-blue-50)] px-3 py-1.5 text-xs leading-relaxed text-[var(--sc-slate)]">
                    Attached automatically: {contextLines.map(([k]) => k).join(", ")}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="sc-icon-button"
              >
                ✕
              </button>
            </div>
            <form onSubmit={submit} className="mt-5 space-y-4">
              <div className="hidden" aria-hidden="true">
                <label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
              </div>

              {showHelpType && (
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">What help do you need? *</span>
                  <select
                    required
                    value={helpType}
                    onChange={(e) => setHelpType(e.target.value)}
                    className={inputClass}
                  >
                    {HELP_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </label>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">Contact name *</span>
                  <input required name="name" className={inputClass} placeholder="Jane Smith" autoComplete="name" />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">
                    {isProject ? "Organisation / school *" : "Organisation (optional)"}
                  </span>
                  <input
                    required={isProject}
                    name="organisation"
                    className={inputClass}
                    placeholder={isProject ? "Your school, business or organisation" : "Company or school (optional)"}
                    autoComplete="organization"
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">Email *</span>
                  <input required name="email" type="email" className={inputClass} placeholder="you@example.co.nz" autoComplete="email" />
                </label>
                {isProject ? (
                  <label className="block text-sm">
                    <span className="font-medium text-[var(--sc-charcoal)]">Town / region *</span>
                    <input required name="location" className={inputClass} placeholder="e.g. Christchurch" />
                  </label>
                ) : null}
              </div>
              {isProject ? (
                <>
                  {!hasStructuredContext && (
                    <label className="block text-sm">
                      <span className="font-medium text-[var(--sc-charcoal)]">What are you trying to improve? *</span>
                      <textarea required name="comments" rows={3} className={inputClass} placeholder="For example: replace unreliable bells, improve outdoor paging, or get a site-specific quote" />
                    </label>
                  )}

                  <details className="rounded-xl border border-[var(--sc-border)] bg-white p-3">
                    <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-[var(--sc-blue-700)]">
                      Add more project details (optional)
                    </summary>
                    <div className="mt-3 space-y-4 border-t border-[var(--sc-border)] pt-4">
                      <fieldset className="rounded-xl border border-[var(--sc-border)] p-3">
                        <legend className="px-1 text-sm font-medium text-[var(--sc-charcoal)]">Already working with an installer, IT provider or consultant?</legend>
                        <div className="mt-1 flex flex-wrap gap-3">
                          {EXISTING_PROVIDER_OPTIONS.map((o) => (
                            <label key={o.value} className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-[var(--sc-slate)]">
                              <input
                                type="radio"
                                name="existingProviderChoice"
                                value={o.value}
                                checked={existingProvider === o.value}
                                onChange={() => setExistingProvider(o.value)}
                                className="accent-[var(--sc-teal-strong)]"
                              />
                              {o.label}
                            </label>
                          ))}
                        </div>
                        {existingProvider === "yes" && (
                          <input
                            name="providerName"
                            value={providerName}
                            onChange={(e) => setProviderName(e.target.value)}
                            className={`${inputClass} mt-2`}
                            placeholder="Provider name (optional)"
                            aria-label="Existing provider name"
                          />
                        )}
                      </fieldset>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm">
                          <span className="font-medium text-[var(--sc-charcoal)]">Phone</span>
                          <input name="phone" type="tel" className={inputClass} placeholder="021 234 5678" autoComplete="tel" />
                        </label>
                        <label className="block text-sm">
                          <span className="font-medium text-[var(--sc-charcoal)]">Brand / product preference</span>
                          <input name="brandPreference" className={inputClass} placeholder="e.g. Bosch, no preference" />
                        </label>
                      </div>
                      {hasStructuredContext && (
                        <label className="block text-sm">
                          <span className="font-medium text-[var(--sc-charcoal)]">Project note</span>
                          <textarea name="comments" rows={3} className={inputClass} placeholder="Anything else we should know about the site or project" />
                        </label>
                      )}
                      <label className="block text-sm">
                        <span className="font-medium text-[var(--sc-charcoal)]">Attach plans / documents</span>
                        <input
                          type="file"
                          name="attachments"
                          multiple
                          accept=".pdf,.png,.jpg,.jpeg,.webp,.dwg,.heic"
                          className="mt-1 w-full cursor-pointer rounded-lg border border-dashed border-[var(--sc-border)] px-3 py-2.5 text-sm text-[var(--sc-slate)] file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-[var(--sc-blue-50)] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[var(--sc-navy)] hover:border-[var(--sc-teal)]"
                        />
                        <span className="mt-1 block text-xs text-[var(--sc-slate)]">PDFs, images or plans. Up to 4MB total across all files.</span>
                      </label>
                    </div>
                  </details>

                  <p className="rounded-lg border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-3 text-xs leading-relaxed text-[var(--sc-slate)]">
                    SmartComms replies to you with recommended providers and their public contact details. We do not send your contact details, project information or attachments to the providers we recommend.
                  </p>
                </>
              ) : (
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">Message *</span>
                  <textarea required name="message" rows={4} className={inputClass} placeholder="Your question, correction or project details" />
                </label>
              )}

              {error && <p role="alert" className="rounded-lg bg-[var(--sc-warning-surface)] p-3 text-sm text-[var(--sc-warning-text)]">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="sc-btn-help w-full"
              >
                {sending ? "Sending…" : submitLabel}
              </button>
              <p className="text-center text-xs leading-relaxed text-[var(--sc-slate)]">
                Your enquiry stays with SmartComms and is used to respond to you. <Link href="/privacy" className="underline">Privacy</Link>.
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>,
    document.body,
  );
}
