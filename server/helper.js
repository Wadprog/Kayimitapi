// Dependencies.
const jwt = require('jsonwebtoken');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const config = require('./config');

const helper = {};

helper.accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

helper.configDetails = null;
helper.jsonReader = (filePath, cb) => {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (error) {
      return cb && cb(error);
    }
  });
};

helper.catchAsync = (fn) =>
  function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };

helper.capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

helper.tokenizeObject = (payload, cbError, cbSuccess) => {
  const tokenDetails = { user: payload };
  jwt.sign(
    tokenDetails,
    config.JWT_SECRET,
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
