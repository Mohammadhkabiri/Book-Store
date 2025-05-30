const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bookRouter = require("./bookRoutes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/books", bookRouter);

module.exports = app;
