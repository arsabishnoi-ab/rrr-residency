import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import JsonLd from "@/components/JsonLd";
import { HOTEL, SITE_URL } from "@/data/hotel";
import { hotelJsonLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${HOTEL.name} | Budget Hotel in Kalasipalyam, Bangalore — AC & Non-AC Rooms from ₹1200`,
    template: `%s | ${HOTEL.name}`,
  },
  description: HOTEL.shortDescription,
  applicationName: HOTEL.name,
  authors: [{ name: HOTEL.owner }],
  keywords: [
    "hotel in Kalasipalyam Bangalore",
    "budget hotel Bangalore",
    "lodge near KR Market",
    "hotel near Bangalore City Railway Station",
    "hotel near Majestic Bangalore",
    "hotel near Kalasipalyam bus stand",
    "AC room Kalasipalyam",
    "couples hotel Bangalore with ID",
    "hotel near Victoria Hospital",
    "RRR Residency",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: HOTEL.name,
    title: `${HOTEL.name} | Budget Hotel in Kalasipalyam, Bangalore`,
    description: HOTEL.shortDescription,
    url: SITE_URL,
    images: [
      {
        url: "/images/hero/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: `${HOTEL.name} — Hotel in Kalasipalyam, Bangalore`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${HOTEL.name} | Budget Hotel in Kalasipalyam, Bangalore`,
    description: HOTEL.shortDescription,
    images: ["/images/hero/hero-1.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <JsonLd data={hotelJsonLd()} />
        <Navbar />
        <main data-page className="min-h-[60vh] pb-[var(--mobile-cta-h)] lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
