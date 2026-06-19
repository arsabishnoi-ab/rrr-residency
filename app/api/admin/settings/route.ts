import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthed } from "@/lib/adminAuth";
import { ROOMS } from "@/data/rooms";
import { getSettings, saveSettings, type HotelSettings } from "@/lib/settingsStore";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PATCH(req: Request) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: Partial<HotelSettings>;
  try {
    body = (await req.json()) as Partial<HotelSettings>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    const next = await saveSettings(body);
    revalidatePath("/", "layout");
    revalidatePath("/rooms");
    revalidatePath("/book");
    for (const room of ROOMS) {
      revalidatePath(`/rooms/${room.slug}`);
    }
    return NextResponse.json(next);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save settings";
    console.error("[api/admin/settings] PATCH failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
