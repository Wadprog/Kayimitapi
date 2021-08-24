import { combineReducers } from 'redux'

import authentication from './auth'
import alerts from './alerts'
import transactions from './transaction'
import customers from './customers'
// import store from './store'
// import market from './markets'
// import cart from './cart'
// import map from './map'

export default combineReducers({
  authentication,
  alerts,
  transactions,
  customers,
})
