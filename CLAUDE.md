# Project Guidelines

Bus Fleet Management System built with Next.js 15, Payload CMS 3, React Query, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3
- **Database**: MongoDB
- **Styling**: Tailwind CSS + shadcn/ui
- **Data Fetching**: React Query (TanStack Query)
- **Charts**: Recharts (via shadcn/ui chart component)
- **Forms**: React Hook Form + Zod
- **Language**: TypeScript (strict mode)

## Project Structure

```
src/
├── app/
│   ├── (frontend)/        # All frontend routes
│   │   ├── (main)/        # Main app with sidebar/nav layout
│   │   │   ├── dashboard/ # Dashboard with charts
│   │   │   ├── buses/     # Buses CRUD
│   │   │   ├── drivers/   # Drivers CRUD
│   │   │   ├── routes/    # Routes CRUD
│   │   │   └── account/   # Account settings
│   │   └── auth/          # Authentication pages (centered layout)
│   │       ├── signin/
│   │       └── signup/
│   └── (payload)/         # Payload CMS admin & API
├── collections/           # Payload CMS collections
│   ├── Buses.ts
│   ├── Drivers.ts
│   ├── Routes.ts
│   ├── Users.ts
│   └── Media.ts
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── fleet/             # Fleet-specific components
│   │   ├── buses/
│   │   ├── drivers/
│   │   ├── routes/
│   │   └── dashboard/
│   ├── layout/            # Layout components
│   ├── shared/            # Shared components
│   └── auth/              # Auth components
├── constants/             # App constants (status options, routes)
├── hooks/                 # React Query hooks
├── lib/                   # Utility functions
├── providers/             # React context providers
├── services/              # API services
└── types/                 # TypeScript types
```

## Data Model

- **Buses**: plateNumber, model, manufacturer, year, capacity, status, mileage
- **Drivers**: firstName, lastName, email, phone, licenseNumber, licenseType, status
- **Routes**: routeNumber, name, stops[], schedule, estimatedDuration, distanceKm

## Code Style

- Use named exports over default exports
- Use barrel files (index.ts) for clean imports
- Prefer `@/` path alias for imports
- Use TypeScript strict mode - no `any` types
- Follow React Server Components patterns (default to server, add 'use client' only when needed)

## Naming Conventions

- **Files**: kebab-case (`use-debounce.ts`, `user-card.tsx`)
- **Components**: PascalCase (`UserCard`)
- **Hooks**: camelCase with `use` prefix (`useDebounce`)
- **Types/Interfaces**: PascalCase (`UserProfile`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)

## Import Order

1. React/Next.js imports
2. Third-party libraries
3. Internal aliases (@/)
4. Relative imports
5. Types (with `type` keyword)

## Build Notes

- Production builds use `--webpack` flag (Payload CMS doesn't support Turbopack production builds yet)
- Run `pnpm build` to build for production
- Run `pnpm dev` for development (uses Turbopack)
