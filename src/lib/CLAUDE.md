# Lib Guidelines

Utility functions and shared helpers.

## Purpose

Pure utility functions that don't depend on React or application state. These are general-purpose helpers used throughout the codebase.

## Directory Structure

```
lib/
├── index.ts       # Barrel exports
├── utils.ts       # General utilities (cn, etc.)
├── format.ts      # Formatting helpers (dates, currency)
├── validation.ts  # Validation helpers
└── [domain].ts    # Domain-specific utilities
```

## Conventions

- File name: `{domain}.ts` (kebab-case)
- Function name: `camelCase`
- Pure functions (no side effects)
- Export from `index.ts` barrel file

## Structure

```typescript
// utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// format.ts
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}

// validation.ts
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
```

## Best Practices

- Keep functions pure (same input = same output)
- Add TypeScript overloads for flexible APIs
- Write unit tests for utility functions
- Don't import React or application code
- Keep functions small and focused
- Use JSDoc for complex function signatures
