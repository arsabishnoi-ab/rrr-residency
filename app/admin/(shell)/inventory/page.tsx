import { getSettings } from "@/lib/settingsStore";
import InventoryEditor from "@/components/admin/InventoryEditor";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const settings = await getSettings();
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
          Availability
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-slate-900">
          Inventory
        </h1>
        <p className="mt-1 text-sm text-slate-500 max-w-2xl">
          Manage blackout dates and overall room availability for the property.
          The public booking form respects these settings.
        </p>
      </header>

      <InventoryEditor initial={settings} />
    </div>
  );
}
