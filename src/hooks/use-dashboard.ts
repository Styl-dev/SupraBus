'use client'

import { useQuery } from '@tanstack/react-query'

import {
  getBusStatusBreakdown,
  getDriverStatusBreakdown,
  getFleetStats,
} from '@/services'

export const DASHBOARD_QUERY_KEY = ['dashboard']

export function useFleetStats() {
  return useQuery({
    queryKey: [...DASHBOARD_QUERY_KEY, 'stats'],
    queryFn: getFleetStats,
    staleTime: 30 * 1000,
  })
}

export function useBusStatusBreakdown() {
  return useQuery({
    queryKey: [...DASHBOARD_QUERY_KEY, 'bus-status'],
    queryFn: getBusStatusBreakdown,
    staleTime: 30 * 1000,
  })
}

export function useDriverStatusBreakdown() {
  return useQuery({
    queryKey: [...DASHBOARD_QUERY_KEY, 'driver-status'],
    queryFn: getDriverStatusBreakdown,
    staleTime: 30 * 1000,
  })
}
