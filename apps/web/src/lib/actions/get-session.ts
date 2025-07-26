'use server'

import { auth } from '@repo/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return session
})

export const getSessionOrRedirect = cache(async () => {
  const data = await getSession()

  if (!data) {
    redirect('/auth/login')
  }

  return data
})
