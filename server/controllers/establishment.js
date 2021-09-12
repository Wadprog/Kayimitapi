const Establishment = require('../database/establishment');
const { catchAsync } = require('../helper');
const AppError = require('../errors');

module.exports.createOne = catchAsync(async (req, res) => {
  let establishment = await Establishment.find({ location: req.body.location });
  if (establishment)
    throw new AppError(
      'There is already and establishment in that location',
      401
    );

  establishment = new Establishment(req.body);
  establishment.creator = req.user._id;
  establishment.lastEditor = req.user._id;
  const newOne = await establishment
    .save()
    .then((newEstablishment) =>
      newEstablishment
        .populate(['lastClosedOpenBy', 'lastEditor'])
        .execPopulate()
    );

  return res.json(newOne);
});

module.exports.getAll = catchAsync(async (req, res) => {
  const establishments = await Establishment.find({}).populate([
    'lastClosedOpenBy',
    'lastEditor',
  ]);
  return res.json(establishments);
});
module.exports.deleteOne = catchAsync(async (req, res) => {
  console.log('trying to update an establishment details');
  const establishment = await Establishment.findById(req.body._id);
  establishment.isOpen = !establishment.isOpen;
  establishment.lastClosedOpen = Date.now();
  await establishment
    .save()
    .then((editedEstablisment) =>
      editedEstablisment
        .populate(['lastClosedOpenBy', 'lastEditor'])
        .execPopulate()
    );
  return res.json(establishment);
});
module.exports.editOne = catchAsync(async (req, res) => {
  const establishment = await Establishment.findById(req.body._id);

  Object.keys(req.body).forEach((key) => {
    if (key !== '_id') establishment[key] = req.body[key];
  });
  establishment.lastEdited = Date.now();
  establishment.lastEditor = req.user._id;
  const edited = await establishment
    .save()
    .then((editedEstablisment) =>
      editedEstablisment
        .populate(['lastClosedOpenBy', 'lastEditor'])
        .execPopulate()
    );
  return res.json(edited);
});
