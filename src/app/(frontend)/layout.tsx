import { NavHeader, Sidebar } from '@/components/layout'
import { QueryProvider } from '@/providers'

import type { ReactNode } from 'react'

export const dynamic = 'force-dynamic'

export default function FleetLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <div className="min-h-screen">
        <NavHeader />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </QueryProvider>
  )
}
