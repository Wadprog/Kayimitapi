/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const creditProfileSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  scores: {
    transunion: Number,
    equifax: Number,
    experian: Number,
  },

  negativeItems: [
    {
      name: String,
      transunion: Boolean,
      equifax: Boolean,
      experian: Boolean,
      category: { type: Schema.Types.ObjectId },
      dateOpen :{}
    },
  ],
  itemsAdded: [
    {
      name: String,
      bureaus: [String],
      category: { type: Schema.Types.ObjectId },
      dateOpen :{}
    },
  ],
  itemsRemoved: [
    {
      name: String,
      bureaus: [String],
      category: { type: Schema.Types.ObjectId },
      dateOpen :{}
    },
  ],
  note: { type: String, default: 'Add a note for this buyer' },
  dateAddedOnProfile: { type: Date, required: true },
  dateAdded: { type: Date, default: Date.now },
});

creditProfileSchema.virtual('itemAdded').get(function () {
  return this.itemsAdded || [];
});

creditProfileSchema.virtual('itemRemoved').get(function () {
  return this.note;
});

creditProfileSchema.methods.listNegativeItems = function () {
  const negItems = [];
  const creditBureaus = ['transunion', 'equifax', 'experian'];

  for (const negativeItem of this.negativeItems) {
    const negItemBureauList = [];
    for (const creditBureau of creditBureaus) {
      if (negativeItem[creditBureau]) negItemBureauList.push(creditBureau);
    }

    const obj = {
      name: negativeItem.name,
      bureauList: negItemBureauList,
      category: negativeItem.category,
    };

    negItems.push(obj);
  }
  return negItems;
};

module.exports = mongoose.model('CreditProfile', creditProfileSchema);
