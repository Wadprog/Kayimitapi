// Redux hooks
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

// Core Components
import { Field, Form, Submit, Currency } from './form';
import { postRate } from '../store/rates';

// Validation Components
const ValidationSchema = Yup.object().shape({
  buyingValue: Yup.number().required().min(2).label('Buying Rate'),
  sellingValue: Yup.number().required().min(2).label('Selling Rate'),
  buyingLabel: Yup.string().required().label('Buying Label'),
  sellingLabel: Yup.string().required().label('Selling Label'),
});

const RateForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (rates) => dispatch(postRate(rates));

  console.log('hey man');
  return (
    <Form
      validationSchema={ValidationSchema}
      initialValues={{
        sellingLabel: 'Vente',
        buyingLabel: 'Achat',
        buyingValue: 0,
        sellingValue: 0,
      }}
      onSubmit={handleSubmit}
    >
      <Currency
        label={'Taux achat'}
        autoFocus
        placeholder="Buying Rate"
        name="buyingValue"
        symbol="HTG "
      />

      <Currency
        label={'Taux vente'}
        placeholder="Vente"
        name="sellingValue"
        symbol="USD "
      />
      <Field
        icon="ni ni-shop"
        placeholder="Selling Label"
        name="sellingLabel"
      />
      <Field icon="ni ni-shop" placeholder="Buying Label" name="buyingLabel" />

      <Submit title="Save" />
    </Form>
  );
};

export default RateForm;
