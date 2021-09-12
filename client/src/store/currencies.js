import * as action from './api';
import env from '../config';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false, list: [] };
export const Currencies = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    getCurrenciesRequest: (state) => {
      state.loading = true;
    },
    currenciesRequestFailed: (state) => {
      state.loading = false;
    },

    currenciesReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
  },
});

const url = env.endpoints.CURRENCIES;
export const getCurrencies = () => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url,
      method: 'GET',
      onSuccess: Currencies.actions.currenciesReceived.type,
      onStart: Currencies.actions.getCurrenciesRequest.type,
      onError: Currencies.actions.currenciesRequestFailed.type,
    })
  );
};

export const currenciesList = (state) => state.currency;
export default Currencies.reducer;
