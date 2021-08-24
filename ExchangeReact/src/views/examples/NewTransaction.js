import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
// core components
import AddCustomer from 'components/AddCustomerForm'
import Header from 'components/Headers/SimpleHeader'
import TransactionForm from 'components/AppForms/Transaction'
import TransactionsList from '../../components/TransactionList'
import { useDispatch, useSelector } from 'react-redux'
import { transactions } from '../../store/transaction'
import { customersList, getCustomers, selectedCustomer } from 'store/customers'
import QueryCustomer from 'components/QueryCustomer'
import useToggle from 'hooks/useToggle'
const Tables = () => {
  const dispatch = useDispatch()
  const customers = useSelector(customersList)
  const [modal, toggleModal] = useToggle(false)
  const removeSelectedCustomer = () => dispatch(selectedCustomer(null))
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        <Row className="mb-4">
          <div className="col">
            <QueryCustomer />
          </div>
        </Row>

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">New Transaction</h3>
                <small>This transaction is for </small>

                <small>
                  {customers?.selectedCustomer ? (
                    <span className="d-flex justify-content-between">
                      <span>
                        <b>{customers.selectedCustomer?.firstName}</b>
                        <sup>
                          <i
                            className="fa fa-info-circle text-success"
                            onClick={toggleModal}
                          ></i>
                        </sup>
                      </span>
                      <i
                        className="fa fa-times-circle text-danger"
                        onClick={removeSelectedCustomer}
                      ></i>
                    </span>
                  ) : (
                    'No Particular customer'
                  )}
                </small>
              </CardHeader>
              <CardBody>
                <TransactionForm />
              </CardBody>
            </Card>
          </div>
        </Row>

        {/* Dark table */}
        <Row className="mt-5">
          <div className="col rounded">
            <TransactionsList />
          </div>
        </Row>

        <Modal isOpen={modal} toggle={toggleModal} className="">
          <ModalHeader toggle={toggleModal}>Customer Information</ModalHeader>
          <ModalBody>
            <AddCustomer ediCustomer={customers.selectedCustomer} />
          </ModalBody>
        </Modal>
      </Container>
    </>
  )
}

export default Tables
