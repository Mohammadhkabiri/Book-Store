const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bookRouter = require("./bookRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const paymentRouter = require("./paymentRouter");
const adminRouter = require("./adminRouter");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/admin", adminRouter);

module.exports = app;