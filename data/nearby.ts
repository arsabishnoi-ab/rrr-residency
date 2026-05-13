export type NearbyPlace = {
  slug: string;
  name: string;
  category: "market" | "transport" | "heritage" | "hospital" | "shopping" | "park" | "religious";
  distanceKm: number;
  walkingMinutes?: number;
  drivingMinutes?: number;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  longDescription: string;
  highlights: string[];
};

export const NEARBY: NearbyPlace[] = [
  {
    slug: "kr-market",
    name: "K. R. Market (Krishna Rajendra Market)",
    category: "market",
    distanceKm: 0.3,
    walkingMinutes: 4,
    drivingMinutes: 2,
    shortDescription:
      "Asia's largest flower market and Bangalore's most iconic wholesale produce hub — just 4 minutes on foot from our reception.",
    metaTitle: "Budget Hotel Near KR Market Bangalore | RRR Residency (4 min walk)",
    metaDescription:
      "Stay just 4 minutes' walk from KR Market at RRR Residency. AC & Non-AC rooms from ₹1200/night, 24-hour hot water, free Wi-Fi, parking. Best budget hotel near Krishna Rajendra Market Bangalore.",
    longDescription:
      "If you are visiting Bangalore for wholesale shopping, flower trading, fruit and vegetable business, or simply to experience the soul of old Bengaluru, K. R. Market — Krishna Rajendra Market — is the place to be. RRR Residency is the closest budget-friendly hotel to KR Market, just a 4-minute walk (about 0.3 km) from our reception. The K. R. Market metro station on the Green Line is also a one-minute walk away, giving you direct connectivity to Majestic, Yeshwantpur and other key parts of the city. Traders, exporters, wholesalers and bulk buyers choose RRR Residency because we open 24 hours a day, our reception is always staffed and we understand the early-morning hours of the market trade. Wake up at 3 AM, walk to the market, finish your business and come back to a hot shower — that's the RRR Residency advantage. We offer Single AC and Non-AC rooms, Double rooms (couples welcome with ID) and Triple-bed rooms for groups and families. Parking for two-wheelers and four-wheelers is available on the property. With prices starting at just ₹1200 per night, RRR Residency is the smartest hotel choice for anyone visiting K. R. Market in Bangalore.",
    highlights: [
      "0.3 km / 4 minute walk",
      "Asia's largest flower market",
      "K. R. Market Metro Station 1 min walk",
      "Open 24 hours — ideal for early-morning traders",
      "Free parking for buyers visiting in vehicles",
    ],
  },
  {
    slug: "kalasipalyam-bus-stand",
    name: "Kalasipalyam Bus Stand",
    category: "transport",
    distanceKm: 0.4,
    walkingMinutes: 5,
    drivingMinutes: 2,
    shortDescription:
      "One of Bangalore's busiest inter-state bus terminals — buses to Mysuru, Mangalore, Hassan, Coorg, Kerala, Tamil Nadu and Andhra leave from here.",
    metaTitle: "Hotel Near Kalasipalyam Bus Stand Bangalore | RRR Residency",
    metaDescription:
      "RRR Residency is the closest clean & budget hotel to Kalasipalyam Bus Stand — just 5 minutes walk. AC & Non-AC rooms from ₹1200/night, 24-hour check-in, free Wi-Fi, parking.",
    longDescription:
      "Kalasipalyam Bus Stand is one of the busiest private and inter-state bus terminals in Bangalore, with daily services to Mysuru, Mangalore, Madikeri, Hassan, Chikmagalur, Sakleshpur, Kannur, Kasaragod, Coimbatore, Erode, Salem, Tirupati and dozens of towns in Karnataka, Kerala, Tamil Nadu and Andhra Pradesh. With more than 800,000 passengers passing through every day, finding a clean and trustworthy hotel nearby can be tough — and that's exactly why thousands of travellers rely on RRR Residency every year. We are barely 400 meters (5 minutes' walk) from the bus stand. Arriving on a late-night Volvo from Mysuru? Our 24-hour reception is open. Catching a 4 AM bus to Coorg? We'll keep your room ready. Solo travellers, families, business visitors and tourists all appreciate our easy walking access. Choose between Non-AC and AC rooms in Single, Double and Triple configurations — starting at just ₹1200/night. Free Wi-Fi, 24-hour hot water, lift access and on-site parking are all included.",
    highlights: [
      "0.4 km / 5 minute walk",
      "Buses to Mysuru, Mangalore, Coorg, Kerala, TN, AP",
      "24-hour reception for late-night arrivals",
      "Luggage storage on request",
      "Wake-up call & early check-out for early buses",
    ],
  },
  {
    slug: "bangalore-city-railway-station",
    name: "Bangalore City Railway Station (Majestic / KSR Bengaluru)",
    category: "transport",
    distanceKm: 2.4,
    walkingMinutes: 28,
    drivingMinutes: 8,
    shortDescription:
      "Bangalore's main railway terminus (KSR Bengaluru) and the adjoining Majestic / Kempegowda Bus Station — about 8 minutes by auto from RRR Residency.",
    metaTitle: "Hotel Near Bangalore City Railway Station Majestic | RRR Residency",
    metaDescription:
      "Affordable hotel near Bangalore City Railway Station (Majestic) and Kempegowda Bus Station. RRR Residency is just 8 minutes away by auto. AC & Non-AC rooms from ₹1200/night.",
    longDescription:
      "Bangalore City Railway Station — officially renamed Krantivira Sangolli Rayanna (KSR) Bengaluru City Junction — is the main railway hub of Bangalore. It connects the city to Mumbai, Chennai, Hyderabad, Delhi, Kolkata, Trivandrum, Pune and almost every Indian city. The adjoining Kempegowda Bus Station (Majestic) handles inter-city and inter-state KSRTC and BMTC services. Together they handle hundreds of thousands of passengers daily. RRR Residency is approximately 2.4 km (8 minutes by auto-rickshaw, 12 minutes by city bus, or 15 minutes by metro) from this Majestic transport hub. We are the perfect overnight choice for passengers with early-morning trains or late-night arrivals. Our 24-hour reception means you can check in any time — no waiting around the station. We offer AC and Non-AC rooms in three sizes, from ₹1200 per night, with free Wi-Fi, 24-hour hot water, lift access and parking. Foreign visitors are welcome with passport and visa, and unmarried couples are welcome with valid photo ID.",
    highlights: [
      "2.4 km / 8 minutes by auto",
      "Direct trains from Mumbai, Chennai, Delhi, Hyderabad",
      "Kempegowda Bus Station (Majestic) adjacent",
      "24-hour reception for late-night arrivals",
      "Metro connection via KR Market station",
    ],
  },
  {
    slug: "tipu-sultan-palace",
    name: "Tipu Sultan's Summer Palace & Bangalore Fort",
    category: "heritage",
    distanceKm: 0.6,
    walkingMinutes: 8,
    drivingMinutes: 3,
    shortDescription:
      "Two of Bangalore's most important heritage monuments — Tipu Sultan's wooden summer palace and the remains of the historic Bangalore Fort — are an 8-minute walk away.",
    metaTitle: "Hotel Near Tipu Sultan Summer Palace & Bangalore Fort | RRR Residency",
    metaDescription:
      "Stay 8 minutes walk from Tipu Sultan's Summer Palace and Bangalore Fort. RRR Residency offers AC & Non-AC rooms from ₹1200/night with free Wi-Fi & 24-hour hot water.",
    longDescription:
      "History lovers visiting Bangalore have two must-see monuments at the top of their list — Tipu Sultan's Summer Palace and the remains of the Bangalore Fort. Both are within a 10-minute walk of RRR Residency. Tipu Sultan's Summer Palace, completed in 1791, is a beautiful two-storied ornate teakwood structure with intricately carved pillars, arches and balconies. It served as Tipu Sultan's summer retreat and is now a protected monument under the Archaeological Survey of India. Right next to it is the Bangalore Fort, originally built in mud by Kempegowda I in 1537 and later rebuilt in stone by Hyder Ali in 1761. Together they offer a window into the 18th-century history of the city. RRR Residency, located just 600 meters away, is the closest budget hotel for heritage tourists. Visit Tipu's Palace and the Fort in the morning, the Kote Venkataramana Temple and KR Market in the afternoon, and head out to Lalbagh or Cubbon Park by evening — all from one convenient base. AC and Non-AC rooms available from ₹1200 per night, with free Wi-Fi and 24-hour hot water.",
    highlights: [
      "0.6 km / 8 minute walk",
      "Tipu Sultan's wooden summer palace (1791)",
      "Bangalore Fort remains (1537 / 1761)",
      "Kote Venkataramana Temple next door",
      "Walking distance from KR Market & Chickpet",
    ],
  },
  {
    slug: "victoria-hospital",
    name: "Victoria Hospital & Bangalore Medical College (BMCRI)",
    category: "hospital",
    distanceKm: 0.9,
    walkingMinutes: 12,
    drivingMinutes: 4,
    shortDescription:
      "Victoria Hospital, Vanivilas Hospital, Minto Eye Hospital and Bangalore Medical College (BMCRI) — all within 1 km of our reception.",
    metaTitle: "Hotel Near Victoria Hospital BMCRI Bangalore | RRR Residency",
    metaDescription:
      "Stay near Victoria Hospital, Vanivilas Hospital, Minto Eye Hospital and BMCRI in Kalasipalyam, Bangalore. RRR Residency offers clean AC & Non-AC rooms from ₹1200/night for patient attendants.",
    longDescription:
      "Many of our guests are families and attendants of patients receiving treatment at Victoria Hospital, Vanivilas Hospital (women & children), Minto Eye Hospital and Bangalore Medical College & Research Institute (BMCRI) — Bangalore's oldest and one of its largest public medical hospitals. All four are located within a kilometer of RRR Residency, making us one of the most convenient and affordable hotel options for patient attendants. We understand that hospital visits are stressful, and we do our best to make your stay restful. Our 24-hour reception, 24-hour hot water, daily housekeeping, free Wi-Fi, lift access and quiet rooms make it easy to step away from the hospital for a hot meal, a hot shower and a good night's sleep. Single, Double and Triple-bed rooms are available in both Non-AC and AC variants from ₹1200/night. We also accommodate extra family members at just ₹500 per person. Citizen Hospital is right next door to our property, and Bowring & Lady Curzon Hospital is a 10-minute drive away.",
    highlights: [
      "Citizen Hospital next door",
      "Victoria Hospital (BMCRI) — 0.9 km",
      "Vanivilas Hospital — 1.0 km",
      "Minto Eye Hospital — 1.5 km",
      "Affordable rates for attendants & long stays",
    ],
  },
];

export function getNearby(slug: string) {
  return NEARBY.find((n) => n.slug === slug);
}
