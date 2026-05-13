import Link from "next/link";
import { HOTEL } from "@/data/hotel";

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-950 text-ink-200">
      <div className="container-pad pt-16 pb-10 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 font-bold text-white">
              R
            </span>
            <span className="font-display text-lg font-bold text-white">{HOTEL.name}</span>
          </div>
          <p className="mt-4 text-[13px] text-ink-300 leading-relaxed">
            {HOTEL.rooms.total} clean, comfortable AC & Non-AC rooms in the heart of
            Kalasipalyam, Bangalore. Open 24 hours, 365 days.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-save-400 animate-pulse" />
            <span className="eyebrow text-save-400">Reception open now</span>
          </div>
        </div>

        <div>
          <h3 className="eyebrow text-white">Discover</h3>
          <ul className="mt-4 space-y-2 text-[13px]">
            <li><Link href="/rooms" className="text-ink-300 hover:text-white">Rooms & Tariff</Link></li>
            <li><Link href="/amenities" className="text-ink-300 hover:text-white">Amenities</Link></li>
            <li><Link href="/nearby" className="text-ink-300 hover:text-white">Famous Nearby</Link></li>
            <li><Link href="/gallery" className="text-ink-300 hover:text-white">Gallery</Link></li>
            <li><Link href="/policies" className="text-ink-300 hover:text-white">Policies</Link></li>
            <li><Link href="/faqs" className="text-ink-300 hover:text-white">FAQs</Link></li>
            <li><Link href="/book" className="text-ink-300 hover:text-white">Book Now</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-white">Famous Nearby</h3>
          <ul className="mt-4 space-y-2 text-[13px]">
            <li><Link href="/nearby/kr-market" className="text-ink-300 hover:text-white">Hotel near KR Market</Link></li>
            <li><Link href="/nearby/kalasipalyam-bus-stand" className="text-ink-300 hover:text-white">Near Kalasipalyam Bus Stand</Link></li>
            <li><Link href="/nearby/bangalore-city-railway-station" className="text-ink-300 hover:text-white">Near Majestic Railway Station</Link></li>
            <li><Link href="/nearby/tipu-sultan-palace" className="text-ink-300 hover:text-white">Near Tipu Sultan Palace</Link></li>
            <li><Link href="/nearby/victoria-hospital" className="text-ink-300 hover:text-white">Near Victoria Hospital</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-white">Reach Us</h3>
          <address className="mt-4 not-italic text-[13px] text-ink-300 leading-relaxed">
            {HOTEL.address.line1},<br />
            {HOTEL.address.line2},<br />
            {HOTEL.address.locality}, {HOTEL.address.city} – {HOTEL.address.pincode}
          </address>
          <div className="mt-4 space-y-1.5 text-[13px]">
            <a href={HOTEL.socials.callPrimaryLink} className="block text-ink-300 hover:text-white">
              📞 +91 {HOTEL.contact.phonePrimary}
            </a>
            <a href={HOTEL.socials.callSecondaryLink} className="block text-ink-300 hover:text-white">
              📞 +91 {HOTEL.contact.phoneSecondary}
            </a>
            <a href={HOTEL.socials.emailLink} className="block text-ink-300 hover:text-white break-all">
              ✉ {HOTEL.contact.email}
            </a>
          </div>
          <a
            href={HOTEL.socials.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 rounded-full bg-save-500 px-4 py-2 text-xs font-bold text-white hover:bg-save-600 transition"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-pad py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ink-400">
          <span>© {new Date().getFullYear()} {HOTEL.name} · Owned by {HOTEL.owner}</span>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="inline-flex items-center gap-1.5 hover:text-white transition">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 1 1 8 0v4" />
              </svg>
              Owner Login (CRM)
            </Link>
            <span className="text-ink-500">Made for Kalasipalyam · Bangalore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
