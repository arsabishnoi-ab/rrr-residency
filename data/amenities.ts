export type Amenity = {
  title: string;
  description: string;
  icon: string;
};

export const AMENITIES: Amenity[] = [
  {
    title: "24-Hour Hot Water",
    description:
      "Round-the-clock hot water in every bathroom — perfect for early-morning travellers and late-night arrivals.",
    icon: "shower",
  },
  {
    title: "Free High-Speed Wi-Fi",
    description:
      "Complimentary Wi-Fi across all 39 rooms and common areas, fast enough for video calls and OTT streaming.",
    icon: "wifi",
  },
  {
    title: "Lift / Elevator",
    description:
      "Lift access to all floors — no climbing stairs with luggage, comfortable for elderly guests and patient attendants.",
    icon: "elevator",
  },
  {
    title: "On-site Parking",
    description:
      "Free parking for both two-wheelers and four-wheelers, subject to availability — a rare luxury in busy Kalasipalyam.",
    icon: "parking",
  },
  {
    title: "24-Hour Room Service",
    description:
      "Reception and basic room service available round-the-clock. Need fresh towels at midnight? Just ask.",
    icon: "bell",
  },
  {
    title: "24-Hour Reception",
    description:
      "Check in or check out any time of day. Ideal for early-morning bus arrivals and late-night train arrivals.",
    icon: "clock",
  },
  {
    title: "AC & Non-AC Rooms",
    description:
      "Pick what suits your budget and comfort — both options come with the same clean, well-maintained interiors.",
    icon: "ac",
  },
  {
    title: "Daily Housekeeping",
    description:
      "Fresh linen, clean towels, swept floors and a tidy bathroom — every single day, without fail.",
    icon: "broom",
  },
  {
    title: "Couples Welcome",
    description:
      "Unmarried couples are welcome with a valid government-issued photo ID. Privacy and dignity guaranteed.",
    icon: "heart",
  },
  {
    title: "Foreign Guests Welcome",
    description:
      "International travellers are welcome. We register with C-Form as required by law — please bring passport and visa.",
    icon: "globe",
  },
  {
    title: "Non-Smoking Property",
    description:
      "We are a strictly non-smoking property to keep the rooms clean and fresh for everyone.",
    icon: "no-smoke",
  },
  {
    title: "Safe Locker",
    description:
      "Personal locker in every room and safe deposit at reception for valuables.",
    icon: "lock",
  },
];
