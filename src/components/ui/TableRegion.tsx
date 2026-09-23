"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/** Keep a semantic table; confine overflow to this labelled, keyboard-scrollable region. */
export function TableRegion({ label, children, className = "mt-6" }: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const region = useRef<HTMLDivElement>(null);
  const hintId = useId();
  const [overflows, setOverflows] = useState(false);
  useEffect(() => {
    const element = region.current;
    if (!element) return;
    const measure = () => setOverflows(element.scrollWidth > element.clientWidth + 1);
    const frame = requestAnimationFrame(measure);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(element);
    const table = element.querySelector("table");
    if (table) observer?.observe(table);
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener("resize", measure); };
  }, []);
  return (
    <div className={`not-prose sc-table-region ${className}`}>
      <p id={hintId} className="sc-table-hint" hidden={!overflows}>Scroll across the table to compare all columns.</p>
      <div ref={region} role="region" aria-label={label} aria-describedby={overflows ? hintId : undefined}
        tabIndex={overflows ? 0 : undefined} className="sc-table-scroll">
        {children}
      </div>
    </div>
  );
}
