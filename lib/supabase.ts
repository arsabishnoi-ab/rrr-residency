import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Normalizes Supabase project URL to `https://<ref>.supabase.co` only.
 * Users often paste `.../rest/v1` from the Data API screen — that breaks saves.
 */
export function getSupabaseUrl(): string | null {
  let raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return null;

  // Vercel copy/paste sometimes includes wrapping quotes
  raw = raw.replace(/^["']|["']$/g, "");

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
  const raw =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    null;
  return raw ? raw.replace(/^["']|["']$/g, "") : null;
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

/** Admin-only: test whether hotel_settings is reachable (no secrets returned). */
export async function diagnoseSupabaseSettings(): Promise<{
  configured: boolean;
  urlHost: string | null;
  tableOk: boolean;
  hint: string | null;
}> {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) {
    return {
      configured: false,
      urlHost: url ? new URL(url).host : null,
      tableOk: false,
      hint: "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in Vercel.",
    };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      configured: false,
      urlHost: new URL(url).host,
      tableOk: false,
      hint: "URL must be https://YOUR-REF.supabase.co (not a key).",
    };
  }

  const { error } = await supabase
    .schema("public")
    .from("hotel_settings")
    .select("id")
    .limit(1);

  if (error) {
    return {
      configured: true,
      urlHost: new URL(url).host,
      tableOk: false,
      hint: error.message,
    };
  }

  return { configured: true, urlHost: new URL(url).host, tableOk: true, hint: null };
}
