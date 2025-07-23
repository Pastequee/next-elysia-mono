import { LogoutButton } from '~/components/auth/logout-button'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { getSessionOrRedirect } from '~/lib/actions/get-session'

const AccountPage = async () => {
  const session = await getSessionOrRedirect()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-2">
        <h1>Account</h1>
        <p>User: {session.user.email}</p>
        <LogoutButton />
      </main>
      <Footer />
    </div>
  )
}

export default AccountPage
