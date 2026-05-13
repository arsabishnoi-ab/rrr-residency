import type { Metadata } from "next";
import Section from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { HOTEL } from "@/data/hotel";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Hotel Policies — Check-in, Couples, Foreign Guests, Cancellation | ${HOTEL.name}`,
  description:
    "RRR Residency policies: unmarried couples allowed with ID, foreign guests welcome, no-smoking property, pay at check-in, non-refundable cancellation, extra adult ₹500.",
  path: "/policies",
});

export default function PoliciesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Policies", url: "/policies" },
        ])}
      />

      <Section
        eyebrow="House rules & policies"
        title="Clear, simple, no surprises"
        description="A short read — these are the rules we ask every guest to follow, so everyone has a comfortable stay."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { t: "Check-in & check-out", d: `Check-in from ${HOTEL.timings.checkIn}. Check-out by ${HOTEL.timings.checkOut}. Reception is open 24 hours — feel free to arrive any time.` },
            { t: "Couples policy", d: HOTEL.policies.couples },
            { t: "Foreign guests", d: HOTEL.policies.foreignGuests },
            { t: "Non-smoking property", d: HOTEL.policies.smoking },
            { t: "Restaurant & food", d: HOTEL.policies.restaurant },
            { t: "Parking", d: HOTEL.policies.parking },
            { t: "Extra person charge", d: `An extra adult can be accommodated in any room for ₹${HOTEL.policies.extraPerson}/night (subject to room capacity). Children below 5 years are free.` },
            { t: "Payment", d: HOTEL.policies.payment },
            { t: "Cancellation", d: HOTEL.policies.cancellation },
            { t: "Pets", d: "Pets are currently not allowed at RRR Residency." },
            { t: "Visitors in rooms", d: "Visitors are allowed in the lobby. Visitors are not permitted inside guest rooms after 9 PM, for the safety and comfort of all guests." },
            { t: "Valid ID required", d: "All guests must carry a valid government photo ID (Aadhaar / DL / Voter ID / Passport). For foreign guests: passport + valid visa." },
          ].map((p) => (
            <div key={p.t} className="card p-5">
              <h3 className="font-display text-lg font-bold text-ink-900">{p.t}</h3>
              <p className="mt-1 text-sm text-ink-500 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="h-section">Anything unclear? Just ask.</h2>
            <p className="mt-3 lede">
              We'd much rather answer a question now than have a surprise at check-in.
              Call us, WhatsApp us, or use the form on the right.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={HOTEL.socials.callPrimaryLink} className="btn-primary">
                Call: +91 {HOTEL.contact.phonePrimary}
              </a>
              <a
                href={HOTEL.socials.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          <EnquiryForm source="/policies" title="Ask a question" />
        </div>
      </Section>
    </>
  );
}
