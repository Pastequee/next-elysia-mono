import { nextCookies } from 'better-auth/next-js'
import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({ plugins: [nextCookies()] })

export const { signIn, signOut, signUp } = authClient
