import { redirect } from 'next/navigation'

import { FLEET_ROUTES } from '@/constants'

export default function Home() {
  redirect(FLEET_ROUTES.DASHBOARD)
}
