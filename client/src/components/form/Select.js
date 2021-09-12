import { useFormikContext } from 'formik';
import { FormGroup, label } from 'reactstrap';
import Select from 'react-select';

import Error from './Error';

export default function FormSelect({
  name,
  options,
  onValueChange,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, errors, touched } =
    useFormikContext();
  const handleMultiValue = (e) => {
    const values = [];
    for (let value of e) {
      values.push(value.value);
    }
    return values;
  };
  return (
    <FormGroup>
      <Select
        onBlur={() => setFieldTouched(name)}
        options={options}
        onChange={(e) => {
          console.log();
          if (onValueChange) onValueChange(e.value);
          if (!Array.isArray(e)) return setFieldValue(name, e.value);
          else return setFieldValue(name, handleMultiValue(e));
        }}
        {...otherProps}
      />
      <Error error={errors[name]} visible={touched[name]} />
    </FormGroup>
  );
}
