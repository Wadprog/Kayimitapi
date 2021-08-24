import { Formik } from 'formik'
import { Form } from 'reactstrap'
function FormWrapper(props) {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}
    >
      {() => <Form role="form">{props.children}</Form>}
    </Formik>
  )
}

export default FormWrapper
