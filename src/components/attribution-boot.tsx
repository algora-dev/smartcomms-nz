"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, refreshLastTouch } from "@/lib/attribution";

/**
 * Mounted once in the root layout so first/last-touch attribution is
 * captured on every client visit.
 */
export function AttributionBoot() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, []);

  // The root layout persists across client-side navigation, so the initial
  // mount alone never updates last touch. Refresh on route change (query
  // params are read directly from window.location inside refreshLastTouch);
  // first touch is preserved.
  useEffect(() => {
    refreshLastTouch();
  }, [pathname]);

  return null;
}
