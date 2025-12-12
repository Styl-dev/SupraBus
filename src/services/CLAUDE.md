# Services Guidelines

API services and external integrations.

## Purpose

Encapsulate all external communication (REST APIs, third-party services, etc.) in a consistent interface.

## Directory Structure

```
services/
├── index.ts       # Barrel exports
├── api-client.ts  # Base API client configuration
├── auth.ts        # Authentication service
└── [feature].ts   # Feature-specific services
```

## Conventions

- File name: `{service-name}.ts` (kebab-case)
- Export object or class with methods
- Use TypeScript for request/response types
- Handle errors consistently

## Structure

```typescript
import type { User, ApiResponse } from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

export const userService = {
  getAll: () => fetchJson<ApiResponse<User[]>>('/users'),
  getById: (id: string) => fetchJson<User>(`/users/${id}`),
  create: (data: Omit<User, 'id'>) =>
    fetchJson<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}
```

## Best Practices

- Keep services stateless
- Use with React Query for caching and state management
- Centralize error handling and response transformation
- Add request/response interceptors in base client
- Type all inputs and outputs
- Don't include UI logic - services are data layer only
