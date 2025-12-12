import { RouteForm } from '@/components/fleet/routes'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Route | Fleet Manager',
  description: 'Add a new route to your fleet',
}

export default function NewRoutePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <RouteForm />
    </div>
  )
}
