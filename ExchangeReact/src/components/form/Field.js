import { useFormikContext } from 'formik'

import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap'

import Error from './Error'

function FormField({ name, icon, appendText, ...otherProps }) {
  const { values,setFieldTouched, handleChange, errors, touched } =
    useFormikContext()

  return (
    <>
      <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            value={values[name]}
            onBlur={() => setFieldTouched(name)}
            onChange={handleChange(name)}
            {...otherProps}
          />
          {appendText && (
            <InputGroupAddon addonType="apend">
              <InputGroupText>{appendText}</InputGroupText>
            </InputGroupAddon>
          )}
        </InputGroup>
        <Error error={errors[name]} visible={touched[name]} />
      </FormGroup>
    </>
  )
}

export default FormField
