# RRR Residency — Hotel Website

A mobile-first, SEO-optimized website for **RRR Residency**, a budget hotel in Kalasipalyam, Bangalore.

## What's inside

- 19 pages, server-rendered with Next.js 14 (App Router) + Tailwind CSS
- Home page with hero carousel + **scrolling discounted price marquee** (6 room types)
- Detail page per room category (Single, Double, Triple — AC & Non-AC)
- 5 SEO landing pages targeting nearby landmarks (`/nearby/kr-market`, `/nearby/kalasipalyam-bus-stand`, `/nearby/bangalore-city-railway-station`, `/nearby/tipu-sultan-palace`, `/nearby/victoria-hospital`)
- Photo gallery with lightbox, FAQs, Policies, Amenities, About, Contact (with embedded Google Map) and a Book Now page
- Floating mobile bottom-nav (Call · WhatsApp · Book) — one tap to reach the hotel
- **Built-in lead capture system** — every enquiry stored in Supabase and viewable in a password-protected admin dashboard at `/admin`
- Auto-generated `sitemap.xml`, `robots.txt`, schema.org Hotel + FAQPage + BreadcrumbList JSON-LD on every page
- Works without Supabase too (falls back to OS temp file storage so the site is never broken)

## Quick start (local dev)

```bash
npm install
npm run dev
# → open http://localhost:3000
```

You'll see a banner in `/admin` saying *"Using temp storage"* — that's fine for testing. To make leads persist permanently, set up Supabase below.

## Production setup (5 minutes)

### 1. Edit one file with your real info

Open `data/hotel.ts` and update phones, address, owner name, geo coordinates, email, etc. Everything on the site reads from this one file.

You can also tweak room prices in `data/rooms.ts` (the discount % is centralized in `DISCOUNT_PERCENT`).

### 2. Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free, no credit card)
2. Click **New Project**, give it any name like `rrr-residency`, choose any region near India (Mumbai / Singapore)
3. Wait ~1 minute for the project to provision
4. In the left sidebar click **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql), and click **Run**. This creates the `leads` table.

### 3. Grab your Supabase keys

In the Supabase dashboard:

- **Project Settings → API**
  - Copy the **Project URL** → use as `NEXT_PUBLIC_SUPABASE_URL`
  - Copy the **service_role key** (under "Project API keys") → use as `SUPABASE_SERVICE_ROLE_KEY`
  - **Do NOT use the anon key** for the server. Service role bypasses RLS so only your server can read the leads.

### 4. Create `.env.local`

In the project root, copy `.env.example` to `.env.local` and fill it in:

```env
NEXT_PUBLIC_SITE_URL=https://www.rrrresidency.com

NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxxxxxxxxxx

ADMIN_PASSWORD=pick-a-strong-password
ADMIN_SECRET=any-long-random-string-32-chars-or-more
```

- `ADMIN_PASSWORD` is what you'll type in to log into `/admin`
- `ADMIN_SECRET` is used to sign the session cookie — make it long & random (you can use [random.org/strings](https://www.random.org/strings/))

### 5. Test it

```bash
npm run dev
```

- Open <http://localhost:3000> → site should load
- Submit an enquiry form → check `/admin` (log in with your `ADMIN_PASSWORD`) → you should see it
- The amber "Using temp storage" badge should now turn into a green "Supabase connected" badge

### 6. Deploy to Vercel (free)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com), import the repo
3. In Vercel's project settings → **Environment Variables**, paste the same 5 variables from your `.env.local`
4. Click **Deploy** — your hotel website will be live in ~60 seconds
5. Point your domain (`rrrresidency.com`) to Vercel in **Settings → Domains**

That's it.

## Day-to-day use

### Receiving enquiries

Every time a guest submits the form on any page, you'll see it appear at `/admin`. Each row shows:

- Guest name, phone (click to call), email
- Room type wanted, dates, number of guests
- The page they were on when they enquired (helpful — `/nearby/kr-market` means they were searching for a hotel near KR Market)
- A **WhatsApp** link that opens chat with the guest's number
- A **status dropdown** — change it from `New → Contacted → Booked` (or `Lost`)
- A **Notes** field — write internal notes like "called twice, no answer" or "confirmed for double AC, 22nd May"

You can filter by status, search by name/phone/message, and **export everything as CSV**.

### Updating prices

Open [`data/rooms.ts`](data/rooms.ts) — change the `price` numbers, save, redeploy. The home-page marquee, tariff table and all room pages update automatically.

### Updating content

| Want to change... | Edit this file |
|---|---|
| Phone numbers, address, email, owner name, timings | [`data/hotel.ts`](data/hotel.ts) |
| Room prices, descriptions, photos, features | [`data/rooms.ts`](data/rooms.ts) |
| Nearby places & SEO pages | [`data/nearby.ts`](data/nearby.ts) |
| Amenities list | [`data/amenities.ts`](data/amenities.ts) |
| FAQs (shown on `/faqs` + bottom of home page) | [`data/faqs.ts`](data/faqs.ts) |

### Adding more photos

Drop new images into:

- `public/images/hero/` — these show in the homepage hero carousel
- `public/images/rooms/` — these show in the rooms gallery

Then update [`data/rooms.ts`](data/rooms.ts) and [`app/gallery/page.tsx`](app/gallery/page.tsx) to reference them.

## SEO

The site already does the following automatically:

- Server-rendered HTML on every page — Google indexes every word, no client-side hydration delay
- Unique `<title>`, meta description, canonical and Open Graph image per page
- Schema.org `Hotel`, `HotelRoom`, `FAQPage`, `BreadcrumbList`, `Place` JSON-LD
- `sitemap.xml` at `/sitemap.xml` (lists all 18+ public pages)
- `robots.txt` at `/robots.txt` (blocks `/admin` and `/api`)
- Targeted SEO landing pages for high-intent local searches:
  - "hotel near KR Market"
  - "hotel near Kalasipalyam bus stand"
  - "hotel near Majestic Bangalore"
  - "hotel near Tipu Sultan palace"
  - "hotel near Victoria Hospital / BMCRI"

After deploying, submit your `sitemap.xml` to [Google Search Console](https://search.google.com/search-console) — that's the single biggest thing you can do to start ranking for "hotel in Kalasipalyam".

## Scripts

```bash
npm run dev        # start the dev server (hot reload)
npm run build      # production build
npm run start      # serve the production build locally
npm run lint       # run ESLint
npm run typecheck  # run TypeScript check
```

## Stack

- [Next.js 14](https://nextjs.org) (App Router) — React + server-side rendering
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [Supabase](https://supabase.com) — Postgres database for lead storage
- [Zod](https://zod.dev) — form validation
- [Vercel](https://vercel.com) — recommended hosting (free)

## Project structure

```
app/                 # all routes (pages and API)
  page.tsx           # home (/)
  rooms/             # /rooms + /rooms/[slug]
  nearby/            # /nearby + /nearby/[slug] (SEO pages)
  admin/             # /admin dashboard (password-protected)
  api/               # /api/leads, /api/admin/*
components/          # reusable React components
data/                # single-source-of-truth content files
lib/                 # supabase client, auth, lead store, SEO helpers
public/images/       # hero and room photos
supabase/schema.sql  # one-time SQL to set up the leads table
```

## Need help?

Read the inline comments in `data/hotel.ts`, `data/rooms.ts` etc. — they're written to be edited by a non-developer. Or just call your developer.

---

Built for **RRR Residency**, Kalasipalyam, Bangalore.
Open 24 hours · +91 7760107520 · rrrresidencykpm@gmail.com
