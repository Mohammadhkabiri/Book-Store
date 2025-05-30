const fs = require("fs");
const Book  = require("./Book.model");
const books = JSON.parse(fs.readFileSync(`${__dirname}/books.json`));

exports.is_book_id_valid = (req, res, next, val) => {
  if (req.params.id * 1 > books.length || req.params.id < 0) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.check_body = (req, res, next) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).json({
      status: "Fail",
      message: "Missing title or price",
    });
  }
  next();
};

exports.get_all_book = (req, res) => {
  res.status(200).json({
    status: "success",
    result: books.length,
    data: { books },
  });
};

exports.get_book = (req, res) => {
  const id = req.params.id * 1;
  const book = books.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: { book },
  });
};

exports.add_book = (req, res) => {
  const new_id = books[books.length - 1].id + 1;
  const new_book = Object.assign({ id: new_id }, req.body);

  books.push(new_book);
  fs.writeFile(`${__dirname}/books.json`, JSON.stringify(books), (err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "failed to add book",
      });
    }
    res.status(201).json({
      status: "success",
      data: { book: new_book },
    });
  });
};

exports.upgrade_book_info = (req, res) => {
  const id = req.params.id * 1;

  const book_index = books.findIndex((el) => el.id === id);
  books[book_index] = { ...books[book_index], ...req.body };
  fs.writeFile(`${__dirname}/books.json`, JSON.stringify(books), (err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "failed to update book",
      });
    }
    res.status(200).json({
      status: "success",
      data: { book: books[book_index] },
    });
  });
};

exports.delete_book = (req, res) => {
  const id = req.params.id * 1;

  const book_index = books.findIndex((el) => el.id === id);
  books.splice(book_index, 1);

  fs.writeFile(`${__dirname}/books.json`, JSON.stringify(books), (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not delete the book",
      });
    }
    res.status(204).end();
  });
};
