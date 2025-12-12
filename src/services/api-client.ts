const API_BASE = '/api'

export async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || data.message || 'An error occurred')
  }

  return data
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  })

  return handleResponse<T>(response)
}
