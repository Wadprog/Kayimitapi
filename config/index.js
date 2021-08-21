/**
 * Here lives all configuration for the app
 */

const environments = {};

environments.production = {
  NAME: 'Production',
  PORT: 3000,
  DB_URI: 'mongodb://127.0.0.1:2701/OASIS_CRM',
};
environments.development = {
  SESSION_SECRET: 'Session_Secret',
  COOKIE_SECRET: 'COOKIESECRET',
  NAME: 'Development',
  PORT: 5000,
  DB_URI:
    'mongodb+srv://wadson:Poupouy12@cluster0.pen5q.mongodb.net/Melper?retryWrites=true&w=majority',
};

let DESIRED_ENVIRONMENT =
  typeof process.env.NODE_ENVIRONMENT === 'string'
    ? process.env.NODE_ENVIRONMENT
    : false;

const ENVIRONMENT_TO_RETURN =
  typeof environments[DESIRED_ENVIRONMENT] === 'object'
    ? environments[DESIRED_ENVIRONMENT]
    : environments.development;

module.exports = ENVIRONMENT_TO_RETURN;
