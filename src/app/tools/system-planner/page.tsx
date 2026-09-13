import { permanentRedirect } from "next/navigation";

export default function SystemPlannerPage() {
  // Retired tool route: permanently redirect to the pricing calculator.
  permanentRedirect("/pricing-tool");
}
