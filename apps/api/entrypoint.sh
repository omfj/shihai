#!/bin/sh
pnpm --filter=api db:migrate:docker
exec node ./apps/api/dist/main.js
