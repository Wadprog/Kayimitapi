import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table';
import TableIcons from 'components/TransactionListIcon';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  usersList,
  getUsers,
  editUser,
  toggleLockUser,
  toggleSupervisor,
  createUser,
} from 'store/user';

// Icons needed.
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import useToggle from 'hooks/useToggle';

import PageWrapper from 'components/PageWrapper';
import Header from 'components/Headers/SimpleHeader';
import CreateUser from 'components/AppForms/AddUser';


function User() {
  const dispatch = useDispatch(usersList);
  useEffect(() => dispatch(getUsers()), []);
  const users = useSelector(usersList);
  const data = users?.list?.map((user) => ({ ...user, d: {} }));
  const [modalOpenState, toggleModalState] = useToggle(false);
  const handleUpdate = async (data) => dispatch(editUser(data));
  const handleLock = (id) => {
    console.log({ id });
    dispatch(toggleLockUser(id));
  };
  const handleSupervisorLevel = (id) => {
    console.log({ id });
    dispatch(toggleSupervisor(id));
  };
  const handleCreateUser = (userData, options) => {
    toggleModalState();
    console.log({ userData, options });
    dispatch(createUser(userData));
  };
  const columns = [
    {
      title: 'First Name',
      field: 'firstName',
    },
    {
      title: 'Last Name',
      field: 'lastName',
    },
    {
      title: 'email',
      field: 'email',
    },
    {
      title: 'isAdmin',
      field: 'isAdmin',
      render: (rowData) => (rowData.isAdmin ? <CheckIcon /> : <CloseIcon />),
      editable: false,
    },
    {
      title: 'isActive',
      field: 'isActive',
      render: (rowData) => (rowData.isActive ? <CheckIcon /> : <CloseIcon />),
      editable: false,
    },
  ];
  return (
    <PageWrapper>
      <Header />
      <MaterialTable
        actions={[
          (rowData) => ({
            icon: () => (rowData.isActive ? <LockOpenIcon /> : <LockIcon />),
            onClick: () => handleLock(rowData._id),
            disabled: rowData.primaryAdmin,
            hidden: rowData.primaryAdmin,
          }),

          (rowData) => ({
            icon: () =>
              rowData.isAdmin ? (
                <SupervisorAccountIcon />
              ) : (
                <PeopleOutlineIcon />
              ),
            onClick: () => handleSupervisorLevel(rowData._id),
            disabled: rowData.primaryAdmin,
            hidden: rowData.primaryAdmin,
          }),
          {
            icon: () => <PersonAddIcon />,
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
        title="All user"
        options={{ actionsColumnIndex: -1 }}
        isLoading={users.loading}
      />

      <Modal
        isOpen={modalOpenState}
        modalTransition={{ timeout: 200 }}
        backdropTransition={{ timeout: 290 }}
        toggle={toggleModalState}
      >
        <ModalHeader toggle={toggleModalState}>New user</ModalHeader>
        <ModalBody>
          <CreateUser handleSubmit={handleCreateUser} />
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

export default User;
