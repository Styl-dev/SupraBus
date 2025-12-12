import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { DRIVER_STATUS_COLORS, DRIVER_STATUS_OPTIONS } from '@/constants'

import type { DriverStatus } from '@/types'

interface DriverStatusBadgeProps {
  status: DriverStatus
}

export function DriverStatusBadge({ status }: DriverStatusBadgeProps) {
  const label = DRIVER_STATUS_OPTIONS.find((opt) => opt.value === status)?.label || status
  const colorClass = DRIVER_STATUS_COLORS[status] || DRIVER_STATUS_COLORS.available

  return (
    <Badge variant="outline" className={cn('border', colorClass)}>
      {label}
    </Badge>
  )
}
