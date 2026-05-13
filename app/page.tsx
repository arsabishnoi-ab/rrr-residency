import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import BrandIntro from "@/components/BrandIntro";
import PriceMarquee from "@/components/PriceMarquee";
import Section from "@/components/Section";
import RoomCard from "@/components/RoomCard";
import EnquiryForm from "@/components/EnquiryForm";
import AmenityIcon from "@/components/AmenityIcon";
import JsonLd from "@/components/JsonLd";
import LazyMap from "@/components/LazyMap";
import Reveal, { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { HOTEL } from "@/data/hotel";
import { ROOMS } from "@/data/rooms";
import { NEARBY } from "@/data/nearby";
import { AMENITIES } from "@/data/amenities";
import { FAQS } from "@/data/faqs";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${HOTEL.name} | Budget Hotel in Kalasipalyam, Bangalore — AC & Non-AC Rooms from ₹1200`,
  description: HOTEL.shortDescription,
  path: "/",
});

const USPS = [
  { t: "Closest hotel to KR Market", d: "Just 0.3 km away — a 4 minute walk to Asia's largest flower market." },
  { t: "Free cancellation* on call", d: "Pay only when you arrive. No advance, no online deposit." },
  { t: "Couples & foreign guests OK", d: "Welcome with a valid government ID / passport. Privacy guaranteed." },
  { t: "24/7 reception", d: "Arrive any time, day or night. A clean room and hot water always waiting." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS.slice(0, 8))} />

      <Hero />
      <PriceMarquee />
      <BrandIntro />

      {/* USPs - clean grid */}
      <section className="bg-ink-25 py-12 sm:py-16 border-y border-ink-100">
        <div className="container-pad">
          <StaggerGroup className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {USPS.map((u, i) => (
              <StaggerItem key={u.t}>
                <div className="card p-5 sm:p-6 h-full">
                  <div className="text-2xl">{["📍", "💸", "🛡️", "🌙"][i]}</div>
                  <h3 className="mt-3 font-display text-base font-bold text-ink-900">{u.t}</h3>
                  <p className="mt-1 text-[13px] text-ink-500 leading-relaxed">{u.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <Section
        eyebrow="Our Rooms"
        title="Six clean room options — AC & Non-AC, from ₹1,200"
        description="Same prices for everyone, every season. Book direct on this site and save more than what MakeMyTrip or Goibibo would charge."
      >
        <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((r) => (
            <StaggerItem key={r.slug}>
              <RoomCard room={r} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Reveal direction="up" delay={0.15} className="mt-10 text-center">
          <Link href="/rooms" className="btn-secondary">
            See full tariff chart
          </Link>
        </Reveal>
      </Section>

      <Section
        eyebrow="Famous Nearby"
        title="Walk to the city's busiest, most historic landmarks"
        description="Few hotels in Bangalore put you this close to the wholesale markets, bus and rail terminals, and monuments that built the city."
        className="bg-ink-25"
      >
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NEARBY.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                href={`/nearby/${p.slug}`}
                className="block h-full card card-hover p-5 sm:p-6 group"
              >
                <span className="chip-brand">
                  {p.distanceKm} km · {p.walkingMinutes ? `${p.walkingMinutes} min walk` : `${p.drivingMinutes} min drive`}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900 group-hover:text-brand-500 transition">
                  {p.name}
                </h3>
                <p className="mt-2 text-[13px] text-ink-500 leading-relaxed">{p.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 eyebrow text-brand-600 group-hover:text-brand-700">
                  Learn more
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section
        eyebrow="Amenities"
        title="Everything's included"
        description="No add-ons, no surprises. Free Wi-Fi, hot water, housekeeping — every day."
      >
        <StaggerGroup className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {AMENITIES.map((a) => (
            <StaggerItem key={a.title} className="card p-4 sm:p-5 hover:border-brand-200 transition">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <AmenityIcon name={a.icon} />
              </div>
              <h3 className="mt-3 font-display text-sm font-bold text-ink-900">{a.title}</h3>
              <p className="mt-1 text-xs text-ink-500 leading-relaxed">{a.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section
        eyebrow="Reservations"
        title="Book in 30 seconds"
        description="Tell us your dates — we'll confirm by WhatsApp or call. No advance payment required."
        className="bg-ink-25"
      >
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal direction="up" className="lg:col-span-3">
            <EnquiryForm source="/" />
          </Reveal>
          <Reveal direction="up" delay={0.1} className="lg:col-span-2 space-y-4">
            <div className="card p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-ink-900">Or contact us directly</h3>
              <div className="mt-4 space-y-2">
                <a href={HOTEL.socials.callPrimaryLink} className="flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3 hover:border-ink-900 transition">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <span className="flex-1">
                    <div className="eyebrow text-ink-500">Reception · 24h</div>
                    <div className="text-[15px] font-bold text-ink-900">+91 {HOTEL.contact.phonePrimary}</div>
                  </span>
                </a>
                <a href={HOTEL.socials.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3 hover:border-ink-900 transition">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-save-500 text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.37 0 .02 5.35.02 11.97c0 2.11.55 4.15 1.6 5.95L0 24l6.27-1.64a11.94 11.94 0 0 0 5.73 1.46h.01c6.62 0 11.97-5.35 11.97-11.97 0-3.2-1.25-6.2-3.46-8.37z"/>
                    </svg>
                  </span>
                  <span className="flex-1">
                    <div className="eyebrow text-ink-500">WhatsApp · Owner</div>
                    <div className="text-[15px] font-bold text-ink-900">+91 {HOTEL.contact.phoneSecondary}</div>
                  </span>
                </a>
                <a href={HOTEL.socials.emailLink} className="flex items-center gap-3 rounded-xl border border-ink-200 px-4 py-3 hover:border-ink-900 transition">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-900 text-white font-bold text-sm">@</span>
                  <span className="flex-1 min-w-0">
                    <div className="eyebrow text-ink-500">Email</div>
                    <div className="text-[13px] font-semibold text-ink-900 break-all">{HOTEL.contact.email}</div>
                  </span>
                </a>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="relative aspect-[5/3]">
                <Image
                  src="/images/hero/hero-2.jpg"
                  alt={`${HOTEL.name} reception`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-ink-900">Walk-ins welcome</h3>
                <p className="mt-1 text-[13px] text-ink-500">Already in Kalasipalyam? Our reception is open 24/7.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        eyebrow="Find Us"
        title="A 4-minute walk from KR Market"
        description={`${HOTEL.address.line1}, ${HOTEL.address.line2}, ${HOTEL.address.locality}, ${HOTEL.address.city} ${HOTEL.address.pincode}.`}
      >
        <Reveal direction="up" className="rounded-2xl overflow-hidden border border-ink-200">
          <LazyMap query={HOTEL.address.full} title={`Map to ${HOTEL.name}`} />
        </Reveal>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={HOTEL.socials.mapLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open in Google Maps
          </a>
          <a href={HOTEL.socials.callPrimaryLink} className="btn-secondary">
            Call for directions
          </a>
        </div>
      </Section>
    </>
  );
}
