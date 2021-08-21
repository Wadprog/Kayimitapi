/**
 * All functions too small to be their own module.
 */
// Dependencies.
const jwt = require('jsonwebtoken');

const helper = {};

helper.catchAsync = (fn) =>
  function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };

helper.capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

helper.tokenizeObject = (payload, cbError, cbSuccess) => {

  payload = {
    user: payload,
  };
  jwt.sign(
    payload,
    'jwtSecret',
    {
      expiresIn: 360000,
    },
    (err, token) => {
      if (err) return cbError(err);
      return cbSuccess(token);
    }
  );
};
module.exports = helper;
