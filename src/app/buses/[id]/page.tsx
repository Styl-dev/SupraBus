"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBus, deleteBus } from "@/lib/actions/buses";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import type { Bus } from "@/db/schema";

const statusVariants = {
  active: "success",
  maintenance: "warning",
  retired: "destructive",
} as const;

export default function BusDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [bus, setBus] = useState<Bus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const data = await getBus(Number(params.id));
        if (data) {
          setBus(data);
        } else {
          toast.error("Bus not found");
          router.push("/buses");
        }
      } catch (error) {
        toast.error("Failed to load bus");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBus();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!bus) return;

    if (!confirm("Are you sure you want to delete this bus?")) {
      return;
    }

    try {
      await deleteBus(bus.id);
      toast.success("Bus deleted successfully");
      router.push("/buses");
    } catch (error) {
      toast.error("Failed to delete bus");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bus) {
    return null;
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bus Details</h1>
        <div className="flex gap-2">
          <Button onClick={() => router.push(`/buses/${bus.id}/edit`)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{bus.plateNumber}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Model</p>
              <p className="font-medium">{bus.model}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={statusVariants[bus.status]}>{bus.status}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Capacity</p>
              <p className="font-medium">{bus.capacity} passengers</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Year</p>
              <p className="font-medium">{bus.year}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Mileage</p>
              <p className="font-medium">{bus.mileage.toLocaleString()} km</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Last Maintenance Date
              </p>
              <p className="font-medium">{formatDate(bus.lastMaintenanceDate)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-medium">{formatDate(bus.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Updated At</p>
              <p className="font-medium">{formatDate(bus.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" onClick={() => router.push("/buses")}>
        Back to List
      </Button>
    </div>
  );
}
