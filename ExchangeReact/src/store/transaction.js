import { createSlice } from '@reduxjs/toolkit'

// Core components that
import * as action from './api'
import env from '../config'

const url = env.endpoints.TRANSACTIONS

const initialState = {
  loading: false,
  data: [],
  lastFetch: null,
  error: null,
}

export const Transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    transactionsRequested: (state) => {
      state.loading = true
    },
    transactionsRequestedSucceed: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.lastFetch = Date.now
    },

    transactionsRequestedFailed: (state) => {
      state.loading = false
      state.data = []
    },
    transactionsPostRequested: (state) => {
      state.loading = true
    },

    transactionsPostRequestedSucceed: (state, action) => {
      console.log('In here man')
      state.loading = false
      state.data.push(action.payload)
    },
    transactionsPostRequestedFailed: (state, action) => {
      state.loading = false
      state.data = []
    },
  },
})

export const postTransaction = (transactionDetails) => (dispatch) => {
  
  //const { lastFetch } = getState().authentication
  //   if (lastFetch) {
  //     const diff = moment().diff(moment(lastFetch), 'minutes')
  //     if (diff < env.requestRateInMinutes && user !== null) return
  //   }
    dispatch(
      action.apiCallBegan({
        url,
        data: transactionDetails,
        method: 'POST',
        onSuccess: Transactions.actions.transactionsPostRequestedSucceed.type,
        onStart: Transactions.actions.transactionsPostRequested.type,
        onError: Transactions.actions.transactionsPostRequestedFailed.type,
      })
    )
}
export const getTransactions = () => (dispatch) => {
  //const { lastFetch } = getState().authentication
  //   if (lastFetch) {
  //     const diff = moment().diff(moment(lastFetch), 'minutes')
  //     if (diff < env.requestRateInMinutes && user !== null) return
  //   }
  dispatch(
    action.apiCallBegan({
      url,
      method: 'GET',
      onSuccess: Transactions.actions.transactionsRequestedSucceed.type,
      onStart: Transactions.actions.transactionsRequested.type,
      onError: Transactions.actions.transactionsRequestedFailed.type,
    })
  )
}

export const transactions = (state) => state.transactions

export default Transactions.reducer
