"use client";

import { useState } from "react";
import { InquiryModal } from "./InquiryModal";

/**
 * General contact launcher for the /contact page. The page intro explains
 * both purposes (general message / project help); this launcher opens the
 * unified enquiry modal in general-message mode.
 */
export function ContactLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="sc-btn-secondary mt-6"
      >
        Send us a message
      </button>
      <InquiryModal open={open} mode="message" onClose={() => setOpen(false)} />
    </>
  );
}
