const { catchAsync } = require('../helper');
const AppError = require('../errors');
const Establishment = require('../database/establishment');

module.exports = catchAsync(async (req, res, next) => {
  const desiredEstablishment = await Establishment.findById(
    req.user.establishment
  );

  if (!desiredEstablishment) throw new AppError('Invalid establishment', 404);

  if (desiredEstablishment.isOpen) return next();
  throw new AppError('This establishment is currently closed', 401);
});
