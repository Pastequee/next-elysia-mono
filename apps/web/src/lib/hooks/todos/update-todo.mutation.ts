import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Todo } from './get-todos.query'
import { todosQueryKeys } from './query-keys'

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      ...todo
    }: {
      content?: string
      id: string
      status?: 'completed' | 'pending'
    }) => {
      const { error } = await api.todos({ id }).patch(todo)
      if (error) {
        switch (error.status) {
          case 422:
            throw new Error('Parsing error', { cause: error.value })
          default:
            throw new Error(error.value)
        }
      }
      return
    },
    onMutate: ({ id, ...data }) => {
      queryClient.cancelQueries({ queryKey: todosQueryKeys.list() })

      const previousTodos = queryClient.getQueryData<Todo[]>(
        todosQueryKeys.list()
      )

      queryClient.setQueryData(todosQueryKeys.list(), (old: Todo[]): Todo[] =>
        old.map((todo) => {
          if (todo.id === id) {
            return { ...todo, ...data }
          }
          return todo
        })
      )

      return { previousTodos }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(todosQueryKeys.list(), context?.previousTodos)
    },
  })
}
