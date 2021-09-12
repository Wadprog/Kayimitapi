import env from './config';
// components
import Dashboard from 'views/Dashboard';
import Login from 'views/Login.js';
import Profile from 'views/Profile.js';
import User from 'views/User';
import Customer from 'views/Customer';
import NewTransaction from 'views/NewTransaction.js';
import Rate from 'views/Rate.js';
import Establishment from 'views/Establishment.js';
import Invoice from 'views/Invoice.js';
import DataAnalysis from 'views/DataAnalisis.js';

const paths = env.endpoints;
const { layouts } = env;
var routes = [
  {
    path: paths.DASHBOARD,
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Dashboard,
    layout: layouts.ADMIN,
    supervisorAccess: true,
  },
  {
    path: '/da',
    name: 'DataAnalisis',
    icon: 'ni ni-tv-2 text-primary',
    component: DataAnalysis,
    layout: layouts.ADMIN,
    supervisorAccess: true,
  },
  {
    path: paths.LOGIN,
    name: 'Login',
    icon: 'ni ni-tv-2 text-primary',
    component: Login,
    layout: layouts.AUTH,
  },

  {
    path: paths.USER_PROFILE,
    name: 'Profile',
    icon: 'fa fa-camera text-indigo',
    component: Profile,
    layout: layouts.ADMIN,
  },

  {
    path: paths.USER,
    name: 'Users',
    icon: 'fa fa-user-tie text-pink',
    component: User,
    layout: layouts.ADMIN,
    supervisorAccess: true,
  },

  {
    path: paths.CUSTOMERS,
    name: 'Customers',
    icon: 'fa fa-user-tag text-blue',
    component: Customer,
    layout: layouts.ADMIN,
  },
  {
    path: paths.RATE,
    name: 'Rates',
    icon: 'fab fa-gg text-indigo',
    component: Rate,
    layout: layouts.ADMIN,
  },
  {
    path: paths.TRANSACTIONS,
    name: 'Transactions',
    icon: 'fa fa-retweet text-yellow',
    component: NewTransaction,
    layout: layouts.ADMIN,
  },

  {
    path: paths.ESTABLISHMENT,
    name: 'Establishments',
    icon: 'ni ni-shop text-yellow',
    component: Establishment,
    layout: layouts.ADMIN,
    supervisorAccess: true,
  },
  {
    path: paths.INVOICE,
    name: 'Invoice',
    icon: 'ni ni-shop text-yellow',
    component: Invoice,
    layout: layouts.ADMIN,
    NoList: true,
  },
];
export default routes;
