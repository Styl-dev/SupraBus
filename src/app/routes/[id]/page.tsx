"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRoute, deleteRoute } from "@/lib/actions/routes";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import type { Route } from "@/db/schema";

const statusVariants = {
  active: "success",
  suspended: "warning",
  discontinued: "destructive",
} as const;

export default function RouteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const data = await getRoute(Number(params.id));
        if (data) {
          setRoute(data);
        } else {
          toast.error("Route not found");
          router.push("/routes");
        }
      } catch (error) {
        toast.error("Failed to load route");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!route) return;

    if (!confirm("Are you sure you want to delete this route?")) {
      return;
    }

    try {
      await deleteRoute(route.id);
      toast.success("Route deleted successfully");
      router.push("/routes");
    } catch (error) {
      toast.error("Failed to delete route");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!route) {
    return null;
  }

  const estimatedDailyRevenue = route.fare * route.frequencyPerDay;
  const dailyCoverage = route.distanceKm * route.frequencyPerDay;

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Route Details</h1>
        <div className="flex gap-2">
          <Button onClick={() => router.push(`/routes/${route.id}/edit`)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{route.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Origin</p>
              <p className="font-medium">{route.origin}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Destination</p>
              <p className="font-medium">{route.destination}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-medium">{route.distanceKm} km</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Duration</p>
              <p className="font-medium">{route.estimatedDurationMins} minutes</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={statusVariants[route.status]}>
                {route.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Frequency Per Day</p>
              <p className="font-medium">{route.frequencyPerDay} trips</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Fare</p>
              <p className="font-medium">${route.fare.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Est. Daily Revenue
              </p>
              <p className="font-medium">${estimatedDailyRevenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Daily Coverage</p>
              <p className="font-medium">{dailyCoverage.toFixed(1)} km</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-medium">{formatDate(route.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Updated At</p>
              <p className="font-medium">{formatDate(route.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" onClick={() => router.push("/routes")}>
        Back to List
      </Button>
    </div>
  );
}
