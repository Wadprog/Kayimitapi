import * as Yup from 'yup'
import { Form, Field, Submit } from './form'
import { useDispatch } from 'react-redux'
import { createCustomer, editCustomer } from 'store/customers'

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(2).label('First Name'),
  lastName: Yup.string().required().min(4).label('Last name'),
  middleName: Yup.string().label('Middle Name'),
  birthDate: Yup.date().label('Birthday'),
  idNumber: Yup.string().label('Id Number'),
  telephone: Yup.string().label('Telephone Number'),
  address: Yup.string().label('Address'),
  idType: Yup.string().label('Id Type'),
})
export default function AddCustomerForm({ ediCustomer }) {
  const dispatch = useDispatch()

  const handleAddNewCustomer = (customerInfo) => {
    console.log({ customerInfo })
    if (ediCustomer)
      return dispatch(editCustomer({ ...customerInfo, _id: ediCustomer._id }))
    dispatch(createCustomer(customerInfo))
  }
  return (
    <Form
      validationSchema={ValidationSchema}
      initialValues={{
        firstName: ediCustomer ? ediCustomer?.firstName : '',
        middleName: ediCustomer ? ediCustomer?.middleName : '',
        lastName: ediCustomer ? ediCustomer?.lastName : '',
        birthDate: ediCustomer ? ediCustomer?.birthDate : '',
        idNumber: ediCustomer ? ediCustomer?.idNumber : '',
        telephone: ediCustomer ? ediCustomer?.telephone : '',
        address: ediCustomer ? ediCustomer?.address : '',
        idType: ediCustomer ? ediCustomer?.idType : '',
      }}
      onSubmit={handleAddNewCustomer}
    >
      <Field
        autoCorrect={false}
        icon="ni ni-shop"
        placeholder="First Name"
        name="firstName"
        type="text"
      />

      <Field
        autoCorrect={false}
        icon="ni ni-email-83"
        placeholder="MiddleName"
        name="middleName"
        type="text"
      />
      <Field
        autoCorrect={false}
        icon="ni ni-lock-circle-open"
        placeholder="Last Name"
        name="lastName"
        type="text"
      />

      <Field
        autoCorrect={false}
        icon="ni ni-lock-circle-open"
        placeholder="Date of Birth"
        name="birthDate"
        type="Date"
      />
      <Field
        autoCorrect={false}
        icon="ni ni-lock-circle-open"
        placeholder="Id number"
        name="idNumber"
        type="text"
      />
      <Field
        autoCorrect={false}
        icon="ni ni-lock-circle-open"
        placeholder="Telephone number"
        name="telephone"
        type="text"
      />
      <Field
        autoCorrect={false}
        icon="ni ni-lock-circle-open"
        placeholder="Street address"
        name="address"
        type="text"
      />
      <Field
        autoCorrect={false}
        icon="ni ni-lock-circle-open"
        placeholder="Type of Id"
        name="idType"
        type="text"
      />

      <Submit title="Add New Customer" />
    </Form>
  )
}
