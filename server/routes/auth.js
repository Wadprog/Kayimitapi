const express = require('express');
const passport = require('passport');
const auth = require('../controllers/auth');
const mongoose = require('mongoose');

const toObjectId = mongoose.Types.ObjectId;
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

      if (!user?.isActive) throw new AppError('Your account is inactive', 401);

      const hasAccess =
        user.establishments.some((establishment) =>
          toObjectId(establishment).equals(req.body.establishment)
        ) || user.isAdmin;

      if (hasAccess) {
        const { isActive, isAdmin, _id, firstName, lastName, avatar } = user;

        return tokenizeObject(
          {
            avatar,
            isActive,
            isAdmin,
            _id,
            firstName,
            lastName,
            establishment: req.body.establishment,
          },

          (err) => {
            throw new AppError(err.message, 500);
          },
          (token) => res.json({ token })
        );
      }

      throw new AppError('You cannot access this establisment data', 401);
    })
  );
router.get('/forgot-password', auth.forgotPasswordForm);
router.get('/lock-screen', auth.lockScreen);
router.get('/logout', auth.logout);

module.exports = router;
