# Collections Guidelines

Payload CMS collection schemas.

## Purpose

Define the data models and admin UI configuration for Payload CMS.

## Conventions

- File name: `{CollectionName}.ts` (PascalCase, singular)
- Collection slug: `kebab-case` (plural for content, singular for singletons)
- Export the collection config as default or named export

## Structure

```typescript
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
    },
  ],
}
```

## Best Practices

- Use TypeScript for type-safe field definitions
- Define access control for all CRUD operations
- Use hooks for side effects (beforeChange, afterChange)
- Group related fields with row/collapsible layouts
- Add validation at the field level
- Use relationships for connected data
- Keep collections focused (single responsibility)
- Use globals for singleton data (site settings)

## Payload Types

Import generated types from Payload for type safety:

```typescript
import type { Post, User } from '@/payload-types'
```
