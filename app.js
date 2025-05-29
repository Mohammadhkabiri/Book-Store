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

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
