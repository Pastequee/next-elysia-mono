import { getSession } from '~/lib/actions/get-session'

export const UserInfos = async () => {
  const session = await getSession()

  return <div>{session?.user.name}</div>
}
