'use client'

import { Toaster } from '~/components/ui'
import { ThemeProvider } from '~/components/utils/theme-provider'

import { ApiClientProvider } from './api-client-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApiClientProvider>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster richColors />
    </ApiClientProvider>
  )
}
