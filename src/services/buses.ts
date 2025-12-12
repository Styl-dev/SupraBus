import type {
  Bus,
  CreateBusData,
  PaginatedResponse,
  UpdateBusData,
} from '@/types'

import { fetchApi } from './api-client'

const ENDPOINT = '/buses'

export async function getBuses(params?: {
  page?: number
  limit?: number
  status?: string
  sort?: string
}): Promise<PaginatedResponse<Bus>> {
  const searchParams = new URLSearchParams()

  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.status) searchParams.set('where[status][equals]', params.status)
  if (params?.sort) searchParams.set('sort', params.sort)

  const query = searchParams.toString()
  return fetchApi<PaginatedResponse<Bus>>(`${ENDPOINT}${query ? `?${query}` : ''}`)
}

export async function getBusById(id: string): Promise<Bus> {
  return fetchApi<Bus>(`${ENDPOINT}/${id}`)
}

export async function createBus(data: CreateBusData): Promise<Bus> {
  const response = await fetchApi<{ doc: Bus }>(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.doc
}

export async function updateBus(id: string, data: UpdateBusData): Promise<Bus> {
  const response = await fetchApi<{ doc: Bus }>(`${ENDPOINT}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  return response.doc
}

export async function deleteBus(id: string): Promise<void> {
  await fetchApi(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}
