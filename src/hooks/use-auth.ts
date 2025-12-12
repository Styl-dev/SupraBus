'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import {
  forgotPassword,
  getCurrentUser,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updatePassword,
  updateProfile,
} from '@/services'

import type {
  SignInCredentials,
  SignUpCredentials,
  UpdatePasswordData,
  UpdateProfileData,
} from '@/types'

export const AUTH_QUERY_KEY = ['auth', 'user']

export function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })

  const signInMutation = useMutation({
    mutationFn: (credentials: SignInCredentials) => signIn(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user)
      router.push('/account')
      router.refresh()
    },
  })

  const signUpMutation = useMutation({
    mutationFn: (credentials: SignUpCredentials) => signUp(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data.user)
      router.push('/account')
      router.refresh()
    },
  })

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null)
      queryClient.clear()
      router.push('/auth/signin')
      router.refresh()
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, updatedUser)
    },
  })

  const updatePasswordMutation = useMutation({
    mutationFn: (data: UpdatePasswordData) => updatePassword(data),
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  })

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      resetPassword(token, password),
    onSuccess: () => {
      router.push('/auth/signin')
    },
  })

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    signIn: signInMutation.mutate,
    signInAsync: signInMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,
    signInError: signInMutation.error,
    signUp: signUpMutation.mutate,
    signUpAsync: signUpMutation.mutateAsync,
    isSigningUp: signUpMutation.isPending,
    signUpError: signUpMutation.error,
    signOut: signOutMutation.mutate,
    isSigningOut: signOutMutation.isPending,
    updateProfile: updateProfileMutation.mutate,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,
    updatePassword: updatePasswordMutation.mutate,
    updatePasswordAsync: updatePasswordMutation.mutateAsync,
    isUpdatingPassword: updatePasswordMutation.isPending,
    updatePasswordError: updatePasswordMutation.error,
    forgotPassword: forgotPasswordMutation.mutate,
    forgotPasswordAsync: forgotPasswordMutation.mutateAsync,
    isSendingResetEmail: forgotPasswordMutation.isPending,
    forgotPasswordError: forgotPasswordMutation.error,
    resetPassword: resetPasswordMutation.mutate,
    resetPasswordAsync: resetPasswordMutation.mutateAsync,
    isResettingPassword: resetPasswordMutation.isPending,
    resetPasswordError: resetPasswordMutation.error,
  }
}
