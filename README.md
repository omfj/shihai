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

## Description of the tech stack

### Frontend

Uses Svelte and SvelteKit for the frontend. This allows for a fast and responsive user interface that with easy onboarding as Svelte has a relatively low learning curve. SvelteKit also allows for server-side rendering making the site more SEO friendly and faster on initial load. We use Node.js for the server runtime, making it easy to deploy.

TailwindCSS is used for styling. It provides a utility-first approach to styling so that we don't have to manage our own CSS files, which can lead to a bloated CSS file.

### Backend

A Node.js server using Hono as the web framework. Hono is a lightweight web framework that is inspired by Express.js style of routing. It is also runtime agnostic, meaning that we are not tied to using Node.js as the runtime, and could potentially switch to something like Deno or Cloudflare Workers.

### Storage

PostgreSQL as the primary database and Redis for caching, analytics and session management.

### CI/CD

Uses GitHub Actions for CI/CD. This will run our tests and build our Docker images on every push to the main brach. Ensuring that we have a consistent and reliable deployment process. We could also trigger a deployment to the production environment on every push to the main branch.
