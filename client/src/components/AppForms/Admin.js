import * as Yup from 'yup';
import { Field, Form, Submit } from 'components/form';

const AdminForm = ({ handleSubmit }) => {
  return (
    <Form
      validationSchema={ValidationSchema}
      initialValues={{
        username: '',
        password: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        isAdmin: true,
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

      <Submit title="Next" />
    </Form>
  );
};
export default AdminForm;

const ValidationSchema = Yup.object().shape({
  username: Yup.string().required().min(2).label('UserName'),
  password: Yup.string().required().min(4).label('password'),
  firstName: Yup.string().required().min(2).label('First name'),
  middleName: Yup.string().label('First name'),
  lastName: Yup.string().required().min(2).label('Last name'),
  email: Yup.string().email().required().min(2).label('Last name'),
  isAdmin: Yup.boolean().required().label('Is Admin'),
});
