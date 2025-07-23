import { Loader2 } from 'lucide-react'

import { cn } from '~/lib/utils'

export const Loader = ({
  className,
  ...props
}: React.ComponentProps<typeof Loader2>) => {
  return <Loader2 className={cn('animate-spin', className)} {...props} />
}
