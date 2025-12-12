export type BusStatus = 'active' | 'maintenance' | 'out-of-service' | 'retired'
export type DriverStatus = 'available' | 'on-duty' | 'off-duty' | 'on-leave' | 'inactive'
export type RouteStatus = 'active' | 'suspended' | 'discontinued'
export type LicenseType = 'class-a' | 'class-b' | 'class-c'
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface Media {
  id: string
  alt: string
  url: string
  filename: string
}

export interface Bus {
  id: string
  plateNumber: string
  model: string
  manufacturer: string
  year: number
  capacity: number
  status: BusStatus
  currentDriver?: Driver | string | null
  mileage?: number | null
  lastMaintenanceDate?: string | null
  nextMaintenanceDate?: string | null
  image?: Media | string | null
  notes?: string | null
  createdAt: string
  updatedAt: string
}

export interface EmergencyContact {
  name?: string | null
  phone?: string | null
  relationship?: string | null
}

export interface Driver {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  address?: string | null
  licenseNumber: string
  licenseType: LicenseType
  licenseExpiry: string
  status: DriverStatus
  hireDate: string
  assignedBus?: Bus | string | null
  photo?: Media | string | null
  emergencyContact?: EmergencyContact | null
  createdAt: string
  updatedAt: string
}

export interface RouteStop {
  id?: string
  stopName: string
  stopOrder: number
  estimatedArrival?: string | null
  latitude?: number | null
  longitude?: number | null
}

export interface RouteSchedule {
  operatingDays?: DayOfWeek[] | null
  firstDeparture?: string | null
  lastDeparture?: string | null
  frequency?: number | null
}

export interface Route {
  id: string
  routeNumber: string
  name: string
  description?: string | null
  status: RouteStatus
  stops: RouteStop[]
  schedule?: RouteSchedule | null
  estimatedDuration?: number | null
  distanceKm?: number | null
  assignedBuses?: (Bus | string)[] | null
  createdAt: string
  updatedAt: string
}

export interface PaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export type CreateBusData = {
  plateNumber: string
  model: string
  manufacturer: string
  year: number
  capacity: number
  status?: BusStatus
  currentDriver?: string | null
  mileage?: number | null
  lastMaintenanceDate?: string | null
  nextMaintenanceDate?: string | null
  image?: string | null
  notes?: string | null
}

export type UpdateBusData = Partial<CreateBusData>

export type CreateDriverData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address?: string | null
  licenseNumber: string
  licenseType: LicenseType
  licenseExpiry: string
  status?: DriverStatus
  hireDate: string
  assignedBus?: string | null
  photo?: string | null
  emergencyContact?: EmergencyContact | null
}

export type UpdateDriverData = Partial<CreateDriverData>

export type CreateRouteData = {
  routeNumber: string
  name: string
  description?: string | null
  status?: RouteStatus
  stops: Omit<RouteStop, 'id'>[]
  schedule?: RouteSchedule | null
  estimatedDuration?: number | null
  distanceKm?: number | null
  assignedBuses?: string[] | null
}

export type UpdateRouteData = Partial<CreateRouteData>

export interface FleetStats {
  totalBuses: number
  activeBuses: number
  busesInMaintenance: number
  totalDrivers: number
  availableDrivers: number
  activeRoutes: number
  totalCapacity: number
}

export interface StatusBreakdown {
  status: string
  count: number
  percentage: number
}
