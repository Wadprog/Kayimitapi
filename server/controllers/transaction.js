const add = require('date-fns/add');
const Transaction = require('../database/transactions');
const { catchAsync } = require('../helper');
const AppError = require('../errors');

module.exports.createOne = catchAsync(async (req, res) => {
  const newTransaction = new Transaction({
    ...req.body,
    user: req.user,
    establishment: req.user.establishment,
  });
  const trx = await newTransaction
    .save()
    .then((transaction) =>
      transaction.populate(['customer', 'user']).execPopulate()
    );

  return res.json(trx);
});

module.exports.getAll = catchAsync(async (req, res) => {
  const queryOptions = req.user.isAdmin
    ? {}
    : { user: req.user._id, establishment: req.user.establishment };

  const transactions = await Transaction.find(queryOptions).populate([
    'customer',
    'user',
  ]);

  return res.json(transactions);
});
module.exports.editMany = catchAsync(async (req, res) => {
  
  const nextDay = add(new Date(req.body.lockDate), {
    days: 1,
  });

  const transactions = await Transaction.updateMany(
    {
      addedDate: {
        $gte: new Date(req.body.lockDate),
        $lt: nextDay,
      },
    },
    { isLock: true }
  );
  console.log(transactions);

  return res.json(transactions);
});
module.exports.editOne = catchAsync(async (req, res) => {
  const transaction = await Transaction.findByIdAndUpdate(req.params._id, {
    ...req.body,
  });
  return res.json(transaction);
});
module.exports.deleteOne = catchAsync(async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  return res.json(req.params.id);
});
