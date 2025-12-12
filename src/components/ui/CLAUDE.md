# UI Components Guidelines

Primitive UI components based on shadcn/ui patterns.

## Purpose

Low-level, reusable UI primitives that form the design system foundation. These are typically installed via shadcn/ui CLI or manually created following the same patterns.

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

## Conventions

- File name: `{component}.tsx` (kebab-case, singular)
- Follows shadcn/ui patterns (Radix UI primitives + Tailwind)
- Always client components ('use client')
- Use `cva` for variant styling
- Use `cn()` for class merging

## Structure (shadcn/ui pattern)

```typescript
'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
```

## Best Practices

- Keep UI components unstyled/minimally styled (theming via CSS variables)
- Forward all native props and refs
- Compose from Radix UI primitives for accessibility
- Don't add business logic - keep purely presentational
