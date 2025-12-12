import { PageHeader } from '@/components/layout'
import { BusStatusChart, DriverStatusChart, StatsCards } from '@/components/fleet/dashboard'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Fleet Manager',
  description: 'Overview of fleet management metrics',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your fleet operations"
      />

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2">
        <BusStatusChart />
        <DriverStatusChart />
      </div>
    </div>
  )
}
