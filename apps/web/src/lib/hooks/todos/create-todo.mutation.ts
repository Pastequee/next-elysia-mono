import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '~/lib/treaty'

import { todosQueryKeys } from './query-keys'

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (content: string) => {
      const { error } = await api.todos.post({ content })

      if (error) {
        throw new Error('Bad request', { cause: error.value })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryKeys.list() })
    },
  })
}
