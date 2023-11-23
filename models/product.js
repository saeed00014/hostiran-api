const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  img: String,
  title: String,
  isAvailable: Boolean,
  remaining: String,
  rate: Number,
  price: Number,
  discountPrecent: Number,
  quantity: Number
});

module.exports = mongoose.model('Product', productSchema);