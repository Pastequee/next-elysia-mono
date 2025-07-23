'use client'

import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import z from 'zod'

import { Alert, AlertTitle, PasswordInput } from '~/components/ui'
import { signUp } from '~/lib/auth-client'
import { useAppForm } from '~/lib/hooks/form-hook'

const formSchema = z.object({
  email: z.email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Must be at least 8 characters long'),
})

export const RegisterForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string>()

  const form = useAppForm({
    defaultValues: { email: '', name: '', password: '' },
    onSubmit: async ({ value }) => {
      await signUp.email(
        { email: value.email, name: value.name, password: value.password },
        {
          onSuccess: () => {
            router.replace('/auth/login')
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
          <field.TextField autoComplete="name" label="Name" />
        )}
        name="name"
      />

      <form.AppField
        children={(field) => (
          <field.TextField autoComplete="email" label="Email" type="email" />
        )}
        name="email"
      />

      <form.AppField
        children={(field) => (
          <field.TextField input={PasswordInput} label="Password" />
        )}
        name="password"
      />

      <form.AppForm>
        <form.SubmitButton label="Create account" />
      </form.AppForm>
    </form>
  )
}
