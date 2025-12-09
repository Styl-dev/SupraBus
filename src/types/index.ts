export type BusStatus = "active" | "maintenance" | "retired";
export type DriverStatus = "available" | "on_duty" | "off_duty" | "on_leave";
export type RouteStatus = "active" | "suspended" | "discontinued";

export interface DashboardStats {
  totalBuses: number;
  activeBuses: number;
  availableDrivers: number;
  activeRoutes: number;
  totalCoverage: number;
}

export interface FleetStatusData {
  status: string;
  count: number;
}

export interface DriverStatusData {
  status: string;
  count: number;
}

export interface TopRouteData {
  name: string;
  revenue: number;
}
