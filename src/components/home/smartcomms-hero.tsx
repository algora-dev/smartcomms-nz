"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "@/app/smartcomms-hero.css";

const SCENES = [
  {
    display: <>Connected<br />communication<br /><span>systems.</span></>,
    caption: "The right message. Where it matters.",
    long: false,
  },
  {
    display: <>Built for places<br />that need everyone<br /><span>connected.</span></>,
    caption: "One site. Multiple buildings. One connected system.",
    long: true,
  },
  {
    display: <>Understand.<br />Plan. Price the<br /><span>right system.</span></>,
    caption: "Clarity before you commit.",
    long: false,
  },
];

const SYSTEMS = ["Paging & PA", "Bells", "Intercom", "Emergency alerts", "Access"];
const PLACES = ["Schools", "Hospitals", "Aged care facilities", "Corrections", "Campuses & large facilities"];
const FLOW_LINES = [
  "M0 50 H20 C50 50 50 10 80 10 H100",
  "M0 50 H20 C50 50 50 30 80 30 H100",
  "M0 50 H100",
  "M0 50 H20 C50 50 50 70 80 70 H100",
  "M0 50 H20 C50 50 50 90 80 90 H100",
];
const CHAPTERS = [
  { jump: 0, num: "01", label: "The systems" },
  { jump: 2400, num: "02", label: "The places" },
  { jump: 5600, num: "03", label: "Your next step" },
];

/**
 * SmartComms animated hero — audience-flow version (handoff 2026-09-06).
 * 20s loop: one audience at a time on the left, all five systems on the right,
 * connected by five teal paths revealed spatially via a single shared clock.
 * Static accessible markup renders server-side; the timeline runs in this
 * effect with full cleanup and never initialises during SSR.
 */
