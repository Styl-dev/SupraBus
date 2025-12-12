import type {
  AuthResponse,
  SignInCredentials,
  SignUpCredentials,
  UpdatePasswordData,
  UpdateProfileData,
  User,
} from '@/types'

const API_BASE = '/api/users'

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || data.message || 'An error occurred')
  }

  return data
}

export async function signIn(credentials: SignInCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  })

  return handleResponse<AuthResponse>(response)
}

export async function signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  })

  return handleResponse<AuthResponse>(response)
}

export async function signOut(): Promise<void> {
  const response = await fetch(`${API_BASE}/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to sign out')
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const response = await fetch(`${API_BASE}/me`, {
    credentials: 'include',
  })

  if (!response.ok) {
    if (response.status === 401) {
      return null
    }
    throw new Error('Failed to fetch user')
  }

  const data = await response.json()
  return data.user
}

export async function updateProfile(data: UpdateProfileData): Promise<User> {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    throw new Error('Not authenticated')
  }

  const response = await fetch(`${API_BASE}/${currentUser.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  })

  const result = await handleResponse<{ doc: User }>(response)
  return result.doc
}

export async function updatePassword(data: UpdatePasswordData): Promise<void> {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    throw new Error('Not authenticated')
  }

  const response = await fetch(`${API_BASE}/${currentUser.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  })

  await handleResponse(response)
}

export async function forgotPassword(email: string): Promise<void> {
  const response = await fetch(`${API_BASE}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  await handleResponse(response)
}

export async function resetPassword(token: string, password: string): Promise<void> {
  const response = await fetch(`${API_BASE}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  })

  await handleResponse(response)
}
