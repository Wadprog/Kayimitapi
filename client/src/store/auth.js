import * as action from './api';
import env from '../config';
import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { saveToken, deleteToken } from '../middleware/api';

const url = env.endpoints.LOGIN;
const { EXPECTED_HEADER } = env;

const initialState = {
  loading: false,
  data: null,
  lastFetch: null,
  token: null,
  error: null,
};

export const Auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequested: (state) => {
      state.loading = true;
    },
    loginSucceed: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      saveToken(action.payload.token);
      state.data = jwtDecode(action.payload.token);
      state.lastFetch = Date.now;
    },

    LoginFailed: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
      state.data = null;
      deleteToken();
    },
    setUser: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      saveToken(action.payload);
      state.data = jwtDecode(action.payload);
    },
    LogOut: (state) => {
      state.loading = false;
      state.token = null;
      state.data = null;
      state.error = null;
      deleteToken();
    },
  },
});

export const Login = (credentials) => (dispatch, getState) => {
  const { data, loading } = getState().authentication;
  if (data != null || loading) return;
  console.log({ url });
  dispatch(
    action.apiCallBegan({
      url,
      data: credentials,
      method: 'POST',
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};

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
  );
};
export const { setUser } = Auth.actions;
export const logout = () => (dispatch) => dispatch(Auth.actions.LogOut());
export const getCurrentUser = (state) => state.authentication;
export const logged = Auth.actions.loginSucceed.type;
export default Auth.reducer;
