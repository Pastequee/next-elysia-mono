'use client'

import { ArrowRight } from 'lucide-react'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'

import { LinkButton } from '../ui'

interface NavbarLinkProps {
  children: React.ReactNode
  href: Route
}

export const NavbarLink = ({ children, href }: NavbarLinkProps) => {
  const pathname = usePathname()

  if (pathname === href) {
    return
  }

  return (
    <LinkButton href={href}>
      {children}
      <ArrowRight />
    </LinkButton>
  )
}
