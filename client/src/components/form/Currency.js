import NumberFormat from 'react-number-format';
import { useFormikContext } from 'formik';

import { FormGroup, Label } from 'reactstrap';

import Error from './Error';

function MoneyInput({ name, label, symbol, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched } =
    useFormikContext();

  return (
    <>
      <FormGroup>
        {label && <Label> {label}</Label>}
        <NumberFormat
          onBlur={() => setFieldTouched(name)}
          className="form-control text-dark border-success"
          decimalScale={2}
          allowNegative={false}
          thousandSeparator={true}
          prefix={symbol || '$ '}
          onValueChange={(values) => {
            setFieldValue(name, values.value);
          }}
          {...otherProps}
        />
        <Error error={errors[name]} visible={touched[name]} />
      </FormGroup>
    </>
  );
}

export default MoneyInput;
