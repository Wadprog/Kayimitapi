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
  birthDate: String,
  idNumber: String,
  telephone: String,
  address: String,
  idType: String,
});

customerSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName[0]}`;
});

// Exporting the Model
module.exports = mongoose.model('customer', customerSchema);
