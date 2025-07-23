'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useReducer } from 'react'

import { cn } from '~/lib/utils'

import { Input } from './input'

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  containerClassName?: string
}

export const PasswordInput = ({
  className,
  containerClassName,
  autoComplete,
  ...props
}: PasswordInputProps) => {
  const [showPassword, toggleShowPassword] = useReducer((prev) => !prev, false)

  return (
    <div className={cn(containerClassName, 'relative')}>
      <Input
        {...props}
        autoComplete={autoComplete ?? 'new-password'}
        className={cn(className, 'pr-8')}
        type={showPassword ? 'text' : 'password'}
      />
      <button
        className="-translate-y-1/2 absolute top-1/2 right-2 p-1"
        onClick={toggleShowPassword}
        type="button"
      >
        {showPassword ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
      </button>
    </div>
  )
}
