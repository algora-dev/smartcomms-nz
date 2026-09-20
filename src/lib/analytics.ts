/**
 * Analytics abstraction (V7).
 *
 * Components never call a vendor SDK directly. GA4 is the primary event
 * destination when NEXT_PUBLIC_GA4_MEASUREMENT_ID is configured in the
 * environment; otherwise track() is a safe no-op so the site works before
 * the measurement ID is provisioned (see SMARTCOMMS_MANUAL_ACTIONS_V7).
 *
 * Never send PII (names, emails, phone numbers, free-text comments) through
 * this layer. Payloads must stay limited to coarse, non-identifying facts.
 */

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export function track(event: string, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  // Internal routes are never tracked, even after client-side navigation.
  if (window.location.pathname.startsWith("/insights")) return;
  const clean: EventPayload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined && value !== "") clean[key] = value;
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", event, clean);
  }
  // Keep a lightweight debug trail for QA without a vendor console.
  if (process.env.NODE_ENV !== "production") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...clean });
  }
}
