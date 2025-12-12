export type User = {
  id: string
  email: string
  name?: string
  stripeCustomerId?: string
  createdAt: string
  updatedAt: string
}

export type AuthResponse = {
  user: User
  token: string
  exp: number
}

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = {
  email: string
  password: string
  name?: string
}

export type UpdateProfileData = {
  email?: string
  name?: string
}

export type UpdatePasswordData = {
  password: string
}

export type AuthError = {
  message: string
  errors?: Array<{
    message: string
    path: string
  }>
}
