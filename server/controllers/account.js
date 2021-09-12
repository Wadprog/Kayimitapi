const AppError = require('../errors');
const Account = require('../database/account');
const User = require('../database/user');
const Establishment = require('../database/establishment');
const { catchAsync } = require('../helper');

module.exports.createOne = catchAsync(async (req, res) => {
  console.log({ ms: 'Here in account post', body: req.body });
  const account = await Account.find({});
  let newAccount = account[0];
  if (account.length)
    if (newAccount.isCompleted)
      throw new AppError('Only one account can be created ', 401);

  newAccount = new Account({});
  let firstUser = await User.findOne({ user: req.body.admin.username });
  if (firstUser) throw new AppError('User Already Exist', 401);
  firstUser = await User.register(req.body.admin, req.body.admin.password);
  newAccount.hasOneAdmin = true;
  const firstEstablishment = new Establishment(req.body.establishment);

  await firstEstablishment.save();
  newAccount.hasOneEstablishment = true;
  newAccount.isCompleted = true;
  await newAccount.save();
  console.log({ newAccount });
  return res.json(newAccount);
});
module.exports.getAll = catchAsync(async (req, res) => {
  const account = await Account.find({});

  if (!account.length)
    throw new AppError('Now account was configure for this app', 404);
  return res.json(account);
});
module.exports.getOne = catchAsync(async (req, res) => {
  const account = await Account.findById(req.body.id);
  if (!account)
    throw new AppError('Now account was configure for this app', 404);
  return res.json(account);
});
module.exports.editOne = catchAsync(async (req, res) => {
  if (!req?.user?.isAdmin)
    throw new AppError('You are not authorized to edit this files');
  const account = await Account.findById(req.body.id);
  if (!account)
    throw new AppError('Now account was configure for this app', 404);
  Object.keys(req.body).forEach((key) => {
    if (key !== '_id') account[key] = req.body[key];
  });
  await account.save();
  return res.json(account);
});
module.exports.deleteOne = catchAsync(async (req, res) => {
  if (!req?.user?.isAdmin)
    throw new AppError('You are not authorized to edit this files');
  await Account.findByIdAndDelete(req.body.id);
  return res.json({ id: req.body.id });
});
