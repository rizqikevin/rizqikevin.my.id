# syntax=docker/dockerfile:1

# ─── Stage 1: Install dependencies ───────────────────────────────────────────
FROM node:22-alpine AS deps

# libc6-compat is required for sharp (native bindings) and other native modules
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy only manifests first so Docker cache is reused when source changes
COPY package.json package-lock.json ./

# @supabase/supabase-js is a peer dep of @supabase/ssr but absent from package.json.
# --legacy-peer-deps suppresses auto-install of peer deps, so we add it explicitly.
RUN npm install --legacy-peer-deps && \
    npm install --legacy-peer-deps @supabase/supabase-js@"^2.43.4"


# ─── Stage 2: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# ── NEXT_PUBLIC_* vars are baked into the JS bundle at build time.
#    They must be declared as ARGs (supplied via --build-arg or docker-compose args).
ARG DOMAIN
ARG NEXT_PUBLIC_AUTHOR_EMAIL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
ARG NEXT_PUBLIC_FIREBASE_DB_URL

ENV DOMAIN=$DOMAIN
ENV NEXT_PUBLIC_AUTHOR_EMAIL=$NEXT_PUBLIC_AUTHOR_EMAIL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
ENV NEXT_PUBLIC_FIREBASE_DB_URL=$NEXT_PUBLIC_FIREBASE_DB_URL

ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production

RUN npm run build


# ─── Stage 3: Production runner ───────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3218

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Static assets
COPY --from=builder /app/public ./public

# Built Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Runtime filesystem reads: MDX project content + i18n translation files
COPY --from=builder --chown=nextjs:nodejs /app/contents ./contents
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages

# Production node_modules (from deps stage to keep layers clean)
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# package.json is required by next start
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3218

CMD ["npm", "run", "start"]
