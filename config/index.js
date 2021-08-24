/**
 * Here lives all configuration for the app
 */
require('dotenv').config();

const environments = {};

environments.production = {
  NAME: 'Production',
  PORT: 3000,
  DB_URI:
    'mongodb+srv://wadson:Poupouy12@cluster0.pen5q.mongodb.net/Melper?retryWrites=true&w=majority',
};
environments.development = {
  SESSION_SECRET: 'Session_Secret',
  COOKIE_SECRET: 'COOKIESECRET',
  NAME: 'Development',
  PORT: 4000,
  DB_URI:
    'mongodb+srv://wadson:Poupouy12@cluster0.pen5q.mongodb.net/Melper?retryWrites=true&w=majority',
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
