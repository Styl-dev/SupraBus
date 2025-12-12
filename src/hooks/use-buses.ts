'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createBus,
  deleteBus,
  getBusById,
  getBuses,
  updateBus,
} from '@/services'

import type { CreateBusData, UpdateBusData } from '@/types'

export const BUSES_QUERY_KEY = ['buses']

export function useBuses(params?: {
  page?: number
  limit?: number
  status?: string
  sort?: string
}) {
  return useQuery({
    queryKey: [...BUSES_QUERY_KEY, params],
    queryFn: () => getBuses(params),
  })
}

export function useBus(id: string) {
  return useQuery({
    queryKey: [...BUSES_QUERY_KEY, id],
    queryFn: () => getBusById(id),
    enabled: !!id,
  })
}

export function useCreateBus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBusData) => createBus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUSES_QUERY_KEY })
    },
  })
}

export function useUpdateBus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBusData }) =>
      updateBus(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: BUSES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...BUSES_QUERY_KEY, id] })
    },
  })
}

export function useDeleteBus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteBus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUSES_QUERY_KEY })
    },
  })
}
