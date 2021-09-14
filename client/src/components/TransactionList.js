import env from '../config';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';

// Icons Needed
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import PrintIcon from '@material-ui/icons/Print';
import FilterList from '@material-ui/icons/FilterList';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from 'store/auth';
import {
  transactions,
  getTransactions,
  deleteTransaction,
} from '../store/transaction';

// Core components
import TableUser from './TableUser';
import TableCustomer from './TableCustomer';
import TableIcons from './TransactionListIcon';
import useToggle from 'hooks/useToggle';
import { Submit, Field, Form } from 'components/form';
import { lockTransaction } from 'store/transaction';

// Default function
const UserTransactions = ({ renderData }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const [preferDarkMode, setPreferDarkMode] = useState(() => {
    const mode = localStorage.getItem('_tableDarkMode');
    return mode === 'true' || false;
  });
  useEffect(() => dispatch(getTransactions()), [dispatch]);

  const Transactions = useSelector(transactions);
  // The data returned by redux is unmutable so I create a copy of it
  const data = renderData
    ? renderData.data.map((o) => ({ ...o, d: {} }))
    : Transactions.data.map((o) => ({ ...o, d: {} }));
  const [filter, toggleFilter] = useToggle(false);

  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? 'dark' : 'light',
    },
  });

  const columns = [
    {
      title: 'Type',
      field: 'transactionType',
    },
    {
      title: 'Initial',
      field: 'origin',
      render: (rowData) => (
        <span>
          {new Intl.NumberFormat('ht', {
            style: 'currency',
            currency: rowData?.originLabel?.trim() || 'USD', 
          }).format(rowData?.origin)}
        </span>
      ),
    },
    {
      title: 'Destination',
      field: 'destination',

      render: (rowData) => (
        <span>
          {new Intl.NumberFormat('ht', {
            style: 'currency',
            currency: rowData?.destinationLabel?.trim() || 'USD',
          }).format(rowData.destination)}
        </span>
      ),
    },
    {
      title: 'Rate',
      field: 'xChangeRate',
      render: (rowData) => (
        <span>
          {new Intl.NumberFormat('ht', {
            style: 'currency',
            currency: rowData?.rateLabel || 'USD',
          }).format(rowData.xChangeRate)}
        </span>
      ),
    },
    {
      title: 'Customer',
      field: 'customer.firstName',
      render: (rowData) => <TableCustomer rowData={rowData} />,
    },
    {
      title: 'User',
      field: 'user.firstName',
      render: (rowData) => <TableUser rowData={rowData} />,
    },
    {
      title: 'Date',
      field: 'addedDate',
      type: 'date',
    },
  ];
  const handleDarkModeChange = () => {
    setPreferDarkMode(!preferDarkMode);
    localStorage.setItem('_tableDarkMode', !preferDarkMode);
  };

  const handleDelete = async (rowData) =>
    dispatch(deleteTransaction(rowData._id));
  const handleSubmit = (date) => dispatch(lockTransaction(date));
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const { isAdmin } = currentUser?.data?.user;
  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }} className="rounded">
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          editable={{
            isDeletable: (rowData) => !rowData.isLock,
            onRowDelete: handleDelete,
          }}
          isLoading={Transactions.loading}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            filtering: filter,
            grouping: true,
            headerStyle: {
              paddingTop: 2,
              paddingBottom: 2,
              backgroundColor: '#01579b',
              color: '#FFF',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 'bold',
              // color: theme.palette.primary.main,
              // backgroundColor: theme.palette.primary.table,
            },
          }}
          icons={TableIcons}
          columns={columns}
          data={data}
          title={`${isAdmin ? 'All' : 'Your'} Latest Transaction`}
          detailPanel={[
            {
              tooltip: 'Show Name',
              render: (rowData) => {
                return (
                  <div
                    style={{
                      fontSize: 100,
                      textAlign: 'center',
                      color: 'white',
                      backgroundColor: '#43A047',
                    }}
                  >
                    {rowData.transactionType}
                  </div>
                );
              },
            },
          ]}
          actions={[
            {
              icon: () => <FilterList />,
              tooltip: 'Toggle deep filter',
              onClick: toggleFilter,
              isFreeAction: true,
            },

            {
              icon: () =>
                preferDarkMode ? <Brightness7Icon /> : <Brightness4Icon />,
              tooltip: 'Toggle light/dark mode',
              onClick: handleDarkModeChange,
              isFreeAction: true,
            },
            {
              icon: () => (
                <div>
                  <i className="fa fa-lock" id="Popover1" />

                  <UncontrolledPopover
                    placement="top"
                    target="Popover1"
                    trigger="click"
                  >
                    <PopoverHeader>Lock all Transaction for:</PopoverHeader>
                    <PopoverBody>
                      <Form
                        initialValues={{
                          lockDate: null,
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={ValidationSchema}
                      >
                        <Field type="date" name="lockDate" />
                        <Submit title="Lock" />
                      </Form>
                    </PopoverBody>
                  </UncontrolledPopover>
                </div>
              ),
              tooltip: 'Lock transactions',
              onClick: toggle,
              isFreeAction: true,
              hidden: !isAdmin,
              disabled: !isAdmin,
            },

            (rowData) => ({
              icon: () => <EditIcon />,
              tooltip: 'Lock Transaction',
              onClick: (event, rowData) =>
                alert('You want to delete coming ' + rowData._id),
              disabled: rowData.isLock,
            }),

            (rowData) => ({
              icon: () => (rowData.isLock ? <LockIcon /> : <LockOpenIcon />),
              tooltip: 'Lock Transaction',
              onClick: (event, rowData) =>
                alert('You want to lock coming ' + rowData._id),
              disabled: rowData.isLock || !isAdmin,
              hidden: !isAdmin,
            }),
            (rowData) => ({
              icon: () => (
                <Link
                  to={{
                    pathname: `${env.layouts.ADMIN}${env.endpoints.INVOICE}`,
                    data: rowData,
                  }}
                >
                  <PrintIcon />
                </Link>
              ),
              tooltip: 'Print Transaction',
              onClick: undefined,
            }),
          ]}
        />
      </MuiThemeProvider>
    </div>
  );
};

export default UserTransactions;

const ValidationSchema = Yup.object().shape({
  lockDate: Yup.date().required().label('Date'),
});
