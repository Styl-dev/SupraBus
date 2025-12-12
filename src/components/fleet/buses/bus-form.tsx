'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCreateBus, useUpdateBus } from '@/hooks'
import { BUS_STATUS_OPTIONS, FLEET_ROUTES } from '@/constants'

import type { Bus } from '@/types'

const busFormSchema = z.object({
  plateNumber: z.string().min(1, 'Plate number is required'),
  model: z.string().min(1, 'Model is required'),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  year: z.number().min(1990).max(2030),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  status: z.enum(['active', 'maintenance', 'out-of-service', 'retired']),
  mileage: z.number().min(0).optional().nullable(),
  notes: z.string().optional().nullable(),
})

type BusFormValues = z.infer<typeof busFormSchema>

interface BusFormProps {
  bus?: Bus
}

export function BusForm({ bus }: BusFormProps) {
  const router = useRouter()
  const createMutation = useCreateBus()
  const updateMutation = useUpdateBus()
  const isEditing = !!bus

  const form = useForm<BusFormValues>({
    resolver: zodResolver(busFormSchema),
    defaultValues: {
      plateNumber: bus?.plateNumber || '',
      model: bus?.model || '',
      manufacturer: bus?.manufacturer || '',
      year: bus?.year || new Date().getFullYear(),
      capacity: bus?.capacity || 40,
      status: bus?.status || 'active',
      mileage: bus?.mileage || null,
      notes: bus?.notes || null,
    },
  })

  const onSubmit = (values: BusFormValues) => {
    if (isEditing) {
      updateMutation.mutate(
        { id: bus.id, data: values },
        {
          onSuccess: () => router.push(FLEET_ROUTES.BUSES),
        }
      )
    } else {
      createMutation.mutate(values, {
        onSuccess: () => router.push(FLEET_ROUTES.BUSES),
      })
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Bus' : 'Add New Bus'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="plateNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plate Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUS_STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>
                    <FormControl>
                      <Input placeholder="Mercedes-Benz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Citaro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mileage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mileage (km)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : null)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(FLEET_ROUTES.BUSES)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Bus'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
