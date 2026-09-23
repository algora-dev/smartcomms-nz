"use client";

import { useState } from "react";
import { ProjectEnquiryModal, type EnquiryMode } from "./ProjectEnquiryModal";

/**
 * Reusable button that opens the unified project enquiry modal with
 * contextual mode/source. SmartComms project-help CTA for any page.
 */
export function ProjectHelpLauncher({
  mode = "project_help",
  sourceTopic,
  buttonLabel = "Help me take the next step",
  className = "sc-btn-help mt-6",
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
      <button type="button" aria-haspopup="dialog" data-enquiry-mode={mode} data-enquiry-source={sourceTopic}
        onClick={() => setOpen(true)} className={className}>
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
