import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { ROOMS, getRoom, RoomCategory } from "@/data/rooms";
import { HOTEL, SITE_URL } from "@/data/hotel";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { ROOM_TYPES } from "@/lib/leadSchema";

export function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const room = getRoom(params.slug);
  if (!room) return {};
  return buildMetadata({
    title: room.metaTitle,
    description: room.metaDescription,
    path: `/rooms/${room.slug}`,
    image: `${SITE_URL}${room.images[0]}`,
  });
}

export default function RoomDetail({ params }: { params: { slug: string } }) {
  const room = getRoom(params.slug);
  if (!room) notFound();

  const minPrice = Math.min(...room.variants.map((v) => v.price));
  const acVariant = room.variants.find((v) => v.type === "ac");
  const defaultRoomType = (acVariant?.label ?? room.variants[0].label) as (typeof ROOM_TYPES)[number];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Rooms", url: "/rooms" },
            { name: room.name, url: `/rooms/${room.slug}` },
          ]),
          productJsonLd(room),
        ]}
      />

      <header className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-pad pt-10 pb-6">
          <div className="text-sm text-ink-500">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/rooms" className="hover:text-brand-700">Rooms</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-900">{room.name}</span>
          </div>
          <div className="mt-4 grid gap-6 md:grid-cols-2 items-end">
            <div>
              <span className="label">Available now</span>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-ink-900">
                {room.name}
              </h1>
              <p className="mt-3 text-base text-ink-700 max-w-xl">
                {room.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip">{room.occupancy}</span>
                <span className="chip">{room.bedConfig}</span>
                <span className="chip">{room.size}</span>
              </div>
            </div>
            <div className="card p-5 sm:p-6">
              <div className="text-xs text-ink-500">Tariff per night, all-inclusive</div>
              <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-brand-700">From ₹{minPrice}</span>
                <span className="text-xs text-ink-500">/ night</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {room.variants.map((v) => (
                  <div key={v.label} className="rounded-xl bg-ink-100 px-3 py-2.5">
                    <div className="text-[11px] uppercase tracking-wider text-ink-500">{v.type === "ac" ? "Air Conditioned" : "Non-AC"}</div>
                    <div className="text-sm font-bold text-ink-900">{v.label}</div>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="text-[11px] text-ink-300 line-through">₹{v.originalPrice}</span>
                      <span className="text-base font-bold text-brand-700">₹{v.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={`/book?room=${encodeURIComponent(defaultRoomType)}`}
                className="btn-primary w-full mt-5"
              >
                Book this room
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="py-10">
        <div className="container-pad grid gap-2 sm:grid-cols-2">
          {room.images.map((img, idx) => (
            <div
              key={img}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={img}
                alt={`${room.name} at RRR Residency Kalasipalyam Bangalore — photo ${idx + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <Section
        eyebrow="What you get"
        title="Everything included"
        description={room.longDescription}
        className="bg-white"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {room.features.map((f) => (
            <div key={f} className="flex items-start gap-3 rounded-xl bg-ink-100 p-4">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <span className="text-sm text-ink-900">{f}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <EnquiryForm
              source={`/rooms/${room.slug}`}
              defaultRoom={defaultRoomType}
              title={`Book ${room.name}`}
              description="Tell us your dates — we'll lock the room and confirm on WhatsApp within minutes."
            />
          </div>
          <aside className="lg:col-span-2 space-y-4">
            <div className="card p-5">
              <h3 className="font-display text-lg font-bold text-ink-900">Need to talk first?</h3>
              <p className="mt-1 text-sm text-ink-500">Reception is open 24 hours — call us anytime.</p>
              <div className="mt-3 grid gap-2">
                <a href={HOTEL.socials.callPrimaryLink} className="btn-primary w-full">
                  Call +91 {HOTEL.contact.phonePrimary}
                </a>
                <a
                  href={HOTEL.socials.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                >
                  WhatsApp Owner
                </a>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-display text-lg font-bold text-ink-900">Other room sizes</h3>
              <ul className="mt-3 space-y-2">
                {ROOMS.filter((r) => r.slug !== room.slug).map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/rooms/${r.slug}`}
                      className="flex items-center justify-between rounded-xl bg-ink-100 px-3 py-2 hover:bg-ink-100/70"
                    >
                      <span className="text-sm font-semibold text-ink-900">{r.name}</span>
                      <span className="text-xs font-bold text-brand-700">
                        from ₹{Math.min(...r.variants.map((v) => v.price))}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function productJsonLd(room: RoomCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: `${room.name} — RRR Residency Bangalore`,
    description: room.longDescription,
    bed: room.bedConfig,
    occupancy: { "@type": "QuantitativeValue", maxValue: room.maxGuests },
    image: room.images.map((p) => `${SITE_URL}${p}`),
    offers: room.variants.map((v) => ({
      "@type": "Offer",
      name: v.label,
      price: v.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/rooms/${room.slug}`,
    })),
  };
}
