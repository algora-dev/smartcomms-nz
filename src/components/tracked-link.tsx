"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";

/**
 * Link wrapper that fires an analytics event on click. For internal,
 * non-identifying conversion CTAs (guide/tool navigation) only.
 */
export function TrackedLink({
  event,
  payload,
  ...linkProps
}: ComponentProps<typeof Link> & { event: string; payload?: Record<string, string | number | boolean> }) {
  return (
    <Link
      {...linkProps}
      onClick={() => track(event, payload)}
    />
  );
}
