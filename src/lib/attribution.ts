/**
 * Persistent first-touch attribution (V7, localStorage V1).
 *
 * Captured once on the first eligible visit, never overwritten during the
 * attribution window (currently 180 days). A separate last-touch record is
 * refreshed on every visit. Values are attached to internal enquiry emails
 * only; they are never shown to users or sent to analytics as PII.
 */

export interface AttributionData {
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  partner: string;
  firstVisitAt: string;
}

const FIRST_TOUCH_KEY = "scnz_first_touch";
const LAST_TOUCH_KEY = "scnz_last_touch";
const WINDOW_MS = 180 * 24 * 60 * 60 * 1000;

/** True when a path must never be captured (internal/insights routes). */
function isPrivatePath(pathname: string): boolean {
  return pathname.startsWith("/insights");
}

/** URL capture is bounded: pathname + allowlisted params only (utm_*, partner,
 * industry). Arbitrary query params (incl. cfg blobs) are stripped. */
function sanitizeLanding(): string {
  const params = new URLSearchParams(window.location.search);
  const kept = new URLSearchParams();
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "partner", "industry"]) {
    const v = params.get(key);
    if (v) kept.set(key, v.slice(0, 200));
  }
  const qs = kept.toString();
  return window.location.pathname + (qs ? `?${qs}` : "");
}

/** Purge expired records so the 180-day window is enforced on read/write, not
 * just at first-touch creation (SC-04.E). */
function purgeExpired(): void {
  try {
    for (const key of [FIRST_TOUCH_KEY, LAST_TOUCH_KEY]) {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as Partial<AttributionData>;
      const first = new Date(parsed.firstVisitAt ?? 0).getTime();
      const expired = Number.isNaN(first) || Date.now() - first > WINDOW_MS;
      if (expired) window.localStorage.removeItem(key);
    }
  } catch {
    // storage unavailable; attribution is best-effort
  }
}

function readJson(key: string): Partial<AttributionData> | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Partial<AttributionData>) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: Partial<AttributionData>): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private mode); attribution is best-effort.
  }
}

function fresh(): boolean {
  try {
    const existing = readJson(FIRST_TOUCH_KEY);
    if (!existing) return true;
    const first = new Date(existing.firstVisitAt ?? 0).getTime();
    if (Number.isNaN(first)) return true;
    return Date.now() - first > WINDOW_MS;
  } catch {
    return true;
  }
}

/** Call once per client page load (component mount) to record touch data. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  if (isPrivatePath(window.location.pathname)) return; // never capture internal routes
  purgeExpired();
  const params = new URLSearchParams(window.location.search);
  const snap: Partial<AttributionData> = {
    landingPage: sanitizeLanding(),
    referrer: document.referrer,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    partner: params.get("partner") ?? "",
    firstVisitAt: new Date().toISOString(),
  };
  if (fresh()) writeJson(FIRST_TOUCH_KEY, snap);
  const last = { ...snap, firstVisitAt: undefined };
  writeJson(LAST_TOUCH_KEY, last);
}

/**
 * Refresh last-touch only (client-side navigation). First touch is never
 * overwritten. New tagged sources (UTM/partner) intentionally update the
 * last-touch record; a new landing page is not recorded, because the
 * visitor already arrived earlier in the session.
 */
export function refreshLastTouch(): void {
  if (typeof window === "undefined") return;
  if (isPrivatePath(window.location.pathname)) return;
  purgeExpired();
  const params = new URLSearchParams(window.location.search);
  const last = {
    landingPage: sanitizeLanding(),
    referrer: document.referrer,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    partner: params.get("partner") ?? "",
    firstVisitAt: undefined,
  };
  writeJson(LAST_TOUCH_KEY, last);
}

/**
 * Flattened attribution for form submission. Built from the structured
 * first/last-touch records so both journeys reach the enquiry with the
 * complete field set: landing page, referrer, UTMs, partner and timestamp.
 */
export function attributionForSubmission(): Record<string, string> {
  if (typeof window === "undefined") return {};
  purgeExpired(); // expired entries are excluded, not submitted
  const { firstTouch, lastTouch } = attributionBlocks();
  const out: Record<string, string> = { currentPage: window.location.href };
  for (const [key, value] of Object.entries(firstTouch)) {
    if (value) out[`first_${key}`] = value;
  }
  for (const [key, value] of Object.entries(lastTouch)) {
    if (value) out[`last_${key}`] = value;
  }
  return out;
}

/**
 * Structured first/last-touch block for project leads (Phase 3.3).
 * Flat keys are also kept for backwards compatibility with the email body.
 */
export function attributionBlocks(): {
  firstTouch: Record<string, string>;
  lastTouch: Record<string, string>;
} {
  if (typeof window === "undefined") return { firstTouch: {}, lastTouch: {} };
  const first = readJson(FIRST_TOUCH_KEY) ?? {};
  const last = readJson(LAST_TOUCH_KEY) ?? {};
  const clean = (source: Record<string, unknown>) => {
    const out: Record<string, string> = {};
    for (const key of ["landingPage", "referrer", "utmSource", "utmMedium", "utmCampaign", "utmContent", "partner", "firstVisitAt"]) {
      const v = typeof source[key] === "string" ? (source[key] as string) : "";
      if (v) out[key] = v;
    }
    return out;
  };
  return { firstTouch: clean(first), lastTouch: clean(last) };
}
