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
import { useDeleteBus } from '@/hooks'
import { FLEET_ROUTES } from '@/constants'

import { BusStatusBadge } from './bus-status-badge'

import type { Bus } from '@/types'

interface BusTableProps {
  buses: Bus[]
}

export function BusTable({ buses }: BusTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const deleteMutation = useDeleteBus()

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
              <TableHead>Plate Number</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buses.map((bus) => (
              <TableRow key={bus.id}>
                <TableCell className="font-medium">
                  <Link
                    href={FLEET_ROUTES.BUS_DETAIL(bus.id)}
                    className="hover:underline"
                  >
                    {bus.plateNumber}
                  </Link>
                </TableCell>
                <TableCell>{bus.model}</TableCell>
                <TableCell>{bus.manufacturer}</TableCell>
                <TableCell>{bus.year}</TableCell>
                <TableCell>{bus.capacity}</TableCell>
                <TableCell>
                  <BusStatusBadge status={bus.status} />
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
                        <Link href={FLEET_ROUTES.BUS_EDIT(bus.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteId(bus.id)}
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
        title="Delete Bus"
        description="Are you sure you want to delete this bus? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </>
  )
}
