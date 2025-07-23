import { db } from '@repo/db'
import { todos } from '@repo/db/schemas'
import { asc, eq } from 'drizzle-orm'

import type { createTodo, updateTodo } from './models'

export const Todos = {
  getUserTodos: async (userId: string) => {
    return await db.query.todos.findMany({
      where: eq(todos.userId, userId),
      orderBy: [asc(todos.createdAt)],
    })
  },

  getTodo: async (todoId: string) => {
    return await db.query.todos.findFirst({ where: eq(todos.id, todoId) })
  },

  createTodos: async (userId: string, todo: createTodo) => {
    return await db.insert(todos).values({ userId, ...todo })
  },

  updateTodo: async (todoId: string, todo: updateTodo) => {
    return await db.update(todos).set(todo).where(eq(todos.id, todoId))
  },

  deleteTodo: async (todoId: string) => {
    return await db.delete(todos).where(eq(todos.id, todoId))
  },
}
