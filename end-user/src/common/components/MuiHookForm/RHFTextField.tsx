import { TextField, TextFieldProps } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type RHFTextFieldProps = TextFieldProps & {
  name: string
}

export function RHFTextField({ name, helperText, ...props }: RHFTextFieldProps) {
  const { control, register } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            ref={register(field.name).ref}
            fullWidth
            error={!!error}
            helperText={!!error ? error?.message : helperText || ''}
            {...props}
          />
        </>
      )}
    />
  )
}
