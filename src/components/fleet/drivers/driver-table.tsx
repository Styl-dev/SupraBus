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
import { useDeleteDriver } from '@/hooks'
import { FLEET_ROUTES } from '@/constants'

import { DriverStatusBadge } from './driver-status-badge'

import type { Driver } from '@/types'

interface DriverTableProps {
  drivers: Driver[]
}

export function DriverTable({ drivers }: DriverTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const deleteMutation = useDeleteDriver()

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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-medium">
                  <Link
                    href={FLEET_ROUTES.DRIVER_DETAIL(driver.id)}
                    className="hover:underline"
                  >
                    {driver.fullName}
                  </Link>
                </TableCell>
                <TableCell>{driver.email}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.licenseNumber}</TableCell>
                <TableCell>
                  <DriverStatusBadge status={driver.status} />
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
                        <Link href={FLEET_ROUTES.DRIVER_EDIT(driver.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteId(driver.id)}
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
        title="Delete Driver"
        description="Are you sure you want to delete this driver? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </>
  )
}
