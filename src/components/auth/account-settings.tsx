'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileForm } from './profile-form'
import { PasswordForm } from './password-form'
import { useAuth } from '@/hooks'

export function AccountSettings() {
  const router = useRouter()
  const { user, isLoading, isAuthenticated, signOut, isSigningOut } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : user.email.charAt(0).toUpperCase()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name || 'Account'}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => signOut()} disabled={isSigningOut}>
          {isSigningOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </div>

      <Separator />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
