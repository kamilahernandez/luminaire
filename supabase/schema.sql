-- Beauty Studio SaaS booking backend — run this once in your Supabase
-- project's SQL Editor (Dashboard → SQL Editor → New query → paste → Run).
--
-- This creates two tables:
--   clients  — one row per beauty business using this shared backend
--   bookings — one row per appointment request, tagged with client_id
--
-- RLS (Row Level Security) is turned on for both tables with NO policies,
-- meaning the public anon key can't read or write anything. Only the
-- server-side service_role key (used in our API routes, never exposed to
-- the browser) can touch this data. That's intentional — nothing in this
-- app needs public database access, every write goes through an API route.

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  notification_email text not null,
  timezone text not null default 'America/New_York',
  review_link text,
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  service text not null,
  add_on_services text[] not null default '{}',
  appointment_at timestamptz not null,
  duration_minutes integer not null default 60,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined')),
  confirm_token uuid not null default gen_random_uuid(),
  reminder_sent_at timestamptz,
  review_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists bookings_confirm_token_idx on bookings(confirm_token);
create index if not exists bookings_client_id_idx on bookings(client_id);

alter table clients enable row level security;
alter table bookings enable row level security;

-- Lumière's row — the first (and for now only) client on this shared backend.
-- Replace the notification_email if it ever changes.
insert into clients (name, notification_email, timezone, review_link)
values (
  'Lumière',
  'beautysolutionstech@gmail.com',
  'America/New_York',
  'https://search.google.com/local/writereview?placeid=REPLACE_WITH_REAL_PLACE_ID'
)
on conflict do nothing;
