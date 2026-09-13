"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Mounted once in the root layout so first/last-touch attribution is
 * captured on every client visit.
 */
export function AttributionBoot() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
