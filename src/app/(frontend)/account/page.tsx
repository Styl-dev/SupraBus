import { AccountSettings } from '@/components/auth'

import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your account settings',
}

export default function AccountPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <AccountSettings />
    </div>
  )
}
