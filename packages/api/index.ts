import { Elysia } from 'elysia'

import { authRouter } from './modules/auth'
import { todosRouter } from './modules/todos'

export const app = new Elysia({ prefix: '/api' })
  .use(authRouter)
  .use(todosRouter)
  .get('/health', () => 'ok')

export type App = typeof app
