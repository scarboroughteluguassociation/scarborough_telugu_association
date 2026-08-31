-- Run this once in the Supabase SQL editor for a new project.

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  starts_at timestamptz not null,
  venue text not null,
  image_path text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table events enable row level security;

-- Anyone can read published events (public site).
create policy "Public can read published events"
  on events for select
  using (is_published = true);

-- Signed-in admins (any authenticated user) can do everything.
-- The association should only create login accounts for trusted admins.
create policy "Authenticated users manage events"
  on events for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage bucket for event images.
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

create policy "Public can view event images"
  on storage.objects for select
  using (bucket_id = 'event-images');

create policy "Authenticated users manage event images"
  on storage.objects for all
  using (bucket_id = 'event-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'event-images' and auth.role() = 'authenticated');
