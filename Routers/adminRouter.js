const express = require("express");
const bookController = require("./../controllers/bookcontroller");
const authController = require("./../controllers/auth_contoller");

const router = express.Router();

router.use(authController.protect, authController.restrictTo("admin")); 

router
  .route("/books/:id")
  .patch(bookController.upgrade_book_info)
  .delete(bookController.delete_book);

module.exports = router;
