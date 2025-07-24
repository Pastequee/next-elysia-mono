import { todoStatus } from '@repo/db/schemas'
import { t } from 'elysia'

export const createTodo = t.Object({ content: t.String() })

export type createTodo = typeof createTodo.static

export const updateTodo = t.Optional(
  t.Object({
    content: t.Optional(t.String()),
    status: t.Optional(
      t.Union([
        t.Literal(todoStatus.enumValues[0]),
        t.Literal(todoStatus.enumValues[1]),
      ])
    ),
  })
)

export type updateTodo = typeof updateTodo.static
