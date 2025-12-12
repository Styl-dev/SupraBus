import type { FleetStats, StatusBreakdown } from '@/types'

import { getBuses } from './buses'
import { getDrivers } from './drivers'
import { getRoutes } from './routes'

export async function getFleetStats(): Promise<FleetStats> {
  const [busesData, driversData, routesData] = await Promise.all([
    getBuses({ limit: 1000 }),
    getDrivers({ limit: 1000 }),
    getRoutes({ limit: 1000 }),
  ])

  const buses = busesData.docs
  const drivers = driversData.docs
  const routes = routesData.docs

  return {
    totalBuses: buses.length,
    activeBuses: buses.filter((b) => b.status === 'active').length,
    busesInMaintenance: buses.filter((b) => b.status === 'maintenance').length,
    totalDrivers: drivers.length,
    availableDrivers: drivers.filter((d) => d.status === 'available').length,
    activeRoutes: routes.filter((r) => r.status === 'active').length,
    totalCapacity: buses.reduce((sum, b) => sum + b.capacity, 0),
  }
}

export async function getBusStatusBreakdown(): Promise<StatusBreakdown[]> {
  const { docs: buses } = await getBuses({ limit: 1000 })
  const total = buses.length

  const statusCounts = buses.reduce(
    (acc, bus) => {
      acc[bus.status] = (acc[bus.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }))
}

export async function getDriverStatusBreakdown(): Promise<StatusBreakdown[]> {
  const { docs: drivers } = await getDrivers({ limit: 1000 })
  const total = drivers.length

  const statusCounts = drivers.reduce(
    (acc, driver) => {
      acc[driver.status] = (acc[driver.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }))
}
