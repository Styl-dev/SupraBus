'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createRoute,
  deleteRoute,
  getRouteById,
  getRoutes,
  updateRoute,
} from '@/services'

import type { CreateRouteData, UpdateRouteData } from '@/types'

export const ROUTES_QUERY_KEY = ['routes']

export function useRoutes(params?: {
  page?: number
  limit?: number
  status?: string
  sort?: string
}) {
  return useQuery({
    queryKey: [...ROUTES_QUERY_KEY, params],
    queryFn: () => getRoutes(params),
  })
}

export function useRoute(id: string) {
  return useQuery({
    queryKey: [...ROUTES_QUERY_KEY, id],
    queryFn: () => getRouteById(id),
    enabled: !!id,
  })
}

export function useCreateRoute() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRouteData) => createRoute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROUTES_QUERY_KEY })
    },
  })
}

export function useUpdateRoute() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRouteData }) =>
      updateRoute(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ROUTES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...ROUTES_QUERY_KEY, id] })
    },
  })
}

export function useDeleteRoute() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteRoute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROUTES_QUERY_KEY })
    },
  })
}
