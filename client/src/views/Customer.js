import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import TableIcons from 'components/TransactionListIcon';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { customersList, getCustomers } from 'store/customers';

// Icons needed.
import AddIcon from '@material-ui/icons/Add';
import useToggle from 'hooks/useToggle';

import PageWrapper from 'components/PageWrapper';
import Header from 'components/Headers/SimpleHeader';
import CustomerForm from 'components/AddCustomerForm';

function Customer() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getCustomers()), []);
  const customers = useSelector(customersList);

  // because data from redux is unmodifiable
  const data = customers.list?.map((customer) => ({ ...customer, t: {} }));

  const [modalOpenState, toggleModalState] = useToggle(false);
  const handleUpdate = async (data) => dispatch(console.log(data));

  const columns = [
    {
      title: 'First name',
      field: 'firstName',
    },
    { title: 'Last name', field: 'lastName' },
    { title: 'Middle name', field: 'middleName' },
    { title: 'Id number ', field: 'idNumber' },
    { title: 'Id Type', field: 'idType' },
  ];
  return (
    <PageWrapper>
      <Header />
      <MaterialTable
        actions={[
          {
            icon: () => <AddIcon />,
            isFreeAction: true,
            onClick: toggleModalState,
          },
        ]}
        editable={{
          onRowUpdate: handleUpdate,
          isEditable: (rowData) => !rowData.primaryAdmin,
        }}
        icons={TableIcons}
        columns={columns}
        data={data}
        title="All Customers"
        options={{ actionsColumnIndex: -1 }}
        isLoading={customers.loading}
      />

      <Modal
        isOpen={modalOpenState}
        modalTransition={{ timeout: 200 }}
        backdropTransition={{ timeout: 290 }}
        toggle={toggleModalState}
      >
        <ModalHeader toggle={toggleModalState}>New user</ModalHeader>
        <ModalBody>
          <CustomerForm />
          <ModalFooter>
            <Button color="secondary" onClick={toggleModalState}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </PageWrapper>
  );
}

export default Customer;
