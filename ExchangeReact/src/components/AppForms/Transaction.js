import { Col, Row, Label } from 'reactstrap'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

// Core components
import { Submit, Currency, Select, Field } from '../form'
import { postTransaction } from 'store/transaction'
import { customersList } from 'store/customers'


const ValidationSchema = Yup.object().shape({
  origin: Yup.number().required().label('*Amount To Change*'),
  xChangeRate: Yup.number().required().label('*Change Rate*'),
  transactionType: Yup.string().required().label('Transaction Type'),
})

const rates = {
  Vente: 54,
  Achat: 53,
}
const Transaction = () => {
  const dispatch = useDispatch()
  const ctx = useSelector(customersList)
  const options = [
    { value: 'Vente', label: 'USD TO HTG' },
    { value: 'Achat', label: 'HTG TO USD4' },
  ]

  const handleSubmit = (formData, formEvents) => {
    let data = formData
    if (ctx?.selectedCustomer)
      data = { ...formData, customer: ctx?.selectedCustomer?._id }
    formEvents.resetForm()
    return dispatch(postTransaction(data))
  }
  const calculateChangeValue = (transactionDetails) => {
    const { transactionType, xChangeRate, origin } = transactionDetails
    if (!transactionType || !xChangeRate || !origin) return 0
    if (transactionType === 'Vente') return xChangeRate * origin
    return origin / xChangeRate
  }
  const setTitle = (currentTransactionType, part) => {
    const parts = ['Origin', 'Destination']
    const selectedOption = options.find(
      (option) => option.value == currentTransactionType
    )
    console.log({ currentTransactionType, selectedOption })
    if (!selectedOption) return parts[part]
    return parts[part] + ' ' + selectedOption?.label.split('TO')[part]
  }
  return (
    <Formik
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
      initialValues={{
        origin: 0,
        xChangeRate: 0,
        transactionType: null,
      }}
    >
      {(props) => (
        <>
          <Row>
            <Col>
              <Select
                options={options}
                name="transactionType"
                onValueChange={(value) =>
                  props.setFieldValue('xChangeRate', rates[value])
                }
              />
            </Col>

            <Col>
              <Field
                placeholder="Rate"
                name="xChangeRate"
                value={props.values.xChangeRate}
                disabled={props.values.transactionType ? false : true}
                icon="fas fa-dollar-sign"
                appendText=".00"
                className="text-right"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Currency
                label={setTitle(props.values.transactionType, 0)}
                placeholder="Username"
                name="origin"
                disabled={props.values.transactionType ? false : true}
              />
            </Col>
            <Col>
              <Label>{setTitle(props.values.transactionType, 1)}</Label>
              <div className=" border border-success bg-primary pl-3 py-0 form-control pt-2 rounded text-white text-bold">
                <Currency
                  className="text-bold"
                  value={calculateChangeValue(props.values)}
                  displayType={'text'}
                  name="ToAmount"
                />
              </div>
            </Col>
          </Row>
          <Submit title="Save Transaction" />
        </>
      )}
    </Formik>
  )
}

export default Transaction
