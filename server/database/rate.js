const mongoose = require('mongoose');

const rateSchema = mongoose.Schema({
  buyingValue: { type: Number, required: true },
  sellingValue: { type: Number, required: true },
  buyingLabel: { type: String, required: true },
  sellingLabel: { type: String, required: true },
});

module.exports = mongoose.model('rate', rateSchema);
