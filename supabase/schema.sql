create extension if not exists pgcrypto;

create table if not exists public.journey_content (
  id text primary key default 'main',
  intro text not null default '',
  school_title text not null default '',
  school_subtitle text not null default '',
  school_text text not null default '',
  school_image text,
  college_title text not null default '',
  college_subtitle text not null default '',
  college_text text not null default '',
  college_image text,
  university_title text not null default '',
  university_subtitle text not null default '',
  university_text text not null default '',
  university_image text,
  iit_title text not null default '',
  iit_subtitle text not null default '',
  iit_text text not null default '',
  iit_image text,
  updated_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id text primary key,
  title text not null,
  image_url text,
  alt_text text not null default '',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.work_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  github_url text,
  live_url text,
  image_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.work_items (id, title, description, github_url, live_url, sort_order)
values
  ('00000000-0000-0000-0000-000000000001', 'Dhanunjay Reddy Portfolio', 'A playful portfolio and content system for documenting AI, product, and creative technology work.', 'https://github.com/dhanunjayss0306/djportfolio', null, 0),
  ('00000000-0000-0000-0000-000000000002', 'Virun / YatraSetu', 'A startup presentation for a Smart India Hackathon project: AI-powered tourism combining personalized itineraries with verified local expertise.', null, 'https://dhanunjayss0306.github.io/virun-pitch/', 1),
  ('00000000-0000-0000-0000-000000000003', 'Suren Pastries', 'A completed pastry ordering website with accounts and ordering flows. Security checks, deployment, and payment integration are still being finalized while testing continues.', null, 'https://suren-pastries-754v.onrender.com/home', 2),
  ('00000000-0000-0000-0000-000000000004', 'Swayansh Birthday Surprise', 'A playful HTML-only surprise website made for a friend''s birthday, designed as a small interactive experience.', null, 'https://dhanunjayss0306.github.io/swayansh-birthday/', 3)
on conflict (id) do update set title = excluded.title, description = excluded.description, github_url = excluded.github_url, live_url = excluded.live_url, sort_order = excluded.sort_order;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  service text not null,
  message text,
  created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

alter table public.journey_content enable row level security;
alter table public.certificates enable row level security;
alter table public.work_items enable row level security;
alter table public.contact_submissions enable row level security;

create policy "Public can read journey" on public.journey_content for select using (true);
create policy "Admins can manage journey" on public.journey_content for all to authenticated using (true) with check (true);
create policy "Public can read certificates" on public.certificates for select using (is_published = true);
create policy "Admins can manage certificates" on public.certificates for all to authenticated using (true) with check (true);
create policy "Public can read work" on public.work_items for select using (is_published = true);
create policy "Admins can manage work" on public.work_items for all to authenticated using (true) with check (true);
create policy "Anyone can submit contact" on public.contact_submissions for insert with check (true);
create policy "Admins can read contact" on public.contact_submissions for select to authenticated using (true);

create policy "Public can view portfolio images" on storage.objects for select using (bucket_id = 'portfolio-images');
create policy "Admins can upload portfolio images" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio-images');
create policy "Admins can update portfolio images" on storage.objects for update to authenticated using (bucket_id = 'portfolio-images');
create policy "Admins can delete portfolio images" on storage.objects for delete to authenticated using (bucket_id = 'portfolio-images');
