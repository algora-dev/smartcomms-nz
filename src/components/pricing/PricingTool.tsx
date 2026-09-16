"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AreaKey, CalculatorState, FeaturePackage, InstallationType } from "@/lib/pricing/types";
import { calculateEstimate } from "@/lib/pricing/calculate";
import { track } from "@/lib/analytics";
import { formatK, formatNZD, pricingConfig } from "@/lib/pricing/config";
import { defaultState } from "@/lib/pricing/presets";
import { ResultView } from "./ResultView";

const AREAS: { key: AreaKey; fineTunable: boolean }[] = [
  { key: "standardIndoor", fineTunable: false },
  { key: "largeIndoor", fineTunable: true },
  { key: "outdoor", fineTunable: true },
  { key: "largeOutdoor", fineTunable: true },
];

const TIER_CARDS: { value: InstallationType; title: string; desc: string }[] = [
  {
    value: "A",
    title: "New build / major construction",
    desc: "The system is being installed while the building is being constructed or substantially refurbished. Site-wide network cabling is not included - it is priced separately as part of the wider building works.",
  },
  {
    value: "B",
    title: "Existing site, cabling nearby",
    desc: "Adequate network cabling already exists within about 3 m of each device location. Our teams can patch in short runs using conduit where needed.",
  },
  {
    value: "C",
    title: "Existing site, new cabling required",
    desc: "The site needs new network cabling to many areas. Site-wide cabling is installed by a Ministry of Education approved ICT contractor and is excluded from your estimate.",
  },
  {
    value: "unsure",
    title: "Not sure",
    desc: "That is fine. We will show a typical existing-site estimate, and flag anything that depends on your cabling.",
  },
];

const PACKAGES: { value: FeaturePackage; name: string; tagline: string; includes: string[] }[] = [
  {
    value: "essential",
    name: "Essential",
    tagline: "Paging & announcements",
    includes: [
      "Live and zoned paging",
      "Scheduled announcements and bells / class-change",
      "Speaker coverage for your selected areas",
      "Central platform with one paging station",
    ],
  },
  {
    value: "safety",
    name: "Safety & Control",
    tagline: "Paging plus emergency functionality",
    includes: [
      "Everything in Essential",
      "Fire alarm / lockdown / EVAC interface",
    ],
  },
  {
    value: "interactive",
    name: "Interactive",
    tagline: "Paging, emergency and two-way room calling",
    includes: [
      "Everything in Safety & Control",
      "Two-way call buttons in every standard indoor room",
    ],
  },
];

