import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { FundingCheckTool } from "./FundingCheckTool";

export const metadata: Metadata = buildMetadata({
  title: "Funding Pre-Qualification Check",
  description:
    "Free 60-second check: see whether your school's paging, PA, bell or communications project may have a Ministry 5YA funding pathway.",
  path: "/tools/funding-check",
});

export default function FundingCheckPage() {
  return (
    <div className="sc-container py-12 max-w-3xl">
      <FundingCheckTool />
    </div>
  );
}
