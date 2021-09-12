/* eslint-disable react-hooks/exhaustive-deps */
import{ useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, setUser } from '../store/auth';

import AdminLayout from './Admin.js';
import AuthLayout from './Auth.js';


const Routes = () => {
  const dispatch = useDispatch();
  const auth = useSelector(getCurrentUser);

  const loadUser = () => {
    if (auth?.data?.user) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    return dispatch(setUser(token));
  };
  const loadAccount = () => {};

  useEffect(() => {
    loadUser();
  }, [auth]);
  useEffect(() => {
    loadAccount();
  }, []);

  return (
    <>
      {auth?.data?.user ? (
        <Switch>
          <Route path="/" render={(props) => <AdminLayout {...props} />} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" render={(props) => <AuthLayout {...props} />} />
        </Switch>
      )}
    </>
  );
};

export default Routes;
