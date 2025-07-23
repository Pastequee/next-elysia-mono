import { env } from '~/lib/env'

export const getBaseApiUrl = () => {
  if (env.NEXT_PUBLIC_API_URL) {
    return env.NEXT_PUBLIC_API_URL
  }

  if (env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${env.NEXT_PUBLIC_VERCEL_URL}`
  }

  return 'http://localhost:3000'
}
