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

export const authRouter = new Elysia({ name: 'better-auth' })
  .mount(auth.handler)
  .use(authMacro)
  .get('/auth/session', ({ session, user }) => ({ session, user }), {
    auth: true,
  })
