const mongoose = require("mongoose");
const validator = require("validator");
const Bookschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book Must have a title"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "Book Must have a price"],
    validate: function (val) {
      return val > 0;
    },
  },

  id: {
    type: Number,
    required: [true, "Book Must have ID"],
    unique: true,
    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: "Invalid ID",
    },
  },

  author: {
    type: String,
    required: [true, "Book Must have author"],
  },

  publishyear: {
    type: Number,
    required: false,
    validate: {
      validator: function (val) {
        return val > 0;
      },
      message: "Invalid publish year",
    },
  },

  price_discount: {
    type: Number,
    require: false,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: "discount price Must be below regular price",
    },
  },
  quainity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

const Book = mongoose.model("Book", Bookschema);

module.exports = Book;
