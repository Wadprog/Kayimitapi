import { useFormikContext } from 'formik'
import { FormGroup, label } from 'reactstrap'
import Select from 'react-select'

import Error from './Error'

export default function FormSelect({ name, options, onValueChange, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched } = useFormikContext()
  return (
    <FormGroup>
      <Select
        onBlur={() => setFieldTouched(name)}
        options={options}
        onChange={(e) => {
          if (onValueChange) onValueChange(e.value)
          setFieldValue(name, e.value)
        }}
        {...otherProps}
      />
      <Error error={errors[name]} visible={touched[name]} />
    </FormGroup>
  )
}
