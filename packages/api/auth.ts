import { auth } from '@repo/auth'
import Elysia from 'elysia'

export const authMacro = new Elysia().macro({
  auth: {
    async resolve({ request: { headers }, status }) {
      const session = await auth.api.getSession({ headers })

      if (!session) {
        return status(401)
      }

      return { session: session.session, user: session.user }
    },
  },
})
