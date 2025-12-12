'use client'

import { useParams } from 'next/navigation'

import { BusForm } from '@/components/fleet/buses'
import { LoadingPage } from '@/components/shared'
import { useBus } from '@/hooks'

export default function EditBusPage() {
  const params = useParams()
  const id = params.id as string
  const { data: bus, isLoading } = useBus(id)

  if (isLoading) {
    return <LoadingPage message="Loading bus..." />
  }

  if (!bus) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Bus not found</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <BusForm bus={bus} />
    </div>
  )
}
