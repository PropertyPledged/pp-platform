# Property Pledge (pp.platform)

## Overview
Property Pledge is a platform that connects tenants, lease-holders, landlords, and property managers with reliable, verified property reviews. It aims to bring transparency and accountability to the rental market.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Authentication | Clerk 6 |
| Database | PostgreSQL via Prisma 6 |
| CMS | Sanity 3 |
| API | tRPC 11 |
| Email | Resend + React Email |
| UI Components | Radix UI + shadcn/ui |
| Animations | Framer Motion 12 |
| Forms | React Hook Form + Zod |
| State/Data | TanStack React Query 5 |
| Analytics | Vercel Analytics + Speed Insights |
| Feature Flags | Vercel Flags |
| Package Manager | pnpm 10 |

## Project Structure

```
src/
├── app/
│   ├── (auth)/                    # Authentication pages
│   │   ├── signin/[[...signin]]/  # Custom Clerk sign-in
│   │   └── signup/[[...signup]]/  # Custom Clerk sign-up
│   ├── (marketing)/               # Public-facing pages
│   │   ├── (home)/                # Homepage
│   │   ├── about-us/
│   │   ├── blog/                  # Blog listing + [slug] detail
│   │   ├── community/
│   │   └── unsubscribe/           # Email unsubscribe
│   ├── (platform)/                # Authenticated area
│   │   ├── dashboard/
│   │   ├── account/
│   │   └── onboarding/            # Multi-step onboarding flow
│   ├── (feedback)/                # Feedback collection
│   │   └── suggestion/            # Suggestion form + confirmation
│   ├── (testing)/                 # Dev-only utilities
│   │   └── emails/                # Email template preview
│   ├── api/
│   │   ├── trpc/[trpc]/           # tRPC HTTP endpoint
│   │   └── draft-mode/enable/     # Sanity draft mode
│   └── studio/[[...tool]]/        # Sanity Studio
├── components/
│   ├── atoms/                     # Base primitives (Heading, Text, Logo)
│   ├── molecules/                 # Composed UI (FormField, Post, Navlinks)
│   ├── organisms/                 # Complex components (Navbar, Footer, Sidebar)
│   ├── templates/                 # Page-level layouts (HeroSection, WelcomeEmail)
│   ├── ui/                        # shadcn/Radix UI components
│   ├── auth/                      # Custom Clerk sign-in/sign-up forms
│   ├── sanity/                    # Sanity rendering (ContentReader, BlockImage)
│   └── onboarding/steps/          # Onboarding step components
├── server/
│   ├── api/
│   │   ├── routers/
│   │   │   ├── suggestion.ts      # Suggestion CRUD + email via Resend
│   │   │   └── subscription.ts    # Newsletter subscription via Resend
│   │   ├── root.ts                # tRPC root router
│   │   └── trpc.ts                # tRPC context (db, resend, headers)
│   └── actions.ts                 # Next.js Server Actions
├── sanity/
│   ├── schemaTypes/               # post, author, category, page, suggestion, siteSettings
│   ├── lib/                       # client, adminClient, live preview, image builder
│   └── utils/                     # GROQ queries, fetch helpers
├── hooks/                         # useDisclosure, useCopy, useScrollDirection, useElementWidth
├── lib/                           # utils, resend client, flags, getBreadcrumbs
└── trpc/                          # TanStack Query + tRPC React provider
```

## Key Features
- **Blog**: CMS-driven blog with Sanity (posts, authors, categories, portable text).
- **Suggestions**: Users submit ideas stored in Sanity; email notifications via Resend.
- **Newsletter**: Subscription flow with Resend audience management and welcome email.
- **Onboarding**: Multi-step onboarding flow for new users (personal details + property info).
- **Sanity Studio**: Embedded at `/studio` for content management.
- **Draft Mode**: Sanity live preview via `/api/draft-mode/enable`.

## Authentication
Clerk handles all auth. Custom sign-in/sign-up forms wrap the Clerk SDK. Supported methods:
- Email + password
- Google, Facebook, Apple OAuth

## Database
Prisma + PostgreSQL. Current schema has a single `Post` model (starter scaffold). Data that matters (suggestions, blog) lives in Sanity.

## Sanity Schema Types

| Type | Purpose |
|---|---|
| `post` | Blog posts (title, slug, author, mainImage, body, featured) |
| `author` | Blog authors |
| `category` | Blog post categories |
| `page` | Generic CMS-managed pages |
| `suggestion` | User-submitted feedback/ideas |
| `siteSettings` | Global site config (title, description, nav) |
| `response` | Individual response within a suggestion |
| `blockContent` | Portable text (H1–H4, bold, italic, links, images) |

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `CLERK_SECRET_KEY` | Yes | Clerk server-side auth |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk client-side auth |
| `RESEND_API_KEY` | Yes | Transactional email via Resend |
| `RESEND_AUDIENCE_ID` | No | Newsletter audience in Resend |
| `SANITY_VIEWER_TOKEN` | Yes | Sanity content read access |
| `NODE_ENV` | No | Defaults to `development` |
