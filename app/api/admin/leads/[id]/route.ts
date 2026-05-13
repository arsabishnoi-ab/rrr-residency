import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";
import { updateLead, deleteLead } from "@/lib/leadStore";
import { LEAD_STATUSES } from "@/lib/leadSchema";

export const runtime = "nodejs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const patch: { status?: (typeof LEAD_STATUSES)[number]; notes?: string | null } = {};
  if (body.status && LEAD_STATUSES.includes(body.status)) patch.status = body.status;
  if (typeof body.notes === "string") patch.notes = body.notes;

  const updated = await updateLead(params.id, patch);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, lead: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await deleteLead(params.id);
  return NextResponse.json({ ok: true });
}
