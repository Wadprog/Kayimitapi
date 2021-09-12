import { Formik } from 'formik';
import { Form } from 'reactstrap';
function FormWrapper({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  ...otherProps
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form role="form" {...otherProps}>
          {children}
        </Form>
      )}
    </Formik>
  );
}

export default FormWrapper;
