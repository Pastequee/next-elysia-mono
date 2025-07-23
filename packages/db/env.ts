import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

// console.log(process.env)

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
})
