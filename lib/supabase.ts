import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Normalizes Supabase project URL to `https://<ref>.supabase.co` only.
 * Users often paste `.../rest/v1` from the Data API screen — that breaks saves.
 */
export function getSupabaseUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return null;

  try {
    const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;
    const parsed = new URL(withProtocol);

    if (!parsed.hostname.endsWith("supabase.co")) return null;

    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return null;
  }
}

export function getSupabaseServiceKey(): string | null {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    null
  );
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;
  const url = getSupabaseUrl();
  const serviceKey = getSupabaseServiceKey();
  if (!url || !serviceKey) return null;
  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function hasSupabase(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseServiceKey());
}
