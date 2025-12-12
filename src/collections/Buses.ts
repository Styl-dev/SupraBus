import type { CollectionConfig } from 'payload'

export const BUS_STATUSES = [
  { label: 'Active', value: 'active' },
  { label: 'In Maintenance', value: 'maintenance' },
  { label: 'Out of Service', value: 'out-of-service' },
  { label: 'Retired', value: 'retired' },
] as const

export const Buses: CollectionConfig = {
  slug: 'buses',
  admin: {
    useAsTitle: 'plateNumber',
    defaultColumns: ['plateNumber', 'model', 'status', 'capacity'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'plateNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Vehicle license plate number',
      },
    },
    {
      name: 'model',
      type: 'text',
      required: true,
    },
    {
      name: 'manufacturer',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 1990,
      max: 2030,
    },
    {
      name: 'capacity',
      type: 'number',
      required: true,
      min: 1,
      admin: {
        description: 'Passenger capacity',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [...BUS_STATUSES],
      defaultValue: 'active',
      required: true,
    },
    {
      name: 'currentDriver',
      type: 'relationship',
      relationTo: 'drivers',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'mileage',
      type: 'number',
      min: 0,
      admin: {
        description: 'Current odometer reading in km',
      },
    },
    {
      name: 'lastMaintenanceDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'nextMaintenanceDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
