import { listLeads } from "@/lib/leadStore";
import { hasSupabase } from "@/lib/supabase";
import LeadsTable from "@/components/admin/LeadsTable";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function CrmDashboard() {
  let leads = [] as Awaited<ReturnType<typeof listLeads>>;
  let loadError: string | null = null;
  try {
    leads = await listLeads();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Failed to load leads";
  }

  const supabaseConnected = hasSupabase();
  const newCount = leads.filter((l) => l.status === "New").length;
  const contactedCount = leads.filter((l) => l.status === "Contacted").length;
  const bookedCount = leads.filter((l) => l.status === "Booked").length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayCount = leads.filter((l) => new Date(l.created_at) >= today).length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">CRM · Leads & Enquiries</h1>
          <p className="mt-1 text-sm text-slate-500">
            Every enquiry from the website lands here. Update status, add call notes,
            export to CSV — never lose a lead again.
          </p>
        </div>
        <Badge variant={supabaseConnected ? "success" : "warn"}>
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              supabaseConnected ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          {supabaseConnected ? "Supabase connected" : "Temp storage — connect Supabase to persist"}
        </Badge>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatBox label="Total leads" value={leads.length} tone="slate" />
        <StatBox label="Today" value={todayCount} tone="amber" />
        <StatBox label="New" value={newCount} tone="sky" />
        <StatBox label="Booked" value={bookedCount} tone="emerald" />
      </div>

      {loadError && (
        <Card>
          <CardContent className="p-4 text-sm text-rose-700 bg-rose-50 rounded-xl">
            {loadError}
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <LeadsTable initialLeads={leads} />
        </CardContent>
      </Card>

      <p className="text-xs text-slate-400">
        {contactedCount} contacted · {leads.length - newCount - contactedCount - bookedCount} other
      </p>
    </div>
  );
}

function StatBox({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "slate" | "amber" | "sky" | "emerald";
}) {
  const tones = {
    slate: "text-slate-900",
    amber: "text-amber-700",
    sky: "text-sky-700",
    emerald: "text-emerald-700",
  };
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
          {label}
        </div>
        <div className={`mt-1 text-3xl font-semibold ${tones[tone]}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
