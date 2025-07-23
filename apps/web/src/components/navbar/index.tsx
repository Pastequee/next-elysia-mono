import Link from 'next/link'

import { LoggedIn, LoggedOut } from '~/components/auth'
import { ToggleThemeButton } from '~/components/ui'
import { NavbarLink } from './navbar-link'

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-center gap-4 bg-background p-4">
      <nav className="flex max-w-7xl flex-1 items-center justify-end gap-4">
        <Link className="mr-auto font-bold text-2xl" href="/">
          Awesome Todo App
        </Link>
        <ToggleThemeButton />
        <LoggedOut>
          <div className="flex gap-2">
            <NavbarLink href="/auth/login">Login</NavbarLink>
            <NavbarLink href="/auth/register">Register</NavbarLink>
          </div>
        </LoggedOut>
        <LoggedIn>
          <NavbarLink href="/account">Account</NavbarLink>
        </LoggedIn>
      </nav>
    </header>
  )
}
