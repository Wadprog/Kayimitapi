const environment = {
  development: {
    BASE_URL: 'http://localhost:4000',
    EXPECTED_HEADER: 'x-auth-token',
    endpoints: {
      DASHBOARD: '/index',
      USER_PROFILE: '/user-profile',
      LOGIN: '/login',
      REGISTER: '/register',
      NEW_TRANSACTION: '/newtransaction',
      CREATE_NEW_USER: '/user',
      TRANSACTIONS: '/transactions',
      CUSTOMERS: '/customers',
    },
  },
  staging: {
    BASE_URL: 'YOUR_BASE_URL',
    endpoints: {
      DASHBOARD: '/index',
      USER_PROFILE: '/user-profile',
      LOGIN: '/login',
      REGISTER: '/register',
      NEW_TRANSACTION: '/newtransaction',
      CREATE_NEW_USER: '/user',
      TRANSACTIONS: '/transactions',
      CUSTOMERS: '/customers',
    },
  },
  production: {},
}
const getEnvironment = () => {
  return environment.development
}

export default getEnvironment()
