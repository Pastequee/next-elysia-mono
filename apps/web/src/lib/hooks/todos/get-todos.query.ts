import { queryOptions, useQuery } from '@tanstack/react-query'

import { FIVE_MINUTES } from '~/lib/constants/time'
import { api } from '~/lib/treaty'

import { todosQueryKeys } from './query-keys'

export type Todo = NonNullable<
  Awaited<ReturnType<typeof api.todos.get>>['data']
>[number]

export const todosOptions = queryOptions({
  queryFn: async () => {
    const { data, error } = await api.todos.get()

    if (error) {
      throw new Error('Failed to fetch todos')
    }

    return data
  },
  queryKey: todosQueryKeys.list(),
  staleTime: FIVE_MINUTES,
})

export const useGetTodosQuery = (options: { enabled?: boolean } = {}) => {
  return useQuery({ ...todosOptions, ...options })
}
