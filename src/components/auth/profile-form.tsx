'use client'

import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks'

export function ProfileForm() {
  const { user, updateProfile, isUpdatingProfile, updateProfileError } = useAuth()
  const [formData, setFormData] = useState<{ name?: string; email?: string } | null>(null)
  const [success, setSuccess] = useState(false)

  const name = formData?.name ?? user?.name ?? ''
  const email = formData?.email ?? user?.email ?? ''

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, name: value }))
    setSuccess(false)
  }

  const handleEmailChange = (value: string) => {
    setFormData((prev) => ({ ...prev, email: value }))
    setSuccess(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSuccess(false)

    updateProfile(
      { name, email },
      {
        onSuccess: () => {
          setSuccess(true)
          setFormData(null)
        },
      }
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {updateProfileError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {updateProfileError.message}
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600">
              Profile updated successfully
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="profile-name">Name</Label>
            <Input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="pt-6">
          <Button type="submit" disabled={isUpdatingProfile}>
            {isUpdatingProfile ? 'Saving...' : 'Save changes'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
