import { createSlice } from '@reduxjs/toolkit';

import * as action from './api';
import env from '../config';

const url = env.endpoints.ACCOUNT;

const initialState = {
  loading: false,
  data: null,
  lastFetch: null,
  error: null,
};

export const AccountDetails = createSlice({
  name: 'account',
  initialState,
  reducers: {
    postAccountRequest: (state) => {
      state.loading = true;
    },
    postAccountSucceeded: (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.error = null;
    },
    postAccountFailed: (state, actions) => {
      state.loading = false;
      state.error = actions.payload;
    },
    accountRequested: (state) => {
      state.loading = true;
    },
    accountDetailsReceived: (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.lastFetch = Date.now;
      state.error = null;
    },

    accountDetailsRequestFailed: (state, actions) => {
      state.loading = false;
      state.error = actions.payload;
      state.data = null;
    },
  },
});

export const getAccountDetails = () => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url,
      method: 'GET',
      onSuccess: AccountDetails.actions.accountDetailsReceived.type,
      onStart: AccountDetails.actions.accountRequested.type,
      onError: AccountDetails.actions.accountDetailsRequestFailed.type,
    })
  );
};
export const postAccountDetails = (newCustomerData) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url,
      data: newCustomerData,
      method: 'POST',
      onSuccess: AccountDetails.actions.postAccountSucceeded.type,
      onStart: AccountDetails.actions.postAccountRequest.type,
      onError: AccountDetails.actions.postAccountFailed.type,
    })
  );
};

export const accountDetails = (state) => state.account;
export default AccountDetails.reducer;
