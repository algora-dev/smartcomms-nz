import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

export const SESSION_COOKIE = "pricing_logs_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function sessionSecret(): string | null {
  const key = process.env.PRICING_LOGS_KEY;
  return key ? createHmac("sha256", key).update("smartcomms-pricing-logs-session").digest("hex") : null;
}

/** HMAC-signed, expiring session token. The master key never becomes the cookie value. */
export function issueSessionToken(): { token: string; expires: number } | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = String(expires);
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return { token: `${payload}.${sig}`, expires };
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const secret = sessionSecret();
  if (!secret) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  return Number(payload) > Date.now();
}

/**
 * POST /insights/pricing-logs/login
 *
 * Validates the internal access key against PRICING_LOGS_KEY and sets an
 * HttpOnly, HMAC-signed, expiring session cookie. The key itself never
 * appears in a URL or cookie.
 */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const key = (form?.get("key") ?? "").toString().slice(0, 200);
  const expected = process.env.PRICING_LOGS_KEY;

  if (!expected || key !== expected) {
    await new Promise((r) => setTimeout(r, 500)); // basic brute-force damping
    return NextResponse.redirect(new URL("/insights/pricing-logs?e=1", req.url), 303);
  }

  const session = issueSessionToken();
  if (!session) {
    return NextResponse.redirect(new URL("/insights/pricing-logs?e=1", req.url), 303);
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/insights/pricing-logs",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
  return NextResponse.redirect(new URL("/insights/pricing-logs", req.url), 303);
}
