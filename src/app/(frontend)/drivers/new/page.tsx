import { DriverForm } from '@/components/fleet/drivers'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Driver | Fleet Manager',
  description: 'Add a new driver to your fleet',
}

export default function NewDriverPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <DriverForm />
    </div>
  )
}
