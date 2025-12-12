'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/layout'
import { DriverStatusBadge } from '@/components/fleet/drivers'
import { LoadingPage } from '@/components/shared'
import { useDriver } from '@/hooks'
import { FLEET_ROUTES, LICENSE_TYPE_OPTIONS } from '@/constants'

export default function DriverDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { data: driver, isLoading } = useDriver(id)

  if (isLoading) {
    return <LoadingPage message="Loading driver details..." />
  }

  if (!driver) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">Driver not found</p>
        <Button asChild variant="outline">
          <Link href={FLEET_ROUTES.DRIVERS}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Drivers
          </Link>
        </Button>
      </div>
    )
  }

  const licenseTypeLabel =
    LICENSE_TYPE_OPTIONS.find((opt) => opt.value === driver.licenseType)?.label ||
    driver.licenseType

  return (
    <div className="space-y-6">
      <PageHeader
        title={driver.fullName}
        description={driver.email}
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={FLEET_ROUTES.DRIVERS}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button asChild>
              <Link href={FLEET_ROUTES.DRIVER_EDIT(id)}>
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
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Full Name</span>
              <span className="font-medium">{driver.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{driver.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{driver.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date of Birth</span>
              <span className="font-medium">
                {new Date(driver.dateOfBirth).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <DriverStatusBadge status={driver.status} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>License Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">License Number</span>
              <span className="font-medium">{driver.licenseNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">License Type</span>
              <span className="font-medium">{licenseTypeLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expiry Date</span>
              <span className="font-medium">
                {new Date(driver.licenseExpiry).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hire Date</span>
              <span className="font-medium">
                {new Date(driver.hireDate).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {driver.emergencyContact?.name && (
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{driver.emergencyContact.name}</span>
              </div>
              {driver.emergencyContact.phone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{driver.emergencyContact.phone}</span>
                </div>
              )}
              {driver.emergencyContact.relationship && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Relationship</span>
                  <span className="font-medium">{driver.emergencyContact.relationship}</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
