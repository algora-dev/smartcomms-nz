import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

/** POST /insights/pricing-logs/logout — clears the internal session cookie. */
export async function POST(req: Request) {
  const jar = await cookies();
  jar.delete("pricing_logs_session");
  return NextResponse.redirect(new URL("/insights/pricing-logs", req.url), 303);
}
