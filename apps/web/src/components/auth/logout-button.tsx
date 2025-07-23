'use client'

import { useRouter } from 'next/navigation'

import { Button } from '~/components/ui/button'
import { signOut } from '~/lib/auth-client'

export const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.replace('/auth/login')
  }

  return <Button onClick={handleLogout}>Logout</Button>
}
