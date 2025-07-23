'use client'

import { useGetTodosQuery } from '~/lib/hooks/todos'

import { TodoItem } from './todo-item'

interface TodoListProps {
  hasSession?: boolean
}

export const TodoList = ({ hasSession }: TodoListProps) => {
  const { data: todos = [] } = useGetTodosQuery({ enabled: hasSession })

  if (todos.length === 0) {
    return
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
