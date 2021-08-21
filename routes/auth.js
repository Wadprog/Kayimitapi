const express = require('express');
const passport = require('passport');
const auth = require('../controllers/auth');
const AppError = require('../errors');
const { catchAsync, tokenizeObject } = require('../helper');
// Creating the router Object
const router = express.Router();

// Rendering the auth form page
router
  .route('/')
  .get(auth.loginForm)
  .post(
    passport.authenticate('local', {}),

    catchAsync(async (req, res) => {
      const { user } = req;
      console.log({
        e: user.establishments,
        b: req.body.establishment,
        l: user.establishments.length,
      });
      if (!user?.isActive || !user.establishments.length)
        throw new AppError(
          'You either inactive or have no access to <b>any</b> establishment data',
          401
        );

      const hasAccess = user.establishments.some(
        // eslint-disable-next-line eqeqeq
        (establishment) => establishment.name == req.body.establishment
      );

      if (hasAccess)
        return tokenizeObject(
          user,
          (err) => {
           
            throw new AppError(err.message, 500);
          },
          (token) => {
            console.log({ token });
            return res.json({ token });
          }
        );

      throw new AppError('You cannot access this establisment data', 401);
    })
  );
router.get('/forgot-password', auth.forgotPasswordForm);
router.get('/lock-screen', auth.lockScreen);
router.get('/logout', auth.logout);

module.exports = router;
