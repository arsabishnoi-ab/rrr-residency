import type { Metadata } from "next";
import Section from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { HOTEL } from "@/data/hotel";
import { ROOM_TYPES } from "@/lib/leadSchema";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { ROOMS } from "@/data/rooms";

export const metadata: Metadata = buildMetadata({
  title: `Book a Room at ${HOTEL.name} — AC & Non-AC from ₹1200 | Kalasipalyam Bangalore`,
  description:
    "Reserve a clean, comfortable AC or Non-AC room at RRR Residency, Kalasipalyam, Bangalore. From ₹1200/night. No advance payment. We confirm on WhatsApp within minutes.",
  path: "/book",
});

export default function BookPage({
  searchParams,
}: {
  searchParams: { room?: string };
}) {
  const incoming = (searchParams?.room ?? "") as (typeof ROOM_TYPES)[number];
  const defaultRoom = ROOM_TYPES.includes(incoming) ? incoming : "Not Sure";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Book", url: "/book" },
        ])}
      />

      <Section
        eyebrow="Book a room"
        title="Lock your room in 30 seconds"
        description="No advance payment, no deposit, no online booking fee. Tell us your dates — we'll confirm by WhatsApp or call."
      >
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <EnquiryForm
              source="/book"
              defaultRoom={defaultRoom}
              title="Reservation enquiry"
              description="Fill the form below and we'll get back to you within minutes."
            />
          </div>

          <aside className="lg:col-span-2 space-y-4">
            <div className="card p-5">
              <h3 className="font-display text-xl font-bold text-ink-900">Tariff at a glance</h3>
              <ul className="mt-3 divide-y divide-black/5">
                {ROOMS.map((r) => {
                  const min = Math.min(...r.variants.map((v) => v.price));
                  return (
                    <li key={r.slug} className="flex items-center justify-between py-2.5">
                      <span className="text-sm font-medium text-ink-900">{r.name}</span>
                      <span className="text-sm font-bold text-brand-700">From ₹{min}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-[11px] text-ink-500">
                Per night, taxes included. Extra adult ₹{HOTEL.policies.extraPerson}/night.
              </p>
            </div>

            <div className="card p-5">
              <h3 className="font-display text-xl font-bold text-ink-900">Need it now?</h3>
              <p className="mt-1 text-sm text-ink-500">Reception is open 24h. Call us — fastest way to lock a room.</p>
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
                  WhatsApp +91 {HOTEL.contact.phonePrimary}
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-200">
              <h3 className="font-display text-base font-bold text-emerald-900">Pay at the hotel</h3>
              <p className="mt-1 text-sm text-emerald-800 leading-relaxed">
                No advance, no deposit. Pay by cash, UPI or card when you check in. Simple.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
