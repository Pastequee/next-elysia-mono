'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '~/trpc/react'
import { TodoItem } from './todo-item'

export const TodoList = () => {
  const trpc = useTRPC()
  const { data: todos } = useSuspenseQuery(trpc.todo.all.queryOptions())

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