export function SmartcommsHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;
    const hero = heroEl;

    const scenes = [...hero.querySelectorAll<HTMLElement>("[data-sc-scene]")];
    const systems = [...hero.querySelectorAll<HTMLElement>('[data-sc-terms="systems"] > span')];
    const places = [...hero.querySelectorAll<HTMLElement>('[data-sc-terms="places"] > span')];
    const flowLines = [...hero.querySelectorAll<SVGPathElement>("[data-sc-flow-line]")];
    const flowSvg = hero.querySelector<SVGSVGElement>(".sc-flow-lines");
    const chapterBtns = [...hero.querySelectorAll<HTMLButtonElement>("[data-sc-jump]")];
    const pauseBtn = hero.querySelector<HTMLButtonElement>("[data-sc-pause]");
    const replayBtn = hero.querySelector<HTMLButtonElement>("[data-sc-replay]");
    const progress = hero.querySelector<HTMLElement>(".sc-progress > div");
    if (!progress || !pauseBtn || !replayBtn || !flowSvg) return;
    const pause = pauseBtn;
    const replay = replayBtn;
    const flow = flowSvg;
    const progressEl = progress;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const duration = 20000;
    const starts = [0, 2400, 5600];
    const ends = [2400, 5600, 10000];
    let time = reduced.matches ? 7800 : 0;
    let playing = !reduced.matches;
    let visible = true;
    let last = performance.now();
    let raf = 0;
    let cancelled = false;

    const smooth = (v: number) => {
      const x = Math.max(0, Math.min(1, v));
      return x * x * (3 - 2 * x);
    };

    // Each audience sends the same signal to ALL systems. No per-system timers.
    function paintFlow() {
      const slot = duration / places.length;
      const active = Math.min(places.length - 1, Math.floor(time / slot));
      const local = time % slot;
      const reveal = smooth(local / 500);
      const fade = 1 - smooth((local - 3250) / 450);
      const draw = smooth((local - 550) / 900);
      const arrive = smooth((local - 1450) / 400);
      const pulse =
        arrive *
        (0.75 + 0.25 * Math.sin(Math.PI * Math.min(1, Math.max(0, (local - 1750) / 1500))));
      hero.dataset.scAudience = String(active);
      places.forEach((term, i) => {
        term.style.opacity = String(reduced.matches ? 1 : Number(i === active) * reveal * fade);
        term.style.transform = reduced.matches ? "none" : `translateX(${(1 - reveal) * -8}px)`;
      });
      systems.forEach((term) => {
        term.style.opacity = String(reduced.matches ? 1 : reveal * fade);
        term.style.backgroundColor = `rgba(44,177,165,${reduced.matches ? 0.08 : pulse * 0.14})`;
        term.style.borderColor = `rgba(44,177,165,${reduced.matches ? 0.5 : 0.18 + pulse * 0.7})`;
        term.style.boxShadow = `0 0 20px rgba(44,177,165,${reduced.matches ? 0 : pulse * 0.12})`;
      });
      // Reveal solid paths spatially. Normalised dashes with non-scaling strokes
      // can leave gaps when this SVG stretches to fit different viewport sizes.
      // Remove the clip entirely on arrival and hold all five complete connections.
      flow.style.clipPath =
        draw >= 1 ? "none" : `inset(-3px ${(1 - draw) * 100}% -3px 0)`;
      flowLines.forEach((line) => {
        line.style.opacity = String(reduced.matches ? 0 : fade * Number(local > 550));
      });
    }

    function paint() {
      hero.dataset.scReduced = String(reduced.matches);
      const headlineTime = time % 10000;
      const phase = headlineTime < 2400 ? 0 : headlineTime < 5600 ? 1 : 2;
      scenes.forEach((scene, i) => {
        const enter = smooth((headlineTime - starts[i]) / 800);
        const leave = 1 - smooth((headlineTime - (ends[i] - 450)) / 450);
        scene.style.opacity = String(reduced.matches ? Number(i === phase) : enter * leave);
        scene.style.transform = reduced.matches ? "none" : `translateY(${(1 - enter) * 8}px)`;
      });
      chapterBtns.forEach((button, i) => {
        if (i === phase) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
      paintFlow();
      progressEl.style.transform = `scaleX(${time / duration})`;
      hero.dataset.scPulse = String(
        (phase === 0 && headlineTime > 500 && headlineTime < 2100) ||
          (phase === 1 && headlineTime > 2800 && headlineTime < 4400) ||
          (phase === 2 && headlineTime > 6100 && headlineTime < 7700)
      );
    }

    function setPlaying(value: boolean) {
      playing = value;
      pause.textContent = value ? "Pause" : "Play";
      pause.setAttribute("aria-label", value ? "Pause animation" : "Play animation");
      hero.style.setProperty(
        "--sc-motion",
        value && visible && !document.hidden ? "running" : "paused"
      );
    }

    function seek(value: number) {
      time = value;
      paint();
    }

    function tick(now: number) {
      if (cancelled) return;
      if (playing && visible && !document.hidden) {
        time = (time + Math.min(now - last, 100)) % duration;
        paint();
      }
      last = now;
      raf = requestAnimationFrame(tick);
    }

    const onPause = () => setPlaying(!playing);
    const onReplay = () => {
      seek(0);
      setPlaying(true);
    };
    const onChapter = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      seek(Number(btn.dataset.scJump));
      setPlaying(true);
    };
    const onReducedChange = () => {
      if (reduced.matches) {
        seek(7800);
        setPlaying(false);
      }
    };
    const onVisibility = () => setPlaying(playing);

    pause.addEventListener("click", onPause);
    replay.addEventListener("click", onReplay);
    chapterBtns.forEach((b) => b.addEventListener("click", onChapter));
    reduced.addEventListener("change", onReducedChange);
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        setPlaying(playing);
      },
      { threshold: 0 }
    );
    observer.observe(hero);

    setPlaying(playing);
    paint();
    hero.classList.add("sc-enhanced");
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      pause.removeEventListener("click", onPause);
      replay.removeEventListener("click", onReplay);
      chapterBtns.forEach((b) => b.removeEventListener("click", onChapter));
      reduced.removeEventListener("change", onReducedChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section className="sc-hero" ref={heroRef} aria-labelledby="sc-heading">
      <div className="sc-main">
        <div className="sc-copy">
          <p className="sc-eyebrow">IP PAGING · SCHOOL BELLS · PA · INTERCOM · NEW ZEALAND</p>
          <div className="sc-headline-space">
            <h1 id="sc-heading" className="sc-stable-heading">
              Understand.<br />Plan. Price the<br /><span>right system.</span>
            </h1>
            <div className="sc-animated-headings" aria-hidden="true">
              {SCENES.map((s, i) => (
                <div className="sc-scene" data-sc-scene={i} key={i}>
                  <p className={`sc-display${s.long ? " sc-display-long" : ""}`}>{s.display}</p>
                  <p className="sc-scene-caption">{s.caption}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="sc-description">
            New Zealand guidance, comparisons and planning tools for IP paging, school bell, PA,
            intercom and integrated communication systems.
          </p>
          <div className="sc-actions">
            <Link className="sc-button sc-button-primary" href="/tools/system-planner">
              Estimate your system <span aria-hidden="true">↗</span>
            </Link>
            <Link className="sc-button sc-button-secondary" href="/systems">
              Explore solutions <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div
          className="sc-diagram"
          aria-label="A paging console connects through an IP network to speakers, horns, clocks, intercom and access systems."
        >
          <div className="sc-diagram-heading">
            <span>ONE CONNECTED SYSTEM</span>
            <span className="sc-diagram-number">01 / NZ</span>
          </div>
          <div className="sc-map" aria-hidden="true">
            <svg className="sc-wires" viewBox="0 0 480 440" preserveAspectRatio="none">
              <path
                className="sc-wire"
                d="M240 77 V165 M240 251 V278 Q240 298 220 298 H88 Q68 298 68 318 V351 M240 251 V351 M240 251 V278 Q240 298 260 298 H392 Q412 298 412 318 V351"
              />
              <path className="sc-signal" pathLength={1} d="M240 77 V207 V278 Q240 298 220 298 H88 Q68 298 68 318 V351" />
              <path className="sc-signal" pathLength={1} d="M240 77 V351" />
              <path className="sc-signal" pathLength={1} d="M240 77 V207 V278 Q240 298 260 298 H392 Q412 298 412 318 V351" />
            </svg>
            <div className="sc-console">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <rect x="8" y="2" width="8" height="12" rx="4" />
                <path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8" />
              </svg>
              <span>Paging console</span>
              <span className="sc-console-led"></span>
            </div>
            <div className="sc-network">
              <span className="sc-network-label">IP NETWORK</span>
              <div className="sc-wave">
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
              </div>
              <span className="sc-network-sub">Connected by design</span>
            </div>
            <div className="sc-endpoints">
              <div className="sc-endpoint">
                <span className="sc-endpoint-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="m4 10 7-5v14l-7-5H2v-4h2ZM15 8a7 7 0 0 1 0 8M18 5a11 11 0 0 1 0 14" />
                  </svg>
                </span>
                <strong>Broadcast</strong>
                <span>Speakers · horns</span>
              </div>
              <div className="sc-endpoint">
                <span className="sc-endpoint-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <strong>Synchronise</strong>
                <span>Bells · clocks</span>
              </div>
              <div className="sc-endpoint">
                <span className="sc-endpoint-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M9 6h6M9 9h6M9 12h6" />
                    <circle cx="12" cy="17" r="1.5" />
                  </svg>
                </span>
                <strong>Connect</strong>
                <span>Intercom · access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sc-audience-flow" aria-hidden="true">
        <p className="sc-flow-label sc-flow-label-left">BUILT FOR</p>
        <p className="sc-flow-label sc-flow-label-right">SYSTEMS</p>
        <div className="sc-flow-audiences" data-sc-terms="places">
          {PLACES.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
        <svg
          className="sc-flow-lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          {FLOW_LINES.map((d) => (
            <path data-sc-flow-line d={d} key={d} />
          ))}
        </svg>
        <div className="sc-flow-systems" data-sc-terms="systems">
          {SYSTEMS.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div className="sc-playback">
        <div className="sc-chapters" aria-label="Animation chapters">
          {CHAPTERS.map((c) => (
            <button type="button" data-sc-jump={c.jump} key={c.jump}>
              <span>{c.num}</span> {c.label}
            </button>
          ))}
        </div>
        <div className="sc-transport">
          <button type="button" data-sc-pause aria-label="Pause animation">
            Pause
          </button>
          <button type="button" data-sc-replay>
            Replay <span aria-hidden="true">↻</span>
          </button>
          <span className="sc-time-label">20 SEC</span>
        </div>
      </div>
      <div className="sc-progress" aria-hidden="true">
        <div></div>
      </div>
      <p className="sc-sr-only">
        SmartComms New Zealand covers IP paging, school bell systems, PA systems, intercom,
        emergency communication and connected communication systems for schools, hospitals, aged
        care facilities, corrections and large facilities. Resources include planning, comparisons,
        pricing and cost estimation.
      </p>
    </section>
  );
}
