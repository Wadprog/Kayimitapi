const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
  },
  establishment: { type: mongoose.Schema.Types.ObjectId, ref: 'establishment' },
  rateId: { type: mongoose.Schema.Types.ObjectId, ref: 'rate' },
  transactionType: String,
  origin: Number,
  destination: Number,
  originLabel: String,
  destinationLabel: String,
  rate: Number,
  xChangeRate: Number,
  rateLabel: String,
  note: String,

  addedDate: { type: Date, default: Date.now },
  isLock: { type: Boolean, default: false },
  locker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  lockDate: { type: Date },
});

module.exports = mongoose.model('transaction', transactionSchema);
