-- Seed data for the Supabase resources used by this project.
-- Run this after the schema setup SQL.
--
-- Notes:
-- 1. The app resolves project and achievement images from Supabase Storage,
--    not from the table rows. Upload these files after running this seed:
--    - bucket "projects":
--      dashboard-monitoring-sistem.webp
--      electronic-research-iot-development.webp
--      iot-agricultural-system.webp
--      suxesstories-platform-enhancement.webp
--    - bucket "achievements":
--      rapid-application-backend-bootcamp.webp
--      project-case-suxesstories.webp
--      impact-national-hackathon-2024.webp
--      studi-independen-bersertifikat-7.webp

insert into public.projects (
  title,
  slug,
  description,
  link_demo,
  link_github,
  stacks,
  is_show,
  is_featured
)
values
  (
    'Dashboard Monitoring Sistem',
    'dashboard-monitoring-sistem',
    'Web-based monitoring dashboard built for operational visibility using React.js or Vue.js with reusable UI components and REST API integration.',
    null,
    null,
    array['React.js', 'Vue.js', 'JavaScript', 'Axios', 'TailwindCSS'],
    true,
    true
  ),
  (
    'Electronic Research & IoT Development',
    'electronic-research-iot-development',
    'A collection of electronic and IoT development work involving microcontroller systems, automated coffee vending machines, troubleshooting, and real-time backend integration.',
    null,
    null,
    array['Python', 'C++', 'MySql', 'Flask', 'Linux'],
    true,
    true
  ),
  (
    'Sistem Pertanian Berbasis IoT',
    'iot-agricultural-system',
    'Award-winning IoT agriculture solution featuring automated pest detection and smart irrigation with real-time data integration.',
    null,
    null,
    array['C++', 'Firebase', 'MySql', 'JavaScript', 'HTML'],
    true,
    true
  ),
  (
    'SuXesstories Platform Enhancement',
    'suxesstories-platform-enhancement',
    'Enhancement work for the SuXesstories platform focused on QR-based self-registration, onboarding simplification, and event-oriented frontend/backend integration.',
    null,
    null,
    array['Vue.js', 'Firebase', 'Express.js', 'JavaScript', 'Bootstrap'],
    true,
    false
  )
on conflict (slug) do update
set
  title = excluded.title,
  description = excluded.description,
  link_demo = excluded.link_demo,
  link_github = excluded.link_github,
  stacks = excluded.stacks,
  is_show = excluded.is_show,
  is_featured = excluded.is_featured;

insert into public.achievements (
  credential_id,
  slug,
  name,
  issuing_organization,
  type,
  category,
  url_credential,
  issue_date,
  expiration_date,
  is_show
)
values
  (
    'MAXY-RAB-2024',
    'rapid-application-backend-bootcamp',
    'Rapid Application Backend Bootcamp',
    'Maxy Academy',
    'Bootcamp',
    'Backend',
    null,
    '2024-12-01',
    null,
    true
  ),
  (
    'MAXY-SUX-2024',
    'project-case-suxesstories',
    'Project Case [Virtual Internship] at SuXesstories',
    'Maxy Academy',
    'Certification',
    'Career',
    null,
    '2024-12-01',
    null,
    true
  ),
  (
    'MAXY-HACK-2024',
    'impact-national-hackathon-2024',
    'Impact National Hackathon 2024',
    'Maxy Academy',
    'Award',
    'IoT',
    null,
    '2024-12-01',
    null,
    true
  ),
  (
    'KM-SIB-7-2024',
    'studi-independen-bersertifikat-7',
    'Studi Independen Bersertifikat Angkatan 7',
    'Kampus Merdeka',
    'Certification',
    'General',
    null,
    '2024-12-01',
    null,
    true
  )
on conflict (slug) do update
set
  credential_id = excluded.credential_id,
  name = excluded.name,
  issuing_organization = excluded.issuing_organization,
  type = excluded.type,
  category = excluded.category,
  url_credential = excluded.url_credential,
  issue_date = excluded.issue_date,
  expiration_date = excluded.expiration_date,
  is_show = excluded.is_show;

insert into public.messages (
  id,
  name,
  email,
  image,
  message,
  is_reply,
  reply_to,
  is_show,
  created_at
)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'Rizki Kevin',
    'kevin@example.com',
    'https://i.pravatar.cc/150?img=12',
    'Halo, selamat datang di chat room portfolio saya.',
    false,
    null,
    true,
    now() - interval '3 days'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Aulia Putra',
    'aulia@example.com',
    'https://i.pravatar.cc/150?img=15',
    'Keren. Stack yang dipakai untuk website ini apa saja?',
    false,
    null,
    true,
    now() - interval '2 days'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Rizki Kevin',
    'kevin@example.com',
    'https://i.pravatar.cc/150?img=12',
    'Mayoritas dibangun dengan Next.js, TypeScript, TailwindCSS, dan Supabase.',
    true,
    'Aulia Putra',
    true,
    now() - interval '2 days' + interval '10 minutes'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Nadia Salsabila',
    'nadia@example.com',
    'https://i.pravatar.cc/150?img=32',
    'Apakah project realtime chat ini bisa dipakai untuk customer support?',
    false,
    null,
    true,
    now() - interval '1 day'
  )
on conflict (id) do update
set
  name = excluded.name,
  email = excluded.email,
  image = excluded.image,
  message = excluded.message,
  is_reply = excluded.is_reply,
  reply_to = excluded.reply_to,
  is_show = excluded.is_show,
  created_at = excluded.created_at;
