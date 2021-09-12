const AppError = require('../errors');
const { catchAsync } = require('../helper');
const Transaction = require('../database/transactions');

const ifCreatorOrSuperVisor = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) throw new AppError('This transaction is not found', 404);
  if (!transaction.user._id.equals(req.params.id))
    throw new AppError(
      'You cannot delete a transaction you have not created',
      401
    );
  if (transaction.isLock)
    throw new AppError('This transaction is  locked', 401);
  return next();
});

module.exports = ifCreatorOrSuperVisor;
