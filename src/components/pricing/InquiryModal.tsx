"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type InquiryMode = "quote" | "assessment";

export function InquiryModal({
  open,
  mode,
  onClose,
  estimateSummary,
  estimateLink,
}: {
  open: boolean;
  mode: InquiryMode;
  onClose: () => void;
  estimateSummary?: string; // e.g. "$11,845 - $14,214 ex GST"
  estimateLink?: string;
}) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      setDone(false);
      setError(null);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("mode", mode);
      if (estimateSummary) fd.set("estimate", estimateSummary);
      if (estimateLink) fd.set("estimateLink", estimateLink);
      fd.set("pageUrl", window.location.href);
      fd.set("referrer", document.referrer);
      const params = new URLSearchParams(window.location.search);
      for (const key of ["utm_source", "utm_medium", "utm_campaign", "partner"]) {
        const value = params.get(key);
        if (value) fd.set(key, value);
      }
      const res = await fetch("/api/inquiry", { method: "POST", body: fd });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Send failed");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const title = mode === "quote" ? "Get an accurate quote" : "Book a site assessment";
  const blurb =
    mode === "quote"
      ? "Send us your details and one of our trusted installation partners can review the site and provide a proper project quote."
      : "A short site review usually narrows the estimate considerably. Send us your details and we will be in touch to arrange a visit.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
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
                <h3 className="text-xl font-semibold text-[var(--sc-navy)]">{title}</h3>
                <p className="mt-1 text-sm text-[var(--sc-slate)]">{blurb}</p>
                {estimateSummary && (
                  <p className="mt-2 rounded-full bg-[var(--sc-blue-50)] px-3 py-1 text-xs font-medium text-[var(--sc-navy)]">
                    Your estimate: {estimateSummary} ex GST
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
            <form ref={formRef} onSubmit={submit} className="mt-5 space-y-4">
              <div className="hidden" aria-hidden="true">
                <label>Website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">Contact name *</span>
                  <input
                    required
                    name="name"
                    className="mt-1 w-full rounded-lg border border-[var(--sc-border)] px-3 py-2 text-sm focus:border-[var(--sc-teal)] focus:outline-none"
                    placeholder="Jane Smith"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-medium text-[var(--sc-charcoal)]">Phone *</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    className="mt-1 w-full rounded-lg border border-[var(--sc-border)] px-3 py-2 text-sm focus:border-[var(--sc-teal)] focus:outline-none"
                    placeholder="021 234 5678"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="font-medium text-[var(--sc-charcoal)]">Email *</span>
                <input
                  required
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-lg border border-[var(--sc-border)] px-3 py-2 text-sm focus:border-[var(--sc-teal)] focus:outline-none"
                  placeholder="you@example.co.nz"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-[var(--sc-charcoal)]">Site location / town *</span>
                <input
                  required
                  name="location"
                  className="mt-1 w-full rounded-lg border border-[var(--sc-border)] px-3 py-2 text-sm focus:border-[var(--sc-teal)] focus:outline-none"
                  placeholder="e.g. Christchurch"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-[var(--sc-charcoal)]">Comments</span>
                <textarea
                  name="comments"
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-[var(--sc-border)] px-3 py-2 text-sm focus:border-[var(--sc-teal)] focus:outline-none"
                  placeholder="Anything else we should know about the site or project"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-[var(--sc-charcoal)]">Attach plans / documents</span>
                <input
                  type="file"
                  name="attachments"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.dwg,.heic"
                  className="mt-1 w-full cursor-pointer rounded-lg border border-dashed border-[var(--sc-border)] px-3 py-2.5 text-sm text-[var(--sc-slate)] file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-[var(--sc-blue-50)] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[var(--sc-navy)] hover:border-[var(--sc-teal)]"
                />
                <span className="mt-1 block text-xs text-[var(--sc-slate)]">PDFs, images or plans. Up to 8MB per file and 20MB total.</span>
              </label>
              {error && <p className="rounded-lg bg-[#fdf3ec] p-3 text-sm text-[#7a3413]">{error}</p>}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-[var(--sc-teal-strong)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--sc-teal-strong-hover)] hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {sending ? "Sending…" : mode === "quote" ? "Send enquiry" : "Request site assessment"}
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
