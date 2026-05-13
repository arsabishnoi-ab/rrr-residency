import Link from "next/link";
import { getMergedVariants, type MergedVariant } from "@/lib/settingsStore";

export default async function PriceMarquee() {
  const variants = await getMergedVariants();
  const bookable = variants.filter((v) => !v.soldOut);
  const display = bookable.length > 0 ? bookable : variants;

  return (
    <section
      aria-label="Direct booking price comparison"
      className="relative isolate overflow-hidden bg-ink-950 text-white"
    >
      <div className="container-pad py-3 flex items-center gap-4">
        <div className="hidden md:flex shrink-0 items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-save-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-save-400" />
          </span>
          <span className="eyebrow text-save-400">Book Direct · Save More</span>
        </div>
        <div className="md:hidden shrink-0 eyebrow text-save-400">Book Direct</div>

        <div className="relative flex-1 overflow-hidden mask-fade">
          <div className="flex marquee-track gap-3">
            {[...display, ...display].map((v, idx) => (
              <ComparisonCard key={`${v.roomSlug}-${v.type}-${idx}`} v={v} />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-950 to-transparent z-10" />
    </section>
  );
}

function ComparisonCard({ v }: { v: MergedVariant }) {
  const save = v.originalPrice - v.price;

  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-ink-900/60 backdrop-blur px-2 py-1.5">
      <Link
        href={`/book?room=${encodeURIComponent(v.label)}`}
        className="shrink-0 rounded-full border border-brand-400/50 bg-transparent px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-300 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition whitespace-nowrap"
      >
        Book Now
      </Link>

      <span className="eyebrow text-white/60 whitespace-nowrap">{v.label}</span>

      <div className="flex items-baseline gap-1 whitespace-nowrap">
        <span className="eyebrow text-white/40">MMT</span>
        <span className="text-[12px] text-white/40 line-through decoration-brand-400/70">
          ₹{v.originalPrice.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="flex items-baseline gap-1.5 whitespace-nowrap pr-1">
        <span className="eyebrow text-white/50">Direct</span>
        <span className="text-[15px] font-bold text-white tracking-tight">
          ₹{v.price.toLocaleString("en-IN")}
        </span>
      </div>

      <span className="chip-save whitespace-nowrap">
        Save ₹{save.toLocaleString("en-IN")}
      </span>
    </div>
  );
}
