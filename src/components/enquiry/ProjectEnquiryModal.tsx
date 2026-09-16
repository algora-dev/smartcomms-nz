"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { attributionForSubmission } from "@/lib/attribution";

/**
 * Site-wide project enquiry modal (T3-triage model).
 *
 * One component, contextual modes. Enquiries go to SmartComms / T3 Labs
 * first; provider introductions happen only after the customer agrees.
 */

export type EnquiryMode =
  | "project_help"
  | "quote_help"
  | "funding_help"
  | "site_assessment"
  | "cabling_help"
  | "system_selection"
  | "general_message";

const HELP_OPTIONS = [
  { value: "choosing_system", label: "Help choosing a system" },
  { value: "understanding_estimate", label: "Help understanding an estimate" },
  { value: "formal_quote", label: "Formal quote / installer" },
  { value: "site_assessment", label: "Site assessment" },
  { value: "funding_scope", label: "Funding / project-scope question" },
  { value: "cabling_network", label: "Network / cabling question" },
  { value: "quote_review", label: "Existing design / quote review" },
  { value: "general_question", label: "General question" },
] as const;

const DEFAULT_HELP: Record<EnquiryMode, string> = {
  project_help: "choosing_system",
  quote_help: "formal_quote",
  funding_help: "funding_scope",
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

/** How enquiries are actually handled: T3 triage, no automatic forwarding. */
export const T3_HANDOFF_COPY =
  "Your enquiry goes to SmartComms / T3 Labs first. We use it to understand the project and suggest an appropriate next step. If we recommend a provider and you want a direct introduction, we will confirm that before sharing your contact details with them.";

const MODE_COPY: Record<EnquiryMode, { title: string; blurb: string; submit: string }> = {
  project_help: {
    title: "Help me take the next step",
    blurb:
      "Tell us a little about the site and what you need the system to do. We'll review it and suggest the most useful next step, or a suitable provider from our selected New Zealand network.",
    submit: "Send enquiry",
  },
  quote_help: {
    title: "Get help with a formal quote",
    blurb:
      "Send us enough information to understand the project and we can suggest a suitable provider from our selected New Zealand partner network for a formal quote.",
    submit: "Send enquiry",
  },
  funding_help: {
    title: "Discuss the technical scope and budget",
    blurb:
      "A provider can help document the existing system, technical scope and indicative budget. The school, Property Advisor / 10YPP process and Ministry requirements determine the funding pathway and approval.",
    submit: "Send enquiry",
  },
  site_assessment: {
    title: "Ask about a site assessment",
    blurb:
      "A short site review usually narrows the estimate considerably. Tell us about the site and region and we can suggest an appropriate next step or provider.",
    submit: "Ask about a site assessment",
  },
  cabling_help: {
    title: "Network / cabling question",
    blurb:
      "Site-wide structured cabling is excluded from our calculator and must be scoped separately by an appropriate ICT / cabling contractor. Give us a few details and we can point you to the right people for your site and region.",
    submit: "Send enquiry",
  },
  system_selection: {
    title: "Find the right system",
    blurb:
      "Tell us what the system needs to do, your region and what infrastructure already exists. We'll review it and suggest suitable options or a next step.",
    submit: "Send enquiry",
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const isProject = mode !== "general_message";
  const [helpType, setHelpType] = useState<string>(DEFAULT_HELP[mode]);
  const [existingProvider, setExistingProvider] = useState<string>("");
  const [providerName, setProviderName] = useState("");

  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      queueMicrotask(() => {
        setDone(false);
        setError(null);
        setHelpType(DEFAULT_HELP[mode]);
        setExistingProvider("");
        setProviderName("");
      });
      document.body.style.overflow = "hidden";
      track("project_help_opened", { enquiry_type: mode, source_page: window.location.pathname });
      requestAnimationFrame(() => {
        const first = dialogRef.current?.querySelector<HTMLElement>(
          "input, select, textarea, button:not([aria-label='Close'])",
        );
        (first ?? dialogRef.current)?.focus();
      });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([disabled]):not([tabindex='-1']), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      restoreFocusRef.current?.focus?.();
      restoreFocusRef.current = null;
    };
  }, [open, onClose]);

  if (!open) return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Strategically important routing answer: partner-sent prospects must not
    // be silently treated as new leads, so project enquiries require it.
    if (isProject && !existingProvider) {
      setError("Please tell us whether you are already working with an installer, IT provider or consultant (or choose Not sure).");
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

  const inputClass =
    "mt-1 w-full rounded-lg border border-[var(--sc-border)] px-3 py-2 text-sm focus:border-[var(--sc-teal)] focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sc-enquiry-title"
      aria-describedby="sc-enquiry-desc"
    >
      <div ref={dialogRef} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8" tabIndex={-1}>
        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sc-teal)]/10 text-2xl text-[var(--sc-teal)]">✓</div>
            <h3 className="mt-4 text-xl font-semibold text-[var(--sc-navy)]">Thanks — we&apos;ve received your enquiry</h3>
            <p className="mt-2 text-sm text-[var(--sc-slate)]">
              We&apos;ll review the information you supplied and work out the most useful next step. Where a specialist
              provider is appropriate, we can suggest someone from our selected New Zealand partner network.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-[var(--sc-navy)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--sc-blue-700)] hover:shadow-md transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="sc-enquiry-title" className="text-xl font-semibold text-[var(--sc-navy)]">{title}</h3>
                <p id="sc-enquiry-desc" className="mt-1 text-sm text-[var(--sc-slate)]">{blurb}</p>
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
                className="rounded-full p-1.5 text-[var(--sc-slate)] hover:bg-[var(--sc-blue-50)] hover:text-[var(--sc-navy)] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={submit} className="mt-5 space-y-4">
              <div className="hidden" aria-hidden="true">
                <label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
              </div>

              {isProject && (
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
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm">
                      <span className="font-medium text-[var(--sc-charcoal)]">Phone (optional)</span>
                      <input name="phone" type="tel" className={inputClass} placeholder="021 234 5678 (optional)" autoComplete="tel" />
                    </label>
                    <label className="block text-sm">
                      <span className="font-medium text-[var(--sc-charcoal)]">Brand / product preference (optional)</span>
                      <input name="brandPreference" className={inputClass} placeholder="e.g. SPON, Bosch, no preference" />
                    </label>
                  </div>

                  <fieldset className="rounded-xl border border-[var(--sc-border)] p-3">
                    <legend className="px-1 text-sm font-medium text-[var(--sc-charcoal)]">
                      Are you already working with an installer, IT provider or consultant? *{existingProvider ? "" : " (required)"}
                    </legend>
                    <div className="mt-1 flex flex-wrap gap-3">
                      {EXISTING_PROVIDER_OPTIONS.map((o) => (
                        <label key={o.value} className="flex cursor-pointer items-center gap-1.5 text-sm text-[var(--sc-slate)]">
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
                </>
              ) : null}

              <label className="block text-sm">
                <span className="font-medium text-[var(--sc-charcoal)]">
                  {isProject ? "Project note (optional)" : "Message *"}
                </span>
                <textarea
                  required={!isProject}
                  name={isProject ? "comments" : "message"}
                  rows={3}
                  className={inputClass}
                  placeholder={
                    isProject
                      ? "Anything else we should know about the site or project"
                      : "Your question, correction or project details"
                  }
                />
              </label>

              {isProject && (
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">Attach plans / documents (optional)</span>
                  <input
                    type="file"
                    name="attachments"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.webp,.dwg,.heic"
                    className="mt-1 w-full cursor-pointer rounded-lg border border-dashed border-[var(--sc-border)] px-3 py-2.5 text-sm text-[var(--sc-slate)] file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-[var(--sc-blue-50)] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[var(--sc-navy)] hover:border-[var(--sc-teal)]"
                  />
                  <span className="mt-1 block text-xs text-[var(--sc-slate)]">PDFs, images or plans. Up to 8MB per file and 20MB total.</span>
                </label>
              )}

              <p className="rounded-lg border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-3 text-xs leading-relaxed text-[var(--sc-slate)]">
                {T3_HANDOFF_COPY}
              </p>
              {error && <p className="rounded-lg bg-[#fdf3ec] p-3 text-sm text-[#7a3413]">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-[var(--sc-teal-strong)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--sc-teal-strong-hover)] hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {sending ? "Sending…" : submitLabel}
              </button>
              <p className="text-center text-xs leading-relaxed text-[var(--sc-slate)]">
                We use your details to respond to this enquiry. A provider receives your contact details only if you
                agree to a direct introduction. <Link href="/privacy" className="underline">Privacy</Link>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
