const environment = {
  development: {
    BASE_URL: 'http://localhost:4000',
    EXPECTED_HEADER: 'x-auth-token',
    endpoints: {
      DASHBOARD: '/dashboard',
      USER_PROFILE: '/user-profile',
      LOGIN: '/login',
      REGISTER: '/register',
      CREATE_NEW_USER: '/user',
      RATE: '/rates',
      TRANSACTIONS: '/transactions',
      CUSTOMERS: '/customers',
      USER: '/user',
      ESTABLISHMENT: '/establishments',
      ACCOUNT: '/account',
      INVOICE: '/invoice',
      CURRENCIES: '/currencies',
    },
    layouts: {
      ADMIN: '/admin',
      AUTH: '/auth',
    },
  },
  staging: {
    BASE_URL: 'YOUR_BASE_URL',
    endpoints: {
      DASHBOARD: '/dashboard',
      USER_PROFILE: '/user-profile',
      LOGIN: '/login',
      REGISTER: '/register',
      NEW_TRANSACTION: '/newtransaction',
      CREATE_NEW_USER: '/user',
      TRANSACTIONS: '/transactions',
      CUSTOMERS: '/customers',
      USER: '/user',
      RATE: '/rates',
      ESTABLISHMENT: '/establishments',
      ACCOUNT: '/account',
      INVOICE: '/invoice',
      CURRENCIES: '/currencies',
    },
    layouts: {
      ADMIN: '/admin',
      AUTH: '/auth',
    },
  },
  production: {},
};
const getEnvironment = () => {
  return environment.development;
};

export default getEnvironment();
