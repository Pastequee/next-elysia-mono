import { type QueryClient, queryOptions, useQuery } from '@tanstack/react-query'

import { getSession } from '~/lib/actions/get-session'
import { FIVE_MINUTES } from '~/lib/constants/time'

import { authQueryKeys } from './query-keys'

const sessionOptions = queryOptions({
  queryFn: () => getSession(),
  queryKey: authQueryKeys.session,
  staleTime: FIVE_MINUTES,
})

export const useGetSessionQuery = () => {
  return useQuery(sessionOptions)
}

export const prefetchSession = (queryClient: QueryClient) =>
  queryClient.prefetchQuery(sessionOptions)
