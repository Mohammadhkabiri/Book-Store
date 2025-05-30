const mongoose = require("mongoose");
const Bookschema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Book Must have a title"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Book Must have a price"],
    },
  
    id: {
      type: Number,
      required: [true, "Book Must have ID"],
      unique: true,
    },
  
    author: {
      type: String,
      required: [true, "Book Must have author"],
    },
  
    publishyear: {
      type: Number,
      required: [false],
    },
  });
  
  const Book = mongoose.model("Book", Bookschema);

  module.exports = Book;