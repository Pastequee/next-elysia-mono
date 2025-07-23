import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import type { Todo } from './get-todos.query'
import { todosQueryKeys } from './query-keys'

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await api.todos({ id }).delete()
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
    onMutate: (id) => {
      queryClient.cancelQueries({ queryKey: todosQueryKeys.list() })

      const previousTodos = queryClient.getQueryData<Todo[]>(
        todosQueryKeys.list()
      )

      queryClient.setQueryData(todosQueryKeys.list(), (old: Todo[]): Todo[] =>
        old.filter((todo) => todo.id !== id)
      )

      return { previousTodos }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(todosQueryKeys.list(), context?.previousTodos)
    },
  })
}
