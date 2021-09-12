import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { customersList, getCustomers, selectedCustomer } from 'store/customers'

import MaterialTable from 'material-table'
import { useState, useEffect } from 'react'
import AddCustomer from './AddCustomerForm'
import useToggle from 'hooks/useToggle'

let data = []

export default function QueryCustomer() {
  const dispatch = useDispatch()
  const customers = useSelector(customersList)
  // because data from redux is unmodifiable
  data = customers.list?.map((customer) => ({ ...customer, t: {} }))

  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  const [filteredList, SetFilteredList] = useState([])
  const [searchedTerm, setSearchedTerm] = useState('')
  const [modal, toggleModal] = useToggle(false)

  const handleListFilter = (e) => {
    SetFilteredList([])
    setSearchedTerm(e.target.value)
    const searchedTerm = e.target.value
    if (!searchedTerm?.length) return SetFilteredList([])
    const filtered = data?.filter((data) =>
      data.firstName.toLowerCase().includes(searchedTerm.toLowerCase())
    )
    if (filtered?.length) return SetFilteredList(filtered)
  }

  const cancelSearch = () => {
    SetFilteredList([])
    setSearchedTerm('')
  }
  const handleCustomerSelected = (event, ctx) => {
    dispatch(selectedCustomer(ctx))
    cancelSearch()
  }
  return (
    <div style={{ width: '100%' }}>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fa fa-search"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            value={searchedTerm}
            placeholder="Search customer by name or id number"
            onChange={handleListFilter}
          />
        </InputGroup>

        <a
          onClick={toggleModal}
          className={`text-center d-${
            !filteredList.length && searchedTerm.length ? '' : 'none'
          }`}
        >
          This customer does not exist
          <b href="#" role="button" className="  text-bold">
            click here
          </b>
          to register all its details
        </a>
      </FormGroup>

      <div className={`d-${filteredList.length ? '' : 'none'}`}>
        <hr />
        <Card>
          <MaterialTable
            onRowClick={handleCustomerSelected}
            options={{
              toolbar: false,
              paging: false,
            }}
            columns={[
              {
                title: 'First name',
                field: 'firstName',
              },
              { title: 'Last name', field: 'lastName' },
              { title: 'Middle name', field: 'middleName' },
              { title: 'Id number ', field: 'idNumber' },
              { title: 'Id Type', field: 'idType' },
            ]}
            data={filteredList}
          />
        </Card>
      </div>

      <Modal isOpen={modal} toggle={toggleModal} className="">
        <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
        <ModalBody>
          <AddCustomer />
        </ModalBody>
      </Modal>
    </div>
  )
}
