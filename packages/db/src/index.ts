/** biome-ignore-all lint/performance/noNamespaceImport: not a problem here */

import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from './env'
import * as tables from './schemas'

const isDev = env.NODE_ENV === 'development'

export const db = isDev
  ? drizzlePg({
      client: new Pool({ connectionString: env.DATABASE_URL }),
      schema: tables,
    })
  : drizzleNeon({
      client: neon(env.DATABASE_URL),
      schema: tables,
    })
