-- Run this once in the Supabase SQL Editor for your already-created project
-- (schema.sql already has this column for anyone setting up fresh).
alter table bookings add column if not exists add_on_services text[] not null default '{}';
