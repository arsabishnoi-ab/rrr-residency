import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { HOTEL } from "@/data/hotel";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `About ${HOTEL.name} — A Family-Run Hotel in Kalasipalyam, Bangalore`,
  description: `${HOTEL.name} is a 39-room family-run hotel in Kalasipalyam, Bangalore. Owned by ${HOTEL.owner}, we have been welcoming traders, tourists and patient families for years.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <Section
        eyebrow="Our story"
        title={`A clean, honest place to stay in the heart of Bangalore`}
        description={`${HOTEL.name} is a 39-room family-run lodge in Kalasipalyam, Bangalore — minutes away from KR Market, Bangalore Fort and the Majestic transport hub.`}
      >
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <Image
              src="/images/hero/hero-3.jpg"
              alt={`${HOTEL.name} entrance — owned by ${HOTEL.owner}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4 text-ink-700 leading-relaxed">
            <p>
              Kalasipalyam has always been the beating heart of Bangalore — busy markets,
              busy buses, busy traders, busy travellers. People arrive at all hours, with all
              kinds of stories. They need a clean room, a hot shower, fast Wi-Fi and somebody
              friendly at the front desk. That's why {HOTEL.name} exists.
            </p>
            <p>
              We are owned and personally run by <strong>{HOTEL.owner}</strong>. Our 39 rooms
              are split across AC and Non-AC, Single, Double and Triple sizes — chosen so that
              everyone, from a solo trader visiting KR Market to a family attending a wedding,
              can find something that fits the budget.
            </p>
            <p>
              We have welcomed wholesale traders, tourists visiting Tipu Sultan's Palace,
              families travelling to Mysuru and Coorg, and many, many patient attendants from
              Victoria Hospital and BMCRI. Our 24-hour reception means there is always a
              friendly face — whether you arrive at 3 AM by Volvo from Mangalore or at 11 PM
              by train at Majestic.
            </p>
            <p>
              We don't claim to be a five-star hotel. We claim to be honest, clean, and right
              in the middle of everything. Come stay with us — and tell your friends.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="What we stand for" title="Our promises to every guest" className="bg-white">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Honest pricing", d: "What you see on the website is what you pay at the desk. No seasonal surge pricing, no surprise fees." },
            { t: "Clean rooms, every day", d: "Daily housekeeping, fresh linen, clean towels. We don't cut corners on basic hygiene." },
            { t: "24-hour reception", d: "There is always a person at the front desk. Arrive any hour, day or night — your room is ready." },
            { t: "Respect for every guest", d: "Couples, foreign travellers, lone women, senior citizens — every guest is treated with the same dignity." },
            { t: "Local knowledge", d: "Need a doctor, a chemist, a temple, a great south-Indian breakfast? Just ask the receptionist." },
            { t: "We answer the phone", d: "Call +91 7760107529 or +91 9845983391 — a real person picks up, every time." },
          ].map((c) => (
            <div key={c.t} className="card p-5">
              <h3 className="font-display text-lg font-bold text-ink-900">{c.t}</h3>
              <p className="mt-1 text-sm text-ink-500 leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="label">Owner</span>
            <h2 className="mt-2 h-section">{HOTEL.owner}</h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              {HOTEL.name} is registered in the name of <strong>{HOTEL.registeredName}</strong> and
              is personally managed by the owner. Need anything beyond ordinary?
              The owner is just a phone call away.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={HOTEL.socials.callSecondaryLink} className="btn-primary">
                Call Owner: +91 {HOTEL.contact.phoneSecondary}
              </a>
              <a
                href={HOTEL.socials.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <EnquiryForm source="/about" title="Drop us a quick line" />
        </div>
      </Section>
    </>
  );
}
