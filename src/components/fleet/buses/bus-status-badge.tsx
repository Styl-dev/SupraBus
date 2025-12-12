import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { BUS_STATUS_COLORS, BUS_STATUS_OPTIONS } from '@/constants'

import type { BusStatus } from '@/types'

interface BusStatusBadgeProps {
  status: BusStatus
}

export function BusStatusBadge({ status }: BusStatusBadgeProps) {
  const label = BUS_STATUS_OPTIONS.find((opt) => opt.value === status)?.label || status
  const colorClass = BUS_STATUS_COLORS[status] || BUS_STATUS_COLORS.active

  return (
    <Badge variant="outline" className={cn('border', colorClass)}>
      {label}
    </Badge>
  )
}
