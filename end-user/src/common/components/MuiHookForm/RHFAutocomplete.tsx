import { Autocomplete, AutocompleteProps, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface RHFAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string
  label?: string
  placeholder?: string
  helperText?: React.ReactNode
}

export function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  helperText,
  ...props
}: Omit<RHFAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue, register } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(e, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              ref={register(field.name).ref}
              label={label}
              error={!!error}
              helperText={!!error ? error?.message : helperText || ''}
              placeholder={props?.placeholder}
              {...params}
            />
          )}
          {...props}
        />
      )}
    />
  )
}
