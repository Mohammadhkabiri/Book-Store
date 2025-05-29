const express = require("express");
const fs = require("fs");
const { dirname } = require("path");

const app = express();

app.use(express.json());

const books = JSON.parse(fs.readFileSync(`${__dirname}/books.json`));

app.get("/api/v1/books", (req, res) => {
  res.status(200).json({
    status: "success",
    result: books.length,
    data: {
      books,
    },
  });
});


app.post("/api/v1/books", (req, res) => {
  const new_id = books[books.length - 1].id + 1;
  const new_book = Object.assign({ id: new_id }, req.body);

  books.push(new_book);
  fs.writeFile(`${__dirname}/books`, JSON.stringify(books), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        book: new_book,
      },
    });
  });
});


app.get("/api/v1/books/:id", (req, res) => {
  const id = req.params.id * 1;

   if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

const book  = books.find(el => el.id === id);

  console.log(req.params);
  res.status(200).json({
    status: "success",
    data : {
      book
    }
  });
});



app.patch("/api/v1/books/:id", (req, res) => {
  const id = req.params.id * 1;
  if (!is_Id_validate(id)) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  const book_index = books.findIndex((el) => el.id === id);
  books[book_index] = { ...books[book_index], ...req.body };
  fs.writeFile(`${__dirname}/books.json`,JSON.stringify(books), (err) => {
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
});


app.delete("/api/v1/books/:id", (req, res) => {
  const id = req.params.id * 1;
  
  if (!is_Id_validate(id)) {
    return res.status(404).json({
      status: "fail",
      message: "Book with this ID not found"
    });
  }

  const book_index = books.findIndex((el) => el.id === id);
books.splice(book_index, 1);

  fs.writeFile(`${__dirname}/books.json`, JSON.stringify(books), (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Could not delete the book from database"
      });
    }

    res.status(204).json({
      status: "success",
      data: {
        book: null
      }
    });
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
