import { Elysia, t } from 'elysia'

import { authMacro } from '../../auth'

import { createTodo, updateTodo } from './models'
import { Todos } from './service'

export const todosRouter = new Elysia()
  .use(authMacro)
  .get('/todos', ({ user }) => Todos.getUserTodos(user.id), { auth: true })
  .post(
    '/todos',
    async ({ body, status, user }) => {
      await Todos.createTodos(user.id, body)

      return status('OK')
    },
    { auth: true, body: createTodo }
  )
  .patch(
    '/todos/:id',
    async ({ body, params, status, user }) => {
      const todo = await Todos.getTodo(params.id)

      if (!todo) {
        return status('Not Found')
      }

      if (todo.userId !== user.id) {
        return status('Forbidden')
      }

      if (!body) {
        return status('OK')
      }

      await Todos.updateTodo(params.id, body)

      return status('OK')
    },
    { auth: true, body: updateTodo, params: t.Object({ id: t.String() }) }
  )
  .delete(
    '/todos/:id',
    async ({ params, status, user }) => {
      const todo = await Todos.getTodo(params.id)

      if (!todo) {
        return status('Not Found')
      }

      if (todo.userId !== user.id) {
        return status('Forbidden')
      }

      await Todos.deleteTodo(params.id)

      return status('OK')
    },
    { auth: true, params: t.Object({ id: t.String() }) }
  )
