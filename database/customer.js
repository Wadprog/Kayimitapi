/*
Database structure for customers
*/

// Dependencies
const mongoose = require('mongoose');

// Customer schema
const customerSchema = mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  membershipPlan: {
    type: String,
    enum: ['black', 'gold'],
    default: 'black',
  },
  repairReason: String,
  reportNote: String,
  email: String,
  birthDate: String,
  socialSecurity: { type: String },
  homeTelephone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  status: { type: String },
  previousAddress: { type: String },
  previousCity: { type: String },
  previousState: { type: String },
  previousZip: { type: String },
  mobile: { type: String },
  startDate: { type: String },
  addedDate: { type: String },
  workTelephone: { type: String },
  phoneExt: { type: String },
  fax: { type: String },
  country: { type: String },
  previousCountry: { type: String },
  referredBy: { type: String },
  affiliateCompany: { type: String },
  assignedTo: { type: String },
  
});

customerSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName[0]}`;
});

// Exporting the Model
module.exports = mongoose.model('Customer', customerSchema);
