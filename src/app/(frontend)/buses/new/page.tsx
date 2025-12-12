import { BusForm } from '@/components/fleet/buses'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Bus | Fleet Manager',
  description: 'Add a new bus to your fleet',
}

export default function NewBusPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <BusForm />
    </div>
  )
}
