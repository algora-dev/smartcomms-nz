"use client";

/**
 * Compatibility wrapper: the pricing surfaces (and any other legacy callers)
 * still import InquiryModal from this path. New code should use
 * ProjectEnquiryModal from @/components/enquiry directly.
 */

import { ProjectEnquiryModal, type EnquiryMode } from "@/components/enquiry/ProjectEnquiryModal";

export type { EnquiryMode as InquiryMode };

const LEGACY_MODE_MAP: Record<string, EnquiryMode> = {
  quote: "quote_help",
  assessment: "site_assessment",
  message: "general_message",
  cabling: "cabling_help",
  connect: "project_help",
};

export function InquiryModal({
  open,
  mode,
  onClose,
  estimateSummary,
  estimateLink,
  /** Label for the context chip, e.g. "Your funding result" */
  summaryLabel,
  context,
  sourceTopic,
}: {
  open: boolean;
  mode: string;
  onClose: () => void;
  estimateSummary?: string;
  estimateLink?: string;
  summaryLabel?: string;
  context?: Record<string, string>;
  sourceTopic?: string;
}) {
  const mergedContext = { ...(summaryLabel ? { [summaryLabel]: estimateSummary ?? "" } : {}), ...context };
  return (
    <ProjectEnquiryModal
      open={open}
      mode={LEGACY_MODE_MAP[mode] ?? (mode as EnquiryMode)}
      onClose={onClose}
      estimateSummary={summaryLabel ? undefined : estimateSummary}
      estimateLink={estimateLink}
      context={mergedContext}
      sourceTopic={sourceTopic}
    />
  );
}
