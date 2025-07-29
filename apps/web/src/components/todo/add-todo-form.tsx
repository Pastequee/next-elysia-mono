'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useTRPC } from '~/trpc/react'
import { Button, Input, Loader } from '../ui'

interface AddTodoFormProps {
  disabled?: boolean
}

export const AddTodoForm = ({ disabled = false }: AddTodoFormProps) => {
  const [newTodo, setNewTodo] = useState('')

  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const { isPending: isCreatingTodo, mutate: createTodoMutation } = useMutation(
    trpc.todo.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.todo.all.queryKey() })
      },
    })
  )

  const addTodo = () => {
    createTodoMutation(newTodo, {
      onSuccess: () => {
        setNewTodo('')
      },
    })
  }

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        addTodo()
      }}
    >
      <Input
        autoFocus
        disabled={disabled}
        onChange={(e) => {
          setNewTodo(e.target.value)
        }}
        placeholder="Add a new todo"
        value={newTodo}
      />
      <Button
        disabled={disabled || isCreatingTodo || newTodo.length === 0}
        type="submit"
      >
        Add
        {isCreatingTodo && <Loader />}
      </Button>
    </form>
  )
}
