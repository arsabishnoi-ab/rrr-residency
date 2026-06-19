import { getSettings } from "@/lib/settingsStore";
import PricingEditor from "@/components/admin/PricingEditor";
import { hasSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const settings = await getSettings();
  const supabaseConnected = hasSupabase();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
          Rates & Yield
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-slate-900">
          Pricing
        </h1>
        <p className="mt-1 text-sm text-slate-500 max-w-2xl">
          Edit nightly rates, OTA strike-through prices, and weekend surge rules.
          Changes apply to the website immediately after saving.
        </p>
      </header>

      {!supabaseConnected && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Supabase is not connected — price changes may not persist on Vercel after a redeploy.
          Add <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-amber-100 px-1">SUPABASE_SERVICE_ROLE_KEY</code>, then run the{" "}
          <code className="rounded bg-amber-100 px-1">hotel_settings</code> SQL from{" "}
          <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code>.
        </div>
      )}

      <PricingEditor initial={settings} />
    </div>
  );
}
