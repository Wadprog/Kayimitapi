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
  transactionType: String,
  amountUSD: { type: Number, require: true },
  amountHGT: { type: Number, require: true },
  note: String,
  addedDate: { type: Date, default: Date.now },
  rate: Number,
});

module.exports = mongoose.model('transaction', transactionSchema);
