'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createDriver,
  deleteDriver,
  getDriverById,
  getDrivers,
  updateDriver,
} from '@/services'

import type { CreateDriverData, UpdateDriverData } from '@/types'

export const DRIVERS_QUERY_KEY = ['drivers']

export function useDrivers(params?: {
  page?: number
  limit?: number
  status?: string
  sort?: string
}) {
  return useQuery({
    queryKey: [...DRIVERS_QUERY_KEY, params],
    queryFn: () => getDrivers(params),
  })
}

export function useDriver(id: string) {
  return useQuery({
    queryKey: [...DRIVERS_QUERY_KEY, id],
    queryFn: () => getDriverById(id),
    enabled: !!id,
  })
}

export function useCreateDriver() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateDriverData) => createDriver(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRIVERS_QUERY_KEY })
    },
  })
}

export function useUpdateDriver() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDriverData }) =>
      updateDriver(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: DRIVERS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...DRIVERS_QUERY_KEY, id] })
    },
  })
}

export function useDeleteDriver() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteDriver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DRIVERS_QUERY_KEY })
    },
  })
}
