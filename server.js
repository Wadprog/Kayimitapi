/* eslint-disable no-console */

// Dependencies
const express = require('express');
const passport = require('passport');
const PassportLocal = require('passport-local');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');

// Custom dependencies
const environnement = require('./server/config');
const connectDB = require('./server/database');
const User = require('./server/database/user');
const isLoggedIn = require('./server/middleware/authenticate');
const { accessLogStream } = require('./server/helper');

// Configuring the server
const app = express();
app.use(express.json({ extended: false }));
// Allowing all origin
app.use(cors());
// Securing the server with helmet
// setup the logger
//app.use(helmet());
// Log all request with morgan
app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }));
// Parsing the request Body
app.use(express.urlencoded({ extended: true }));

// Getting the cookies
app.use(cookieParser(environnement.COOKIE_SECRET));
// Handling session
app.use(session({ ...environnement.SESSION_CONFIG }));

// setting up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Serving statics files
//app.use(express.static('buildOld'));
// override with POST
app.use(methodOverride('_method'));

// connecting to database
connectDB();
app.use((req, res, next) => {
  console.log({ path: req.path, body: req.body });
  return next();
});
app.use(isLoggedIn);

// Serving the routes
app.use('/api/login', require('./server/routes/auth'));
app.use('/api/user', require('./server/routes/user'));
app.use('/api/transactions', require('./server/routes/transaction'));
app.use('/api/rates', require('./server/routes/rate'));
app.use('/api/customers', require('./server/routes/customer'));
app.use('/api/establishments', require('./server/routes/establishments'));
app.use('/api/account', require('./server/routes/account'));
app.use('/api/currencies', require('./server/routes/currencies'));
// app.use(mongooseValidation)

// Handling all errors

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  console.log('here was called ');
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong ' } = err;
  return res.status(status).json({ message });
});

// Starting the server
const PORT = process.env.PORT || environnement.PORT;
app.listen(PORT, () =>
  console.log(
    `Th Server in listening in ${environnement.NAME} environment on port ${environnement.PORT}`
  )
);
