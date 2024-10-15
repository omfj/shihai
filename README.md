# SHIHAI - Worlds most advanced polling system

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

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
   docker-compose up -d db kv
   ```

4. Run the development server

   ```sh
   pnpm dev
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000)

### Production environment

1. Clone the repository

2. Start Docker containers

   ```sh
   docker-compose up -d
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000)

## Description of the tech stack

### Frontend

Uses a single page application (SPA) with Solid.js as the UI-framework. Vite as the build tool. Tailwindcss for the styling.

### Backend

A Node.js server using Hono as the web framework. PostgreSQL as the primary database and Redis for caching, analytics and session management.

### CI/CD

Uses GitHub Actions for CI/CD.
