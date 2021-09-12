/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const Account = require('../database/account');
const User = require('../database/user');
const { catchAsync } = require('../helper');
const AppError = require('../errors');
const config = require('../config');

const nonSecureRoutes = [
  { path: '/', methods: ['GET'] },
  { path: '/api/', methods: ['GET'] },
  { path: '/api/account', methods: ['GET'] },
  { path: '/api/establishments', methods: ['GET'] },
  { path: '/api/establishment', methods: ['GET,POST'] },
  { path: '/api/login', methods: ['POST'] },
];

const _isAccessAble = ({ path, method }) => {
  const desiredRoute = nonSecureRoutes.find((route) => route.path === path);

  if (!desiredRoute) return false;
  return desiredRoute.methods.some(
    (actualMethod) => actualMethod === method.toUpperCase()
  );
};

const isLoggedIn = catchAsync(async (req, res, next) => {
  if (!req.path.startsWith('/api')) return next();
  if (_isAccessAble(req)) return next();

  const token = req.header('x-auth-token');
  if (!token) {
    return Account.find({})
      .then((account) => {
        if (!account.length) return next();
        throw new AppError('Must be logged in to access that route', 401);
      })
      .catch((error) => {
        throw new AppError(error.message);
      });
  }
  const decoded = jwt.verify(token, config.JWT_SECRET);
  const requester = await User.findById(decoded?.user?._id);
  if (!requester) throw new AppError('Your account has disappeared', 404);
  req.user = requester;
  req.user.establishment = decoded.user.establishment;
  return next();
});

module.exports = isLoggedIn;
