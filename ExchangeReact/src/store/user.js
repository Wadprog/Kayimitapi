import * as action from './api'
import env from '../config'
import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { setHeader } from '../middleware/api'

const url = env.endpoints.CREATE_NEW_USER

const initialState = {
  loading: false,
  list: [],
  lastFetch: null,
  error: null,
}

export const User = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUserRequest: (state) => {
      state.loading = true
    },
    userCreated: (state) => {
      state.loading = false
      state.list.push(action.payload)
      state.lastFetch = Date.now
    },
    userCreateRequestFailed: (state) => {
      state.loading = false
    },
    usersRequested: (state) => {
      state.loading = true
    },
    usersReceived: (state, action) => {
      state.loading = false
      state.list = jwtDecode(action.payload.token)
      state.lastFetch = Date.now
    },

    usersRequestFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.list = []
    },
  },
})

export const createUser = (newUserData) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url,
      data: newUserData,
      method: 'POST',
      onSuccess: User.actions.userCreated.type,
      onStart: User.actions.createUserRequest.type,
      onError: User.actions.usersRequestFailed.type,
    })
  )
}

export const usersList = (state) => state.users
export default User.reducer
