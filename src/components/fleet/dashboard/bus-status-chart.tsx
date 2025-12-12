'use client'

import { Pie, PieChart } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { useBusStatusBreakdown } from '@/hooks'
import { BUS_STATUS_OPTIONS, CHART_COLORS } from '@/constants'

import type { ChartConfig } from '@/components/ui/chart'

export function BusStatusChart() {
  const { data: breakdown, isLoading } = useBusStatusBreakdown()

  if (isLoading) {
    return <ChartSkeleton title="Bus Status" />
  }

  if (!breakdown || breakdown.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bus Status</CardTitle>
          <CardDescription>Distribution by status</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = breakdown.map((item) => ({
    status: item.status,
    count: item.count,
    fill: CHART_COLORS[item.status as keyof typeof CHART_COLORS] || 'hsl(var(--chart-1))',
  }))

  const chartConfig: ChartConfig = breakdown.reduce(
    (acc, item) => {
      const label = BUS_STATUS_OPTIONS.find((opt) => opt.value === item.status)?.label || item.status
      acc[item.status] = {
        label,
        color: CHART_COLORS[item.status as keyof typeof CHART_COLORS] || 'hsl(var(--chart-1))',
      }
      return acc
    },
    {} as ChartConfig
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bus Status</CardTitle>
        <CardDescription>Distribution by status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[300px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function ChartSkeleton({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent className="flex h-[300px] items-center justify-center">
        <Skeleton className="h-[200px] w-[200px] rounded-full" />
      </CardContent>
    </Card>
  )
}
