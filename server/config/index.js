// eslint-disable-next-line no-unused-vars
const fallbackDb =
  'mongodb+srv://wadson:Poupouy12@cluster0.pen5q.mongodb.net/Melper?retryWrites=true&w=majority';

const environments = {};
environments.production = {
  NAME: 'Production',
  PORT: 3000,
  DB_URI: 'mongodb://127.0.0.1:27017/Kayimit',
};
environments.development = {
  SESSION_CONFIG: {
    secret: 'SECRET',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  },
  SESSION_SECRET: 'Session_Secret',
  COOKIE_SECRET: 'COOKIE_SECRET',
  NAME: 'Development',
  PORT: 4000,
  DB_URI: 'mongodb://127.0.0.1:27017/Kayimit',
  JWT_SECRET: 'jwtSecret',
};

const DESIRED_ENVIRONMENT =
  typeof process.env.NODE_ENVIRONMENT === 'string'
    ? process.env.NODE_ENVIRONMENT
    : false;

const ENVIRONMENT_TO_RETURN =
  typeof environments[DESIRED_ENVIRONMENT] === 'object'
    ? environments[DESIRED_ENVIRONMENT]
    : environments.development;

module.exports = ENVIRONMENT_TO_RETURN;
