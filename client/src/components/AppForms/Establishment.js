import * as Yup from 'yup';

import { Field, Form, Submit } from 'components/form';

const AdminForm = ({ handleSubmit }) => {
  const addEstablishment = (credentials) => console.log(credentials);
  
  return (
    <Form
      validationSchema={ValidationSchema}
      initialValues={{
        city: '',
        location: '',
      }}
      onSubmit={handleSubmit}
    >
      <Field
        autoFocus
        autoCapitalize="none"
        icon="ni ni-shop"
        placeholder="City"
        name="city"
        type="text"
      />
      <Field
        autoFocus
        autoCapitalize="none"
        icon="ni ni-shop"
        placeholder="Address"
        name="location"
        type="text"
      />

      <Submit title="Finish" />
    </Form>
  );
};
export default AdminForm;

const ValidationSchema = Yup.object().shape({
  city: Yup.string().required().min(2).label('City'),
  location: Yup.string().required().min(4).label('Address'),
});
