"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RouteForm } from "@/components/forms/route-form";
import { getRoute } from "@/lib/actions/routes";
import { toast } from "sonner";
import type { Route } from "@/db/schema";

export default function EditRoutePage() {
  const params = useParams();
  const router = useRouter();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!route) {
    return null;
  }

  return (
    <div className="max-w-2xl">
      <RouteForm route={route} isEdit />
    </div>
  );
}
