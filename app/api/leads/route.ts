import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/leadSchema";
import { createLead } from "@/lib/leadStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Invalid input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    const lead = await createLead({
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      checkin: data.checkin || null,
      checkout: data.checkout || null,
      room_type: data.roomType,
      guests: data.guests,
      message: data.message?.trim() || null,
      source: data.source || null,
      utm: data.utm || null,
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 200 });
  } catch (err) {
    console.error("Lead create failed:", err);
    return NextResponse.json(
      { error: "Could not save your enquiry. Please call or WhatsApp us." },
      { status: 500 }
    );
  }
}
