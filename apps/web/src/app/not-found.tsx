import { Undo2 } from 'lucide-react'

import { LinkButton } from '~/components/ui'

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-5xl">404</h1>
      <p className="text-2xl">Page Not Found</p>
      <LinkButton href="/">
        <Undo2 />
        Go to homepage
      </LinkButton>
    </main>
  )
}
