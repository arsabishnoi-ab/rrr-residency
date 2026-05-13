"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HOTEL } from "@/data/hotel";

const SLIDES = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
  "/images/hero/hero-5.jpg",
];

const ROTATE_MS = 5500;

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      data-hero
      aria-label={`${HOTEL.name} — photo gallery`}
      className="relative isolate h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink-950 text-white"
    >
      <div className="absolute inset-0 -z-10">
        <AnimatePresence>
          {SLIDES.map((src, i) =>
            i === idx ? (
              <motion.div
                key={src + i}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 animate-ken-burns">
                  <Image
                    src={src}
                    alt=""
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Bottom progress + indicators */}
      <div className="absolute bottom-24 sm:bottom-8 inset-x-0 z-10">
        <div className="container-pad flex items-center justify-between gap-4">
          <span className="eyebrow text-white/70">
            {String(idx + 1).padStart(2, "0")} <span className="text-white/30 mx-1">/</span> {String(SLIDES.length).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === idx ? "w-10 bg-white" : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Soft scroll cue */}
      <motion.div
        className="absolute bottom-44 sm:bottom-24 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/60"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        <span className="eyebrow">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
