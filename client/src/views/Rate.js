// reactstrap components
import { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import Header from 'components/Headers/SimpleHeader';
import { useSelector, useDispatch } from 'react-redux';

import MaterialTable from 'material-table';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import tableIcons from 'components/TransactionListIcon';
import { Input } from 'reactstrap';
import NumberFormat from 'react-number-format';
// Core components
import PageWrapper from 'components/PageWrapper';
import { rates, getRates, postRate, putRate } from 'store/rates';
import { getCurrentUser } from 'store/auth';
import { currenciesList, getCurrencies } from 'store/currencies';

const RateList = () => {
  const dispatch = useDispatch();
  const ratesList = useSelector(rates);
  const currentUser = useSelector(getCurrentUser);
  const curr = useSelector(currenciesList);
  const { isAdmin } = currentUser?.data.user;
  useEffect(() => dispatch(getCurrencies()), []);
  useEffect(() => dispatch(getRates()), []);
  const list = ratesList?.data?.map((rate) => ({ ...rate, d: {} }));

  const columns = [
    {
      title: 'Buy Label',
      field: 'buyingLabel',
      editComponent: (props) => (
        <Input
          type="select"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        >
          {curr.list.map((curr) => (
            <option value={curr.symbol} key={curr.symbol}>
              {curr.name}
            </option>
          ))}
        </Input>
      ),
    },

    {
      title: 'Sell Label',
      field: 'sellingLabel',
      editComponent: (props) => {
        return (
          <Input
            type="select"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          >
            {curr.list.map((curr) => (
              <option value={curr.symbol} key={curr.symbol}>
                {curr.name}
              </option>
            ))}
          </Input>
        );
      },
    },
    {
      title: 'Selling Price',
      field: 'sellingValue',
      editComponent: (props) => {
        return (
          <NumberFormat
            className="form-control text-dark border-success"
            value={props.rowData.sellingValue}
            decimalScale={2}
            allowNegative={false}
            thousandSeparator={true}
            prefix={props.rowData.buyingLabel + ' '}
            onValueChange={(values) => {
              props.onChange(values.value);
            }}
            disabled={props.rowData.sellingLabel ? false : true}
          />
        );
      },
      render: (rowData) => (
        <NumberFormat
          value={rowData.sellingValue}
          decimalScale={2}
          allowNegative={false}
          thousandSeparator={true}
          prefix={rowData.sellingLabel + ' '}
          displayType={'text'}
        />
      ),
    },
    {
      title: 'Buying Price',
      field: 'buyingValue',
      editComponent: (props) => {
        return (
          <NumberFormat
            className="form-control text-dark border-success"
            value={props.rowData.buyingValue}
            decimalScale={2}
            allowNegative={false}
            thousandSeparator={true}
            prefix={props.rowData.sellingLabel + ' '}
            onValueChange={(values) => {
              props.onChange(values.value);
            }}
            disabled={props.rowData.sellingLabel ? false : true}
          />
        );
      },
      render: (rowData) => (
        <NumberFormat
          value={rowData.buyingValue}
          decimalScale={2}
          allowNegative={false}
          thousandSeparator={true}
          prefix={rowData.buyingLabel + ' '}
          displayType={'text'}
        />
      ),
    },
  ];
  const handleAdd = async (data) => dispatch(postRate(data));
  const handleEdit = async (data) => dispatch(putRate(data));

  const [preferDarkMode, setPreferDarkMode] = useState(() => {
    const mode = localStorage.getItem('_tableDarkMode');
    return mode === 'true' || false;
  });
  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <PageWrapper isLoading={ratesList.loading}>
      <Header />
      <Container className="mt--7" fluid>
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            columns={columns}
            data={list}
            editable={{
              isEditable: () => isAdmin,
              isAddHidden: () => !isAdmin,
              onRowAdd: isAdmin ? handleAdd : undefined,
              onRowUpdate: handleEdit,
            }}
            icons={tableIcons}
            title="Rates"
            options={{ actionsColumnIndex: -1 }}
          />
        </MuiThemeProvider>
      </Container>
    </PageWrapper>
  );
};

export default RateList;
