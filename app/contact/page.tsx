import type { Metadata } from "next";
import Section from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import LazyMap from "@/components/LazyMap";
import { HOTEL } from "@/data/hotel";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Contact ${HOTEL.name} — Phone, WhatsApp, Email & Address | Kalasipalyam`,
  description: `Reach RRR Residency, Kalasipalyam, Bangalore. Call +91 7760107529 (reception, 24h) or +91 9845983391 (owner). Email rrrresidencykpm@gmail.com. ${HOTEL.address.full}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />

      <Section
        eyebrow="Contact us"
        title="We pick up. Every time."
        description="Reception is open 24 hours, 365 days. Call, WhatsApp, email or just walk in — we're easy to reach."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <a href={HOTEL.socials.callPrimaryLink} className="card p-6 hover:shadow-md transition">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Reception (24h)</h3>
            <p className="mt-1 text-2xl font-bold text-brand-700">+91 {HOTEL.contact.phonePrimary}</p>
            <p className="text-xs text-ink-500">Tap to call · open 24 hours</p>
          </a>

          <a href={HOTEL.socials.whatsappLink} target="_blank" rel="noopener noreferrer" className="card p-6 hover:shadow-md transition">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.37 0 .02 5.35.02 11.97c0 2.11.55 4.15 1.6 5.95L0 24l6.27-1.64a11.94 11.94 0 0 0 5.73 1.46h.01c6.62 0 11.97-5.35 11.97-11.97 0-3.2-1.25-6.2-3.46-8.37z"/>
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-ink-900">WhatsApp Owner</h3>
            <p className="mt-1 text-2xl font-bold text-emerald-700">+91 {HOTEL.contact.phoneSecondary}</p>
            <p className="text-xs text-ink-500">Tap to chat · Rajkumar (owner)</p>
          </a>

          <a href={HOTEL.socials.emailLink} className="card p-6 hover:shadow-md transition">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink-100 text-ink-700">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Email</h3>
            <p className="mt-1 text-base font-semibold text-ink-900 break-all">{HOTEL.contact.email}</p>
            <p className="text-xs text-ink-500">We reply within a few hours</p>
          </a>
        </div>
      </Section>

      <Section eyebrow="Address" title="Find us in Kalasipalyam" className="bg-white">
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div>
            <address className="not-italic text-lg text-ink-900 leading-relaxed">
              <strong className="font-display">{HOTEL.name}</strong><br />
              {HOTEL.address.line1}<br />
              {HOTEL.address.line2}<br />
              {HOTEL.address.locality}, {HOTEL.address.city}<br />
              {HOTEL.address.state} – {HOTEL.address.pincode}<br />
              {HOTEL.address.country}
            </address>

            <div className="mt-6 grid gap-2">
              <div className="rounded-xl bg-ink-100 p-4">
                <div className="text-xs uppercase tracking-wider text-ink-500">Easy to find — landmark</div>
                <div className="text-sm font-semibold text-ink-900">Right next to Citizen Hospital, on the 2nd Main Road off Dispensary Road.</div>
              </div>
              <div className="rounded-xl bg-ink-100 p-4">
                <div className="text-xs uppercase tracking-wider text-ink-500">Distance from key landmarks</div>
                <ul className="mt-1 text-sm text-ink-900 space-y-0.5">
                  <li>KR Market — 0.3 km (4 min walk)</li>
                  <li>Kalasipalyam Bus Stand — 0.4 km (5 min walk)</li>
                  <li>Bangalore City Railway Station (Majestic) — 2.4 km</li>
                  <li>Victoria Hospital / BMCRI — 0.9 km</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a href={HOTEL.socials.mapLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Open in Google Maps
              </a>
              <a href={HOTEL.socials.callPrimaryLink} className="btn-secondary">
                Call for directions
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-black/5 shadow-sm">
            <LazyMap
              query={HOTEL.address.full}
              title={`Map to ${HOTEL.name}`}
              className="w-full h-[420px] sm:h-[500px]"
            />
          </div>
        </div>
      </Section>

      <Section>
        <EnquiryForm source="/contact" title="Or send us a message" description="We reply within a couple of hours during the day, and on the next morning for late-night messages." />
      </Section>
    </>
  );
}
