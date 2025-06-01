const express = require("express");
const bookController = require("./bookcontroller");
const authController = require("./auth_contoller");

const router = express.Router();

router.use(authController.protect, authController.restrictTo("admin")); 

router
  .route("/books/:id")
  .patch(bookController.upgrade_book_info)
  .delete(bookController.delete_book);

module.exports = router;