import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/hotel";
import { ROOMS } from "@/data/rooms";
import { NEARBY } from "@/data/nearby";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    { path: "/", priority: 1.0, freq: "weekly" as const },
    { path: "/rooms", priority: 0.9, freq: "weekly" as const },
    { path: "/amenities", priority: 0.7, freq: "monthly" as const },
    { path: "/gallery", priority: 0.6, freq: "monthly" as const },
    { path: "/nearby", priority: 0.9, freq: "monthly" as const },
    { path: "/about", priority: 0.5, freq: "yearly" as const },
    { path: "/policies", priority: 0.5, freq: "yearly" as const },
    { path: "/faqs", priority: 0.6, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "yearly" as const },
    { path: "/book", priority: 0.9, freq: "monthly" as const },
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...ROOMS.map((r) => ({
      url: `${SITE_URL}/rooms/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...NEARBY.map((p) => ({
      url: `${SITE_URL}/nearby/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
