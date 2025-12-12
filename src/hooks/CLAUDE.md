# Hooks Guidelines

Custom React hooks for reusable stateful logic.

## When to Create a Hook

- Reusable stateful logic across multiple components
- Complex state management that clutters components
- Abstracting browser APIs or subscriptions
- Wrapping third-party library functionality

## Conventions

- File name: `use-{name}.ts` (kebab-case)
- Hook name: `use{Name}` (camelCase with `use` prefix)
- Export from `index.ts` barrel file
- Always add 'use client' directive (hooks require client-side React)

## Structure

```typescript
'use client'

import { useState, useEffect } from 'react'

export function useExample(param: string) {
  const [state, setState] = useState<string>('')

  useEffect(() => {
    // Effect logic
  }, [param])

  return { state, setState }
}
```

## Best Practices

- Return objects for multiple values (easier to extend)
- Keep hooks focused on a single responsibility
- Handle cleanup in useEffect return functions
- Use TypeScript generics for flexible hooks
- Document parameters and return values with JSDoc when complex
- Avoid side effects outside useEffect
