import {
  ORGANISATION_TYPES,
  PROJECT_VALUE_BANDS,
  RESULT_COPY,
  type FinanceResultLevel,
  type OrganisationType,
  type PaymentBudget,
  type PaymentFrequency,
  type ProjectValueBand,
  type SiteSizeBand,
  type UpfrontBand,
} from "./config";

export interface FinanceAnswers {
  organisationType?: OrganisationType;
  projectValueBand?: ProjectValueBand;
  carriedEstimateLow?: number;
  carriedEstimateHigh?: number;
  siteSizeBand?: SiteSizeBand;
  paymentFrequency: PaymentFrequency;
  paymentBudget?: PaymentBudget;
  upfrontBand?: UpfrontBand;
  source?: "pricing" | "funding" | "financing" | "other";
  fundingResult?: string;
}

export interface FinanceResult {
  level: FinanceResultLevel;
  eyebrow: string;
  headline: string;
  body: string;
  reasons: string[];
  nextStep: string;
  organisationLabel: string;
  projectValueLabel: string;
}

function organisationLabel(value?: OrganisationType): string {
  return ORGANISATION_TYPES.find((item) => item.value === value)?.label ?? "Organisation not selected";
}

function projectValueLabel(answers: FinanceAnswers): string {
  if (answers.projectValueBand === "smartcomms_estimate" && answers.carriedEstimateLow && answers.carriedEstimateHigh) {
    return `$${answers.carriedEstimateLow.toLocaleString("en-NZ")}–$${answers.carriedEstimateHigh.toLocaleString("en-NZ")}`;
  }
  return PROJECT_VALUE_BANDS.find((item) => item.value === answers.projectValueBand)?.label ?? "Project value not yet known";
}

function isLargeProject(answers: FinanceAnswers): boolean {
  if (answers.projectValueBand === "100_250" || answers.projectValueBand === "250_plus") return true;
  if (answers.projectValueBand === "smartcomms_estimate" && (answers.carriedEstimateHigh ?? 0) >= 100000) return true;
  return answers.siteSizeBand === "100_plus";
}

function projectValueKnown(answers: FinanceAnswers): boolean {
  return Boolean(answers.projectValueBand && answers.projectValueBand !== "unsure");
}

function budgetKnown(answers: FinanceAnswers): boolean {
  return Boolean(answers.paymentBudget && answers.paymentBudget !== "unsure");
}

function upfrontKnown(answers: FinanceAnswers): boolean {
  return Boolean(answers.upfrontBand && answers.upfrontBand !== "unsure");
}

export function assessFinanceFit(answers: FinanceAnswers): FinanceResult {
  let level: FinanceResultLevel;

  if (isLargeProject(answers)) {
    level = "tailored";
  } else if (projectValueKnown(answers) && budgetKnown(answers) && upfrontKnown(answers)) {
    level = "strong";
  } else if (projectValueKnown(answers) && (budgetKnown(answers) || upfrontKnown(answers))) {
    level = "good";
  } else {
    level = "early";
  }

  const reasons: string[] = [];
  if (projectValueKnown(answers)) {
    reasons.push("You have a useful project-value starting point for a finance conversation.");
  } else if (answers.siteSizeBand && answers.siteSizeBand !== "unsure") {
    reasons.push("You have provided a rough site size even though the project value is not known yet.");
  } else {
    reasons.push("The project cost is still open, so the first discussion may be about defining the likely finance amount.");
  }

  if (budgetKnown(answers)) {
    reasons.push("You have indicated the regular payment range that feels workable within your budget.");
  } else {
    reasons.push("You do not need to know the exact regular payment yet; a provider can explain the available structures.");
  }

  if (answers.upfrontBand === "none") {
    reasons.push("No upfront contribution has been assumed. Some NZ equipment-finance structures can be offered without a deposit, subject to provider approval.");
  } else if (upfrontKnown(answers)) {
    reasons.push("You have indicated that an upfront contribution may be available if it helps structure the transaction.");
  }

  if (answers.source === "funding") {
    reasons.push("You came from the school funding pathway, so finance may be useful as an alternative or complementary option if capital funding does not cover the project.");
  }

  const isSchool = answers.organisationType === "state_school" || answers.organisationType === "state_integrated_school";
  if (isSchool) {
    reasons.push("School finance arrangements can have additional governance, accounting or approval requirements, so the exact structure should be checked with the school and finance provider.");
  }

  const copy = RESULT_COPY[level];
  return {
    level,
    eyebrow: copy.eyebrow,
    headline: copy.headline,
    body: copy.body,
    reasons,
    nextStep: "Tell SmartComms a little more about the project and we can suggest an appropriate finance specialist or next step from our selected New Zealand network.",
    organisationLabel: organisationLabel(answers.organisationType),
    projectValueLabel: projectValueLabel(answers),
  };
}
