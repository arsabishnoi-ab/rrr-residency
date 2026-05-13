"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

export type GalleryImage = { src: string; alt: string };

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((i) => (i == null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setActive((i) => (i == null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (active == null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <>
      <div className="grid gap-2 sm:gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(idx)}
            className="relative aspect-square overflow-hidden rounded-2xl bg-ink-100 focus:ring-2 focus:ring-brand-500"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </button>
        ))}
      </div>

      {active != null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={close}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button
            className="absolute left-2 sm:left-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button
            className="absolute right-2 sm:right-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <div
            className="relative w-full max-w-5xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
