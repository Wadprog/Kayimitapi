import { createSlice } from '@reduxjs/toolkit';

// Core components that
import * as action from './api';
import env from '../config';

const url = env.endpoints.RATE;

const initialState = {
  loading: false,
  data: [],
  lastFetch: null,
  error: null,
};

export const Rates = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    rateRequested: (state) => {
      state.loading = true;
    },
    rateRequestedSucceed: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.lastFetch = Date.now;
    },

    rateRequestedFailed: (state) => {
      state.loading = false;
      state.data = [];
    },
    ratePostRequested: (state) => {
      state.loading = true;
    },

    ratePostRequestedSucceed: (state, action) => {
      console.log('In here man');
      state.loading = false;
      state.data.push(action.payload);
    },
    ratePostRequestedFailed: (state, action) => {
      state.loading = false;
      state.data = [];
    },
    ratePutRequested: (state) => {
      state.loading = true;
    },
    ratePutRequestSucceed: (state, action) => {
      state.loading = false;
      state.data = state.data.map((rate) => {
        if (rate._id !== action.payload._id) return rate;
        return action.payload;
      });
      state.error = null;
    },
    ratePutRequestFailed: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const putRate = (rateDetails) => (dispatch) => {
  console.log({ rateDetails });
  dispatch(
    action.apiCallBegan({
      url,
      data: rateDetails,
      method: 'PUT',
      onSuccess: Rates.actions.ratePutRequestSucceed.type,
      onStart: Rates.actions.ratePutRequested.type,
      onError: Rates.actions.ratePutRequestFailed.type,
    })
  );
};
export const postRate = (rateDetails) => (dispatch) => {
  console.log({ rateDetails });
  dispatch(
    action.apiCallBegan({
      url,
      data: rateDetails,
      method: 'POST',
      onSuccess: Rates.actions.ratePostRequestedSucceed.type,
      onStart: Rates.actions.ratePostRequested.type,
      onError: Rates.actions.ratePostRequestedFailed.type,
    })
  );
};
export const getRates = () => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url,
      method: 'GET',
      onSuccess: Rates.actions.rateRequestedSucceed.type,
      onStart: Rates.actions.rateRequested.type,
      onError: Rates.actions.rateRequestedFailed.type,
    })
  );
};

export const rates = (state) => state.rates;

export default Rates.reducer;
