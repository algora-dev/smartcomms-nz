"use client";

import { useState } from "react";
import { ProjectEnquiryModal, type EnquiryMode } from "./ProjectEnquiryModal";

/**
 * Reusable button that opens the unified project enquiry modal with
 * contextual mode/source. Use on any page that wants the T3-triage CTA.
 */
export function ProjectHelpLauncher({
  mode = "project_help",
  sourceTopic,
  buttonLabel = "Help me take the next step",
  className = "sc-btn-primary mt-6 inline-flex cursor-pointer",
  estimateSummary,
  estimateLink,
  context,
}: {
  mode?: EnquiryMode;
  sourceTopic?: string;
  buttonLabel?: string;
  className?: string;
  estimateSummary?: string;
  estimateLink?: string;
  context?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {buttonLabel}
      </button>
      <ProjectEnquiryModal
        open={open}
        mode={mode}
        onClose={() => setOpen(false)}
        estimateSummary={estimateSummary}
        estimateLink={estimateLink}
        context={context}
        sourceTopic={sourceTopic}
      />
    </>
  );
}
