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

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
