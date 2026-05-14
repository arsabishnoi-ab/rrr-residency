export const HOTEL = {
  name: "RRR Residency",
  legalName: "RRR Residency",
  tagline: "Comfortable, Clean & Affordable Stay in the Heart of Bangalore",
  shortDescription:
    "RRR Residency is a 39-room budget-friendly lodge in Kalasipalyam, Bangalore. Walking distance from KR Market, Bangalore Fort, Tipu Sultan's Palace and Kalasipalyam Bus Stand. AC and Non-AC rooms, 24-hour hot water, free Wi-Fi, complimentary water bottles, lift to all floors, parking, room service, and help booking train, bus or flight tickets at competitive fares.",
  owner: "Rajkumar",
  registeredName: "Rajkumar",
  address: {
    line1: "#12, 2nd Main Road",
    line2: "Dispensary Road, near Citizen Hospital",
    locality: "Kalasipalyam",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560002",
    country: "India",
    full: "#12, 2nd Main Road, Dispensary Road, near Citizen Hospital, Kalasipalyam, Bangalore, Karnataka 560002, India",
  },
  contact: {
    phonePrimary: "7760107520",
    phoneSecondary: "9845983391",
    whatsapp: "917760107520",
    email: "rrrresidencykpm@gmail.com",
  },
  geo: {
    lat: 12.9608,
    lng: 77.5773,
  },
  rooms: {
    total: 39,
    allocated: 30,
  },
  timings: {
    reception: "24 hours (open all day, every day)",
    checkIn: "12:00 noon (early check-in subject to availability)",
    checkOut: "11:00 AM",
  },
  features: [
    "24-hour hot water",
    "Free high-speed Wi-Fi",
    "Complimentary bottled water",
    "Lift / Elevator (all floors)",
    "Train, bus & flight ticket assistance",
    "Two-wheeler & four-wheeler parking",
    "24-hour room service",
    "24-hour reception",
    "AC and Non-AC rooms",
    "Unmarried couples allowed with valid ID",
    "Foreign guests welcome",
    "No-smoking property",
  ],
  policies: {
    couples: "Unmarried couples are allowed with valid government-issued photo ID.",
    foreignGuests: "Foreign guests are welcome. Passport and valid visa are required at check-in.",
    smoking: "Non-smoking property. Smoking is not permitted inside the rooms or common areas.",
    restaurant: "No restaurant attached — but plenty of South Indian, North Indian and Andhra restaurants are within 50 meters.",
    parking: "Free parking available for two-wheelers and four-wheelers (subject to availability).",
    extraPerson: 500,
    payment: "Payment is collected at the hotel at the time of check-in. We accept cash, UPI, debit and credit cards.",
    cancellation: "Bookings are non-refundable. Please confirm your dates carefully before booking.",
  },
  socials: {
    whatsappLink: "https://wa.me/917760107520",
    mapLink: "https://www.google.com/maps/search/?api=1&query=RRR+Residency+Kalasipalyam+Bangalore",
    callPrimaryLink: "tel:+917760107520",
    callSecondaryLink: "tel:+919845983391",
    emailLink: "mailto:rrrresidencykpm@gmail.com",
  },
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rrrresidency.com";

export function whatsappLink(prefilledMessage?: string) {
  const base = `https://wa.me/${HOTEL.contact.whatsapp}`;
  return prefilledMessage
    ? `${base}?text=${encodeURIComponent(prefilledMessage)}`
    : base;
}
