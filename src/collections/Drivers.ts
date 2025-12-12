import type { CollectionConfig } from 'payload'

export const LICENSE_TYPES = [
  { label: 'Class A - Commercial', value: 'class-a' },
  { label: 'Class B - Heavy Vehicle', value: 'class-b' },
  { label: 'Class C - Standard', value: 'class-c' },
] as const

export const DRIVER_STATUSES = [
  { label: 'Available', value: 'available' },
  { label: 'On Duty', value: 'on-duty' },
  { label: 'Off Duty', value: 'off-duty' },
  { label: 'On Leave', value: 'on-leave' },
  { label: 'Inactive', value: 'inactive' },
] as const

export const Drivers: CollectionConfig = {
  slug: 'drivers',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'licenseNumber', 'status', 'phone'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            return `${siblingData.firstName || ''} ${siblingData.lastName || ''}`.trim()
          },
        ],
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'licenseNumber',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'licenseType',
      type: 'select',
      options: [...LICENSE_TYPES],
      required: true,
    },
    {
      name: 'licenseExpiry',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [...DRIVER_STATUSES],
      defaultValue: 'available',
      required: true,
    },
    {
      name: 'hireDate',
      type: 'date',
      required: true,
    },
    {
      name: 'assignedBus',
      type: 'relationship',
      relationTo: 'buses',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'emergencyContact',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'relationship',
          type: 'text',
        },
      ],
    },
  ],
}
