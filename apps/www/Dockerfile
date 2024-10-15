FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm add -g turbo
RUN pnpm add -g serve

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY . .
RUN turbo prune @shihai/www --docker

FROM base AS installer

WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

RUN turbo build --filter=@shihai/www...

RUN pnpm --filter=api db:migrate

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 www
USER www

COPY --from=installer --chown=www:nodejs /app/apps/www/dist ./dist

EXPOSE 3000/tcp
CMD serve -s ./dist -l 3000
