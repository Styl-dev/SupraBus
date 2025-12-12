import type { CollectionConfig } from 'payload'

export const ROUTE_STATUSES = [
  { label: 'Active', value: 'active' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Discontinued', value: 'discontinued' },
] as const

export const DAYS_OF_WEEK = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
] as const

export const Routes: CollectionConfig = {
  slug: 'routes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'routeNumber', 'status', 'assignedBuses'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'routeNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique route identifier (e.g., R101)',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Route name (e.g., Downtown Express)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: [...ROUTE_STATUSES],
      defaultValue: 'active',
      required: true,
    },
    {
      name: 'stops',
      type: 'array',
      minRows: 2,
      fields: [
        {
          name: 'stopName',
          type: 'text',
          required: true,
        },
        {
          name: 'stopOrder',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'estimatedArrival',
          type: 'text',
          admin: {
            description: 'Minutes from start (e.g., 15)',
          },
        },
        {
          name: 'latitude',
          type: 'number',
        },
        {
          name: 'longitude',
          type: 'number',
        },
      ],
    },
    {
      name: 'schedule',
      type: 'group',
      fields: [
        {
          name: 'operatingDays',
          type: 'select',
          hasMany: true,
          options: [...DAYS_OF_WEEK],
        },
        {
          name: 'firstDeparture',
          type: 'text',
          admin: {
            description: 'First bus departure time (HH:MM)',
          },
        },
        {
          name: 'lastDeparture',
          type: 'text',
          admin: {
            description: 'Last bus departure time (HH:MM)',
          },
        },
        {
          name: 'frequency',
          type: 'number',
          admin: {
            description: 'Minutes between departures',
          },
        },
      ],
    },
    {
      name: 'estimatedDuration',
      type: 'number',
      admin: {
        description: 'Total route duration in minutes',
      },
    },
    {
      name: 'distanceKm',
      type: 'number',
      admin: {
        description: 'Total route distance in kilometers',
      },
    },
    {
      name: 'assignedBuses',
      type: 'relationship',
      relationTo: 'buses',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
