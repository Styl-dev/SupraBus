export const BUS_STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'In Maintenance', value: 'maintenance' },
  { label: 'Out of Service', value: 'out-of-service' },
  { label: 'Retired', value: 'retired' },
] as const

export const DRIVER_STATUS_OPTIONS = [
  { label: 'Available', value: 'available' },
  { label: 'On Duty', value: 'on-duty' },
  { label: 'Off Duty', value: 'off-duty' },
  { label: 'On Leave', value: 'on-leave' },
  { label: 'Inactive', value: 'inactive' },
] as const

export const ROUTE_STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Discontinued', value: 'discontinued' },
] as const

export const LICENSE_TYPE_OPTIONS = [
  { label: 'Class A - Commercial', value: 'class-a' },
  { label: 'Class B - Heavy Vehicle', value: 'class-b' },
  { label: 'Class C - Standard', value: 'class-c' },
] as const

export const DAYS_OF_WEEK_OPTIONS = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
] as const

export const FLEET_ROUTES = {
  DASHBOARD: '/dashboard',
  BUSES: '/buses',
  BUS_NEW: '/buses/new',
  BUS_DETAIL: (id: string) => `/buses/${id}`,
  BUS_EDIT: (id: string) => `/buses/${id}/edit`,
  DRIVERS: '/drivers',
  DRIVER_NEW: '/drivers/new',
  DRIVER_DETAIL: (id: string) => `/drivers/${id}`,
  DRIVER_EDIT: (id: string) => `/drivers/${id}/edit`,
  ROUTES: '/routes',
  ROUTE_NEW: '/routes/new',
  ROUTE_DETAIL: (id: string) => `/routes/${id}`,
  ROUTE_EDIT: (id: string) => `/routes/${id}/edit`,
} as const

export const BUS_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500/10 text-green-500 border-green-500/20',
  maintenance: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'out-of-service': 'bg-red-500/10 text-red-500 border-red-500/20',
  retired: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
}

export const DRIVER_STATUS_COLORS: Record<string, string> = {
  available: 'bg-green-500/10 text-green-500 border-green-500/20',
  'on-duty': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'off-duty': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  'on-leave': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  inactive: 'bg-red-500/10 text-red-500 border-red-500/20',
}

export const ROUTE_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500/10 text-green-500 border-green-500/20',
  suspended: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  discontinued: 'bg-red-500/10 text-red-500 border-red-500/20',
}

export const CHART_COLORS = {
  active: 'hsl(142, 76%, 36%)',
  maintenance: 'hsl(45, 93%, 47%)',
  'out-of-service': 'hsl(0, 84%, 60%)',
  retired: 'hsl(220, 9%, 46%)',
  available: 'hsl(142, 76%, 36%)',
  'on-duty': 'hsl(217, 91%, 60%)',
  'off-duty': 'hsl(220, 9%, 46%)',
  'on-leave': 'hsl(45, 93%, 47%)',
  inactive: 'hsl(0, 84%, 60%)',
  suspended: 'hsl(45, 93%, 47%)',
  discontinued: 'hsl(0, 84%, 60%)',
}
