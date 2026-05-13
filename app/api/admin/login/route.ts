import { NextRequest, NextResponse } from "next/server";
import { getAdminPassword, makeSessionToken, ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  const expected = getAdminPassword();

  if (password.length === 0 || password !== expected) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, { status: 303 });
  }

  const token = makeSessionToken();
  const res = NextResponse.redirect(new URL("/admin", req.url), { status: 303 });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}
