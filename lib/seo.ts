import type { Metadata } from "next";
import { HOTEL, SITE_URL } from "@/data/hotel";

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.image ?? `${SITE_URL}/images/hero/hero-1.jpg`;

  return {
    title: opts.title,
    description: opts.description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: HOTEL.name,
      images: [{ url: image, width: 1200, height: 630, alt: HOTEL.name }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

export function hotelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${SITE_URL}/#hotel`,
    name: HOTEL.name,
    description: HOTEL.shortDescription,
    url: SITE_URL,
    telephone: [`+91${HOTEL.contact.phonePrimary}`, `+91${HOTEL.contact.phoneSecondary}`],
    email: HOTEL.contact.email,
    image: [
      `${SITE_URL}/images/hero/hero-1.jpg`,
      `${SITE_URL}/images/hero/hero-2.jpg`,
      `${SITE_URL}/images/hero/hero-3.jpg`,
      `${SITE_URL}/images/rooms/room-1.jpg`,
    ],
    priceRange: "₹1200 – ₹2400",
    starRating: { "@type": "Rating", ratingValue: "3" },
    numberOfRooms: HOTEL.rooms.total,
    petsAllowed: false,
    smokingAllowed: false,
    checkinTime: "12:00",
    checkoutTime: "11:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${HOTEL.address.line1}, ${HOTEL.address.line2}`,
      addressLocality: HOTEL.address.locality,
      addressRegion: HOTEL.address.state,
      postalCode: HOTEL.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: HOTEL.geo.lat,
      longitude: HOTEL.geo.lng,
    },
    amenityFeature: HOTEL.features.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
