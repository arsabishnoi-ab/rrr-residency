import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { HOTEL } from "@/data/hotel";
import { NEARBY } from "@/data/nearby";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Famous Places Near ${HOTEL.name} — KR Market, Tipu Palace, Majestic, Victoria Hospital`,
  description:
    "RRR Residency is walking distance from KR Market (0.3km), Kalasipalyam Bus Stand (0.4km), Tipu Sultan's Summer Palace (0.6km), Bangalore Fort and Victoria Hospital. A short ride from Majestic Railway Station and Lalbagh.",
  path: "/nearby",
});

export default function NearbyHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Famous Nearby", url: "/nearby" },
        ])}
      />

      <Section
        eyebrow="Famous nearby"
        title="The very centre of old Bangalore — within walking distance"
        description="From wholesale markets and historic monuments to busy bus stations and large hospitals — Kalasipalyam is the most connected pocket of Bangalore. RRR Residency sits right in the middle of it all."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NEARBY.map((p, idx) => (
            <Link
              key={p.slug}
              href={`/nearby/${p.slug}`}
              className="card overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition group"
            >
              <div className="relative aspect-[5/3] bg-ink-100">
                <Image
                  src={`/images/hero/hero-${(idx % 5) + 1}.jpg`}
                  alt={`${p.name} near RRR Residency Kalasipalyam Bangalore`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 chip bg-white/95 text-brand-700">
                  {p.distanceKm} km away
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-xl font-bold text-ink-900 group-hover:text-brand-700">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed flex-1">
                  {p.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  Why stay near {p.name.split(" ")[0]}?
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Easy to reach" title="Other landmarks within easy travel" className="bg-white">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Lalbagh Botanical Garden", "3.0 km"],
            ["Cubbon Park", "4.0 km"],
            ["Vidhana Soudha", "4.0 km"],
            ["Bangalore Palace", "6.0 km"],
            ["MG Road / Brigade Road", "5.0 km"],
            ["ISKCON Rajajinagar", "7.0 km"],
            ["Chickpet (wholesale shopping)", "1.5 km"],
            ["Avenue Road / SP Road", "1.5 km"],
            ["Town Hall", "2.0 km"],
            ["Bowring & Lady Curzon Hospital", "3.0 km"],
            ["Kempegowda International Airport", "39 km"],
            ["KSR City Railway Station (Majestic)", "2.4 km"],
          ].map(([name, dist]) => (
            <div key={name} className="rounded-2xl bg-ink-100 p-4">
              <div className="text-xs uppercase tracking-wider text-ink-500">{dist}</div>
              <div className="mt-0.5 text-sm font-semibold text-ink-900">{name}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <EnquiryForm source="/nearby" title="Planning a visit? We'll help you pick the right room." />
      </Section>
    </>
  );
}
