-- =====================================================================
-- RRR Residency — leads table for guest enquiries
-- Run this SQL once in your Supabase project (SQL Editor):
--   https://supabase.com/dashboard/project/_/sql/new
-- =====================================================================

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  email       text,
  checkin     date,
  checkout    date,
  room_type   text,
  guests      int default 1,
  message     text,
  source      text,
  utm         text,
  status      text not null default 'New'
              check (status in ('New', 'Contacted', 'Booked', 'Lost')),
  notes       text,
  created_at  timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- Single-row store for admin pricing, inventory cap, blackouts, surge rules.
create table if not exists public.hotel_settings (
  id          text primary key default 'default',
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.hotel_settings enable row level security;

-- The website talks to this table only via the service role key from
-- a server-side API route, so RLS just locks down all anonymous access.
alter table public.leads enable row level security;

drop policy if exists "Block anonymous read" on public.leads;
drop policy if exists "Block anonymous write" on public.leads;

-- (No public policies = no anon access. Service role bypasses RLS.)
