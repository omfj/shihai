# SHIHAI - The world's most advanced polling system

## Introduction

Shihai, the chinese word for control or dominion, inspired by Dominion Voting Systems, is a polling system that allows users to create and participate in polls. It is made with SvelteKit and Hono, and uses PostgreSQL and Redis for data storage and caching.

## How to run

### Prerequisites

- Node.js v20.x.x
- pnpm v8.7.0
- Docker v27.x.x

### Development environment

1. Clone the repository

2. Install dependencies

   ```sh
    pnpm install
   ```

3. Start the postgres database and redis server

   ```sh
   docker-compose up -d db redis
   ```

4. Run the development server

   ```sh
   pnpm dev
   ```

5. Access the application at [http://localhost:5173](http://localhost:5173)

### Production environment

1. Clone the repository or just copy `docker-compose.prod.yaml`.

2. Update the `environment` variables in the `docker-compose.prod.yaml` to use the appropriate values. I.e update secrets, api urls, etc.

3. Start Docker containers

   ```sh
   docker-compose up -d
   ```

4. Database migrations will be run automatically when the environment is set to production.

5. Access the application at [http://localhost:3000](http://localhost:3000)

6. Update your `Caddyfile` to use the config as in the file [Caddyfile](./etc/Caddyfile)

