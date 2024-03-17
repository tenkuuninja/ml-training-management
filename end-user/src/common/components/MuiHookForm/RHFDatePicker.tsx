import {
  DatePicker,
  DatePickerProps,
  DateTimePicker,
  DateTimePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import _ from 'lodash'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

// @mui/x-date-pickers@6.14.0
type RHFDatePickerProps<TDate> = DatePickerProps<TDate> &
  React.RefAttributes<HTMLDivElement> & {
    name: string
    helperText?: string
  }

export function RHFDatePicker<TDate>({
  name,
  helperText,
  ...props
}: Omit<RHFDatePickerProps<TDate>, 'value' | 'onChange' | 'renderInput'>) {
  const { control, setValue } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            value={field?.value ? (dayjs(field?.value) as TDate) : null}
            onChange={(value) => setValue(name, value, { shouldValidate: true })}
            format="MM-DD-YYYY"
            {...props}
            slotProps={_.merge(props?.slotProps, {
              textField: {
                error: !!error,
                helperText: !!error ? error?.message : helperText || '',
              },
            })}
          />
        </LocalizationProvider>
      )}
    />
  )
}

type RHFDateTimePickerProps<TDate> = DateTimePickerProps<TDate> &
  React.RefAttributes<HTMLDivElement> & {
    name: string
    helperText?: string
  }

export function RHFDateTimePicker<TDate>({
  name,
  helperText,
  ...props
}: Omit<RHFDateTimePickerProps<TDate>, 'value' | 'onChange' | 'renderInput'>) {
  const { control, setValue } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            {...field}
            value={field?.value ? (dayjs(field?.value) as TDate) : null}
            onChange={(value) => setValue(name, value, { shouldValidate: true })}
            format="MM-DD-YYYY HH:mm"
            {...props}
            slotProps={_.merge(props?.slotProps, {
              textField: {
                error: !!error,
                helperText: !!error ? error?.message : helperText || '',
              },
            })}
          />
        </LocalizationProvider>
      )}
    />
  )
}
