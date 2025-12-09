"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDriver, deleteDriver } from "@/lib/actions/drivers";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import type { Driver } from "@/db/schema";

const statusVariants = {
  available: "success",
  on_duty: "warning",
  off_duty: "secondary",
  on_leave: "secondary",
} as const;

export default function DriverDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const data = await getDriver(Number(params.id));
        if (data) {
          setDriver(data);
        } else {
          toast.error("Driver not found");
          router.push("/drivers");
        }
      } catch (error) {
        toast.error("Failed to load driver");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!driver) return;

    if (!confirm("Are you sure you want to delete this driver?")) {
      return;
    }

    try {
      await deleteDriver(driver.id);
      toast.success("Driver deleted successfully");
      router.push("/drivers");
    } catch (error) {
      toast.error("Failed to delete driver");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!driver) {
    return null;
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Driver Details</h1>
        <div className="flex gap-2">
          <Button onClick={() => router.push(`/drivers/${driver.id}/edit`)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{driver.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">License Number</p>
              <p className="font-medium">{driver.licenseNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={statusVariants[driver.status]}>
                {driver.status.replace("_", " ")}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{driver.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{driver.email || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Hire Date</p>
              <p className="font-medium">{formatDate(driver.hireDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Trips</p>
              <p className="font-medium">{driver.totalTrips}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="font-medium">{driver.rating.toFixed(1)} / 5.0</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-medium">{formatDate(driver.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Updated At</p>
              <p className="font-medium">{formatDate(driver.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" onClick={() => router.push("/drivers")}>
        Back to List
      </Button>
    </div>
  );
}
