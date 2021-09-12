const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  // companyName: { type: String, required: true },
  //companyLogo: { type: String, required: true },
  hasOneAdmin: { type: Boolean, required: true },
  hasOneEstablishment: { type: String, required: true },
  isCompleted: { type: Boolean },
});

module.exports = mongoose.model('account', accountSchema);
