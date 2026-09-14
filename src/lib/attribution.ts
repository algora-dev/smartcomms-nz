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
const WINDOW_DAYS = 180;

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
    return Date.now() - first > WINDOW_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

/** Call once per client page load (component mount) to record touch data. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const snap: Partial<AttributionData> = {
    landingPage: window.location.pathname + window.location.search,
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
  const params = new URLSearchParams(window.location.search);
  const last = {
    landingPage: window.location.pathname + window.location.search,
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
 * Flattened attribution for form submission. Merges first-touch values with
 * the current page and URL parameters so both journeys reach the enquiry.
 */
export function attributionForSubmission(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const first = readJson(FIRST_TOUCH_KEY) ?? {};
  const last = readJson(LAST_TOUCH_KEY) ?? {};
  const currentParams = new URLSearchParams(window.location.search);
  const val = (source: Record<string, unknown>, key: string) =>
    typeof source[key] === "string" ? (source[key] as string) : "";
  const pick = (key: string, fallbackParam: string) =>
    val(first, key) || currentParams.get(fallbackParam) || "";
  const out: Record<string, string> = {
    landingPage: val(first, "landingPage") || window.location.pathname,
    firstReferrer: val(first, "referrer"),
    utmSource: pick("utmSource", "utm_source"),
    utmMedium: pick("utmMedium", "utm_medium"),
    utmCampaign: pick("utmCampaign", "utm_campaign"),
    utmContent: pick("utmContent", "utm_content"),
    partner: pick("partner", "partner") || currentParams.get("partner") || "",
    firstVisitAt: val(first, "firstVisitAt"),
    lastLandingPage: val(last, "landingPage"),
    currentPage: window.location.href,
  };
  for (const key of Object.keys(out)) {
    if (!out[key]) delete out[key];
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
