import Link from "next/link";
import {
  ArrowUpRight,
  IndianRupee,
  CalendarX,
  Users,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react";
import { listLeads } from "@/lib/leadStore";
import { getSettings } from "@/lib/settingsStore";
import { hasSupabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, formatINR, shortDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_TONE: Record<string, "info" | "amber" | "success" | "danger" | "slate"> = {
  New: "info",
  Contacted: "amber",
  Booked: "success",
  Cancelled: "danger",
  Closed: "slate",
};

export default async function OverviewPage() {
  let leads: Awaited<ReturnType<typeof listLeads>> = [];
  try {
    leads = await listLeads();
  } catch {
    leads = [];
  }
  const settings = await getSettings();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last7 = new Date(today);
  last7.setDate(today.getDate() - 7);

  const todayCount = leads.filter((l) => new Date(l.created_at) >= today).length;
  const last7Count = leads.filter((l) => new Date(l.created_at) >= last7).length;
  const newCount = leads.filter((l) => l.status === "New").length;
  const bookedCount = leads.filter((l) => l.status === "Booked").length;
  const conversion = leads.length === 0 ? 0 : Math.round((bookedCount / leads.length) * 100);

  const recent = leads.slice(0, 6);
  const soldOutCount = settings.pricing.filter((p) => p.soldOut).length;
  const totalVariants = settings.pricing.length;
  const cheapest = settings.pricing.reduce((min, p) => (p.price < min ? p.price : min), Infinity);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
            Welcome back
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">Overview</h1>
          <p className="mt-1 text-sm text-slate-500">
            A snapshot of leads, pricing and inventory — all in one place.
          </p>
        </div>
        <Badge variant={hasSupabase() ? "success" : "warn"}>
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              hasSupabase() ? "bg-emerald-500" : "bg-amber-500"
            )}
          />
          {hasSupabase() ? "Live database" : "Temp storage"}
        </Badge>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi
          label="Leads today"
          value={todayCount}
          sub={`${last7Count} this week`}
          icon={Users}
          tone="amber"
        />
        <Kpi
          label="New / unactioned"
          value={newCount}
          sub="Need your follow-up"
          icon={Clock}
          tone="sky"
        />
        <Kpi
          label="Booked"
          value={bookedCount}
          sub={`${conversion}% conversion`}
          icon={IndianRupee}
          tone="emerald"
        />
        <Kpi
          label="Sold-out variants"
          value={`${soldOutCount}/${totalVariants}`}
          sub={cheapest === Infinity ? "No rates set" : `From ${formatINR(cheapest)}`}
          icon={CalendarX}
          tone="slate"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Recent enquiries</CardTitle>
              <CardDescription>Last {recent.length} leads captured from the website.</CardDescription>
            </div>
            <Link href="/admin/dashboard" className="text-sm font-medium text-amber-700 hover:underline inline-flex items-center gap-1">
              Open CRM <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {recent.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No leads yet. Once a guest submits the enquiry form, they will appear here.
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {recent.map((l) => (
                  <li key={l.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/50 transition-colors">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-50 text-sm font-semibold text-amber-700">
                      {l.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 truncate">{l.name}</span>
                        <Badge variant={STATUS_TONE[l.status] ?? "slate"}>{l.status}</Badge>
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500 truncate">
                        {l.phone} · {l.room_type ?? "—"} · {shortDate(l.created_at)}
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                      <a
                        href={`tel:${l.phone}`}
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        title="Call"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://wa.me/${l.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-8 w-8 place-items-center rounded-lg text-emerald-600 hover:bg-emerald-50"
                        title="WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Jump straight to common tasks.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-2 p-5">
            <QuickAction
              href="/admin/pricing"
              icon={IndianRupee}
              title="Update room rates"
              sub="Adjust prices, surge & sold-out flags"
            />
            <QuickAction
              href="/admin/inventory"
              icon={CalendarX}
              title="Block dates"
              sub="Add maintenance / fully-booked days"
            />
            <QuickAction
              href="/admin/dashboard"
              icon={Users}
              title="Work the lead inbox"
              sub={`${newCount} new ${newCount === 1 ? "lead" : "leads"} awaiting follow-up`}
            />
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Pricing snapshot</CardTitle>
            <CardDescription>Current direct rates per room variant.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <ul className="divide-y divide-slate-100">
              {settings.pricing.slice(0, 6).map((p) => {
                const [slug, type] = p.key.split("__");
                const variantName = `${slug.replace(/-/g, " ")} · ${type.toUpperCase()}`;
                return (
                  <li key={p.key} className="flex items-center justify-between gap-3 px-5 py-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium capitalize text-slate-800">{variantName}</div>
                      <div className="text-xs text-slate-500 line-through decoration-slate-300">
                        {formatINR(p.originalPrice)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.soldOut ? (
                        <Badge variant="danger">Sold out</Badge>
                      ) : (
                        <span className="text-sm font-semibold text-slate-900">{formatINR(p.price)}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory at a glance</CardTitle>
            <CardDescription>Blackouts and cap currently active.</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500">Inventory cap</div>
                <div className="text-lg font-semibold text-slate-900">{settings.inventoryCap} rooms / night</div>
              </div>
              <Link href="/admin/inventory">
                <Button variant="outline" size="sm">Edit</Button>
              </Link>
            </div>
            <div className="rounded-lg border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-slate-500">Blackout dates</div>
                <Link href="/admin/inventory" className="text-xs font-medium text-amber-700 hover:underline">
                  Manage
                </Link>
              </div>
              {settings.blackouts.length === 0 ? (
                <div className="mt-2 text-sm text-slate-500">No blackouts configured.</div>
              ) : (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {settings.blackouts.slice(0, 8).map((b) => (
                    <li key={b.date}>
                      <Badge variant="amber">
                        {new Date(b.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </Badge>
                    </li>
                  ))}
                  {settings.blackouts.length > 8 && (
                    <li>
                      <Badge variant="slate">+{settings.blackouts.length - 8} more</Badge>
                    </li>
                  )}
                </ul>
              )}
            </div>
            <div className="rounded-lg border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">Weekend surge</div>
                  <div className="text-sm text-slate-700">
                    {settings.surge.enabled ? `+${settings.surge.weekendPercent}% Fri & Sat` : "Disabled"}
                  </div>
                </div>
                <Badge variant={settings.surge.enabled ? "success" : "slate"}>
                  {settings.surge.enabled ? "Active" : "Off"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Kpi({
  label,
  value,
  sub,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "amber" | "sky" | "emerald" | "slate";
}) {
  const tones = {
    amber: { ring: "ring-amber-100", chip: "bg-amber-50 text-amber-700", val: "text-amber-700" },
    sky: { ring: "ring-sky-100", chip: "bg-sky-50 text-sky-700", val: "text-sky-700" },
    emerald: { ring: "ring-emerald-100", chip: "bg-emerald-50 text-emerald-700", val: "text-emerald-700" },
    slate: { ring: "ring-slate-100", chip: "bg-slate-100 text-slate-700", val: "text-slate-900" },
  };
  const t = tones[tone];
  return (
    <Card className={cn("ring-1", t.ring)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</div>
          <span className={cn("grid h-7 w-7 place-items-center rounded-md", t.chip)}>
            <Icon className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className={cn("mt-2 text-3xl font-semibold tracking-tight", t.val)}>{value}</div>
        <div className="mt-0.5 text-xs text-slate-500">{sub}</div>
      </CardContent>
    </Card>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  sub,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:bg-amber-50/50 hover:border-amber-200"
    >
      <span className="grid h-9 w-9 place-items-center rounded-md bg-amber-50 text-amber-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{sub}</div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}
