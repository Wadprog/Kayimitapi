const mongoose = require('mongoose');

const { Schema } = mongoose;

const establishmentSchema = new Schema({
  city: String,
  location: { type: String, unique: true, required: false },
  isOpen: { type: 'boolean', default: true },
  dateAdded: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now },
  lastClosedOpen: { type: Date, default: Date.now },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  lastEditor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  lastClosedOpenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('establishment', establishmentSchema);
