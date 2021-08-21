const AppError = require('../errors');
const User = require('../database/user');
const { catchAsync } = require('../helper');

module.exports.createOne = catchAsync(async (req, res) => {
  const { user } = req.body;
  console.log({ user });
  await User.register(user, user.password);
  return res.json({ message: 'User Created Successfully' });
});

module.exports.getAll = catchAsync(async (req, res) => {
  const users = await User.find({});
  if (!users) throw new AppError('We found no users', 404);
  return res.json(users);
});

module.exports.getOne = catchAsync(async (req, res) => {
  const user = await User.findOneById(req.params.id);
  if (!user) throw new AppError('This user does not exist', 404);
  return res.json(user);
});

module.exports.editOne = catchAsync(async (req, res) => {
  let user = await User.findOneById(req.params.id);
  if (!user) throw new AppError('This user does not exist', 404);
  user = req.body.user;
  await user.save();
  return res.json(user);
});
