import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "rrr_admin";
const TTL_DAYS = 14;

function getSecret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "rrr-residency-secret-please-set-ADMIN_SECRET";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "RRR@1234";
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
}

export function makeSessionToken(): string {
  const exp = Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  if (!safeEqual(expected, signature)) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp)) return false;
  return Date.now() < exp;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function isAdminAuthed(): boolean {
  const c = cookies().get(COOKIE_NAME)?.value;
  return verifyToken(c);
}

export const ADMIN_COOKIE = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = TTL_DAYS * 24 * 60 * 60;
