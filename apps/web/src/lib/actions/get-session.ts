'use server'

import type { Session, User } from 'better-auth'
import { redirect } from 'next/navigation'
import { cache } from 'react'

import { api } from '~/lib/treaty'

export interface UserSession {
  session: Session
  user: User
}

export const getSession = cache(async (): Promise<null | UserSession> => {
  const { data } = await api.auth.session.get()

  return data
})

export const getSessionOrRedirect = async () => {
  const data = await getSession()

  if (!data) {
    redirect('/auth/sign-in')
  }

  return data
}
