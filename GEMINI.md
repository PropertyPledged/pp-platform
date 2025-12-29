# Property Pledge (pp.platform)

## Overview
Property Pledge is a platform that connects tenants, lease-holders, landlords, and property managers with reliable, verified property reviews. It aims to bring transparency and accountability to the rental market.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma)
- **CMS**: Sanity
- **Styling**: Tailwind CSS
- **Authentication**: Clerk (inferred from dependencies)
- **API**: tRPC

## Key Features
- **Verified Reviews**: Tenants and landlords can leave and read verified reviews.
- **Communication**: Facilitates responsive communication between landlords and tenants.
- **Blog**: Expert advice on real estate trends and tips.
- **Suggestions**: Users can submit ideas to improve the platform.

## Project Structure
- `src/app`: Next.js App Router pages and layouts.
  - `(marketing)`: Public-facing marketing pages (Home, About, Blog).
  - `(platform)`: Authenticated user area (Dashboard).
  - `(auth)`: Authentication related pages.
- `src/sanity`: Sanity CMS configuration and schemas.
- `src/components`: Reusable UI components.
- `prisma`: Database schema and migrations.
