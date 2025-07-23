import { nextCookies } from 'better-auth/next-js'
import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({ plugins: [nextCookies()] })

export type AuthContext = typeof authClient.$Infer.Session

export const { signIn, signOut, signUp, useSession } = authClient
