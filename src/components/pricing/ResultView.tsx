"use client";

import { useState } from "react";
import type { CalculatorState, EstimateResult } from "@/lib/pricing/types";
import { formatNZD, pricingConfig } from "@/lib/pricing/config";
import { packageLabel } from "@/lib/pricing/calculate";
import { InquiryModal, type InquiryMode } from "./InquiryModal";
import { ToolCrossSell } from "@/components/tool-cross-sell";

const pdfLabel = "SmartComms NZ ballpark system estimate";

export function ResultView({
  state,
  estimate,
  onEdit,
}: {
  state: CalculatorState;
  estimate: EstimateResult;
  onEdit: () => void;
}) {
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [inquiry, setInquiry] = useState<InquiryMode | null>(null);

  const tierText =
    state.tier === "A" ? "New build"
    : state.tier === "B" ? "Existing site, cabling available"
    : state.tier === "C" ? "Existing site, new cabling required"
    : "Existing site, cabling not yet known";

  const rangeSuffix = estimate.overThreshold ? "+" : "";

  const disclaimer =
    state.tier === "A"
      ? "This is an indicative communications-system estimate only, ex GST. It assumes suitable network/data cabling to device locations is provided as part of the wider building works. Final pricing depends on the completed design, equipment quantities and project conditions."
      : state.tier === "unsure"
        ? "This is a wider indicative range because existing cabling and site conditions are not yet known. A short site review can usually narrow the estimate considerably."
        : "This is an indicative estimate only, ex GST. We have not inspected the site. Final pricing may vary depending on cable routes, ceiling and wall access, network switch capacity, mounting requirements and the final system design.";

  const summaryChips: string[] = [tierText];
  const a = state.areas;
  if (a.standardIndoor) summaryChips.push(`${a.standardIndoor} indoor rooms`);
  if (a.largeIndoor) summaryChips.push(`${a.largeIndoor} large indoor space${a.largeIndoor > 1 ? "s" : ""}`);
  if (a.outdoor) summaryChips.push(`${a.outdoor} outdoor area${a.outdoor > 1 ? "s" : ""}`);
  if (a.largeOutdoor) summaryChips.push(`${a.largeOutdoor} sports / large outdoor area${a.largeOutdoor > 1 ? "s" : ""}`);
  if (a.entry) summaryChips.push(`${a.entry} entry point${a.entry > 1 ? "s" : ""}`);
  summaryChips.push(`${packageLabel[state.featurePackage]} package`);

  const included: string[] = [
    "Central paging and control platform",
    "Live and zoned paging",
    "Scheduled announcements and bells",
    "Installation allowance based on the site type selected",
    "Remote programming and commissioning",
  ];
  if (estimate.fireInterface) included.push("Fire / lockdown / EVAC interface");
  if (estimate.twoWayRooms > 0) included.push(`Two-way call buttons in ${estimate.twoWayRooms} room${estimate.twoWayRooms > 1 ? "s" : ""}`);
  if (a.entry > 0) included.push(`${a.entry} × ${state.fineTune.entryIntercom} entry intercom${a.entry > 1 ? "s" : ""}`);

  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    let y = 60;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("SmartComms NZ", W / 2, y, { align: "center" });
    y += 22;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(pdfLabel, W / 2, y, { align: "center" });
    y += 18;
    doc.setFontSize(10);
    doc.setTextColor(110);
    doc.text(new Date().toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" }), W / 2, y, { align: "center" });
    y += 30;
    doc.setTextColor(20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`Estimated installed range: ${formatNZD(estimate.low)} - ${formatNZD(estimate.high)}${rangeSuffix} ex GST`, W / 2, y, { align: "center" });
    y += 26;

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Your configuration", 50, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    for (const chip of summaryChips) {
      doc.text(`- ${chip}`, 55, y);
      y += 14;
    }
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Itemised breakdown", 50, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    for (const line of estimate.breakdown) {
      if (y > 700) { doc.addPage(); y = 60; }
      doc.text(line.label, 55, y);
      doc.text(formatNZD(line.amount), W - 55, y, { align: "right" });
      y += 14;
    }
    if (y > 660) { doc.addPage(); y = 60; }
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Subtotal", 55, y);
    doc.text(`${formatNZD(estimate.low)} + up to 20% contingency`, W - 55, y, { align: "right" });
    y += 22;

    if (estimate.monitoringAnnual !== null) {
      doc.setFont("helvetica", "bold");
      doc.text("Recurring: off-site monitoring", 55, y);
      doc.setFont("helvetica", "normal");
      const mon = estimate.monitoringIncludedMonths
        ? `Included for the first ${estimate.monitoringIncludedMonths} months, then ${formatNZD(estimate.monitoringAnnual)}/year`
        : `${formatNZD(estimate.monitoringAnnual)}/year`;
      doc.text(mon, W - 55, y, { align: "right" });
      y += 22;
    }

    if (estimate.overThreshold) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(180, 80, 20);
      doc.text("Large-system note: your configuration is above the standard 30-endpoint", 50, y);
      y += 13;
      doc.text("system allowance. Additional central hardware may be required.", 50, y);
      y += 20;
      doc.setTextColor(20);
    }

    // disclaimer box
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90);
    const lines = doc.splitTextToSize(disclaimer + " This document is an indicative estimate only, not a formal quote. For an accurate quote, contact SmartComms NZ.", W - 100);
    if (y + lines.length * 11 > 780) { doc.addPage(); y = 60; }
    doc.text(lines, 50, y);

    doc.save("smartcomms-estimate.pdf");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--sc-navy)]">Your ballpark installed price</h2>
      <div className="mt-4 rounded-2xl border border-[var(--sc-border)] bg-white p-8 text-center shadow-sm">
        <div className="text-4xl font-bold tracking-tight text-[var(--sc-navy)] sm:text-5xl">
          {formatNZD(estimate.low)} – {formatNZD(estimate.high)}{rangeSuffix}
          <span className="ml-2 align-middle text-sm font-normal text-[var(--sc-slate)]">ex GST</span>
        </div>
        <p className="mt-3 text-sm text-[var(--sc-slate)]">
          This is a ballpark estimate based on standard installation assumptions. A site review can confirm the final equipment quantities, cabling requirements and installed price.
        </p>
      </div>

      {estimate.overThreshold && (
        <div className="mt-4 rounded-xl border-l-4 border-[#bd4a1a] bg-[#fdf3ec] p-4 text-sm text-[#7a3413]">
          <strong>Large-system estimate:</strong> your configuration is above the standard 30-endpoint system allowance.
          Additional central hardware may be required, so this estimate may understate the final installed cost.
          Please request an accurate quote.
        </div>
      )}

      {/* summary chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {summaryChips.map((c) => (
          <span key={c} className="rounded-full border border-[var(--sc-border)] bg-[var(--sc-blue-50)] px-3 py-1.5 text-xs font-medium text-[var(--sc-navy)]">
            {c}
          </span>
        ))}
      </div>

      {/* included */}
      <h3 className="mt-8 text-lg font-semibold text-[var(--sc-navy)]">Included in this estimate</h3>
      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {included.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[var(--sc-slate)]">
            <span className="mt-0.5 text-[var(--sc-teal)]">✓</span> {i}
          </li>
        ))}
      </ul>

      {/* recurring */}
      {estimate.monitoringAnnual !== null && (
        <div className="mt-6 rounded-xl border border-[var(--sc-teal)]/30 bg-[var(--sc-blue-50)] p-4">
          <div className="text-sm font-semibold text-[var(--sc-navy)]">Off-site monitoring</div>
          <div className="text-sm text-[var(--sc-slate)]">
            {estimate.monitoringIncludedMonths
              ? `Included for the first ${estimate.monitoringIncludedMonths} months, then ${formatNZD(estimate.monitoringAnnual)}/year`
              : `${formatNZD(estimate.monitoringAnnual)}/year`}
            <span className="block text-xs">Recurring cost, separate from the installed estimate above.</span>
          </div>
        </div>
      )}

      {/* what could change price */}
      <h3 className="mt-8 text-lg font-semibold text-[var(--sc-navy)]">What could change the final price?</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-[var(--sc-slate)]">
        <li>• Cable routes and building access</li>
        <li>• Network switch and power capacity</li>
        <li>• Exact speaker quantities and mounting requirements</li>
        <li>• Additional central hardware for very large systems</li>
      </ul>

      {/* breakdown */}
      <div className="mt-8 rounded-xl border border-[var(--sc-border)] bg-white">
        <button
          type="button"
          onClick={() => setBreakdownOpen((o) => !o)}
          className="flex w-full items-center justify-between p-4 text-left font-medium text-[var(--sc-navy)] hover:bg-[var(--sc-blue-50)] rounded-xl transition-colors cursor-pointer"
        >
          View estimate breakdown
          <span className="text-[var(--sc-slate)]">{breakdownOpen ? "▲" : "▼"}</span>
        </button>
        {breakdownOpen && (
          <div className="border-t border-[var(--sc-border)] p-4">
            {estimate.breakdown.map((l) => (
              <div key={l.label} className="flex items-start justify-between gap-4 py-2 text-sm">
                <div>
                  <div className="text-[var(--sc-charcoal)]">{l.label}</div>
                  {l.detail && <div className="text-xs text-[var(--sc-slate)]">{l.detail}</div>}
                </div>
                <div className="whitespace-nowrap font-medium text-[var(--sc-navy)]">{formatNZD(l.amount)}</div>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-[var(--sc-border)] pt-3 text-sm font-semibold text-[var(--sc-navy)]">
              <span>Subtotal</span>
              <span>{formatNZD(estimate.low)} (range up to {formatNZD(estimate.high)}{rangeSuffix})</span>
            </div>
            <p className="mt-2 text-xs text-[var(--sc-slate)]">
              {estimate.basis === "unsure"
                ? "Low side assumes existing cabling is available; high side assumes new cabling is required plus contingency."
                : "Range allows up to 20% contingency on the calculated subtotal."}
            </p>
          </div>
        )}
      </div>

      <ToolCrossSell variant="pricing-to-funding" />

      {/* Quote / assessment CTAs */}
      <div className="mt-8 rounded-2xl bg-[var(--sc-navy)] p-8 text-center">
        <div className="text-lg font-semibold text-white">Want a proper number?</div>
        <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
          Send us this estimate and one of our trusted installation partners can review the site and provide a proper project quote.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setInquiry("quote")}
            className="w-full rounded-full bg-[var(--sc-teal-strong)] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--sc-teal-strong-hover)] hover:shadow-lg transition-all sm:w-auto cursor-pointer"
          >
            Get an accurate quote
          </button>
          <button
            type="button"
            onClick={() => setInquiry("assessment")}
            className="w-full rounded-full border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 transition-all sm:w-auto cursor-pointer"
          >
            Book a site assessment
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <button
          type="button"
          onClick={downloadPdf}
          className="text-sm font-medium text-[var(--sc-navy)] underline decoration-[var(--sc-teal)] decoration-2 underline-offset-4 hover:text-[var(--sc-blue-700)] cursor-pointer"
        >
          Download estimate (PDF)
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-medium text-[var(--sc-slate)] hover:text-[var(--sc-navy)] cursor-pointer"
        >
          ← Change my answers
        </button>
      </div>

      {/* disclaimer */}
      <div className="mt-8 rounded-xl border border-[var(--sc-border)] bg-[var(--sc-blue-50)] p-5 text-xs leading-relaxed text-[var(--sc-slate)]">
        {disclaimer} Prices shown are ex GST. The standard system allowance covers up to {pricingConfig.endpointWarningThreshold} IP endpoints.
      </div>
      <InquiryModal
        open={inquiry !== null}
        mode={inquiry ?? "quote"}
        onClose={() => setInquiry(null)}
        estimateSummary={`${formatNZD(estimate.low)} - ${formatNZD(estimate.high)}${rangeSuffix}`}
        estimateLink={typeof window !== "undefined" ? window.location.href : undefined}
      />
    </div>
  );
}
