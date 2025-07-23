import { getSession } from '~/lib/actions/get-session'

interface LoggedOutProps {
  children: React.ReactNode
}

export const LoggedOut = async ({ children }: LoggedOutProps) => {
  const session = await getSession()

  const isLoggedIn = !!session

  if (isLoggedIn) {
    return
  }

  return <>{children}</>
}
