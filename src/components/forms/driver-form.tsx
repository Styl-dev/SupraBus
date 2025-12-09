"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createDriver, updateDriver } from "@/lib/actions/drivers";
import { toast } from "sonner";
import type { Driver } from "@/db/schema";

interface DriverFormProps {
  driver?: Driver;
  isEdit?: boolean;
}

export function DriverForm({ driver, isEdit = false }: DriverFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name") as string,
        licenseNumber: formData.get("licenseNumber") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string || null,
        status: formData.get("status") as "available" | "on_duty" | "off_duty" | "on_leave",
        hireDate: formData.get("hireDate") as string,
        totalTrips: parseInt(formData.get("totalTrips") as string),
        rating: parseFloat(formData.get("rating") as string),
      };

      if (isEdit && driver) {
        await updateDriver(driver.id, data);
        toast.success("Driver updated successfully");
        router.push(`/drivers/${driver.id}`);
      } else {
        await createDriver(data);
        toast.success("Driver created successfully");
        router.push("/drivers");
      }
    } catch (error) {
      toast.error("Failed to save driver");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Driver" : "Add New Driver"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                defaultValue={driver?.name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number *</Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                defaultValue={driver?.licenseNumber}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={driver?.phone}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={driver?.email || ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                id="status"
                name="status"
                defaultValue={driver?.status || "available"}
                required
              >
                <option value="available">Available</option>
                <option value="on_duty">On Duty</option>
                <option value="off_duty">Off Duty</option>
                <option value="on_leave">On Leave</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hireDate">Hire Date *</Label>
              <Input
                id="hireDate"
                name="hireDate"
                type="date"
                defaultValue={driver?.hireDate}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalTrips">Total Trips *</Label>
              <Input
                id="totalTrips"
                name="totalTrips"
                type="number"
                defaultValue={driver?.totalTrips || 0}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5) *</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                defaultValue={driver?.rating || 5.0}
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Driver" : "Create Driver"}
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
