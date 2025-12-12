'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout'
import { BusStatusBadge } from '@/components/fleet/buses'
import { LoadingPage } from '@/components/shared'
import { useBus } from '@/hooks'
import { FLEET_ROUTES } from '@/constants'

export default function BusDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { data: bus, isLoading } = useBus(id)

  if (isLoading) {
    return <LoadingPage message="Loading bus details..." />
  }

  if (!bus) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">Bus not found</p>
        <Button asChild variant="outline">
          <Link href={FLEET_ROUTES.BUSES}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Buses
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={bus.plateNumber}
        description={`${bus.manufacturer} ${bus.model}`}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={FLEET_ROUTES.BUSES}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button asChild>
              <Link href={FLEET_ROUTES.BUS_EDIT(id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plate Number</span>
              <span className="font-medium">{bus.plateNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Manufacturer</span>
              <span className="font-medium">{bus.manufacturer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium">{bus.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Year</span>
              <span className="font-medium">{bus.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Capacity</span>
              <span className="font-medium">{bus.capacity} passengers</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <BusStatusBadge status={bus.status} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mileage</span>
              <span className="font-medium">
                {bus.mileage ? `${bus.mileage.toLocaleString()} km` : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Maintenance</span>
              <span className="font-medium">
                {bus.lastMaintenanceDate
                  ? new Date(bus.lastMaintenanceDate).toLocaleDateString()
                  : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Maintenance</span>
              <span className="font-medium">
                {bus.nextMaintenanceDate
                  ? new Date(bus.nextMaintenanceDate).toLocaleDateString()
                  : '-'}
              </span>
            </div>
            {bus.notes && (
              <div>
                <span className="text-muted-foreground">Notes</span>
                <p className="mt-1 text-sm">{bus.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
