'use client'

import { type LucideIcon, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { cn } from '~/lib/utils'

import { Button } from './button'

type Theme = 'dark' | 'light' | 'system'

const themes: { icon: LucideIcon; value: Theme }[] = [
  { icon: Sun, value: 'light' },
  { icon: Moon, value: 'dark' },
  { icon: Monitor, value: 'system' },
] as const

export const ToggleThemeButton = () => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex rounded-full border border-input p-1">
      {themes.map((t) => (
        <Button
          className={cn(
            'rounded-full',
            t.value === theme && 'bg-accent text-accent-foreground'
          )}
          key={`theme-${t.value}-${String(mounted)}`}
          onClick={() => {
            setTheme(t.value)
          }}
          size="iconSmall"
          suppressHydrationWarning
          variant="ghost"
        >
          <t.icon size={16} />
        </Button>
      ))}
    </div>
  )
}
