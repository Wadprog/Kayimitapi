import { combineReducers } from 'redux';

import authentication from './auth';
import alerts from './alerts';
import account from './account';
import transactions from './transaction';
import customers from './customers';
import rates from './rates';
import establishments from './establishment';
import users from './user';
import currency from './currencies';

export default combineReducers({
  authentication,
  alerts,
  account,
  transactions,
  customers,
  rates,
  establishments,
  users,
  currency,
});
