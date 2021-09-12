const AppError = require('../errors');

const unprotectedMethod = ['GET'];

module.exports = function (req, res, next) {
  if (unprotectedMethod.includes(req.method.toUpperCase())) return next();
  if (req.user.isAdmin) return next();
  throw new AppError(
    'Only admins can modify or create new establishments',
    401
  );
};
