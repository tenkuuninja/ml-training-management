import React from 'react'
import { IMaskInput } from 'react-imask'

const PhoneMaskInput = React.forwardRef(function TextMaskCustom(props: any, ref) {
  const { onChange, ...other } = props
  return (
    <IMaskInput
      {...other}
      mask="000-000-0000"
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  )
})

export default PhoneMaskInput
