const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const books = JSON.parse(fs.readFileSync(`${__dirname}/books.json`));

const is_Id_validate = (id) => {
  return books.some((book) => book.id === id);
};

const get_all_book = (req, res) => {
  res.status(200).json({
    status: "success",
    result: books.length,
    data: {
      books,
    },
  });
};

const get_book = (req, res) => {
  const id = req.params.id * 1;
  const book = books.find((el) => el.id === id);

  if (!is_Id_validate(id)) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
};

const add_book = (req, res) => {
  const new_id = books[books.length - 1].id + 1;
  const new_book = Object.assign({ id: new_id }, req.body);

  books.push(new_book);
  fs.writeFile(`${__dirname}/books`, JSON.stringify(books), (err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "fali to add book",
      });
    }
    res.status(201).json({
      status: "success",
      data: {
        book: new_book,
      },
    });
  });
};

const upgrade_book_info = (req, res) => {
  const id = req.params.id * 1;
  if (!is_Id_validate(id)) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  const book_index = books.findIndex((el) => el.id === id);
  books[book_index] = { ...books[book_index], ...req.body };
  fs.writeFile(`${__dirname}/books.json`, JSON.stringify(books), (err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "fail to update book",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        book: books[book_index],
      },
    });
  });
};

const delete_book = (req, res) => {
  const id = req.params.id * 1;

  if (!is_Id_validate(id)) {
    return res.status(404).json({
      status: "fail",
      message: "Book with this ID not found",
    });
  }

  const book_index = books.findIndex((el) => el.id === id);
  books.splice(book_index, 1);

  fs.writeFile(`${__dirname}/books.json`, JSON.stringify(books), (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not delete the book from database",
      });
    }

    res.status(204).json({
      status: "success",
      data: {
        book: null,
      },
    });
  });
};

app
.route("/api/v1/books")
.get(get_all_book)
.post(add_book);


app
  .route("/api/v1/books/:id")
  .get(get_book)
  .patch(upgrade_book_info)
  .delete(delete_book);

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
