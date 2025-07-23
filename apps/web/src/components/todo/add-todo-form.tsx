'use client'

import { useState } from 'react'

import { useCreateTodoMutation } from '~/lib/hooks/todos'

import { Button, Input, Loader } from '../ui'

interface AddTodoFormProps {
  disabled?: boolean
}

export const AddTodoForm = ({ disabled = false }: AddTodoFormProps) => {
  const [newTodo, setNewTodo] = useState('')
  const { isPending: isCreatingTodo, mutate: createTodoMutation } =
    useCreateTodoMutation()

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
