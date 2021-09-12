import { useFormikContext } from 'formik';

import { FormGroup, Input, Label } from 'reactstrap';

import Error from './Error';

function CheckBox({ name, icon, label, ...otherProps }) {
  const { values, setFieldTouched, handleChange, errors, touched } =
    useFormikContext();
  return (
    <FormGroup check className="mb-2">
      <Label check>
        <Input
          value={values[name]}
          checked={values[name]}
          type="checkbox"
          id="checkbox2"
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          {...otherProps}
        />{' '}
        {label}
      </Label>

      <Error error={errors[name]} visible={touched[name]} />
    </FormGroup>
  );
}
export default CheckBox;
