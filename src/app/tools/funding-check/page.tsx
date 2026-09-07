import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { FundingCheckTool } from "./FundingCheckTool";

export const metadata: Metadata = buildMetadata({
  title: "School Communications Funding Check",
  description:
    "Free 30-45 second NZ school funding check: see which parts of a paging, PA, bell, intercom or communications project may have a Ministry 5YA funding pathway.",
  path: "/tools/funding-check",
});

export default function FundingCheckPage() {
  return (
    <div className="sc-container py-12 max-w-3xl">
      <FundingCheckTool />
    </div>
  );
}
