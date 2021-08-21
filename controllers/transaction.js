const Transaction = require('../database/transactions');
const { catchAsync } = require('../helper');
/* eslint-disable no-console */

/*
Authentication controllers
*/

module.exports.createOne = catchAsync(async (req, res) => {
  console.log('Your want to create a new Transaction');

  const { origin, xChangeRate, transactionType, ToAmount } = req.body;

  console.log('object1');
  const newTransaction = new Transaction({
    amountUSD: transactionType === 'Vente' ? origin : ToAmount,
    amountHGT: transactionType === 'Vente' ? ToAmount : origin,
    rate: xChangeRate,
    transactionType,
  });
  await newTransaction.save();

  return res.json(newTransaction);
});
module.exports.getAll = catchAsync(async (req, res) => {
  const transactions = await Transaction.find({});
  return res.json(transactions);
});
