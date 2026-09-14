"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttribution, refreshLastTouch } from "@/lib/attribution";

/**
 * Mounted once in the root layout so first/last-touch attribution is
 * captured on every client visit.
 */
export function AttributionBoot() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAttribution();
  }, []);

  // The root layout persists across client-side navigation, so the initial
  // mount alone never updates last touch. Refresh on route AND query change
  // (same-route tagged navigation updates last touch); first touch is
  // preserved by refreshLastTouch().
  useEffect(() => {
    refreshLastTouch();
  }, [pathname, searchParams]);

  return null;
}
