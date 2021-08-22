const AppError = require('../errors');
const Customer = require('../database/customer');
const { catchAsync } = require('../helper');

module.exports.createOne = catchAsync(async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  return res.json(customer);
});

module.exports.getAll = catchAsync(async (req, res) => {
  const customers = await Customer.find({});
  if (!customers) throw new AppError('We found no customers', 500);
  return res.json(customers);
});

module.exports.getOne = catchAsync(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw new AppError('This user does not exist', 404);
  return res.json(customer);
});

module.exports.editOne = catchAsync(async (req, res) => {
  console.log('Ediiting customer');
  console.log(req.params.id);
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw new AppError('This user does not exist', 404);
  Object.keys(req.body).forEach((key) => {
    console.log({ key, Ec: customer[key], NC: req.body[key] });
    if (key !== '_id') customer[key] = req.body[key];
  });
  await customer.save();
  return res.json(customer);
});
