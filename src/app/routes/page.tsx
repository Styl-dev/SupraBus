import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRoutes } from "@/lib/actions/routes";
import { Plus } from "lucide-react";

// Force dynamic rendering for Vercel deployment
export const dynamic = 'force-dynamic';

const statusVariants = {
  active: "success",
  suspended: "warning",
  discontinued: "destructive",
} as const;

export default async function RoutesPage() {
  const routes = await getRoutes();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Routes</h1>
        <Link href="/routes/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Route
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route Name</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Freq/Day</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">{route.name}</TableCell>
                <TableCell>{route.origin}</TableCell>
                <TableCell>{route.destination}</TableCell>
                <TableCell>{route.distanceKm} km</TableCell>
                <TableCell>{route.estimatedDurationMins} mins</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[route.status]}>
                    {route.status}
                  </Badge>
                </TableCell>
                <TableCell>{route.frequencyPerDay}</TableCell>
                <TableCell>${route.fare.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/routes/${route.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/routes/${route.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
