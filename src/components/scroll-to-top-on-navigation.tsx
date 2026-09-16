"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Route-level scroll policy: a newly opened SmartComms page begins at the top
 * rather than restoring an arbitrary scroll position from a previous visit.
 *
 * - Keyed to pathname only (NOT search params): the pricing calculator and
 *   cross-tool links update query state and must not trigger scroll jumps.
 * - Hash links (#shortlist, #faqs, #top) keep their intentional destinations.
 */
export function ScrollToTopOnNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
