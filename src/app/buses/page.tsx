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
import { getBuses } from "@/lib/actions/buses";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

const statusVariants = {
  active: "success",
  maintenance: "warning",
  retired: "destructive",
} as const;

export default async function BusesPage() {
  const buses = await getBuses();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Buses</h1>
        <Link href="/buses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Bus
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plate Number</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Mileage</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell className="font-medium">{bus.plateNumber}</TableCell>
                <TableCell>{bus.model}</TableCell>
                <TableCell>{bus.capacity}</TableCell>
                <TableCell>{bus.year}</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[bus.status]}>
                    {bus.status}
                  </Badge>
                </TableCell>
                <TableCell>{bus.mileage.toLocaleString()} km</TableCell>
                <TableCell>{formatDate(bus.lastMaintenanceDate)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/buses/${bus.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/buses/${bus.id}/edit`}>
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
