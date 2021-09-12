import { useEffect } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';

import { Form, Field, Submit, CheckBox, Select } from 'components/form';
import { getEstablishments, establishmentList } from 'store/establishment';

function AddUser({ handleSubmit }) {
  const dispatch = useDispatch();
  const establishments = useSelector(establishmentList);
  useEffect(() => {
    dispatch(getEstablishments());
  }, []);
  return (
    <>
      {establishments.loading ? (
        <Spinner />
      ) : (
        <Form
          validationSchema={ValidationSchema}
          initialValues={{
            username: '',
            password: '',
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            establishments: [],
            isAdmin: false,
          }}
          onSubmit={handleSubmit}
        >
          <Field
            autoFocus
            autoCapitalize="none"
            icon="ni ni-shop"
            placeholder="First Name"
            name="firstName"
            type="text"
          />
          <Field
            autoFocus
            autoCapitalize="none"
            icon="ni ni-shop"
            placeholder="Middle Name"
            name="middleName"
            type="text"
          />
          <Field
            autoFocus
            autoCapitalize="none"
            icon="ni ni-shop"
            placeholder="Last Name"
            name="lastName"
            type="text"
          />

          <Field
            autoCapitalize="none"
            icon="ni ni-email-83"
            placeholder="Email"
            name="email"
            type="text"
            autoComplete="new-email"
          />
          <Field
            autoFocus
            autoCapitalize="none"
            icon="ni ni-shop"
            placeholder="User name"
            name="username"
            type="text"
          />
          <Field
            autoCapitalize="none"
            autoCorrect="false"
            icon="ni ni-lock-circle-open"
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="new-email"
          />
          <Select
            icon="ni ni-shop"
            placeholder=" Assign Establishments"
            isMulti
            name="establishments"
            options={establishments.list.map((establishment) => ({
              label: establishment.city,
              value: establishment._id,
            }))}
          />
          <CheckBox label="Admin" name="isAdmin" type="checkbox" />

          <Submit title="Add" />
        </Form>
      )}
    </>
  );
}

export default AddUser;

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required().min(2).label('UserName'),
  password: Yup.string().required().min(4).label('password'),
  firstName: Yup.string().required().min(2).label('First name'),
  middleName: Yup.string().label('First name'),
  lastName: Yup.string().required().min(2).label('Last name'),
  email: Yup.string().email().required().min(2).label('Last name'),
  establishments: Yup.array().label('Est'),
  isAdmin: Yup.boolean().required().label('Is Admin'),
});
