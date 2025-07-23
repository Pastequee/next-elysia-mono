'use client'

import { Loader2, Pencil, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'

import {
  type Todo,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '~/lib/hooks/todos'

import { Button, Checkbox, Label } from '../ui'

interface TodoItemProps {
  todo: Todo
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { isPending: isDeletingTodo, mutate: deleteTodoMutation } =
    useDeleteTodoMutation()
  const { isPending: isUpdatingTodo, mutate: updateTodoMutation } =
    useUpdateTodoMutation()

  const updateTodoStatus = (id: string, status: 'completed' | 'pending') => {
    updateTodoMutation({ id, status })
  }

  const deleteTodo = (id: string) => {
    deleteTodoMutation(id)
  }

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const content = inputRef.current?.value
    if (!content) {
      setIsEditing(false)
      return
    }
    updateTodoMutation({ id: todo.id, content })
    setIsEditing(false)
  }

  return (
    <div className="flex items-center gap-4" key={todo.id}>
      <div className="flex h-full min-w-0 flex-1 items-center gap-4">
        <Checkbox
          checked={todo.status === 'completed'}
          disabled={isUpdatingTodo}
          onCheckedChange={() => {
            updateTodoStatus(
              todo.id,
              todo.status === 'completed' ? 'pending' : 'completed'
            )
          }}
        />

        {isEditing ? (
          <form className="flex-1" onSubmit={handleUpdateSubmit}>
            <input
              autoFocus
              className="w-full font-semibold text-sm outline-none"
              defaultValue={todo.content}
              disabled={isUpdatingTodo}
              onBlur={() => {
                setIsEditing(false)
              }}
              ref={inputRef}
            />
          </form>
        ) : (
          <button
            className="group flex flex-1 flex-row items-center justify-between overflow-hidden"
            onClick={() => {
              setIsEditing(true)
            }}
            type="button"
          >
            <Label
              className="block truncate py-2.5 text-left font-semibold data-[status=completed]:line-through"
              data-status={todo.status}
            >
              {todo.content}
            </Label>

            <span className="ml-2 hidden shrink-0 group-hover:inline">
              <Pencil size={14} />
            </span>
          </button>
        )}
      </div>

      <Button
        disabled={isDeletingTodo}
        onClick={() => {
          deleteTodo(todo.id)
        }}
        size="icon"
        variant="destructive"
      >
        {isDeletingTodo ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <Trash2 size={20} />
        )}
      </Button>
    </div>
  )
}
