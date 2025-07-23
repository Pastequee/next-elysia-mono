import { getSessionCookie } from 'better-auth/cookies'
import type { Route } from 'next'
import { type NextRequest, NextResponse } from 'next/server'

const LOGIN_URL: Route = '/auth/login'

export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)

  if (!sessionCookie) {
    return NextResponse.redirect(new URL(LOGIN_URL, request.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/private'] }
