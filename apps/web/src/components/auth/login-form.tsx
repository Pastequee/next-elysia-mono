'use client'

import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import z from 'zod'

import { Alert, AlertTitle, PasswordInput } from '~/components/ui'
import { signIn } from '~/lib/auth-client'
import { useAppForm } from '~/lib/hooks/form-hook'

const formSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string>()

  const form = useAppForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      await signIn.email(
        { email: value.email, password: value.password },
        {
          onSuccess: () => {
            router.replace('/')
          },
          onError: (e) => {
            setError(e.error.message)
          },
        }
      )
    },
    validators: { onChange: formSchema, onMount: formSchema },
  })

  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      {error && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <form.AppField
        children={(field) => (
          <field.TextField autoComplete="email" label="Email" type="email" />
        )}
        name="email"
      />

      <form.AppField
        children={(field) => (
          <field.TextField
            autoComplete="current-password"
            input={PasswordInput}
            label="Password"
          />
        )}
        name="password"
      />

      <form.AppForm>
        <form.SubmitButton label="Sign in" />
      </form.AppForm>
    </form>
  )
}
