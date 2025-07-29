'use client'

import type { AppRouter } from '@repo/api'
import type { QueryClient } from '@tanstack/react-query'
import { isServer, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchStreamLink, loggerLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import { useState } from 'react'
import SuperJSON from 'superjson'

import { env } from '~/lib/env'
import { createQueryClient } from './query-client'

let clientQueryClientSingleton: QueryClient | undefined
const getQueryClient = () => {
  if (isServer) {
    // Server: always make a new query client
    return createQueryClient()
  }

  // Browser: use singleton pattern to keep the same query client
  clientQueryClientSingleton ??= createQueryClient()

  return clientQueryClientSingleton
}

export const { useTRPC, TRPCProvider } = createTRPCContext<AppRouter>()

const getBaseUrl = () => {
  if (!isServer) {
    return window.location.origin
  }

  if (env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${env.NEXT_PUBLIC_VERCEL_URL}`
  }

  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const TRPCReactProvider = (props: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Headers()
            headers.set('x-trpc-source', 'nextjs-react')
            return headers
          },
        }),
      ],
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
