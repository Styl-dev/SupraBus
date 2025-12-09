"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createRoute, updateRoute } from "@/lib/actions/routes";
import { toast } from "sonner";
import type { Route } from "@/db/schema";

interface RouteFormProps {
  route?: Route;
  isEdit?: boolean;
}

export function RouteForm({ route, isEdit = false }: RouteFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        origin: formData.get("origin") as string,
        destination: formData.get("destination") as string,
        distanceKm: parseFloat(formData.get("distanceKm") as string),
        estimatedDurationMins: parseInt(formData.get("estimatedDurationMins") as string),
        status: formData.get("status") as "active" | "suspended" | "discontinued",
        frequencyPerDay: parseInt(formData.get("frequencyPerDay") as string),
        fare: parseFloat(formData.get("fare") as string),
      };

      if (isEdit && route) {
        await updateRoute(route.id, data);
        toast.success("Route updated successfully");
        router.push(`/routes/${route.id}`);
      } else {
        await createRoute(data);
        toast.success("Route created successfully");
        router.push("/routes");
      }
    } catch (error) {
      toast.error("Failed to save route");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Route" : "Add New Route"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Route Name/Number *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={route?.name}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin *</Label>
              <Input
                id="origin"
                name="origin"
                defaultValue={route?.origin}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                name="destination"
                defaultValue={route?.destination}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distanceKm">Distance (km) *</Label>
              <Input
                id="distanceKm"
                name="distanceKm"
                type="number"
                step="0.1"
                defaultValue={route?.distanceKm}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedDurationMins">Duration (mins) *</Label>
              <Input
                id="estimatedDurationMins"
                name="estimatedDurationMins"
                type="number"
                defaultValue={route?.estimatedDurationMins}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                id="status"
                name="status"
                defaultValue={route?.status || "active"}
                required
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="discontinued">Discontinued</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequencyPerDay">Trips/Day *</Label>
              <Input
                id="frequencyPerDay"
                name="frequencyPerDay"
                type="number"
                defaultValue={route?.frequencyPerDay || 1}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fare">Fare ($) *</Label>
              <Input
                id="fare"
                name="fare"
                type="number"
                step="0.01"
                defaultValue={route?.fare}
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Route" : "Create Route"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
