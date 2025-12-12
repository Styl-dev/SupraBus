'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Pencil, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout'
import { RouteStatusBadge } from '@/components/fleet/routes'
import { LoadingPage } from '@/components/shared'
import { useRoute } from '@/hooks'
import { FLEET_ROUTES, DAYS_OF_WEEK_OPTIONS } from '@/constants'

export default function RouteDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { data: route, isLoading } = useRoute(id)

  if (isLoading) {
    return <LoadingPage message="Loading route details..." />
  }

  if (!route) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">Route not found</p>
        <Button asChild variant="outline">
          <Link href={FLEET_ROUTES.ROUTES}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Routes
          </Link>
        </Button>
      </div>
    )
  }

  const operatingDays = route.schedule?.operatingDays
    ?.map((day) => DAYS_OF_WEEK_OPTIONS.find((opt) => opt.value === day)?.label)
    .filter(Boolean)
    .join(', ')

  return (
    <div className="space-y-6">
      <PageHeader
        title={route.name}
        description={`Route ${route.routeNumber}`}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={FLEET_ROUTES.ROUTES}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button asChild>
              <Link href={FLEET_ROUTES.ROUTE_EDIT(id)}>
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
            <CardTitle>Route Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Route Number</span>
              <span className="font-medium">{route.routeNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{route.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <RouteStatusBadge status={route.status} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">
                {route.estimatedDuration ? `${route.estimatedDuration} min` : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance</span>
              <span className="font-medium">
                {route.distanceKm ? `${route.distanceKm} km` : '-'}
              </span>
            </div>
            {route.description && (
              <div>
                <span className="text-muted-foreground">Description</span>
                <p className="mt-1 text-sm">{route.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Operating Days</span>
              <span className="font-medium text-right">
                {operatingDays || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">First Departure</span>
              <span className="font-medium">
                {route.schedule?.firstDeparture || '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Departure</span>
              <span className="font-medium">
                {route.schedule?.lastDeparture || '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frequency</span>
              <span className="font-medium">
                {route.schedule?.frequency
                  ? `Every ${route.schedule.frequency} min`
                  : '-'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Stops ({route.stops?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {route.stops && route.stops.length > 0 ? (
              <div className="space-y-3">
                {route.stops
                  .sort((a, b) => a.stopOrder - b.stopOrder)
                  .map((stop, index) => (
                    <div
                      key={stop.id || index}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {stop.stopOrder}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{stop.stopName}</p>
                        {stop.estimatedArrival && (
                          <p className="text-sm text-muted-foreground">
                            +{stop.estimatedArrival} min from start
                          </p>
                        )}
                      </div>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No stops defined</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
