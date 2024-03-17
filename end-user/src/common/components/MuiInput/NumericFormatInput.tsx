import { forwardRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
  value: any
}

const NumericFormatInput = forwardRef(function NumericFormatInput(props: any, ref) {
  const { onChange, value, decimalScale = 0, thousandSeparator = true, ...other } = props

  return (
    <NumericFormat
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      decimalScale={decimalScale}
      thousandSeparator={thousandSeparator}
      value={value === '' ? '' : value}
      {...other}
    />
  )
})

export default NumericFormatInput
