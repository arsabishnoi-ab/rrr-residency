"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyMap({
  query,
  title,
  className = "w-full h-[380px] sm:h-[460px]",
}: {
  query: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`${className} relative bg-ink-100 overflow-hidden`}
      aria-label={title}
    >
      {visible ? (
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-ink-300">
          <div className="text-center">
            <div className="mx-auto mb-3 h-9 w-9 rounded-full border border-gold-400/40 border-t-gold-400 animate-spin" />
            <p className="eyebrow text-ink-500">Loading map…</p>
          </div>
        </div>
      )}
    </div>
  );
}
