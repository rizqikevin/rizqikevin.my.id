-- Seed data for the Supabase resources used by this project.
-- Run this after the schema setup SQL.
--
-- Notes:
-- 1. The app resolves project and achievement images from Supabase Storage,
--    not from the table rows. Upload these files after running this seed:
--    - bucket "projects":
--      portfolio-website.webp
--      chat-realtime-app.webp
--      analytics-dashboard.webp
--    - bucket "achievements":
--      dicoding-back-end.webp
--      google-data-analytics.webp
--      aws-cloud-practitioner.webp
--      hackathon-best-ui.webp

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
    'Portfolio Website',
    'portfolio-website',
    'Personal portfolio website with multilingual pages, blog-style content, achievements, and interactive UI sections.',
    'https://rizqikevin.my.id',
    'https://github.com/example/portfolio-website',
    array['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Supabase'],
    true,
    true
  ),
  (
    'Realtime Chat App',
    'chat-realtime-app',
    'Realtime discussion room with authentication, reply threads, notifications, and live updates using Supabase.',
    'https://chat-demo.example.com',
    'https://github.com/example/realtime-chat-app',
    array['Next.js', 'TypeScript', 'NextAuth.js', 'Supabase', 'TailwindCSS'],
    true,
    true
  ),
  (
    'Analytics Dashboard',
    'analytics-dashboard',
    'Dashboard for tracking product metrics, campaign performance, and usage trends with responsive data visualizations.',
    'https://dashboard-demo.example.com',
    'https://github.com/example/analytics-dashboard',
    array['React.js', 'TypeScript', 'Axios', 'TailwindCSS', 'PostgreSql'],
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
    'DCD-BE-2024-001',
    'dicoding-back-end',
    'Belajar Back-End Pemula dengan JavaScript',
    'Dicoding Indonesia',
    'Course',
    'Backend',
    'https://www.dicoding.com/certificates/EXAMPLE-BACKEND',
    '2024-03-15',
    null,
    true
  ),
  (
    'GDA-2024-114',
    'google-data-analytics',
    'Google Data Analytics Professional Certificate',
    'Google',
    'Certification',
    'Data',
    'https://www.coursera.org/account/accomplishments/professional-cert/EXAMPLE',
    '2024-05-22',
    null,
    true
  ),
  (
    'AWS-CCP-2024-778',
    'aws-cloud-practitioner',
    'AWS Certified Cloud Practitioner',
    'Amazon Web Services',
    'Certification',
    'Cloud',
    'https://www.credly.com/badges/example',
    '2024-08-09',
    '2027-08-09',
    true
  ),
  (
    'HACK-UI-2023-021',
    'hackathon-best-ui',
    'Best UI/UX Hackathon Project',
    'Campus Tech Expo',
    'Award',
    'Frontend',
    null,
    '2023-11-04',
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
