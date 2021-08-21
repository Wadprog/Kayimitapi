/* eslint-disable no-console */

/*
Authentication controllers
*/

module.exports.logout = (req, res) => {
  console.log('Your are logged out');
  res.cookie('name', 'cookie');
  return res.json({ msg: 'Logged Out ' });
};
module.exports.loginForm = (req, res) => {
  console.log('Requested a Login Form ');
  res.cookie('name', 'cookie');
  return res.json({ msg: 'Your Login form Baby' });
};
module.exports.login = (req, res) => {



  console.log(req.body);
  res.cookie('name', 'cookie');
  return res.json({ msg: 'Login ' });
};

module.exports.forgotPasswordForm = (req, res) =>
  res.json({ msg: 'auth/forgot-password' });

module.exports.lockScreen = (req, res) => res.json({ msg: 'auth/lockScreen' });
module.exports.recoverPassword = (req, res) =>
  res.json({ msg: 'auth/recover-password' });
module.exports.register = (req, res) => res.json({ msg: 'auth/register' });

module.exports.register = (req, res) => res.json({ msg: 'auth/register' });
