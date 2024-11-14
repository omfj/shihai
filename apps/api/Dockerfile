FROM node:20-alpine AS base

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm add -g turbo

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY . .
RUN turbo prune @shihai/api --docker

FROM base AS installer

WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

RUN turbo build --filter=@shihai/api...

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api
USER api

COPY --from=installer --chown=nodejs:api /app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:api /app/package.json ./package.json
COPY --from=installer --chown=nodejs:api /app/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --from=installer --chown=nodejs:api /app/apps/api/package.json ./apps/api/package.json
COPY --from=installer --chown=nodejs:api /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=installer --chown=nodejs:api /app/apps/api/migrations ./apps/api/migrations

COPY --from=installer --chown=nodejs:api /app/apps/api/dist ./apps/api/dist

EXPOSE 8000
CMD node ./apps/api/dist/main.js
