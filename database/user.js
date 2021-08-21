const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String, require: true },
  middleName: { type: String },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  isActive: { type: Boolean, default: true },
  img: String,
  addedDate: { type: Date, default: Date.now },
  establishments: [{ name: String }],
});

userSchema.plugin(passportLocalMongoose);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName[0]}`;
});

module.exports = mongoose.model('user', userSchema);
