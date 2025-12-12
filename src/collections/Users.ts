import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
