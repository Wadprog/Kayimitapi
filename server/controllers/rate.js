const Rate = require('../database/rate');
const { catchAsync } = require('../helper');
const AppError = require('../errors');

module.exports.createOne = catchAsync(async (req, res) => {
  const rate = new Rate(req.body);
  await rate.save();
  return res.json(rate);
});

module.exports.getAll = catchAsync(async (req, res) => {
  const rates = await Rate.find({});
  return res.json(rates);
});

module.exports.editOne = catchAsync(async (req, res) => {
  const rate = await Rate.findById(req.body._id);
  if (!rate) throw new AppError('This rate does not exist', 404);
  Object.keys(req.body).forEach((key) => {
    if (key !== '_id') rate[key] = req.body[key];
  });
  await rate.save();
  return res.json(rate);
});
