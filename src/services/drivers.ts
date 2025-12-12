import type {
  CreateDriverData,
  Driver,
  PaginatedResponse,
  UpdateDriverData,
} from '@/types'

import { fetchApi } from './api-client'

const ENDPOINT = '/drivers'

export async function getDrivers(params?: {
  page?: number
  limit?: number
  status?: string
  sort?: string
}): Promise<PaginatedResponse<Driver>> {
  const searchParams = new URLSearchParams()

  if (params?.page) searchParams.set('page', String(params.page))
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.status) searchParams.set('where[status][equals]', params.status)
  if (params?.sort) searchParams.set('sort', params.sort)

  const query = searchParams.toString()
  return fetchApi<PaginatedResponse<Driver>>(`${ENDPOINT}${query ? `?${query}` : ''}`)
}

export async function getDriverById(id: string): Promise<Driver> {
  return fetchApi<Driver>(`${ENDPOINT}/${id}`)
}

export async function createDriver(data: CreateDriverData): Promise<Driver> {
  const response = await fetchApi<{ doc: Driver }>(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return response.doc
}

export async function updateDriver(id: string, data: UpdateDriverData): Promise<Driver> {
  const response = await fetchApi<{ doc: Driver }>(`${ENDPOINT}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  return response.doc
}

export async function deleteDriver(id: string): Promise<void> {
  await fetchApi(`${ENDPOINT}/${id}`, { method: 'DELETE' })
}
