"use client";

import * as React from "react";
import { Save, RefreshCw, AlertCircle } from "lucide-react";
import type { HotelSettings, VariantOverride } from "@/lib/settingsStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ROOMS } from "@/data/rooms";
import { formatINR, cn } from "@/lib/utils";

type Row = VariantOverride & {
  roomName: string;
  variantLabel: string;
  roomSlug: string;
  type: "ac" | "non-ac";
};

function buildRows(s: HotelSettings): Row[] {
  return ROOMS.flatMap((room) =>
    room.variants.map((v) => {
      const key = `${room.slug}__${v.type}`;
      const override = s.pricing.find((p) => p.key === key) ?? {
        key,
        price: v.price,
        originalPrice: v.originalPrice,
        soldOut: false,
      };
      return {
        ...override,
        roomName: room.name,
        variantLabel: v.label,
        roomSlug: room.slug,
        type: v.type,
      };
    })
  );
}

export default function PricingEditor({ initial }: { initial: HotelSettings }) {
  const [rows, setRows] = React.useState<Row[]>(() => buildRows(initial));
  const [surge, setSurge] = React.useState(initial.surge);
  const [saving, setSaving] = React.useState(false);
  const [savedAt, setSavedAt] = React.useState<string | null>(initial.updatedAt);
  const [error, setError] = React.useState<string | null>(null);
  const [dirty, setDirty] = React.useState(false);

  function updateRow(key: string, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
    setDirty(true);
  }

  function updateSurge(patch: Partial<typeof surge>) {
    setSurge((s) => ({ ...s, ...patch }));
    setDirty(true);
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pricing: rows.map(({ key, price, originalPrice, soldOut }) => ({
            key,
            price,
            originalPrice,
            soldOut,
          })),
          surge,
        }),
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

  function resetToDefaults() {
    setRows(buildRows({ ...initial, pricing: [] }));
    setSurge({ enabled: false, weekendPercent: 15, note: "Friday & Saturday surge" });
    setDirty(true);
  }

  const grouped = React.useMemo(() => {
    const map = new Map<string, { name: string; items: Row[] }>();
    rows.forEach((r) => {
      if (!map.has(r.roomSlug)) map.set(r.roomSlug, { name: r.roomName, items: [] });
      map.get(r.roomSlug)!.items.push(r);
    });
    return Array.from(map.values());
  }, [rows]);

  return (
    <div className="space-y-6">
      {/* Sticky save bar */}
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={resetToDefaults} disabled={saving}>
            <RefreshCw className="h-3.5 w-3.5" />
            Reset to data defaults
          </Button>
          <Button onClick={save} disabled={saving || !dirty}>
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      {/* Surge */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Weekend surge</CardTitle>
          <CardDescription>
            Automatically uplift Friday & Saturday rates by a percentage. Useful for weekends and event days.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
          <div className="flex items-center justify-between sm:flex-col sm:items-start gap-2">
            <Label>Enable surge</Label>
            <Switch checked={surge.enabled} onCheckedChange={(v) => updateSurge({ enabled: v })} />
          </div>
          <div>
            <Label htmlFor="surge-pct">Uplift (%)</Label>
            <Input
              id="surge-pct"
              type="number"
              min={0}
              max={100}
              value={surge.weekendPercent}
              onChange={(e) => updateSurge({ weekendPercent: Number(e.target.value) || 0 })}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="surge-note">Internal note</Label>
            <Input
              id="surge-note"
              value={surge.note}
              onChange={(e) => updateSurge({ note: e.target.value })}
              placeholder="e.g. KR Market festival weekends"
              className="mt-1.5"
            />
          </div>
        </CardContent>
      </Card>

      {/* Per-room pricing */}
      {grouped.map((group) => (
        <Card key={group.name}>
          <CardHeader>
            <CardTitle className="font-display text-lg">{group.name}</CardTitle>
            <CardDescription>
              Set the direct price guests pay and the OTA / strike-through price shown in the banner.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <ul className="divide-y divide-slate-100">
              {group.items.map((row) => {
                const save = row.originalPrice - row.price;
                const pct =
                  row.originalPrice > 0 ? Math.round((save / row.originalPrice) * 100) : 0;
                return (
                  <li key={row.key} className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-5 py-4 items-end">
                    <div className="lg:col-span-3">
                      <div className="text-sm font-semibold text-slate-900">{row.variantLabel}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant={row.type === "ac" ? "info" : "slate"}>
                          {row.type === "ac" ? "AC" : "Non-AC"}
                        </Badge>
                        {row.soldOut && <Badge variant="danger">Sold out</Badge>}
                      </div>
                    </div>
                    <div className="lg:col-span-3">
                      <Label htmlFor={`p-${row.key}`}>Direct price (₹)</Label>
                      <Input
                        id={`p-${row.key}`}
                        type="number"
                        min={0}
                        value={row.price}
                        onChange={(e) => updateRow(row.key, { price: Number(e.target.value) || 0 })}
                        className={cn("mt-1.5", row.soldOut && "opacity-50")}
                        disabled={row.soldOut}
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <Label htmlFor={`o-${row.key}`}>OTA / strike-through (₹)</Label>
                      <Input
                        id={`o-${row.key}`}
                        type="number"
                        min={0}
                        value={row.originalPrice}
                        onChange={(e) =>
                          updateRow(row.key, { originalPrice: Number(e.target.value) || 0 })
                        }
                        className="mt-1.5"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <Label>Savings shown</Label>
                      <div className="mt-2 text-sm font-medium text-emerald-700">
                        {save > 0 ? `${formatINR(save)} · ${pct}% off` : "—"}
                      </div>
                    </div>
                    <div className="lg:col-span-1 flex items-center justify-end gap-2">
                      <Switch
                        checked={row.soldOut}
                        onCheckedChange={(v) => updateRow(row.key, { soldOut: v })}
                        aria-label="Sold out"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
