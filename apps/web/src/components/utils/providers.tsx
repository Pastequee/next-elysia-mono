import { Toaster } from '~/components/ui'
import { ThemeProvider } from '~/components/utils/theme-provider'
import { TRPCReactProvider } from '~/trpc/react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <TRPCReactProvider>{children}</TRPCReactProvider>
      <Toaster richColors />
    </ThemeProvider>
  )
}
