const fs = require("fs");
const Book = require("./Book.model");

exports.check_body = (req, res, next) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).json({
      status: "Fail",
      message: "Missing title or price",
    });
  }
  next();
};

exports.get_all_book = async (req, res) => {
  try {
    const books = await Book.find();
    // const filterd_book = await Book.find({
    //   title: "x",
    //   author: "y",
    // });
    // const second_Filterd_book = await Book.where(title).equals("x").where(author).equals("y");
    res.status(200).json({
      status: "success",
      result: books.length,
      data: books,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.get_book = async (req, res) => {
  try {
    const book = await books.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.add_book = async (req, res) => {
  try {
    const NewBook = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      data: NewBook,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.upgrade_book_info = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.delete_book = async (req, res) => {
  try {
    await Book.findOneAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
};
