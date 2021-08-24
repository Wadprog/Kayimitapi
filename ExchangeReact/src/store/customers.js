import { createSlice } from '@reduxjs/toolkit'

import * as action from './api'
import env from '../config'

const url = env.endpoints.CUSTOMERS

const initialState = {
  loading: false,
  list: [],
  lastFetch: null,
  error: null,
  selectedCustomer: null,
}

export const Customer = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    createCustomerRequest: (state) => {
      state.loading = true
    },
    editCustomerRequest: (state) => {
      state.loading = true
    },
    selectedCustomer: (state, action) => {
      state.loading = false
      state.selectedCustomer = action.payload
    },
    customerCreated: (state, action) => {
      state.loading = false
      state.list.push(action.payload)
      state.selectedCustomer = action.payload
    },
    customerCreateRequestFailed: (state) => {
      state.loading = false
    },
    customersRequested: (state) => {
      state.loading = true
    },
    customersReceived: (state, action) => {
      state.loading = false
      state.list = action.payload
      state.lastFetch = Date.now
    },

    customersRequestFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.list = []
    },
    customersEditRequestFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.list = []
    },
    customerEdited: (state, action) => {
      state.loading = false
      state.list = state.list.map((customer) => {
        if (customer._id !== action.payload._id) return customer
        return action.payload
      })
      state.selectedCustomer = action.payload
    },
  },
})

export const getCustomers = () => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url,
      method: 'GET',
      onSuccess: Customer.actions.customersReceived.type,
      onStart: Customer.actions.customersRequested.type,
      onError: Customer.actions.customersRequestFailed.type,
    })
  )
}
export const createCustomer = (newCustomerData) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url,
      data: newCustomerData,
      method: 'POST',
      onSuccess: Customer.actions.customerCreated.type,
      onStart: Customer.actions.createCustomerRequest.type,
      onError: Customer.actions.customersRequestFailed.type,
    })
  )
}
export const editCustomer = (editedCustomerData) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: url + `/edit/${editedCustomerData._id}`,
      data: editedCustomerData,
      method: 'POST',
      onSuccess: Customer.actions.customerEdited.type,
      onStart: Customer.actions.editCustomerRequest.type,
      onError: Customer.actions.customersEditRequestFailed.type,
    })
  )
}
export const { selectedCustomer } = Customer.actions
export const customersList = (state) => state.customers
export default Customer.reducer
