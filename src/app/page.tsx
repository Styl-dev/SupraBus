import { StatCard } from "@/components/dashboard/stat-card";
import { FleetStatusChart } from "@/components/dashboard/fleet-status-chart";
import { DriverAvailabilityChart } from "@/components/dashboard/driver-availability-chart";
import { RoutePerformanceChart } from "@/components/dashboard/route-performance-chart";
import { getBusStats } from "@/lib/actions/buses";
import { getDriverStats } from "@/lib/actions/drivers";
import { getRouteStats } from "@/lib/actions/routes";
import { Bus, Users, MapPin, Route } from "lucide-react";

// Force dynamic rendering for Vercel deployment
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [busStats, driverStats, routeStats] = await Promise.all([
    getBusStats(),
    getDriverStats(),
    getRouteStats(),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Fleet"
          value={busStats.total}
          icon={Bus}
          description="Total buses in fleet"
        />
        <StatCard
          title="Active Buses"
          value={busStats.active}
          icon={Bus}
          description="Currently operational"
        />
        <StatCard
          title="Available Drivers"
          value={driverStats.available}
          icon={Users}
          description="Ready for duty"
        />
        <StatCard
          title="Active Routes"
          value={routeStats.active}
          icon={MapPin}
          description="Currently serving"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Total Coverage"
          value={`${routeStats.totalCoverage.toFixed(1)} km/day`}
          icon={Route}
          description="Daily distance covered"
        />
        <StatCard
          title="Total Drivers"
          value={driverStats.total}
          icon={Users}
          description="All registered drivers"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FleetStatusChart data={busStats.fleetStatus} />
        <DriverAvailabilityChart data={driverStats.driverStatus} />
      </div>

      <RoutePerformanceChart data={routeStats.topRoutes} />
    </div>
  );
}
