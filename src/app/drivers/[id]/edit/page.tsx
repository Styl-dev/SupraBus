"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DriverForm } from "@/components/forms/driver-form";
import { getDriver } from "@/lib/actions/drivers";
import { toast } from "sonner";
import type { Driver } from "@/db/schema";

export default function EditDriverPage() {
  const params = useParams();
  const router = useRouter();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!driver) {
    return null;
  }

  return (
    <div className="max-w-2xl">
      <DriverForm driver={driver} isEdit />
    </div>
  );
}
