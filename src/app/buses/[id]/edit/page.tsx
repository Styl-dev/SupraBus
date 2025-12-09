"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BusForm } from "@/components/forms/bus-form";
import { getBus } from "@/lib/actions/buses";
import { toast } from "sonner";
import type { Bus } from "@/db/schema";

export default function EditBusPage() {
  const params = useParams();
  const router = useRouter();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bus) {
    return null;
  }

  return (
    <div className="max-w-2xl">
      <BusForm bus={bus} isEdit />
    </div>
  );
}
