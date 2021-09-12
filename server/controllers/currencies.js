const currencyList = require('../currencies.json');
const { catchAsync } = require('../helper');
const AppError = require('../errors');

module.exports.getAll = catchAsync(async (req, res) => {
  if (!currencyList.length)
    throw new AppError('Error retrieving the currency list');
  return res.json(currencyList);
});
