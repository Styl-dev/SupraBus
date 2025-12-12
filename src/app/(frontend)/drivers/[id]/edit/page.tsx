'use client'

import { useParams } from 'next/navigation'

import { DriverForm } from '@/components/fleet/drivers'
import { LoadingPage } from '@/components/shared'
import { useDriver } from '@/hooks'

export default function EditDriverPage() {
  const params = useParams()
  const id = params.id as string
  const { data: driver, isLoading } = useDriver(id)

  if (isLoading) {
    return <LoadingPage message="Loading driver..." />
  }

  if (!driver) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Driver not found</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <DriverForm driver={driver} />
    </div>
  )
}
