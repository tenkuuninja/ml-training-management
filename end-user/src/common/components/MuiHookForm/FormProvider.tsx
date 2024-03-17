import { FC, useEffect } from 'react'
import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

interface FormProviderProps {
  children: React.ReactNode
  methods: UseFormReturn<any>
  onSubmit?: VoidFunction
  className?: string
  [key: string]: any
}

export const FormProvider: FC<FormProviderProps> = ({
  children,
  onSubmit,
  methods,
  className = '',
  ...props
}) => {
  const {
    setFocus,
    formState: { errors },
  } = methods

  useEffect(() => {
    const firstError = Object.keys(errors).reduce((field: any, a) => {
      return !!errors[field] ? field : a
    }, null)

    if (firstError) {
      setFocus(firstError)
    }
  }, [errors, setFocus])

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className} {...props}>
        {children}
      </form>
    </Form>
  )
}
