const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  categoryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categoryType',
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slider: [
    {
      position: {
        type: Number,
      },
      sliderImage: {
        type: String,
      },
    },
  ],
  createAt: {
    type: Date,
  },
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
