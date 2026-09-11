"use client";

import { useState } from "react";
import { InquiryModal } from "./InquiryModal";

export function ContactLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="sc-btn-primary mt-6 inline-flex cursor-pointer"
      >
        Send us a message
      </button>
      <InquiryModal open={open} mode="message" onClose={() => setOpen(false)} />
    </>
  );
}
