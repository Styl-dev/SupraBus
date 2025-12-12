# Components Guidelines

Shared React components used across the application.

## Directory Structure

```
components/
├── ui/           # UI primitives (shadcn/ui, buttons, inputs)
├── forms/        # Form-specific components
├── layout/       # Layout components (header, footer, sidebar)
└── [feature]/    # Feature-specific shared components
```

## Conventions

- File name: `{component-name}.tsx` (kebab-case)
- Component name: `{ComponentName}` (PascalCase)
- One component per file (with sub-components if tightly coupled)
- Export from `index.ts` barrel file
- Default to Server Components, add 'use client' only when needed

## Structure

```typescript
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

interface CardProps extends ComponentProps<'div'> {
  title: string
  variant?: 'default' | 'outlined'
}

export function Card({ title, variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div className={cn('rounded-lg p-4', className)} {...props}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

## Best Practices

- Extend native HTML element props when wrapping elements
- Use `cn()` utility for conditional class merging
- Forward refs when wrapping native elements
- Keep components small and composable
- Colocate component-specific styles and types
- Use composition over prop drilling
