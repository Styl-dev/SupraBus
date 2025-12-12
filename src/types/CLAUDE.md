# Types Guidelines

Shared TypeScript type definitions.

## Directory Structure

```
types/
├── index.ts      # Barrel exports
├── api.ts        # API response/request types
├── models.ts     # Domain model types
└── [feature].ts  # Feature-specific types
```

## Conventions

- File name: `{domain}.ts` (kebab-case)
- Type/Interface name: `{TypeName}` (PascalCase)
- Prefer `interface` for object shapes (extendable)
- Prefer `type` for unions, primitives, and computed types
- Export all types from `index.ts`

## Structure

```typescript
// API response types
export interface ApiResponse<T> {
  data: T
  meta: {
    total: number
    page: number
  }
}

// Domain models
export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}

// Utility types
export type Nullable<T> = T | null
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
```

## Best Practices

- Don't use `any` - use `unknown` if type is truly unknown
- Use branded types for IDs (`type UserId = string & { __brand: 'UserId' }`)
- Keep types close to usage when not shared
- Use Payload's generated types for CMS data
- Derive types from schemas when possible (Zod inference)
- Prefix internal/private types with underscore
