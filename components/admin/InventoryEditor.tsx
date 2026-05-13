"use client";

import * as React from "react";
import { Save, Plus, X, AlertCircle, CalendarX } from "lucide-react";
import type { HotelSettings, BlackoutDate } from "@/lib/settingsStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function todayIso(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

function prettyDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function InventoryEditor({ initial }: { initial: HotelSettings }) {
  const [cap, setCap] = React.useState<number>(initial.inventoryCap);
  const [blackouts, setBlackouts] = React.useState<BlackoutDate[]>(
    [...initial.blackouts].sort((a, b) => a.date.localeCompare(b.date))
  );
  const [draftDate, setDraftDate] = React.useState<string>(todayIso());
  const [draftReason, setDraftReason] = React.useState<string>("");
  const [saving, setSaving] = React.useState(false);
  const [savedAt, setSavedAt] = React.useState<string | null>(initial.updatedAt);
  const [error, setError] = React.useState<string | null>(null);
  const [dirty, setDirty] = React.useState(false);

  function addBlackout() {
    if (!draftDate) return;
    if (blackouts.find((b) => b.date === draftDate)) {
      setError("That date is already blocked.");
      return;
    }
    setError(null);
    setBlackouts((bs) =>
      [...bs, { date: draftDate, reason: draftReason.trim() }].sort((a, b) =>
        a.date.localeCompare(b.date)
      )
    );
    setDraftReason("");
    setDirty(true);
  }

  function removeBlackout(date: string) {
    setBlackouts((bs) => bs.filter((b) => b.date !== date));
    setDirty(true);
  }

  function updateCap(n: number) {
    setCap(Math.max(0, n));
    setDirty(true);
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inventoryCap: cap, blackouts }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to save");
      }
      const next = (await res.json()) as HotelSettings;
      setSavedAt(next.updatedAt);
      setDirty(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const today = todayIso();
  const future = blackouts.filter((b) => b.date >= today);
  const past = blackouts.filter((b) => b.date < today);

  return (
    <div className="space-y-6">
      <div className="sticky top-14 z-10 -mx-4 md:-mx-8 px-4 md:px-8 py-3 bg-slate-50/90 backdrop-blur border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-500">
          {dirty ? (
            <span className="inline-flex items-center gap-1.5 text-amber-700">
              <AlertCircle className="h-3.5 w-3.5" />
              Unsaved changes
            </span>
          ) : savedAt ? (
            <span>Last saved {new Date(savedAt).toLocaleString("en-IN")}</span>
          ) : (
            <span>No changes yet</span>
          )}
        </div>
        <Button onClick={save} disabled={saving || !dirty}>
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Inventory cap</CardTitle>
          <CardDescription>
            Total bookable rooms per night across the property (out of 39 total at RRR Residency).
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={0}
              max={39}
              value={cap}
              onChange={(e) => updateCap(Number(e.target.value) || 0)}
              className="max-w-[160px]"
            />
            <span className="text-sm text-slate-500">rooms / night</span>
          </div>
          <div className="mt-3 h-2 w-full max-w-md overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                cap > 30 ? "bg-emerald-500" : cap > 15 ? "bg-amber-500" : "bg-rose-500"
              )}
              style={{ width: `${Math.min(100, (cap / 39) * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Use this to reduce inventory during renovation or training periods.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Blackout dates</CardTitle>
          <CardDescription>
            Block dates where the property is fully booked or unavailable. The website
            booking form will refuse these check-in dates.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-5 space-y-5">
          {/* Add new */}
          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-3 items-end">
            <div>
              <Label htmlFor="bk-date">Date</Label>
              <Input
                id="bk-date"
                type="date"
                value={draftDate}
                min={today}
                onChange={(e) => setDraftDate(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="bk-reason">Reason (optional)</Label>
              <Input
                id="bk-reason"
                value={draftReason}
                onChange={(e) => setDraftReason(e.target.value)}
                placeholder="e.g. KR Market festival, deep clean, maintenance"
                className="mt-1.5"
              />
            </div>
            <Button variant="primary" onClick={addBlackout}>
              <Plus className="h-4 w-4" />
              Add blackout
            </Button>
          </div>

          <Separator />

          {/* Upcoming */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-900">Upcoming blackouts</h3>
              <Badge variant="slate">{future.length}</Badge>
            </div>
            {future.length === 0 ? (
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                <CalendarX className="h-4 w-4" />
                No upcoming blackouts.
              </div>
            ) : (
              <ul className="space-y-2">
                {future.map((b) => (
                  <li
                    key={b.date}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-md bg-amber-50 text-amber-700">
                      <CalendarX className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-slate-900">{prettyDate(b.date)}</div>
                      <div className="text-xs text-slate-500 truncate">
                        {b.reason || "No reason recorded"}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBlackout(b.date)}
                      aria-label="Remove blackout"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Past */}
          {past.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-500">Past blackouts</h3>
                <Badge variant="outline">{past.length}</Badge>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {past.map((b) => (
                  <li key={b.date}>
                    <Badge variant="slate">{prettyDate(b.date)}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
