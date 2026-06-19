"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HOTEL } from "@/data/hotel";

export default function BrandIntro({ minPrice }: { minPrice: number }) {
  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="container-pad">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="chip-brand">📍 Kalasipalyam · Bangalore</span>

            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-ink-900 text-balance">
              Clean, comfortable rooms — <br className="hidden sm:block" />
              <span className="text-brand-500">right in the centre of Bangalore.</span>
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-lg text-ink-500 leading-relaxed">
              39 rooms · AC & Non-AC · from{" "}
              <span className="font-bold text-ink-900">₹{minPrice}/night</span>.
              4-minute walk from KR Market. Free Wi-Fi, 24-hour hot water, lift,
              parking — and a reception that's never closed.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/book" className="btn-accent text-sm">
                Book Direct & Save
              </Link>
              <a
                href={HOTEL.socials.callPrimaryLink}
                className="btn-secondary text-sm"
              >
                Call +91 {HOTEL.contact.phonePrimary}
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
              <Stat n="39" l="Rooms" />
              <Stat n="24h" l="Reception" />
              <Stat n="0.3km" l="KR Market" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl border border-ink-200/80 bg-white px-4 py-5">
      <div className="font-display text-2xl sm:text-3xl font-bold text-ink-900">{n}</div>
      <div className="mt-1 eyebrow text-ink-500">{l}</div>
    </div>
  );
}
