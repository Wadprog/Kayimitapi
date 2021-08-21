const mongoose = require('mongoose')

const negItemCatSchema = mongoose.Schema({
  name: { type: String },
  price: { type: Number, min: 0 },
  dateAdded: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
})
// negItemCatSchema.virtual('fullName').get(function () {
//   return `${this.firstName} ${this.lastName[0]}`
// })
module.exports = NegativeItemCategory = mongoose.model(
  'NegativeItemCategory',
  negItemCatSchema
)
