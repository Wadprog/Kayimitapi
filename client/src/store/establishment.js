import { createSlice } from '@reduxjs/toolkit';

import * as action from './api';
import env from '../config';

const url = env.endpoints.ESTABLISHMENT;

const initialState = {
  loading: false,
  list: [],
  lastFetch: null,
  errors: null,
};

export const Establishment = createSlice({
  name: 'establishments',
  initialState,
  reducers: {
    getEstablismentRequest: (state) => {
      state.loading = true;
    },
    establishmentReceived: (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.lastFetch = Date.now();
      state.errors = [];
    },
    getEstablishmentsRequestFailed: (state, action) => {
      state.loading = false;
      state.list = [];
      state.errors = action.payload;
    },

    createEstablishmentRequest: (state) => {
      state.loading = true;
    },

    establishmentCreated: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.list.push(action.payload);
      state.errors = [];
    },
    createEstablishmentRequestFailed: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },

    editEstablishmentRequest: (state) => {
      state.loading = true;
    },

    establishmentEdited: (state, action) => {
      state.loading = false;
      state.list = state.list.map((establisment) => {
        if (establisment._id !== action.payload._id) return establisment;
        return action.payload;
      });
      state.errors = [];
    },

    editEstablishmentRequestFailed: (state, action) => {
      state.loading = false;
      state.list = [];
      state.errors = action.payload;
    },

    deleteEstablishmentRequest: (state) => {
      state.loading = true;
    },

    establishmentDeleted: (state, action) => {
      state.loading = false;
      //   state.list = state.list.filter(
      //     (establisment) => establisment._id !== action.payload._id
      //   );
      state.errors = [];
    },

    deleteEstablishmentRequestFailed: (state, action) => {
      state.loading = false;
      state.list = [];
      state.errors = action.payload;
    },
  },
});

export const getEstablishments = () => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url,
      method: 'GET',
      onSuccess: Establishment.actions.establishmentReceived.type,
      onStart: Establishment.actions.getEstablismentRequest.type,
      onError: Establishment.actions.getEstablishmentsRequestFailed.type,
    })
  );
};
export const createEstablishment = (establishment) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url,
      data: establishment,
      method: 'POST',
      onSuccess: Establishment.actions.establishmentCreated.type,
      onStart: Establishment.actions.createEstablishmentRequest.type,
      onError: Establishment.actions.createEstablishmentRequestFailed.type,
    })
  );
};
export const editEstablishment =
  (editedCustomerData) => (dispatch, getState) => {
    dispatch(
      action.apiCallBegan({
        url,
        data: editedCustomerData,
        method: 'PUT',
        onSuccess: Establishment.actions.establishmentEdited.type,
        onStart: Establishment.actions.editEstablishmentRequest.type,
        onError: Establishment.actions.editEstablishmentRequestFailed.type,
      })
    );
  };

export const deleteEstablishment =
  (editedCustomerData) => (dispatch, getState) => {
    dispatch(
      action.apiCallBegan({
        url: url,
        data: editedCustomerData,
        method: 'DELETE',
        onSuccess: Establishment.actions.establishmentEdited.type,
        onStart: Establishment.actions.deleteEstablishmentRequest.type,
        onError: Establishment.actions.deleteEstablishmentRequestFailed.type,
      })
    );
  };

export const establishmentList = (state) => state.establishments;

export default Establishment.reducer;
