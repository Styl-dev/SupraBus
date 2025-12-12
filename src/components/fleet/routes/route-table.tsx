'use client'

import Link from 'next/link'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ConfirmDialog } from '@/components/shared'
import { useDeleteRoute } from '@/hooks'
import { FLEET_ROUTES } from '@/constants'

import { RouteStatusBadge } from './route-status-badge'

import type { Route } from '@/types'

interface RouteTableProps {
  routes: Route[]
}

export function RouteTable({ routes }: RouteTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const deleteMutation = useDeleteRoute()

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      })
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Stops</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">
                  <Link
                    href={FLEET_ROUTES.ROUTE_DETAIL(route.id)}
                    className="hover:underline"
                  >
                    {route.routeNumber}
                  </Link>
                </TableCell>
                <TableCell>{route.name}</TableCell>
                <TableCell>{route.stops?.length || 0} stops</TableCell>
                <TableCell>
                  {route.estimatedDuration ? `${route.estimatedDuration} min` : '-'}
                </TableCell>
                <TableCell>
                  {route.distanceKm ? `${route.distanceKm} km` : '-'}
                </TableCell>
                <TableCell>
                  <RouteStatusBadge status={route.status} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={FLEET_ROUTES.ROUTE_EDIT(route.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteId(route.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Route"
        description="Are you sure you want to delete this route? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </>
  )
}
