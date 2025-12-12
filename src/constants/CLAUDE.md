# Constants Guidelines

Application-wide constant values.

## Purpose

Centralize magic strings, numbers, and configuration values that don't change at runtime.

## Directory Structure

```
constants/
├── index.ts       # Barrel exports
├── routes.ts      # Route paths
├── config.ts      # App configuration
└── [domain].ts    # Domain-specific constants
```

## Conventions

- File name: `{domain}.ts` (kebab-case)
- Constant name: `SCREAMING_SNAKE_CASE`
- Use `as const` for literal types
- Group related constants in objects

## Structure

```typescript
// routes.ts
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
} as const

// config.ts
export const APP_CONFIG = {
  NAME: 'My App',
  DESCRIPTION: 'App description',
  DEFAULT_LOCALE: 'en',
} as const

// api.ts
export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
} as const

// pagination.ts
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const
```

## Best Practices

- Use `as const` for type inference from literal values
- Group related constants in objects for namespacing
- Don't store sensitive values - use environment variables
- Keep constants immutable (never reassign)
- Export individual constants for tree-shaking when needed
