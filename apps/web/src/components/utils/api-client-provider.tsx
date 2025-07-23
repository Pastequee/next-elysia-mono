import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { cache, type PropsWithChildren } from 'react'

let clientQueryClientSingleton: QueryClient | undefined

const getServerQueryClient = cache(createQueryClient)

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        shouldRedactErrors: () => false,
      },
      queries: { retry: false, staleTime: 30 * 1000 },
    },
  })
}

export const getQueryClient = () => {
  if (isServer) {
    return getServerQueryClient()
  }

  clientQueryClientSingleton ??= createQueryClient()

  return clientQueryClientSingleton
}

export const ApiClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
