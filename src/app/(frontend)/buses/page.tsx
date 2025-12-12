'use client'

import Link from 'next/link'
import { Plus, Bus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout'
import { BusTable } from '@/components/fleet/buses'
import { EmptyState, LoadingPage } from '@/components/shared'
import { useBuses } from '@/hooks'
import { FLEET_ROUTES } from '@/constants'

export default function BusesPage() {
  const { data, isLoading } = useBuses()

  if (isLoading) {
    return <LoadingPage message="Loading buses..." />
  }

  const buses = data?.docs || []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buses"
        description="Manage your fleet of buses"
        actions={
          <Button asChild>
            <Link href={FLEET_ROUTES.BUS_NEW}>
              <Plus className="mr-2 h-4 w-4" />
              Add Bus
            </Link>
          </Button>
        }
      />

      {buses.length === 0 ? (
        <EmptyState
          icon={Bus}
          title="No buses found"
          description="Get started by adding your first bus to the fleet."
          action={
            <Button asChild>
              <Link href={FLEET_ROUTES.BUS_NEW}>
                <Plus className="mr-2 h-4 w-4" />
                Add Bus
              </Link>
            </Button>
          }
        />
      ) : (
        <BusTable buses={buses} />
      )}
    </div>
  )
}
