'use client'

import Link from 'next/link'
import { Plus, Map } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout'
import { RouteTable } from '@/components/fleet/routes'
import { EmptyState, LoadingPage } from '@/components/shared'
import { useRoutes } from '@/hooks'
import { FLEET_ROUTES } from '@/constants'

export default function RoutesPage() {
  const { data, isLoading } = useRoutes()

  if (isLoading) {
    return <LoadingPage message="Loading routes..." />
  }

  const routes = data?.docs || []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Routes"
        description="Manage your bus routes"
        actions={
          <Button asChild>
            <Link href={FLEET_ROUTES.ROUTE_NEW}>
              <Plus className="mr-2 h-4 w-4" />
              Add Route
            </Link>
          </Button>
        }
      />

      {routes.length === 0 ? (
        <EmptyState
          icon={Map}
          title="No routes found"
          description="Get started by adding your first route."
          action={
            <Button asChild>
              <Link href={FLEET_ROUTES.ROUTE_NEW}>
                <Plus className="mr-2 h-4 w-4" />
                Add Route
              </Link>
            </Button>
          }
        />
      ) : (
        <RouteTable routes={routes} />
      )}
    </div>
  )
}
