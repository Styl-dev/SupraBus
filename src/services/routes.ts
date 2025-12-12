import type {
  CreateRouteData,
  PaginatedResponse,
  Route,
  UpdateRouteData,
} from '@/types'

import { fetchApi } from './api-client'

const ENDPOINT = '/routes'

export async function getRoutes(params?: {
  page?: number
  limit?: number
  status?: string
  sort?: string
}): Promise<PaginatedResponse<Route>> {
  const searchParams = new URLSearchParams()

  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.status) searchParams.set('where[status][equals]', params.status)
  if (params?.sort) searchParams.set('sort', params.sort)

  const query = searchParams.toString()
  return fetchApi<PaginatedResponse<Route>>(`${ENDPOINT}${query ? `?${query}` : ''}`)
}

export async function getRouteById(id: string): Promise<Route> {
  return fetchApi<Route>(`${ENDPOINT}/${id}`)
}

export async function createRoute(data: CreateRouteData): Promise<Route> {
  const response = await fetchApi<{ doc: Route }>(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.doc
}

export async function updateRoute(id: string, data: UpdateRouteData): Promise<Route> {
  const response = await fetchApi<{ doc: Route }>(`${ENDPOINT}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  return response.doc
}

export async function deleteRoute(id: string): Promise<void> {
  await fetchApi(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}
