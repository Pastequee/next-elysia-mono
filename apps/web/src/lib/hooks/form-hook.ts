import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import { SubmitButton, TextField } from '~/components/ui/form-fields'

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: { TextField },
  fieldContext,
  formComponents: { SubmitButton },
  formContext,
})

export { useAppForm, useFieldContext, useFormContext }
