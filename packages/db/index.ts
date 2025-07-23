/** biome-ignore-all lint/performance/noNamespaceImport: not a problem here */

import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import { env } from './env'

import * as tables from './schemas'

if (env.NODE_ENV === 'development') {
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] =
      host === 'db.localtest.me' ? ['http', 4444] : ['https', 443]
    return `${protocol}://${host}:${port}/sql`
  }
}

export const db = drizzle({
  client: neon(env.DATABASE_URL),
  schema: tables,
})
