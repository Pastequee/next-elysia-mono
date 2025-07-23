import { treaty } from '@elysiajs/eden'
import type { App } from '@repo/api'
import { isServer } from '@tanstack/react-query'

import { getBaseApiUrl } from './utils/get-base-api-url'

export const api = treaty<App>(getBaseApiUrl(), {
  onRequest: async () => {
    if (!isServer) {
      return
    }

    const { headers } = await import('next/headers')

    const headerList = await headers()

    return { headers: headerList }
  },
}).api

export type TreatyClient = typeof api
