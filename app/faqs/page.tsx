import type { Metadata } from "next";
import Section from "@/components/Section";
import EnquiryForm from "@/components/EnquiryForm";
import JsonLd from "@/components/JsonLd";
import { FAQS } from "@/data/faqs";
import { HOTEL } from "@/data/hotel";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `FAQs — Frequently Asked Questions | ${HOTEL.name} Bangalore`,
  description:
    "Answers to common questions about RRR Residency, Kalasipalyam, Bangalore — check-in times, prices, couples policy, foreign guests, parking, payment and cancellation.",
  path: "/faqs",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "FAQs", url: "/faqs" },
          ]),
          faqJsonLd(FAQS),
        ]}
      />

      <Section
        eyebrow="Frequently asked questions"
        title="Everything you might want to know"
        description="Couldn't find your answer? Call us at +91 7760107529 — a real person picks up, 24 hours a day."
      >
        <div className="grid gap-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="card p-5 group [&[open]>summary>span:last-child]:rotate-180"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display text-lg font-bold text-ink-900">
                {f.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-transform">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-ink-700 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="h-section">Still have a question?</h2>
            <p className="mt-3 lede">
              We don't use bots or call centres — when you call or message, you reach the
              front desk or the owner directly.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={HOTEL.socials.callPrimaryLink} className="btn-primary">
                Call Reception
              </a>
              <a href={HOTEL.socials.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp Owner
              </a>
            </div>
          </div>
          <EnquiryForm source="/faqs" title="Ask your question" />
        </div>
      </Section>
    </>
  );
}
