import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currenciesList, getCurrencies } from 'store/currencies';

function Rate() {
  const dispatch = useDispatch();
  const currencies = useSelector(currenciesList);
  useEffect(() => dispatch(getCurrencies), []);
  return <div></div>;
}

export default Rate;
