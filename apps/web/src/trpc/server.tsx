import type { AppRouter } from '@repo/api'
import { appRouter, createTRPCContext } from '@repo/api'
import { auth } from '@repo/auth'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import {
  createTRPCOptionsProxy,
  type TRPCQueryOptions,
} from '@trpc/tanstack-react-query'
import { headers } from 'next/headers'
import { cache } from 'react'

import { createQueryClient } from './query-client'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers())
  heads.set('x-trpc-source', 'rsc')

  return createTRPCContext({
    headers: heads,
    auth,
  })
})

const getQueryClient = cache(createQueryClient)

export const trpc = createTRPCOptionsProxy<AppRouter>({
  router: appRouter,
  ctx: createContext,
  queryClient: getQueryClient,
})

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  )
}

// biome-ignore lint/suspicious/noExplicitAny: test
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T
) {
  const queryClient = getQueryClient()
  if (queryOptions.queryKey[1]?.type === 'infinite') {
    // biome-ignore lint/suspicious/noExplicitAny: test
    queryClient.prefetchInfiniteQuery(queryOptions as any)
  } else {
    queryClient.prefetchQuery(queryOptions)
  }
}