function Stepper({ value, onChange, min = 0, max = 99 }: { value: number; onChange: (n: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Decrease"
        className="h-9 w-9 rounded-full border border-[var(--sc-border)] bg-white text-lg font-semibold text-[var(--sc-navy)] hover:bg-[var(--sc-blue-50)] hover:border-[var(--sc-teal)] transition-colors cursor-pointer disabled:opacity-40"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="w-8 text-center text-lg font-semibold text-[var(--sc-charcoal)]">{value}</span>
      <button
        type="button"
        aria-label="Increase"
        className="h-9 w-9 rounded-full border border-[var(--sc-border)] bg-white text-lg font-semibold text-[var(--sc-navy)] hover:bg-[var(--sc-blue-50)] hover:border-[var(--sc-teal)] transition-colors cursor-pointer disabled:opacity-40"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}

function InfoDot({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-label="More information"
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--sc-border)] text-xs text-[var(--sc-slate)] hover:bg-[var(--sc-blue-50)] hover:border-[var(--sc-teal)] hover:text-[var(--sc-navy)] transition-colors cursor-pointer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
      >
        i
      </button>
      {open && (
        <span className="absolute left-1/2 top-7 z-20 w-60 -translate-x-1/2 rounded-lg border border-[var(--sc-border)] bg-white p-3 text-xs leading-relaxed text-[var(--sc-slate)] shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}

export function PricingTool() {
  const [state, setState] = useState<CalculatorState>(defaultState);
  const [step, setStep] = useState(0); // 0 installation, 1 areas, 2 features, 3 result
  const [fineTuneOpen, setFineTuneOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const skipPersist = useRef(false);

  useEffect(() => {
    track("pricing_tool_started");
  }, []);

  // deep-linkable state in URL
  useEffect(() => {
    queueMicrotask(() => {
      setHydrated(true);
      const params = new URLSearchParams(window.location.search);
      if (params.get("cfg")) {
        try {
          const parsed = JSON.parse(decodeURIComponent(params.get("cfg")!));
          if (parsed && parsed.areas && parsed.tier) setState({ ...defaultState(), ...parsed });
          if (parsed?.tier) setStep(3);
        } catch { /* ignore bad params */ }
      }
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (skipPersist.current) {
      skipPersist.current = false;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    params.set("cfg", encodeURIComponent(JSON.stringify(state)));
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", url);
  }, [state, hydrated]);

  // Wipe the tool back to a fresh start (used by the restart confirmation).
  const restartTool = () => {
    skipPersist.current = true;
    setState(defaultState());
    setStep(0);
    setFineTuneOpen(false);
    setConfirmRestart(false);
    window.history.replaceState(null, "", window.location.pathname);
  };

  // While a result exists: warn before refresh/leaving, and intercept any
  // "Get a ballpark price" CTA on the page so it asks before wiping.
  useEffect(() => {
    if (step !== 3) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href*="/pricing-tool"]') as HTMLAnchorElement | null;
      if (anchor) {
        e.preventDefault();
        e.stopPropagation();
        setConfirmRestart(true);
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onDocClick, true);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onDocClick, true);
    };
  }, [step]);

  const estimate = useMemo(() => calculateEstimate(state), [state]);

  // Server-side output logging (proof of use). Fire-and-forget, once per
  // unique result: fires when the results view renders (incl. deep-linked
  // cfg loads) and again if the user edits and returns to a new result.
  const loggedSig = useRef<string | null>(null);
  useEffect(() => {
    if (step !== 3) return;
    const sig = JSON.stringify([state, estimate.low, estimate.high]);
    if (loggedSig.current === sig) return;
    loggedSig.current = sig;
    fetch("/api/pricing-tool/output-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tier: state.tier,
        featurePackage: state.featurePackage,
        areas: state.areas,
        speakers: state.speakers,
        fineTune: state.fineTune,
        breakdown: estimate.breakdown,
        low: estimate.low,
        high: estimate.high,
        basis: estimate.basis,
        endpoints: estimate.endpoints,
        overThreshold: estimate.overThreshold,
        monitoringAnnual: estimate.monitoringAnnual,
        monitoringIncludedMonths: estimate.monitoringIncludedMonths,
        twoWayRooms: estimate.twoWayRooms,
        fireInterface: estimate.fireInterface,
      }),
      keepalive: true,
    }).catch(() => { /* silent: never surface to the user */ });
  }, [step, state, estimate]);

  const patch = (p: Partial<CalculatorState>) => setState((s) => ({ ...s, ...p }));
  const patchArea = (key: AreaKey, n: number) =>
    setState((s) => ({ ...s, areas: { ...s.areas, [key]: n } }));

  const totalAreas =
    state.areas.standardIndoor + state.areas.largeIndoor + state.areas.outdoor +
    state.areas.largeOutdoor + state.areas.entry;

  const showSticky = step >= 1 && step <= 2 && totalAreas > 0;

  return (
    <div className="mx-auto max-w-3xl">
      {/* progress */}
      <div className="mb-8 flex items-center gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                step >= n - 1 && step <= 2
                  ? "bg-[var(--sc-navy)] text-white"
                  : step === 3 || n - 1 < step
                    ? "bg-[var(--sc-teal-strong)] text-white"
                    : "bg-[var(--sc-blue-100)] text-[var(--sc-slate)]"
              }`}
            >
              {n}
            </div>
            {n < 3 && <div className={`h-1 flex-1 rounded-full ${step >= n ? "bg-[var(--sc-teal)]" : "bg-[var(--sc-grey)]"}`} />}
          </div>
        ))}
      </div>

      {/* STEP 1 — installation */}
      {step === 0 && (
        <div>
          <h2 className="text-2xl font-bold text-[var(--sc-navy)]">What best describes the site?</h2>
          <div className="mt-6 grid gap-4">
            {TIER_CARDS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => {
                  patch({ tier: t.value });
                  track("pricing_installation_selected", { installation_tier: t.value });
                  setStep(1);
                }}
                className="rounded-xl border-2 border-[var(--sc-border)] bg-white p-5 text-left hover:border-[var(--sc-teal)] hover:bg-[var(--sc-blue-50)] hover:shadow-md transition-all cursor-pointer"
              >
                <div className="font-semibold text-[var(--sc-navy)]">{t.title}</div>
                <div className="mt-1 text-sm text-[var(--sc-slate)]">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 — areas */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-[var(--sc-navy)]">Roughly how many areas need coverage?</h2>
          <p className="mt-2 text-sm text-[var(--sc-slate)]">
            <strong>Not sure?</strong> A rough count is enough. You can refine the estimate later.
          </p>
          <div className="mt-6 grid gap-3">
            {AREAS.map(({ key }) => {
              const cfg = pricingConfig.areas[key];
              return (
                <div key={key} className="flex items-center justify-between gap-4 rounded-xl border border-[var(--sc-border)] bg-white p-4">
                  <div>
                    <div className="font-medium text-[var(--sc-charcoal)]">
                      {cfg.label}
                      <InfoDot text={cfg.info} />
                    </div>
                    <div className="text-xs text-[var(--sc-slate)]">{cfg.example}</div>
                  </div>
                  <Stepper value={state.areas[key]} onChange={(n) => patchArea(key, n)} />
                </div>
              );
            })}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--sc-border)] bg-white p-4">
              <div>
                <div className="font-medium text-[var(--sc-charcoal)]">
                  Entry / intercom points
                  <InfoDot text="Main gates, secure doors, reception entries. You can choose voice or video intercom in the next step." />
                </div>
                <div className="text-xs text-[var(--sc-slate)]">Main gates, secure doors, reception entries</div>
              </div>
              <Stepper value={state.areas.entry} onChange={(n) => patchArea("entry" as AreaKey, n)} />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={() => setStep(0)} className="text-sm font-medium text-[var(--sc-slate)] hover:text-[var(--sc-navy)] cursor-pointer">← Back</button>
            <button
              type="button"
              disabled={totalAreas === 0}
              onClick={() => {
                track("pricing_areas_completed", {
                  total_areas: totalAreas,
                  endpoint_count: estimate.endpoints,
                });
                setStep(2);
              }}
              className="rounded-full bg-[var(--sc-navy)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--sc-blue-700)] hover:shadow-lg transition-all cursor-pointer disabled:opacity-40"
            >
              Next step →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — feature level + optional fine-tune */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-[var(--sc-navy)]">How capable do you want the system to be?</h2>
          <div className="mt-6 grid gap-4">
            {PACKAGES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => {
                  patch({ featurePackage: p.value });
                  track("pricing_package_selected", { package: p.value });
                }}
                className={`rounded-xl border-2 p-5 text-left transition-all cursor-pointer ${
                  state.featurePackage === p.value
                    ? "border-[var(--sc-teal)] bg-[var(--sc-blue-50)] shadow-md"
                    : "border-[var(--sc-border)] bg-white hover:border-[var(--sc-teal)] hover:bg-[var(--sc-blue-50)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-[var(--sc-navy)]">{p.name}</div>
                  {p.value === "safety" && (
                    <span className="rounded-full bg-[var(--sc-teal-strong)] px-2.5 py-1 text-xs font-medium text-white">Most common</span>
                  )}
                </div>
                <div className="mt-0.5 text-sm text-[var(--sc-slate)]">{p.tagline}</div>
                <ul className="mt-3 space-y-1">
                  {p.includes.map((i) => (
                    <li key={i} className="text-sm text-[var(--sc-slate)]">• {i}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {/* fine-tune */}
          <div className="mt-6 rounded-xl border border-[var(--sc-border)] bg-white">
            <button
              type="button"
              onClick={() => {
                if (!fineTuneOpen) track("pricing_customisation_opened");
                setFineTuneOpen((o) => !o);
              }}
              className="flex w-full items-center justify-between p-4 text-left font-medium text-[var(--sc-navy)] hover:bg-[var(--sc-blue-50)] rounded-xl transition-colors cursor-pointer"
            >
              Fine-tune this estimate (optional)
              <span className="text-[var(--sc-slate)]">{fineTuneOpen ? "▲" : "▼"}</span>
            </button>
            {fineTuneOpen && (
              <div className="space-y-6 border-t border-[var(--sc-border)] p-4">
                {/* two-way */}
                <div>
                  <div className="text-sm font-medium text-[var(--sc-charcoal)]">Two-way room call buttons</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["none", "some", "all"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setState((s) => ({ ...s, fineTune: { ...s.fineTune, twoWayMode: mode } }))}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          state.fineTune.twoWayMode === mode
                            ? "border-[var(--sc-navy)] bg-[var(--sc-navy)] text-white"
                            : "border-[var(--sc-border)] bg-white text-[var(--sc-slate)] hover:border-[var(--sc-teal)]"
                        }`}
                      >
                        {mode === "none" ? "None" : mode === "some" ? "Some rooms" : "All standard indoor rooms"}
                      </button>
                    ))}
                  </div>
                  {state.fineTune.twoWayMode === "some" && (
                    <div className="mt-3">
                      <Stepper value={state.fineTune.twoWayQty} max={state.areas.standardIndoor}
                        onChange={(n) => setState((s) => ({ ...s, fineTune: { ...s.fineTune, twoWayQty: n } }))} />
                    </div>
                  )}
                </div>
                {/* entry intercom */}
                {state.areas.entry > 0 && (
                  <div>
                    <div className="text-sm font-medium text-[var(--sc-charcoal)]">Entry intercom type</div>
                    <div className="mt-2 flex gap-2">
                      {(["voice", "video"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setState((s) => ({ ...s, fineTune: { ...s.fineTune, entryIntercom: t } }))}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                            state.fineTune.entryIntercom === t
                              ? "border-[var(--sc-navy)] bg-[var(--sc-navy)] text-white"
                              : "border-[var(--sc-border)] bg-white text-[var(--sc-slate)] hover:border-[var(--sc-teal)]"
                          }`}
                        >
                          {t === "voice" ? "Voice intercom" : "Video intercom (+ higher cost)"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* control stations */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-[var(--sc-charcoal)]">Additional control stations</div>
                    <div className="text-xs text-[var(--sc-slate)]">The first paging station is already included.</div>
                  </div>
                  <Stepper value={state.fineTune.additionalControlStations} max={5}
                    onChange={(n) => setState((s) => ({ ...s, fineTune: { ...s.fineTune, additionalControlStations: n } }))} />
                </div>
                {/* monitoring */}
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={state.fineTune.monitoring}
                    onChange={(e) => setState((s) => ({ ...s, fineTune: { ...s.fineTune, monitoring: e.target.checked } }))}
                    className="h-4 w-4 accent-[var(--sc-teal)] cursor-pointer"
                  />
                  <span className="text-sm text-[var(--sc-charcoal)]">
                    Add off-site monitoring ({formatNZD(pricingConfig.monitoringAnnualPrice)}/year)
                    {state.tier === "A" && <span className="ml-1 font-medium text-[var(--sc-teal)]">first 24 months included</span>}
                  </span>
                </label>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={() => setStep(1)} className="text-sm font-medium text-[var(--sc-slate)] hover:text-[var(--sc-navy)] cursor-pointer">← Back</button>
            <button
              type="button"
              onClick={() => {
                track("pricing_completed", {
                  installation_tier: state.tier,
                  total_areas: totalAreas,
                  package: state.featurePackage,
                  estimate_low: estimate.low,
                  estimate_high: estimate.high,
                  over_30_endpoints: estimate.overThreshold,
                });
                setStep(3);
              }}
              className="rounded-full bg-[var(--sc-teal-strong)] px-8 py-3 text-sm font-semibold text-white hover:bg-[var(--sc-teal-strong-hover)] hover:shadow-lg transition-all cursor-pointer"
            >
              See my estimate
            </button>
          </div>
        </div>
      )}

      {/* RESULT */}
      {step === 3 && (
        <ResultView
          state={state}
          estimate={estimate}
          onEdit={() => setStep(1)}
          onRestart={() => setConfirmRestart(true)}
        />
      )}

      {/* Restart confirmation */}
      {confirmRestart && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="restart-modal-title"
          onClick={() => setConfirmRestart(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[var(--sc-border)] bg-white p-7 shadow-[0_24px_64px_rgba(11,45,91,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="restart-modal-title" className="text-lg font-semibold text-[var(--sc-navy)]">
              Start a new estimate?
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--sc-slate)]">
              This will clear your current ballpark price. If you want to keep it,
              download the PDF estimate first — you will not be able to recover it after
              starting again.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setConfirmRestart(false)}
                className="w-full rounded-full border border-[var(--sc-navy)]/30 px-6 py-3 text-sm font-semibold text-[var(--sc-navy)] transition-all hover:bg-[var(--sc-blue-50)] sm:w-auto cursor-pointer"
              >
                Keep my estimate
              </button>
              <button
                type="button"
                onClick={() => {
                  track("pricing_restart_confirmed");
                  restartTool();
                }}
                className="w-full rounded-full bg-[var(--sc-teal-strong)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--sc-teal-strong-hover)] hover:shadow-lg sm:w-auto cursor-pointer"
              >
                Start new estimate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* sticky running range */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--sc-border)] bg-white/95 p-4 shadow-[0_-4px_12px_rgba(11,45,91,0.08)] backdrop-blur-sm">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <div>
              <div className="text-xs text-[var(--sc-slate)]">Estimated range so far</div>
              <div className="text-lg font-bold text-[var(--sc-navy)]">
                {formatK(estimate.low)} – {formatK(estimate.high)}{estimate.overThreshold ? "+" : ""} <span className="text-xs font-normal text-[var(--sc-slate)]">ex GST</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
