"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HOTEL } from "@/data/hotel";

const LINKS = [
  { href: "/rooms", label: "Rooms" },
  { href: "/amenities", label: "Amenities" },
  { href: "/nearby", label: "Nearby" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-ink-200/80 shadow-[0_2px_12px_-8px_rgba(0,0,0,0.1)]"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-pad flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5"
          aria-label={`${HOTEL.name} — home`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 font-bold text-white text-sm">
            R
          </span>
          <span className="flex flex-col leading-tight">
            <span className={`font-display text-[15px] font-bold transition-colors ${scrolled ? "text-ink-900" : "text-white drop-shadow"}`}>
              {HOTEL.name}
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${scrolled ? "text-ink-500" : "text-white/80"}`}>
              Kalasipalyam · Bangalore
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={[
                "rounded-full px-3.5 py-2 text-[13px] font-medium transition",
                scrolled
                  ? "text-ink-700 hover:bg-ink-50 hover:text-ink-900"
                  : "text-white/90 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={HOTEL.socials.callPrimaryLink}
            className={[
              "ml-2 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold transition",
              scrolled ? "text-ink-700 hover:bg-ink-50" : "text-white/90 hover:bg-white/10",
            ].join(" ")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
            </svg>
            {HOTEL.contact.phonePrimary}
          </a>
          <Link href="/book" className="ml-1.5 btn-accent !py-2 !px-5 !text-[12px]">
            Book Now
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className={[
            "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl transition",
            scrolled
              ? "border border-ink-200 bg-white text-ink-900"
              : "bg-white/15 backdrop-blur text-white",
          ].join(" ")}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-200/80 bg-white">
          <nav className="container-pad flex flex-col py-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-100 px-2 py-3.5 text-[15px] font-semibold text-ink-900 hover:text-brand-500"
              >
                {l.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-4 pb-2">
              <a href={HOTEL.socials.callPrimaryLink} className="btn-secondary text-[12px] !py-2.5">
                Call
              </a>
              <Link href="/book" onClick={() => setOpen(false)} className="btn-accent text-[12px] !py-2.5">
                Book Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
