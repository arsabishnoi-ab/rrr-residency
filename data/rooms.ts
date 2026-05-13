export type RoomCategory = {
  slug: string;
  name: string;
  shortName: string;
  occupancy: string;
  maxGuests: number;
  bedConfig: string;
  size: string;
  description: string;
  longDescription: string;
  images: string[];
  features: string[];
  variants: RoomVariant[];
  metaTitle: string;
  metaDescription: string;
};

export type RoomVariant = {
  type: "ac" | "non-ac";
  label: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
};

export const DISCOUNT_PERCENT = 20;

function variant(
  type: "ac" | "non-ac",
  label: string,
  price: number
): RoomVariant {
  const originalPrice = Math.round(price / (1 - DISCOUNT_PERCENT / 100) / 50) * 50;
  return { type, label, price, originalPrice, discountPercent: DISCOUNT_PERCENT };
}

export const ROOMS: RoomCategory[] = [
  {
    slug: "single-room",
    name: "Single Room",
    shortName: "Single",
    occupancy: "1 Adult",
    maxGuests: 1,
    bedConfig: "1 single bed",
    size: "~100 sq.ft",
    description:
      "A cozy and well-kept single room — ideal for solo travellers, business visitors and patients on hospital visits.",
    longDescription:
      "Our single rooms are designed for the value-conscious solo traveller. Each room comes with a comfortable single bed, attached bathroom with 24-hour hot water, free high-speed Wi-Fi, premium clean linen, a writing desk, ample storage and a personal locker. Choose between our Non-AC rooms at just ₹1200/night or air-conditioned rooms at ₹1400/night — both offering the same comfort, cleanliness and 24-hour room service that has made RRR Residency a favourite for visitors to Kalasipalyam, KR Market and Bangalore City Railway Station.",
    images: ["/images/rooms/room-1.jpg", "/images/rooms/room-2.jpg"],
    features: [
      "1 comfortable single bed",
      "Attached bathroom with 24-hour hot water",
      "Free high-speed Wi-Fi",
      "Daily housekeeping",
      "Premium clean linen & towels",
      "Television",
      "Personal locker / safe",
      "Writing desk",
      "24-hour room service",
    ],
    variants: [variant("non-ac", "Single Non-AC", 1200), variant("ac", "Single AC", 1400)],
    metaTitle: "Single Room AC & Non-AC near KR Market | RRR Residency Bangalore",
    metaDescription:
      "Single room from ₹1200/night at RRR Residency, Kalasipalyam — AC & Non-AC, attached bath, 24-hour hot water, free Wi-Fi. Walking distance from KR Market and Bangalore City Railway Station.",
  },
  {
    slug: "double-room",
    name: "Double Room",
    shortName: "Double",
    occupancy: "2 Adults",
    maxGuests: 2,
    bedConfig: "1 double bed",
    size: "~140 sq.ft",
    description:
      "Spacious double rooms — perfect for couples, families on a budget and friends travelling together.",
    longDescription:
      "Our double rooms are the most-booked category at RRR Residency. Each room offers a generous double bed, attached bathroom with 24-hour hot water, free Wi-Fi, television, daily housekeeping and 24-hour room service. Unmarried couples are welcome — valid government-issued photo ID is the only requirement. Pick our Non-AC double at ₹1500/night or our air-conditioned double at ₹1800/night. Both options give you the same clean, friendly, hassle-free stay in the heart of Kalasipalyam, Bangalore.",
    images: ["/images/rooms/room-3.jpg", "/images/rooms/room-4.jpg"],
    features: [
      "1 spacious double bed",
      "Attached bathroom with 24-hour hot water",
      "Free high-speed Wi-Fi",
      "Daily housekeeping",
      "Premium clean linen & towels",
      "Television",
      "Personal locker / safe",
      "Couples allowed with ID",
      "24-hour room service",
    ],
    variants: [variant("non-ac", "Double Non-AC", 1500), variant("ac", "Double AC", 1800)],
    metaTitle: "Double Room AC & Non-AC in Kalasipalyam | Couples Welcome | RRR Residency",
    metaDescription:
      "Double room from ₹1500/night at RRR Residency, Kalasipalyam, Bangalore. AC & Non-AC, couples allowed with ID, 24-hour hot water, free Wi-Fi. Walk to KR Market & Majestic.",
  },
  {
    slug: "triple-room",
    name: "Triple Bed Room",
    shortName: "Triple",
    occupancy: "3 Adults",
    maxGuests: 3,
    bedConfig: "1 double + 1 single bed (or 3 singles)",
    size: "~180 sq.ft",
    description:
      "Roomy triple-bed rooms — ideal for families, group of friends and small business teams.",
    longDescription:
      "Travelling with family or friends? Our triple-bed rooms give you space, comfort and great value. Choose between three comfortable single beds or one double + one single, attached bathroom with 24-hour hot water, free Wi-Fi, television, daily housekeeping and 24-hour room service. Available in Non-AC at ₹2000/night and AC at ₹2400/night. Extra adult is allowed at just ₹500/night. RRR Residency is just a short walk from Kalasipalyam Bus Stand and a short ride from Bangalore City Railway Station (Majestic).",
    images: ["/images/rooms/room-5.jpg", "/images/rooms/room-6.jpg"],
    features: [
      "1 double + 1 single bed (or 3 singles)",
      "Attached bathroom with 24-hour hot water",
      "Free high-speed Wi-Fi",
      "Daily housekeeping",
      "Premium clean linen & towels",
      "Television",
      "Personal locker / safe",
      "Family friendly",
      "Extra adult at ₹500",
      "24-hour room service",
    ],
    variants: [variant("non-ac", "Triple Non-AC", 2000), variant("ac", "Triple AC", 2400)],
    metaTitle: "Triple Bed Room AC & Non-AC for Family | RRR Residency Bangalore",
    metaDescription:
      "Triple-bed family room from ₹2000/night at RRR Residency, Kalasipalyam, Bangalore. AC & Non-AC, sleeps 3, free Wi-Fi, 24-hour hot water. Close to KR Market & Tipu Sultan Palace.",
  },
];

export function getRoom(slug: string): RoomCategory | undefined {
  return ROOMS.find((r) => r.slug === slug);
}

export const ALL_VARIANTS = ROOMS.flatMap((r) =>
  r.variants.map((v) => ({
    roomSlug: r.slug,
    roomName: r.name,
    ...v,
  }))
);

export const MIN_PRICE = Math.min(...ALL_VARIANTS.map((v) => v.price));
export const MAX_PRICE = Math.max(...ALL_VARIANTS.map((v) => v.price));
