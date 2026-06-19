import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { ROOMS, type RoomCategory } from "@/data/rooms";
import { getSupabaseAdmin, hasSupabase } from "@/lib/supabase";

export type VariantOverride = {
  /** Composite key: `${roomSlug}__${variantType}` (e.g. "double-room__ac") */
  key: string;
  /** Direct (admin) nightly price in INR. */
  price: number;
  /** "Original" / OTA-comparison price shown struck-through. */
  originalPrice: number;
  /** Whether this variant is sold out / unbookable. */
  soldOut: boolean;
};

export type SurgeRule = {
  /** Active flag. */
  enabled: boolean;
  /** Percent uplift on Friday + Saturday (e.g. 20 → +20%). */
  weekendPercent: number;
  /** Free-text label shown in admin only. */
  note: string;
};

export type BlackoutDate = {
  /** ISO date `YYYY-MM-DD`. */
  date: string;
  /** Optional reason / label. */
  reason: string;
};

export type HotelSettings = {
  pricing: VariantOverride[];
  surge: SurgeRule;
  inventoryCap: number;
  blackouts: BlackoutDate[];
  updatedAt: string;
};

const SETTINGS_ROW_ID = "default";
const FALLBACK_FILE = path.join(os.tmpdir(), "rrr-residency-settings.json");

function variantKey(slug: string, type: "ac" | "non-ac") {
  return `${slug}__${type}`;
}

export function defaultSettings(): HotelSettings {
  const pricing: VariantOverride[] = ROOMS.flatMap((r) =>
    r.variants.map((v) => ({
      key: variantKey(r.slug, v.type),
      price: v.price,
      originalPrice: v.originalPrice,
      soldOut: false,
    }))
  );
  return {
    pricing,
    surge: {
      enabled: false,
      weekendPercent: 15,
      note: "Friday & Saturday surge",
    },
    inventoryCap: 30,
    blackouts: [],
    updatedAt: new Date().toISOString(),
  };
}

function mergeWithDefaults(partial: Partial<HotelSettings>): HotelSettings {
  const base = defaultSettings();
  const mergedPricing = base.pricing.map((row) => {
    const override = partial.pricing?.find((p) => p.key === row.key);
    return override ? { ...row, ...override } : row;
  });
  return {
    pricing: mergedPricing,
    surge: { ...base.surge, ...(partial.surge ?? {}) },
    inventoryCap:
      typeof partial.inventoryCap === "number" ? partial.inventoryCap : base.inventoryCap,
    blackouts: Array.isArray(partial.blackouts) ? partial.blackouts : base.blackouts,
    updatedAt: partial.updatedAt ?? base.updatedAt,
  };
}

async function readSupabaseSettings(): Promise<HotelSettings | null> {
  if (!hasSupabase()) return null;
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("hotel_settings")
    .select("data")
    .eq("id", SETTINGS_ROW_ID)
    .maybeSingle();

  if (error) throw new Error(`Supabase: ${error.message}`);
  if (!data?.data) return null;
  return mergeWithDefaults(data.data as Partial<HotelSettings>);
}

async function writeSupabaseSettings(settings: HotelSettings) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from("hotel_settings").upsert({
    id: SETTINGS_ROW_ID,
    data: settings,
    updated_at: settings.updatedAt,
  });

  if (error) throw new Error(`Supabase: ${error.message}`);
}

async function readFileSettings(): Promise<HotelSettings> {
  if (hasSupabase()) {
    const fromDb = await readSupabaseSettings();
    if (fromDb) return fromDb;
  }

  try {
    const raw = await fs.readFile(FALLBACK_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<HotelSettings>;
    return mergeWithDefaults(parsed);
  } catch {
    return defaultSettings();
  }
}

async function writeFileSettings(settings: HotelSettings) {
  if (hasSupabase()) {
    await writeSupabaseSettings(settings);
    return;
  }
  await fs.writeFile(FALLBACK_FILE, JSON.stringify(settings, null, 2), "utf8");
}

export async function getSettings(): Promise<HotelSettings> {
  return readFileSettings();
}

export async function saveSettings(patch: Partial<HotelSettings>): Promise<HotelSettings> {
  const current = await readFileSettings();
  const next: HotelSettings = {
    ...current,
    ...patch,
    pricing: patch.pricing
      ? current.pricing.map((row) => {
          const override = patch.pricing!.find((p) => p.key === row.key);
          return override ? { ...row, ...override } : row;
        })
      : current.pricing,
    surge: patch.surge ? { ...current.surge, ...patch.surge } : current.surge,
    blackouts: patch.blackouts ?? current.blackouts,
    inventoryCap:
      typeof patch.inventoryCap === "number" ? patch.inventoryCap : current.inventoryCap,
    updatedAt: new Date().toISOString(),
  };
  await writeFileSettings(next);
  return next;
}

export function variantLabel(key: string): { roomName: string; variantLabel: string } | null {
  const [slug, type] = key.split("__") as [string, "ac" | "non-ac"];
  const room = ROOMS.find((r) => r.slug === slug);
  if (!room) return null;
  const variant = room.variants.find((v) => v.type === type);
  if (!variant) return null;
  return { roomName: room.name, variantLabel: variant.label };
}

export type MergedVariant = {
  roomSlug: string;
  roomName: string;
  type: "ac" | "non-ac";
  label: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  soldOut: boolean;
};

export async function getMergedVariants(): Promise<MergedVariant[]> {
  const settings = await getSettings();
  return ROOMS.flatMap((room) =>
    room.variants.map((v) => {
      const key = variantKey(room.slug, v.type);
      const override = settings.pricing.find((p) => p.key === key);
      const price = override?.price ?? v.price;
      const originalPrice = override?.originalPrice ?? v.originalPrice;
      const soldOut = override?.soldOut ?? false;
      const discountPercent =
        originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
      return {
        roomSlug: room.slug,
        roomName: room.name,
        type: v.type,
        label: v.label,
        price,
        originalPrice,
        discountPercent,
        soldOut,
      };
    })
  );
}

export async function getMergedRooms(): Promise<RoomCategory[]> {
  const variants = await getMergedVariants();
  return ROOMS.map((room) => ({
    ...room,
    variants: room.variants.map((v) => {
      const merged = variants.find((m) => m.roomSlug === room.slug && m.type === v.type)!;
      return {
        type: v.type,
        label: v.label,
        price: merged.price,
        originalPrice: merged.originalPrice,
        discountPercent: merged.discountPercent,
      };
    }),
  }));
}

export async function getMergedRoom(slug: string): Promise<RoomCategory | undefined> {
  const rooms = await getMergedRooms();
  return rooms.find((r) => r.slug === slug);
}

export async function getMinMaxPrice(): Promise<{ min: number; max: number }> {
  const variants = await getMergedVariants();
  const bookable = variants.filter((v) => !v.soldOut);
  const prices = (bookable.length > 0 ? bookable : variants).map((v) => v.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
