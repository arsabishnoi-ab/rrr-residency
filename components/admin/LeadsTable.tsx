"use client";

import { useMemo, useState } from "react";
import { Phone, MessageCircle, Download, Search, FileText, Trash2 } from "lucide-react";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leadSchema";
import type { LeadRow } from "@/lib/leadStore";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STATUS_PILL: Record<LeadStatus, string> = {
  New: "bg-sky-50 text-sky-800 border-sky-200",
  Contacted: "bg-amber-50 text-amber-800 border-amber-200",
  Booked: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Lost: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function LeadsTable({ initialLeads }: { initialLeads: LeadRow[] }) {
  const [leads, setLeads] = useState<LeadRow[]>(initialLeads);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"All" | LeadStatus>("All");
  const [editing, setEditing] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (status !== "All" && l.status !== status) return false;
      if (q.trim()) {
        const needle = q.toLowerCase();
        const hay = [l.name, l.phone, l.email, l.message, l.source, l.room_type]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [leads, q, status]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: leads.length };
    for (const s of LEAD_STATUSES) c[s] = 0;
    for (const l of leads) c[l.status] = (c[l.status] || 0) + 1;
    return c;
  }, [leads]);

  async function setLeadStatus(id: string, next: LeadStatus) {
    const prev = leads;
    setLeads((curr) => curr.map((l) => (l.id === id ? { ...l, status: next } : l)));
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      alert("Could not update status. Please refresh.");
      setLeads(prev);
    }
  }

  async function saveNotes(id: string) {
    const value = notesDraft;
    setLeads((curr) => curr.map((l) => (l.id === id ? { ...l, notes: value } : l)));
    setEditing(null);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: value }),
      });
    } catch {
      alert("Could not save notes.");
    }
  }

  async function removeLead(id: string) {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    const prev = leads;
    setLeads((curr) => curr.filter((l) => l.id !== id));
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      alert("Could not delete.");
      setLeads(prev);
    }
  }

  function downloadCsv() {
    const headers = [
      "id", "created_at", "name", "phone", "email",
      "checkin", "checkout", "room_type", "guests",
      "status", "source", "utm", "message", "notes",
    ];
    const escape = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const rows = [headers.join(",")];
    for (const l of filtered) {
      rows.push(headers.map((h) => escape((l as unknown as Record<string, unknown>)[h])).join(","));
    }
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rrr-residency-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 p-4 border-b border-slate-100">
        {(["All", ...LEAD_STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              status === s
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            )}
          >
            {s} <span className="opacity-60">({counts[s] ?? 0})</span>
          </button>
        ))}
        <div className="flex-1" />
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, phone, message…"
            className="pl-8 w-[260px]"
          />
        </div>
        <Button variant="outline" size="sm" onClick={downloadCsv}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50/60">
            <tr className="border-b border-slate-200">
              {["Received", "Guest", "Phone", "Room", "Dates", "Status", "Source", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center text-slate-500">
                  No leads match the current filter.
                </td>
              </tr>
            )}
            {filtered.map((l) => {
              const isEditing = editing === l.id;
              const phoneOnly = String(l.phone).replace(/[^0-9]/g, "");
              const wa = phoneOnly.length === 10 ? `91${phoneOnly}` : phoneOnly;
              return (
                <tr key={l.id} className="align-top hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                    {new Date(l.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{l.name}</div>
                    {l.email && <div className="text-xs text-slate-500">{l.email}</div>}
                    {l.message && (
                      <div className="mt-1 text-xs text-slate-600 max-w-xs line-clamp-2">{l.message}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a
                      href={`tel:+91${phoneOnly}`}
                      className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:text-amber-700"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {l.phone}
                    </a>
                    <a
                      href={`https://wa.me/${wa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:underline"
                    >
                      <MessageCircle className="h-3 w-3" />
                      WhatsApp
                    </a>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <div className="font-medium text-slate-800">{l.room_type || "—"}</div>
                    <div className="text-slate-500">
                      {l.guests ?? 1} guest{(l.guests ?? 1) > 1 ? "s" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap">
                    <div className="text-slate-800">In: {l.checkin || "—"}</div>
                    <div className="text-slate-500">Out: {l.checkout || "—"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={l.status}
                      onChange={(e) => setLeadStatus(l.id, e.target.value as LeadStatus)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-amber-500/40",
                        STATUS_PILL[l.status]
                      )}
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    <div>{l.source || "—"}</div>
                    {l.utm && (
                      <Badge variant="outline" className="mt-1 text-[10px] font-normal max-w-[160px] truncate">
                        {l.utm}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-col items-end gap-1.5">
                      {isEditing ? (
                        <div className="flex flex-col items-end gap-1 w-60">
                          <textarea
                            value={notesDraft}
                            onChange={(e) => setNotesDraft(e.target.value)}
                            rows={3}
                            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                            placeholder="Internal notes…"
                          />
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setEditing(null)}>
                              Cancel
                            </Button>
                            <Button size="sm" onClick={() => saveNotes(l.id)}>
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="text-xs text-slate-600 max-w-xs text-left">
                            {l.notes || <span className="text-slate-400 italic">No notes</span>}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditing(l.id);
                                setNotesDraft(l.notes || "");
                              }}
                            >
                              <FileText className="h-3.5 w-3.5" />
                              Notes
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLead(l.id)}
                              className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
