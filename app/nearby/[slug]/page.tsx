import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import RoomCard from "@/components/RoomCard";
import JsonLd from "@/components/JsonLd";
import { NEARBY, getNearby } from "@/data/nearby";
import { HOTEL, SITE_URL } from "@/data/hotel";
import { getMergedRooms, getMinMaxPrice } from "@/lib/settingsStore";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return NEARBY.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const place = getNearby(params.slug);
  if (!place) return {};
  return buildMetadata({
    title: place.metaTitle,
    description: place.metaDescription,
    path: `/nearby/${place.slug}`,
  });
}

export default async function NearbyDetailPage({ params }: { params: { slug: string } }) {
  const place = getNearby(params.slug);
  if (!place) notFound();

  const [rooms, { min: minPrice }] = await Promise.all([getMergedRooms(), getMinMaxPrice()]);
  const others = NEARBY.filter((p) => p.slug !== place.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Famous Nearby", url: "/nearby" },
            { name: place.name, url: `/nearby/${place.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Place",
            name: place.name,
            description: place.longDescription,
            url: `${SITE_URL}/nearby/${place.slug}`,
          },
        ]}
      />

      <header className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-pad pt-10 pb-8">
          <div className="text-sm text-ink-500">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/nearby" className="hover:text-brand-700">Famous Nearby</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-900">{place.name}</span>
          </div>
          <div className="mt-4 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <span className="label">Walking distance from RRR Residency</span>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink-900 text-balance">
                Hotel near {place.name}
              </h1>
              <p className="mt-3 text-lg text-ink-700 max-w-2xl leading-relaxed">
                {place.shortDescription}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="chip">{place.distanceKm} km away</span>
                {place.walkingMinutes && <span className="chip">~{place.walkingMinutes} min walk</span>}
                {place.drivingMinutes && <span className="chip">~{place.drivingMinutes} min by auto</span>}
                <span className="chip bg-emerald-50 text-emerald-700">From ₹{minPrice}/night</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link href="/book" className="btn-primary">Book a room</Link>
                <a href={HOTEL.socials.callPrimaryLink} className="btn-secondary">
                  Call +91 {HOTEL.contact.phonePrimary}
                </a>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="font-display text-lg font-bold text-ink-900">Why stay at RRR Residency</h2>
              <ul className="mt-3 space-y-2">
                {place.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <Section
        eyebrow={place.name}
        title={`Why ${place.name.split("(")[0].trim()} guests love RRR Residency`}
      >
        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3 prose prose-ink max-w-none text-ink-700 leading-relaxed">
            <p className="text-base">{place.longDescription}</p>
          </div>
          <aside className="md:col-span-2">
            <div className="card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/hero/hero-2.jpg"
                  alt={`Hotel near ${place.name}`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-ink-900">{HOTEL.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{HOTEL.address.line1}, {HOTEL.address.locality}, Bangalore</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <Stat n="39" l="Rooms" />
                  <Stat n="24h" l="Reception" />
                  <Stat n={`₹${minPrice}`} l="From" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section eyebrow="Pick your room" title="Available room categories" className="bg-white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r) => <RoomCard key={r.slug} room={r} />)}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <EnquiryForm
              source={`/nearby/${place.slug}`}
              title={`Book a room near ${place.name.split("(")[0].trim()}`}
              description="Quick form — we lock the room and confirm on WhatsApp within minutes."
            />
          </div>
          <aside className="lg:col-span-2 space-y-3">
            <h3 className="font-display text-xl font-bold text-ink-900">Other nearby landmarks</h3>
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/nearby/${o.slug}`}
                className="block card p-4 hover:shadow-md transition"
              >
                <div className="text-xs text-ink-500">{o.distanceKm} km</div>
                <div className="font-semibold text-ink-900">{o.name}</div>
                <div className="mt-1 text-xs text-ink-500 line-clamp-2">{o.shortDescription}</div>
              </Link>
            ))}
          </aside>
        </div>
      </Section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl bg-ink-100 px-2 py-2">
      <div className="font-display text-base font-bold text-ink-900">{n}</div>
      <div className="text-[10px] uppercase tracking-wider text-ink-500">{l}</div>
    </div>
  );
}
