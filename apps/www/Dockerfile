FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm add -g turbo

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

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 www
USER www

COPY --from=installer --chown=nodejs:www /app/package.json ./package.json
COPY --from=installer --chown=nodejs:www /app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:www /app/apps/www/package.json ./apps/www/package.json
COPY --from=installer --chown=nodejs:www /app/apps/www/node_modules ./apps/www/node_modules
COPY --from=installer --chown=nodejs:www /app/apps/www/build ./apps/www/build

EXPOSE 8000/tcp
CMD node ./apps/www/build
