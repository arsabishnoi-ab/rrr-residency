import type { Metadata } from "next";
import Section from "@/components/Section";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import { HOTEL } from "@/data/hotel";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Photo Gallery | ${HOTEL.name} Kalasipalyam, Bangalore`,
  description:
    "Photos of rooms, lobby and views at RRR Residency, Kalasipalyam, Bangalore. AC & Non-AC, Single, Double and Triple-bed rooms. From ₹1200/night.",
  path: "/gallery",
});

const IMAGES = [
  { src: "/images/hero/hero-1.jpg", alt: "RRR Residency exterior — hotel in Kalasipalyam, Bangalore" },
  { src: "/images/hero/hero-2.jpg", alt: "RRR Residency reception / lobby" },
  { src: "/images/hero/hero-3.jpg", alt: "RRR Residency hotel building, near KR Market Bangalore" },
  { src: "/images/hero/hero-4.jpg", alt: "RRR Residency view from the property" },
  { src: "/images/hero/hero-5.jpg", alt: "RRR Residency street view, Kalasipalyam Bangalore" },
  { src: "/images/rooms/room-1.jpg", alt: "Single Non-AC room at RRR Residency Bangalore" },
  { src: "/images/rooms/room-2.jpg", alt: "Single AC room at RRR Residency Kalasipalyam" },
  { src: "/images/rooms/room-3.jpg", alt: "Double Non-AC room — couples allowed with ID" },
  { src: "/images/rooms/room-4.jpg", alt: "Double AC room near KR Market Bangalore" },
  { src: "/images/rooms/room-5.jpg", alt: "Triple Non-AC family room at RRR Residency" },
  { src: "/images/rooms/room-6.jpg", alt: "Triple AC family room with attached bathroom" },
];

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ])}
      />

      <Section
        eyebrow="Photo gallery"
        title="See the rooms, the lobby and the neighbourhood"
        description="Real photos, no stock images. Click any picture to view it full-screen."
      >
        <Gallery images={IMAGES} />
      </Section>
    </>
  );
}
