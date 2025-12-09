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
import { getDrivers } from "@/lib/actions/drivers";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

// Force dynamic rendering for Vercel deployment
export const dynamic = 'force-dynamic';

const statusVariants = {
  available: "success",
  on_duty: "warning",
  off_duty: "secondary",
  on_leave: "secondary",
} as const;

export default async function DriversPage() {
  const drivers = await getDrivers();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Drivers</h1>
        <Link href="/drivers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Driver
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Trips</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-medium">{driver.name}</TableCell>
                <TableCell>{driver.licenseNumber}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[driver.status]}>
                    {driver.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{driver.totalTrips}</TableCell>
                <TableCell>{driver.rating.toFixed(1)}</TableCell>
                <TableCell>{formatDate(driver.hireDate)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/drivers/${driver.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/drivers/${driver.id}/edit`}>
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
