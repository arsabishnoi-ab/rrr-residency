import { getSettings } from "@/lib/settingsStore";
import PricingEditor from "@/components/admin/PricingEditor";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const settings = await getSettings();
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

      <PricingEditor initial={settings} />
    </div>
  );
}
