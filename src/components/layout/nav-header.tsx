'use client'

import Link from 'next/link'
import { Bus, LogOut, Menu, User } from 'lucide-react'

import { useAuth } from '@/hooks'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FLEET_ROUTES } from '@/constants'

const navigation = [
  { name: 'Dashboard', href: FLEET_ROUTES.DASHBOARD },
  { name: 'Buses', href: FLEET_ROUTES.BUSES },
  { name: 'Drivers', href: FLEET_ROUTES.DRIVERS },
  { name: 'Routes', href: FLEET_ROUTES.ROUTES },
]

export function NavHeader() {
  const { user, signOut, isSigningOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-14 items-center border-b px-4">
              <Link
                href={FLEET_ROUTES.DASHBOARD}
                className="flex items-center gap-2 font-semibold"
              >
                <Bus className="h-5 w-5" />
                Fleet Manager
              </Link>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link
          href={FLEET_ROUTES.DASHBOARD}
          className="flex items-center gap-2 font-semibold"
        >
          <Bus className="h-5 w-5" />
          <span className="hidden md:inline">Fleet Manager</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Account Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  disabled={isSigningOut}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href="/auth/signin">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
