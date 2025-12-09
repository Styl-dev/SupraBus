"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createBus, updateBus } from "@/lib/actions/buses";
import { toast } from "sonner";
import type { Bus } from "@/db/schema";

interface BusFormProps {
  bus?: Bus;
  isEdit?: boolean;
}

export function BusForm({ bus, isEdit = false }: BusFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        plateNumber: formData.get("plateNumber") as string,
        model: formData.get("model") as string,
        capacity: parseInt(formData.get("capacity") as string),
        year: parseInt(formData.get("year") as string),
        status: formData.get("status") as "active" | "maintenance" | "retired",
        mileage: parseInt(formData.get("mileage") as string),
        lastMaintenanceDate: formData.get("lastMaintenanceDate") as string || null,
      };

      if (isEdit && bus) {
        await updateBus(bus.id, data);
        toast.success("Bus updated successfully");
        router.push(`/buses/${bus.id}`);
      } else {
        await createBus(data);
        toast.success("Bus created successfully");
        router.push("/buses");
      }
    } catch (error) {
      toast.error("Failed to save bus");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Bus" : "Add New Bus"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plateNumber">Plate Number *</Label>
              <Input
                id="plateNumber"
                name="plateNumber"
                defaultValue={bus?.plateNumber}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                name="model"
                defaultValue={bus?.model}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                defaultValue={bus?.capacity}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                name="year"
                type="number"
                defaultValue={bus?.year}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                id="status"
                name="status"
                defaultValue={bus?.status || "active"}
                required
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="retired">Retired</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage *</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                defaultValue={bus?.mileage || 0}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastMaintenanceDate">Last Maintenance Date</Label>
            <Input
              id="lastMaintenanceDate"
              name="lastMaintenanceDate"
              type="date"
              defaultValue={bus?.lastMaintenanceDate || ""}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Bus" : "Create Bus"}
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
