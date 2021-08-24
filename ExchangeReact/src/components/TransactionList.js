import { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

// Icons Needed
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import FilterList from '@material-ui/icons/FilterList'

import { useSelector, useDispatch } from 'react-redux'
import { transactions, getTransactions } from '../store/transaction'

// Core components
import TableUser from './TableUser'
import TableCustomer from './TableCustomer'
import TableIcons from './TransactionListIcon'
import useToggle from 'hooks/useToggle'

// Default function
const UserTransactions = ({}) => {
  const dispatch = useDispatch()
  const [preferDarkMode, setPreferDarkMode] = useState(() => {
    const mode = localStorage.getItem('_tableDarkMode')
    return mode === 'true' || false
  })
  useEffect(() => dispatch(getTransactions()), [dispatch])

  const Transactions = useSelector(transactions)
  // The data returned by redux is unmutable so I create a copy of it
  const data = Transactions.data.map((o) => ({ ...o, d: {} }))
  const [filter, toggleFilter] = useToggle(false)

  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? 'dark' : 'light',
    },
  })

  const columns = [
    {
      title: 'Type',
      field: 'transactionType',
    },
    { title: 'Intial Amount', field: 'amountUSD', type: 'currency' },
    {
      title: 'Amount in HGT',
      field: 'amountHGT',
      type: 'currency',
    },
    {
      title: 'Rate',
      field: 'rate',
      type: 'currency',
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
  ]
  const handleDarkModeChange = () => {
    setPreferDarkMode(!preferDarkMode)
    localStorage.setItem('_tableDarkMode', !preferDarkMode)
  }
  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }} className="rounded">
      <MuiThemeProvider theme={theme}>
        <MaterialTable
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
              width: 26,
              whiteSpace: 'nowrap',
              textAlign: 'left',
              flexDirection: 'row',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              paddingLeft: 5,
              paddingRight: 5,
              fontWeight: 'bold',
              // color: theme.palette.primary.main,
              // backgroundColor: theme.palette.primary.table,
            },
            // rowStyle: {
            //   backgroundColor: '#f5f5f5',
            //   paddingTop: 2,
            //   paddingBottom: 2,
            //   whiteSpace: 'nowrap',
            // },
            searchFieldStyle: {
              borderRadius: 999,
              paddingLeft: 10,
              paddingRight: 5,
              // boxShadow:
              //   '0 4px 8px 0 rgba(0, 0, 0, 0.2),0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            },
          }}
          icons={TableIcons}
          columns={columns}
          data={data}
          title="Latest Transaction"
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
                )
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
            (rowData) => ({
              icon: () => <DeleteOutline />,
              tooltip: 'Delete transaction',
              onClick: (event, rowData) =>
                alert('You want to delete ' + rowData._id),
              disabled: rowData.lock,
            }),
          ]}
        />
      </MuiThemeProvider>
    </div>
  )
}

export default UserTransactions
