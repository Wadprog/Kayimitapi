const Transaction = require('../database/transactions');
const { catchAsync } = require('../helper');

module.exports.createOne = catchAsync(async (req, res) => {
  const { origin, xChangeRate, transactionType, ToAmount, customer } = req.body;
  
  const newTransaction = new Transaction({
    amountUSD: transactionType === 'Vente' ? origin : ToAmount,
    amountHGT: transactionType === 'Vente' ? ToAmount : origin,
    rate: xChangeRate,
    transactionType,
    customer,
    user: req.user,
  });

  const trx = await newTransaction
    .save()
    .then((transaction) =>
      transaction.populate(['customer', 'user']).execPopulate()
    );
  return res.json(trx);
});

module.exports.getAll = catchAsync(async (req, res) => {
  const transactions = await Transaction.find({}).populate([
    'customer',
    'user',
  ]);

  return res.json(transactions);
});
