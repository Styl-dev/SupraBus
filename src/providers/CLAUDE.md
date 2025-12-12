# Providers Guidelines

React context providers for global state and configuration.

## Purpose

Wrap the application with context providers for theming, authentication, data fetching, and other cross-cutting concerns.

## Conventions

- File name: `{name}-provider.tsx` (kebab-case)
- Provider component name: `{Name}Provider` (PascalCase)
- Always add 'use client' directive
- Export provider and associated hook together

## Structure

```typescript
'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface ThemeContextValue {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

## Composing Providers

Create a root provider that composes all providers:

```typescript
// providers/index.tsx
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryProvider>
  )
}
```

## Best Practices

- Avoid deeply nested providers (compose in a single file)
- Memoize context values to prevent unnecessary re-renders
- Keep provider state minimal
- Use React Query for server state (not context)
- Split contexts by update frequency
