# Docker Deployment Guide — rizqikevin.my.id

This guide explains how to run the portfolio in Docker.  
All external services (Supabase, Firebase, Gmail SMTP, GitHub, WakaTime, etc.) remain hosted — no local database containers are required.

---

## Prerequisites

- Docker >= 24 and Docker Compose >= 2
- A `.env` file in the project root (copy `.env.example` and fill in real values)

---

## Environment Variables

Copy the example file and fill in every value before building:

```bash
cp .env.example .env
```

### Critical: Build-time vs Runtime variables

`NEXT_PUBLIC_*` variables are **compiled into the JavaScript bundle** by Next.js at build time.  
They **cannot** be changed after the image is built without rebuilding.

| Variable | When needed |
|---|---|
| `NEXT_PUBLIC_*` | **Build time** (baked into the bundle) |
| `NODEMAILER_EMAIL`, `NODEMAILER_PW` | Runtime only |
| `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_ID/SECRET` | Runtime only |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | Runtime only |
| `GITHUB_READ_USER_TOKEN_PERSONAL` | Runtime only |
| `UMAMI_*`, `WAKATIME_API_KEY`, etc. | Runtime only |

`docker-compose.yml` automatically passes `NEXT_PUBLIC_*` vars from your `.env` file as Docker build arguments.

---

## Quick Start (Simple — port 3000 direct)

```bash
# 1. Build and start
docker compose up --build -d

# 2. Open in browser
open http://localhost:3000

# 3. View logs
docker compose logs -f app

# 4. Stop
docker compose down
```

---

## Production Setup (with Nginx reverse proxy)

Use `docker-compose.prod.yml` when you want Nginx to handle port 80 / 443:

```bash
# Build and start with production compose file
docker compose -f docker-compose.prod.yml up --build -d
```

The app is internal-only (`expose: 3000`); Nginx listens on port 80 and proxies to it.

### Enable HTTPS (Let's Encrypt / Certbot)

1. Obtain certificates:
   ```bash
   certbot certonly --standalone -d rizqikevin.my.id
   ```
2. Uncomment the volume mount in `docker-compose.prod.yml`:
   ```yaml
   - /etc/letsencrypt:/etc/letsencrypt:ro
   ```
3. Uncomment the HTTPS server block and HTTP→HTTPS redirect in `nginx.conf`.
4. Restart Nginx:
   ```bash
   docker compose -f docker-compose.prod.yml restart nginx
   ```

---

## Rebuild After Code Changes

Any source code change requires a full rebuild because Next.js compiles the application:

```bash
docker compose up --build -d
```

> If only `NEXT_PUBLIC_*` variables changed, a rebuild is also required.

---

## Common Commands

| Task | Command |
|---|---|
| Build only | `docker compose build` |
| Start (detached) | `docker compose up -d` |
| Start with build | `docker compose up --build -d` |
| View app logs | `docker compose logs -f app` |
| Stop containers | `docker compose down` |
| Stop + remove volumes | `docker compose down -v` |
| Shell into container | `docker compose exec app sh` |
| Check running containers | `docker compose ps` |

---

## Troubleshooting

### Build fails: `sharp` native bindings error
The `sharp` package requires native compilation. Ensure Docker is building for `linux/amd64` (default on x86 servers). On Apple Silicon (M-series), add a platform flag:
```bash
docker compose build --platform linux/amd64
```
Or add `platform: linux/amd64` under the `app` service in `docker-compose.yml`.

### `NEXT_PUBLIC_*` values are wrong in production
These are baked in at build time. If you updated `.env`, you must rebuild:
```bash
docker compose up --build -d
```

### NextAuth callback URLs mismatch
Ensure `NEXTAUTH_URL` in `.env` matches the public URL of your server (e.g. `https://rizqikevin.my.id`). OAuth providers (Google, GitHub) must have this URL whitelisted in their dashboards.

### Container starts but pages fail to load
Check that all required env vars are set:
```bash
docker compose exec app printenv | grep -E 'SUPABASE|NEXTAUTH|FIREBASE'
```

### Port 3000 already in use
Change the host port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"   # host:container
```

---

## Optional: Standalone Output (Smaller Image)

Adding `output: 'standalone'` to `next.config.mjs` reduces the runner image size significantly by eliminating the need to copy the full `node_modules`. This requires modifying the application config:

```js
// next.config.mjs
const nextConfig = {
  output: 'standalone',
  // ... rest of config
};
```

After enabling standalone output, update the `runner` stage `COPY` instructions to use the standalone output pattern from the [official Next.js Docker example](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile).

---

## Architecture

```
Browser
  │
  ▼
Nginx :80/:443        (docker-compose.prod.yml only)
  │  proxy_pass
  ▼
Next.js app :3000     (always)
  │
  ├── Supabase (hosted)     — DB, Storage, Realtime
  ├── Firebase (hosted)     — Firestore
  ├── Gmail SMTP            — Contact form emails
  └── External APIs         — GitHub, WakaTime, CodeWars, MonkeyType, Umami
```
