import Index from 'views/Index.js'
import Profile from 'views/examples/Profile.js'
import Register from 'views/examples/Register.js'
import Login from 'views/examples/Login.js'
import NewTransaction from 'views/examples/NewTransaction.js'

import env from './config'
const paths = env.endpoints
var routes = [
  {
    path: paths.DASHBOARD,
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Index,
    layout: '/admin',
  },

  {
    path: paths.USER_PROFILE,
    name: 'My Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/admin',
  },

  {
    path: paths.LOGIN,
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
  },
  {
    path: paths.REGISTER,
    name: 'Add new User',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/admin',
  },

  {
    path: '/register',
    name: 'Add new Customer',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/admin',
  },
  {
    path: '/register',
    name: 'Change Rates',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/admin',
  },
  {
    path: '/new-transaction',
    name: 'New Transaction',
    icon: 'ni ni-circle-08 text-pink',
    component: NewTransaction,
    layout: '/admin',
  },
]
export default routes
