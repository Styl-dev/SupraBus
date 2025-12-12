'use client'

import { useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2 } from 'lucide-react'

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
import { useCreateRoute, useUpdateRoute } from '@/hooks'
import { FLEET_ROUTES, ROUTE_STATUS_OPTIONS } from '@/constants'

import type { Route } from '@/types'

const stopSchema = z.object({
  stopName: z.string().min(1, 'Stop name is required'),
  stopOrder: z.number().min(1),
  estimatedArrival: z.string().optional().nullable(),
})

const routeFormSchema = z.object({
  routeNumber: z.string().min(1, 'Route number is required'),
  name: z.string().min(1, 'Route name is required'),
  description: z.string().optional().nullable(),
  status: z.enum(['active', 'suspended', 'discontinued']),
  stops: z.array(stopSchema).min(2, 'At least 2 stops are required'),
  estimatedDuration: z.number().min(1).optional().nullable(),
  distanceKm: z.number().min(0).optional().nullable(),
})

type RouteFormValues = z.infer<typeof routeFormSchema>

interface RouteFormProps {
  route?: Route
}

export function RouteForm({ route }: RouteFormProps) {
  const router = useRouter()
  const createMutation = useCreateRoute()
  const updateMutation = useUpdateRoute()
  const isEditing = !!route

  const form = useForm<RouteFormValues>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: {
      routeNumber: route?.routeNumber || '',
      name: route?.name || '',
      description: route?.description || null,
      status: route?.status || 'active',
      stops: route?.stops?.length
        ? route.stops.map((s) => ({
            stopName: s.stopName,
            stopOrder: s.stopOrder,
            estimatedArrival: s.estimatedArrival || null,
          }))
        : [
            { stopName: '', stopOrder: 1, estimatedArrival: null },
            { stopName: '', stopOrder: 2, estimatedArrival: null },
          ],
      estimatedDuration: route?.estimatedDuration || null,
      distanceKm: route?.distanceKm || null,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'stops',
  })

  const onSubmit = (values: RouteFormValues) => {
    if (isEditing) {
      updateMutation.mutate(
        { id: route.id, data: values },
        {
          onSuccess: () => router.push(FLEET_ROUTES.ROUTES),
        }
      )
    } else {
      createMutation.mutate(values, {
        onSuccess: () => router.push(FLEET_ROUTES.ROUTES),
      })
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Route' : 'Add New Route'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="routeNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route Number</FormLabel>
                    <FormControl>
                      <Input placeholder="R101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Downtown Express" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
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
                        {ROUTE_STATUS_OPTIONS.map((option) => (
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
              <FormField
                control={form.control}
                name="estimatedDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (min)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="45"
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
              <FormField
                control={form.control}
                name="distanceKm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance (km)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="25"
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Stops</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      stopName: '',
                      stopOrder: fields.length + 1,
                      estimatedArrival: null,
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Stop
                </Button>
              </div>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-end gap-3 rounded-lg border p-3"
                  >
                    <FormField
                      control={form.control}
                      name={`stops.${index}.stopOrder`}
                      render={({ field }) => (
                        <FormItem className="w-20">
                          <FormLabel className="text-xs">Order</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`stops.${index}.stopName`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-xs">Stop Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Central Station" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`stops.${index}.estimatedArrival`}
                      render={({ field }) => (
                        <FormItem className="w-28">
                          <FormLabel className="text-xs">Arrival (min)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="15"
                              {...field}
                              value={field.value ?? ''}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 2}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {form.formState.errors.stops?.root && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.stops.root.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(FLEET_ROUTES.ROUTES)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Route'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
