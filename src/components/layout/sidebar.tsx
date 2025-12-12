'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bus, LayoutDashboard, Map, Users } from 'lucide-react'

import { cn } from '@/lib/utils'
import { FLEET_ROUTES } from '@/constants'

const navigation = [
  {
    name: 'Dashboard',
    href: FLEET_ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    name: 'Buses',
    href: FLEET_ROUTES.BUSES,
    icon: Bus,
  },
  {
    name: 'Drivers',
    href: FLEET_ROUTES.DRIVERS,
    icon: Users,
  },
  {
    name: 'Routes',
    href: FLEET_ROUTES.ROUTES,
    icon: Map,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-muted/30 md:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
