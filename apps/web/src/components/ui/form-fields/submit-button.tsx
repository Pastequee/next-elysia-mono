'use client'

import { useFormContext } from '~/lib/hooks/form-hook'

import { Button } from '../button'
import { Loader } from '../loader'

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  label: string
}

export const SubmitButton = ({
  disabled,
  label,
  ...props
}: SubmitButtonProps) => {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
      {([isSubmitting, canSubmit]) => (
        <Button
          disabled={!canSubmit || isSubmitting || disabled}
          type="submit"
          {...props}
        >
          {label}
          {isSubmitting && <Loader className="ml-2" />}
        </Button>
      )}
    </form.Subscribe>
  )
}
