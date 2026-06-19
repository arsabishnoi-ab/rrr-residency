import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import RoomCard from "@/components/RoomCard";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { HOTEL } from "@/data/hotel";
import { getMergedRooms, getMergedVariants } from "@/lib/settingsStore";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: `Rooms & Tariff — AC & Non-AC Rooms from ₹1200 | ${HOTEL.name}`,
  description:
    "Full tariff for RRR Residency Bangalore: Single Non-AC ₹1200, Single AC ₹1400, Double Non-AC ₹1500, Double AC ₹1800, Triple Non-AC ₹2000, Triple AC ₹2400. Extra adult ₹500. All-inclusive — Wi-Fi, hot water, housekeeping.",
  path: "/rooms",
});

export default async function RoomsHubPage() {
  const [rooms, variants] = await Promise.all([getMergedRooms(), getMergedVariants()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Rooms & Tariff", url: "/rooms" },
        ])}
      />

      <Section
        eyebrow="Rooms & Tariff"
        title="Pick the room that suits you"
        description="Six clean, well-maintained room categories across Single, Double and Triple sizes — each available in AC and Non-AC. All rates are per night, all-inclusive of taxes, free Wi-Fi, 24-hour hot water and housekeeping."
        className="bg-white"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r) => (
            <RoomCard key={r.slug} room={r} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Full tariff chart"
        title="Transparent pricing — no surprises"
        description="Same prices for everyone, every season. Pay only when you arrive, at the hotel."
      >
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-ink-100 text-ink-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Room</th>
                  <th className="px-4 py-3 text-left font-semibold">Sleeps</th>
                  <th className="px-4 py-3 text-left font-semibold">Bed</th>
                  <th className="px-4 py-3 text-right font-semibold">Was</th>
                  <th className="px-4 py-3 text-right font-semibold">Now</th>
                  <th className="px-4 py-3 text-right font-semibold">Save</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {variants.map((v) => {
                  const room = rooms.find((r) => r.slug === v.roomSlug)!;
                  return (
                    <tr key={`${v.roomSlug}-${v.type}`} className="bg-white hover:bg-ink-100/40">
                      <td className="px-4 py-3 font-semibold text-ink-900">
                        <Link href={`/rooms/${v.roomSlug}`} className="hover:text-brand-700">
                          {v.label}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-ink-700">{room.occupancy}</td>
                      <td className="px-4 py-3 text-ink-500">{room.bedConfig}</td>
                      <td className="px-4 py-3 text-right text-ink-300 line-through">₹{v.originalPrice}</td>
                      <td className="px-4 py-3 text-right font-bold text-brand-700">₹{v.price}</td>
                      <td className="px-4 py-3 text-right">
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-red-700">
                          {v.discountPercent}% OFF
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-ink-100 px-4 py-3 text-xs text-ink-500">
            All rates per room per night, inclusive of taxes. Extra adult: ₹{HOTEL.policies.extraPerson}/night.
            Check-in 12:00 noon, check-out 11:00 AM. Pay at check-in (cash / UPI / card).
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <EnquiryForm source="/rooms" title="Check availability & book" />
          </div>
          <aside className="lg:col-span-2">
            <div className="card p-6">
              <h3 className="font-display text-xl font-bold text-ink-900">Group / long-stay rates</h3>
              <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                Travelling with a group or staying for a week or more?
                Patient attendant for a hospital stay? Call the owner directly for
                a special long-stay rate.
              </p>
              <a
                href={HOTEL.socials.callSecondaryLink}
                className="btn-primary mt-4 w-full"
              >
                Call Owner: +91 {HOTEL.contact.phoneSecondary}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
