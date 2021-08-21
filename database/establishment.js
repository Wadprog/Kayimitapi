const mongoose = require('mongoose');

const { Schema } = mongoose;

const establishmentSchema = new Schema({
  city: String,
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('establishment', establishmentSchema);
