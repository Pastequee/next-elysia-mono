'use client'

import { Root as LabelRoot } from '@radix-ui/react-label'
import type * as React from 'react'

import { cn } from '~/lib/utils'

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelRoot>) {
  return (
    <LabelRoot
      className={cn(
        'flex select-none items-center gap-1 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        className
      )}
      data-slot="label"
      {...props}
    />
  )
}

export { Label }
