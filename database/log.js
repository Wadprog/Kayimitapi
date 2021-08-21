const mongoose = require('mongoose')

const { Schema } = mongoose
const logSchema = mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: { type: String },
  text: { type: String, default: 'no reason yet' },
  date: { type: Date, default: Date.now() },
})

// eslint-disable-next-line no-multi-assign
module.exports = Log = mongoose.model('Log', logSchema)
