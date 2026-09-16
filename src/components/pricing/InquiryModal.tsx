"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { attributionForSubmission } from "@/lib/attribution";

export type InquiryMode = "quote" | "assessment" | "message" | "cabling" | "connect";

const HELP_OPTIONS = [
  { value: "formal_quote", label: "Formal quote" },
  { value: "site_assessment", label: "Site assessment" },
  { value: "funding_review", label: "Funding / project review" },
  { value: "choosing_system", label: "Help choosing a system" },
  { value: "technical_review", label: "Technical / network review" },
  { value: "general_question", label: "General project question" },
];

export const PARTNER_HANDOFF_COPY =
  "SmartComms can pass your project details to a trusted New Zealand installation or technology partner if you want a formal design, quote or site assessment. You remain free to use any provider.";

export function InquiryModal({
  open,
  mode,
  onClose,
  estimateSummary,
  estimateLink,
  summaryLabel,
}: {
  open: boolean;
  mode: InquiryMode;
  onClose: () => void;
  estimateSummary?: string; // e.g. "$11,845 - $14,214 ex GST"
  estimateLink?: string;
  /** Label for the context chip, e.g. "Your funding result" */
  summaryLabel?: string;
}) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const isProject = mode !== "message";
  // Slim referral modes: neutral connector framing, minimal fields.
  const slim = mode === "cabling" || mode === "connect";
  const defaultHelp = mode === "assessment" ? "site_assessment" : mode === "cabling" ? "technical_review" : "formal_quote";
  const [helpType, setHelpType] = useState(defaultHelp);

  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      queueMicrotask(() => {
        setDone(false);
        setError(null);
        setHelpType(defaultHelp);
      });
      document.body.style.overflow = "hidden";
      track("enquiry_opened", { enquiry_type: mode });
      // Move focus into the dialog once it renders.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Focus trap: cycle Tab/Shift+Tab inside the dialog.
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
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
    setSending(true);
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("mode", mode);
      fd.set("helpType", helpType);
      if (estimateSummary) fd.set("estimate", estimateSummary);
      if (estimateLink) fd.set("estimateLink", estimateLink);
      fd.set("pageUrl", window.location.href);
      fd.set("referrer", document.referrer);
      for (const [key, value] of Object.entries(attributionForSubmission())) {
        fd.set(`attr_${key}`, value);
      }
      const res = await fetch("/api/inquiry", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Send failed");
      setDone(true);
      track("enquiry_submitted", {
        enquiry_type: mode,
        help_type: helpType,
        source_page: window.location.pathname,
      });
    } catch (err) {
      track("enquiry_failed", { enquiry_type: mode, source_page: window.location.pathname });
      setError(
        err instanceof Error && err.message && err.message !== "Send failed"
          ? err.message
          : "We couldn't submit your enquiry. Please try the form again in a few minutes.",
      );
    } finally {
      setSending(false);
    }
  }

  const title =
    mode === "quote" ? "Get an accurate quote"
    : mode === "assessment" ? "Book a site assessment"
    : mode === "cabling" ? "Network cabling for your site"
    : mode === "connect" ? "Want more information?"
    : "Send us a message";
  const blurb =
    mode === "quote"
      ? "Send us your details and we can put you in touch with the right people for a proper project quote."
      : mode === "assessment"
        ? "A short site review usually narrows the estimate considerably. Send us your details and we will be in touch to arrange a visit."
        : mode === "cabling"
          ? "Site-wide cabling is installed by a Ministry of Education approved ICT contractor. Your school IT team may also be able to help, or give us a few details and we can point you to the right people for your site and region."
          : mode === "connect"
            ? "Tell us about your site and we can put you in touch with the right people for your region and project, whether that is a quote, a site assessment or cabling advice."
            : "Questions, corrections, or a proposed system you would like us to look at. We read everything.";

  const inputClass =
    "mt-1 w-full rounded-lg border border-[var(--sc-border)] px-3 py-2 text-sm focus:border-[var(--sc-teal)] focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sc-inquiry-title"
      aria-describedby="sc-inquiry-desc"
    >
      <div ref={dialogRef} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8" tabIndex={-1}>
        {done ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sc-teal)]/10 text-2xl text-[var(--sc-teal)]">✓</div>
            <h3 className="mt-4 text-xl font-semibold text-[var(--sc-navy)]">Thank you</h3>
            <p className="mt-2 text-sm text-[var(--sc-slate)]">
              Your enquiry has been sent. We will be in touch shortly.
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
                <h3 id="sc-inquiry-title" className="text-xl font-semibold text-[var(--sc-navy)]">{title}</h3>
                <p id="sc-inquiry-desc" className="mt-1 text-sm text-[var(--sc-slate)]">{blurb}</p>
                {estimateSummary && (
                  <p className="mt-2 rounded-full bg-[var(--sc-blue-50)] px-3 py-1 text-xs font-medium text-[var(--sc-navy)]">
                    {summaryLabel ?? "Your estimate"}: {estimateSummary}
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

              {isProject && !slim && (
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
                    {isProject ? "School / organisation *" : "Organisation (optional)"}
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
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">Phone (optional)</span>
                  <input name="phone" type="tel" className={inputClass} placeholder="021 234 5678 (optional)" autoComplete="tel" />
                </label>
              ) : null}

              <label className="block text-sm">
                <span className="font-medium text-[var(--sc-charcoal)]">
                  {isProject ? "Comments (optional)" : "Message *"}
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

              {isProject && !slim && (
                <p className="rounded-lg border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-3 text-xs leading-relaxed text-[var(--sc-slate)]">
                  {PARTNER_HANDOFF_COPY}
                </p>
              )}
              {error && <p className="rounded-lg bg-[#fdf3ec] p-3 text-sm text-[#7a3413]">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-[var(--sc-teal-strong)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--sc-teal-strong-hover)] hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {sending ? "Sending…" : "Put me in touch"}
              </button>
              <p className="text-center text-xs leading-relaxed text-[var(--sc-slate)]">
                We use your details to respond to this enquiry. If you request installation or a formal quote, relevant project details may be shared with a trusted installation partner. <Link href="/privacy" className="underline">Privacy</Link>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
