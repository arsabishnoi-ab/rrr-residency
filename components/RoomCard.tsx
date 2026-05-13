import Image from "next/image";
import Link from "next/link";
import { RoomCategory } from "@/data/rooms";

export default function RoomCard({ room }: { room: RoomCategory }) {
  const minPrice = Math.min(...room.variants.map((v) => v.price));
  const maxOrig = Math.max(...room.variants.map((v) => v.originalPrice));
  const maxSave = maxOrig - minPrice;

  return (
    <Link
      href={`/rooms/${room.slug}`}
      aria-label={`View ${room.name}`}
      className="group block h-full overflow-hidden card card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        <Image
          src={room.images[0]}
          alt={`${room.name} at RRR Residency Kalasipalyam Bangalore`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 chip bg-white/95 backdrop-blur text-ink-900">
          {room.occupancy}
        </span>
        <span className="absolute top-3 right-3 chip-save">
          Save ₹{maxSave}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-ink-900 group-hover:text-brand-500 transition">
          {room.name}
        </h3>
        <p className="mt-1 text-[13px] text-ink-500">
          {room.bedConfig} · {room.size}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {room.variants.map((v) => (
            <span
              key={v.label}
              className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                v.type === "ac"
                  ? "bg-ink-900 text-white"
                  : "bg-ink-100 text-ink-700"
              }`}
            >
              {v.type === "ac" ? "AC" : "Non-AC"} · ₹{v.price}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-ink-100 flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] text-ink-400 line-through">₹{maxOrig}</span>
              <span className="eyebrow text-save-600">Save up to ₹{maxSave}</span>
            </div>
            <div className="mt-1">
              <span className="font-display text-2xl font-bold text-ink-900">₹{minPrice}</span>
              <span className="ml-1 text-xs text-ink-500">/ night onwards</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition">
            Book
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
