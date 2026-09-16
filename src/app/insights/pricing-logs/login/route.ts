import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

/**
 * POST /insights/pricing-logs/login
 *
 * Validates the internal access key against PRICING_LOGS_KEY and sets an
 * HttpOnly session cookie so the key never appears in a URL, browser history
 * or analytics. Replaces the old ?key= query-string access.
 */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const key = (form?.get("key") ?? "").toString().slice(0, 200);
  const expected = process.env.PRICING_LOGS_KEY;

  if (!expected || key !== expected) {
    await new Promise((r) => setTimeout(r, 500)); // basic brute-force damping
    return NextResponse.redirect(new URL("/insights/pricing-logs?e=1", req.url), 303);
  }

  const jar = await cookies();
  jar.set("pricing_logs_auth", key, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/insights/pricing-logs",
    maxAge: 60 * 60 * 8, // 8-hour internal session
  });
  return NextResponse.redirect(new URL("/insights/pricing-logs", req.url), 303);
}
