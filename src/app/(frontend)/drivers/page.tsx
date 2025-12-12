'use client'

import Link from 'next/link'
import { Plus, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout'
import { DriverTable } from '@/components/fleet/drivers'
import { EmptyState, LoadingPage } from '@/components/shared'
import { useDrivers } from '@/hooks'
import { FLEET_ROUTES } from '@/constants'

export default function DriversPage() {
  const { data, isLoading } = useDrivers()

  if (isLoading) {
    return <LoadingPage message="Loading drivers..." />
  }

  const drivers = data?.docs || []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Drivers"
        description="Manage your fleet drivers"
        actions={
          <Button asChild>
            <Link href={FLEET_ROUTES.DRIVER_NEW}>
              <Plus className="mr-2 h-4 w-4" />
              Add Driver
            </Link>
          </Button>
        }
      />

      {drivers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No drivers found"
          description="Get started by adding your first driver."
          action={
            <Button asChild>
              <Link href={FLEET_ROUTES.DRIVER_NEW}>
                <Plus className="mr-2 h-4 w-4" />
                Add Driver
              </Link>
            </Button>
          }
        />
      ) : (
        <DriverTable drivers={drivers} />
      )}
    </div>
  )
}
