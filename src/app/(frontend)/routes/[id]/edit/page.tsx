'use client'

import { useParams } from 'next/navigation'

import { RouteForm } from '@/components/fleet/routes'
import { LoadingPage } from '@/components/shared'
import { useRoute } from '@/hooks'

export default function EditRoutePage() {
  const params = useParams()
  const id = params.id as string
  const { data: route, isLoading } = useRoute(id)

  if (isLoading) {
    return <LoadingPage message="Loading route..." />
  }

  if (!route) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Route not found</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <RouteForm route={route} />
    </div>
  )
}
