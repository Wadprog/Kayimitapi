import { createSlice } from '@reduxjs/toolkit';

// Core components that
import * as action from './api';
import env from '../config';

const url = env.endpoints.TRANSACTIONS;

const initialState = {
  loading: false,
  data: [],
  lastFetch: null,
  error: null,
};

export const Transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    transactionsRequested: (state) => {
      state.loading = true;
    },
    transactionsRequestedSucceed: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.lastFetch = Date.now;
    },

    transactionsRequestedFailed: (state) => {
      state.loading = false;
      state.data = [];
    },
    transactionsPostRequested: (state) => {
      state.loading = true;
    },

    transactionsPostRequestedSucceed: (state, action) => {
      console.log('In here man');
      state.loading = false;
      state.data.push(action.payload);
    },
    transactionsPostRequestedFailed: (state, action) => {
      state.loading = false;
      state.data = [];
    },
    transactionsLockRequested: (state) => {
      state.loading = true;
    },
    transactionsLockRequestedSucceed: (state, action) => {
      state.loading = false;
      state.data = state.data.map((transaction) => {
        const index = action.payload.findIndex(
          (tran) => tran._id === transaction._id
        );
        if (index > -1) return action.payload[index];
        return transaction;
      });
    },
    transactionsLockRequestedFailed: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },

    transactionsDeleteRequested: (state, action) => {
      state.loading = true;
    },
    transactionsDeleteRequestedSucceed: (state, action) => {
      state.loading = false;
      state.data = state.data.filter(
        (transaction) => transaction._id !== action.payload
      );
      state.error = null;
    },
    transactionsDeleteRequestedFailed: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const deleteTransaction = (id) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url: `${url}/${id}`,
      method: 'Delete',
      onSuccess: Transactions.actions.transactionsDeleteRequestedSucceed.type,
      onStart: Transactions.actions.transactionsDeleteRequested.type,
      onError: Transactions.actions.transactionsDeleteRequestedFailed.type,
    })
  );
};
export const lockTransaction = (date) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url,
      data: date,
      method: 'PUT',
      onSuccess: Transactions.actions.transactionsLockRequestedSucceed.type,
      onStart: Transactions.actions.transactionsLockRequested.type,
      onError: Transactions.actions.transactionsLockRequestedFailed.type,
    })
  );
};
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
  );
};
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
  );
};

export const transactions = (state) => state.transactions;

export default Transactions.reducer;
