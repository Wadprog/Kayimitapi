import * as action from './api'
import env from '../config'
import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { setHeader } from '../middleware/api'

const url = env.endpoints.LOGIN
const { EXPECTED_HEADER } = env

const initialState = {
  loading: false,
  data: null,
  lastFetch: null,
  token: null,
  error: null,
}

export const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequested: (state) => {
      state.loading = true
    },
    loginSucceed: (state, action) => {
      state.loading = false
      state.token = action.payload.token
      setHeader(EXPECTED_HEADER, action.payload.token)
      state.data = jwtDecode(action.payload.token)
      state.lastFetch = Date.now
    },

    LoginFailed: (state, action) => {
      state.loading = false
      state.token = null
      setHeader(EXPECTED_HEADER, null)
      state.error = action.payload
      state.data = null
    },
    LogOut: (state) => {
      state.loading = false
      state.token = null
      state.data = null
    },
  },
})

export const Login = (credentials) => (dispatch, getState) => {
  //const { lastFetch } = getState().authentication
  //   if (lastFetch) {
  //     const diff = moment().diff(moment(lastFetch), 'minutes')
  //     if (diff < env.requestRateInMinutes && user !== null) return
  //   }
  console.log({ url })
  dispatch(
    action.apiCallBegan({
      url ,
      data: credentials,
      method: 'POST',
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  )
}

export const createUser = (newUserData) => (dispatch, getState) => {
  dispatch(
    action.apiCallBegan({
      url: env.CREATE_NEW_USER,
      data: newUserData,
      method: 'POST',
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  )
}
export const logout = () => (dispatch) => dispatch(Auth.actions.LogOut())
export const getCurrentUser = (state) => state.authentication
export const logged = Auth.actions.loginSucceed.type
export default Auth.reducer
