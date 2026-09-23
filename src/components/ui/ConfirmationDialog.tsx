"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

/** A small, accessible confirmation using the same dialog surface as enquiries. */
export function ConfirmationDialog({ open, title, description, cancelLabel, confirmLabel, onCancel, onConfirm }: {
  open: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    cancelRef.current?.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [open]);
  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <dialog ref={dialogRef} className="sc-dialog max-w-md" aria-labelledby={titleId} aria-describedby={descriptionId}
      onCancel={(event) => { event.preventDefault(); onCancel(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
      <div className="sc-dialog-panel">
        <h2 id={titleId} className="sc-card-title">{title}</h2>
        <p id={descriptionId} className="mt-3 text-sm leading-relaxed text-[var(--sc-slate)]">{description}</p>
        <div className="sc-actions mt-6 sm:justify-end">
          <button ref={cancelRef} type="button" onClick={onCancel} className="sc-btn-secondary">{cancelLabel}</button>
          <button type="button" onClick={onConfirm} className="sc-btn-help">{confirmLabel}</button>
        </div>
      </div>
    </dialog>, document.body,
  );
}
