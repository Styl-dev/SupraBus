'use client'

import { Bus, Map, Users, UsersRound } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useFleetStats } from '@/hooks'

export function StatsCards() {
  const { data: stats, isLoading } = useFleetStats()

  if (isLoading) {
    return <StatsCardsSkeleton />
  }

  const cards = [
    {
      title: 'Total Buses',
      value: stats?.totalBuses || 0,
      subtitle: `${stats?.activeBuses || 0} active`,
      icon: Bus,
    },
    {
      title: 'Total Drivers',
      value: stats?.totalDrivers || 0,
      subtitle: `${stats?.availableDrivers || 0} available`,
      icon: Users,
    },
    {
      title: 'Active Routes',
      value: stats?.activeRoutes || 0,
      subtitle: 'Currently operating',
      icon: Map,
    },
    {
      title: 'Fleet Capacity',
      value: stats?.totalCapacity || 0,
      subtitle: 'Total passengers',
      icon: UsersRound,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-3 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
