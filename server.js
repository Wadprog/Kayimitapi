/**
 * Where all server related stuff lives
 */

// Dependencies
const express = require('express');
const passport = require('passport');
const PassportLocal = require('passport-local');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
// Custom dependencies
const environnement = require('./config');
const connectDB = require('./database');
const User = require('./database/user');
const isLoggedIn = require('./middleware/authenticate');

// Configuring the server
const app = express();
app.use(express.json({ extended: false }));
// Allowing all origin
app.use(cors());
// Parsing the request Body
app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
// Getting the cookies
app.use(cookieParser(environnement.COOKIE_SECRET));
// Handling session
app.use(
  session({
    secret: environnement.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  })
);

// setting up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Serving statics files
app.use(express.static('public'));
// override with POST
app.use(methodOverride('_method'));

// connecting to database
connectDB();
app.use(isLoggedIn);
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.originalUrl);
  return next();
});
// Serving the routes
app.use('/login', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/transactions', require('./routes/transaction'));
app.use('/customers', require('./routes/customer'));
// app.use('/customers', require('./routes/customer'));
// app.use('/users', require('./routes/user'));
// app.use('/transactions', require('./routes/transactions'));

// Not found route error handler.
// app.use('*', (req, res) => res.render('errors/404'));

// app.use(mongooseValidation)

// Handling all errors

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong ' } = err;
  return res.status(status).json({ message });
});

// Starting the server
const PORT = process.env.PORT || environnement.PORT;
app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(
    `Server in listening in ${environnement.NAME} environment on port ${environnement.PORT}`
  )
);
