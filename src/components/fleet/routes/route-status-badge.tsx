import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ROUTE_STATUS_COLORS, ROUTE_STATUS_OPTIONS } from '@/constants'

import type { RouteStatus } from '@/types'

interface RouteStatusBadgeProps {
  status: RouteStatus
}

export function RouteStatusBadge({ status }: RouteStatusBadgeProps) {
  const label = ROUTE_STATUS_OPTIONS.find((opt) => opt.value === status)?.label || status
  const colorClass = ROUTE_STATUS_COLORS[status] || ROUTE_STATUS_COLORS.active

  return (
    <Badge variant="outline" className={cn('border', colorClass)}>
      {label}
    </Badge>
  )
}
