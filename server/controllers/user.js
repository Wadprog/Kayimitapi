const gravatar = require('gravatar');

const AppError = require('../errors');
const User = require('../database/user');
const { catchAsync } = require('../helper');

module.exports.createOne = catchAsync(async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) throw new AppError('User Already Exist', 401);
  req.body.avatar = gravatar.url(req.body.email, {
    s: '200',
    r: 'x',
    d: 'retro',
    f: 'y',
  });
  user = await User.register(req.body, req.body.password);
  return res.json(user);
});

module.exports.getAll = catchAsync(async (req, res) => {
  const users = await User.find({});
  console.log(users[users.length - 1]);
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
module.exports.lockOne = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('This user does not exist', 404);
  if (user._id.equals(req.user._id))
    throw new AppError(
      'You are not authorized to change your own settings',
      401
    );
  user.isActive = !user.isActive;
  await user.save();
  return res.json(user);
});

module.exports.makeSuper = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('This user does not exist', 404);
  if (user._id.equals(req.user._id))
    throw new AppError(
      'You are not authorized to change your own settings',
      401
    );
  user.isAdmin = !user.isAdmin;
  await user.save();
  return res.json(user);
});
