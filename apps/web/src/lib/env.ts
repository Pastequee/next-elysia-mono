/** biome-ignore-all lint/suspicious/noConsole: skip for now */

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_URL: z.url().optional(),
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
    NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
  },

  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NODE_ENV: process.env.NODE_ENV,
  },

  emptyStringAsUndefined: true,
})
