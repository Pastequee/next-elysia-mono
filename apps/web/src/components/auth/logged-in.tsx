import { getSession } from '~/lib/actions/get-session'

interface LoggedInProps {
  children: React.ReactNode
}

export const LoggedIn = async ({ children }: LoggedInProps) => {
  const session = await getSession()

  const isLoggedIn = !!session

  if (!isLoggedIn) {
    return
  }

  return <>{children}</>
}
