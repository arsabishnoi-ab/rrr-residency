import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { getSupabaseAdmin, hasSupabase } from "./supabase";
import { LeadStatus } from "./leadSchema";

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  checkin: string | null;
  checkout: string | null;
  room_type: string | null;
  guests: number | null;
  message: string | null;
  source: string | null;
  utm: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
};

export type LeadInsert = Omit<LeadRow, "id" | "created_at" | "status" | "notes"> & {
  status?: LeadStatus;
  notes?: string | null;
};

const FALLBACK_FILE = path.join(os.tmpdir(), "rrr-residency-leads.json");

async function readFileLeads(): Promise<LeadRow[]> {
  try {
    const raw = await fs.readFile(FALLBACK_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeFileLeads(rows: LeadRow[]) {
  await fs.writeFile(FALLBACK_FILE, JSON.stringify(rows, null, 2), "utf8");
}

export async function createLead(input: LeadInsert): Promise<LeadRow> {
  if (hasSupabase()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          name: input.name,
          phone: input.phone,
          email: input.email,
          checkin: input.checkin,
          checkout: input.checkout,
          room_type: input.room_type,
          guests: input.guests,
          message: input.message,
          source: input.source,
          utm: input.utm,
          status: input.status ?? "New",
        })
        .select("*")
        .single();
      if (error) throw new Error(`Supabase: ${error.message}`);
      return data as LeadRow;
    }
  }

  const rows = await readFileLeads();
  const row: LeadRow = {
    id: cryptoId(),
    name: input.name,
    phone: input.phone,
    email: input.email ?? null,
    checkin: input.checkin ?? null,
    checkout: input.checkout ?? null,
    room_type: input.room_type ?? null,
    guests: input.guests ?? null,
    message: input.message ?? null,
    source: input.source ?? null,
    utm: input.utm ?? null,
    status: input.status ?? "New",
    notes: input.notes ?? null,
    created_at: new Date().toISOString(),
  };
  rows.unshift(row);
  await writeFileLeads(rows);
  return row;
}

export async function listLeads(): Promise<LeadRow[]> {
  if (hasSupabase()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(`Supabase: ${error.message}`);
      return (data ?? []) as LeadRow[];
    }
  }
  return readFileLeads();
}

export async function updateLead(
  id: string,
  patch: Partial<Pick<LeadRow, "status" | "notes">>
): Promise<LeadRow | null> {
  if (hasSupabase()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("leads")
        .update(patch)
        .eq("id", id)
        .select("*")
        .single();
      if (error) throw new Error(`Supabase: ${error.message}`);
      return data as LeadRow;
    }
  }
  const rows = await readFileLeads();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  rows[idx] = { ...rows[idx], ...patch };
  await writeFileLeads(rows);
  return rows[idx];
}

export async function deleteLead(id: string): Promise<boolean> {
  if (hasSupabase()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw new Error(`Supabase: ${error.message}`);
      return true;
    }
  }
  const rows = await readFileLeads();
  const next = rows.filter((r) => r.id !== id);
  await writeFileLeads(next);
  return next.length !== rows.length;
}

function cryptoId(): string {
  try {
    const g = globalThis as { crypto?: { randomUUID?: () => string } };
    if (g.crypto?.randomUUID) return g.crypto.randomUUID();
  } catch {}
  return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
