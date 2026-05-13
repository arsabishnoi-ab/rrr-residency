import type { Metadata } from "next";
import Section from "@/components/Section";
import AmenityIcon from "@/components/AmenityIcon";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { AMENITIES } from "@/data/amenities";
import { HOTEL } from "@/data/hotel";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Hotel Amenities & Facilities | ${HOTEL.name} Kalasipalyam`,
  description:
    "Full list of amenities at RRR Residency, Kalasipalyam, Bangalore: 24-hour hot water, free Wi-Fi, lift, parking, room service, 24-hour reception, AC rooms, daily housekeeping and more.",
  path: "/amenities",
});

export default function AmenitiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Amenities", url: "/amenities" },
        ])}
      />

      <Section
        eyebrow="Facilities"
        title="Everything you need, included in the room rate"
        description="We focus on the basics — done well, every single day. No fancy add-ons, no hidden charges."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((a) => (
            <div key={a.title} className="card p-5">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <AmenityIcon name={a.icon} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{a.title}</h3>
              <p className="mt-1 text-sm text-ink-500 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Around the property" title="What's just outside our door" className="bg-white">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Restaurants in 50m", d: "Pure-veg, non-veg, Andhra meals, North Indian — all in walking distance, breakfast to late-night." },
            { t: "ATMs & banks in 100m", d: "All major bank ATMs (SBI, HDFC, ICICI, Axis) are within a one-minute walk." },
            { t: "Pharmacies 24/7", d: "Several 24-hour pharmacies nearby — useful for hospital visitors and any emergency." },
            { t: "Public transport at the door", d: "BMTC bus stop, auto-rickshaw stand and metro (KR Market) all right outside." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl bg-ink-100 p-5">
              <h3 className="font-display text-base font-bold text-ink-900">{b.t}</h3>
              <p className="mt-1 text-xs text-ink-500 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <EnquiryForm source="/amenities" />
          </div>
          <aside className="lg:col-span-2">
            <div className="card p-5">
              <h3 className="font-display text-lg font-bold text-ink-900">Have a special requirement?</h3>
              <p className="mt-2 text-sm text-ink-500">
                Need a ground-floor room, extra-quiet room, or wheelchair access?
                Tell us when you book — we'll do our best to accommodate.
              </p>
              <a href={HOTEL.socials.callPrimaryLink} className="btn-primary mt-3 w-full">
                Call us: +91 {HOTEL.contact.phonePrimary}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
