const express = require("express");
const bookcontroll = require("./bookcontroller");
const router = express.Router();

router.param("id", bookcontroll.is_book_id_valid);

router.route("/").get(bookcontroll.get_all_book).post(bookcontroll.check_body,bookcontroll.add_book);

router
  .route("/:id")
  .get(bookcontroll.get_book)
  .patch(bookcontroll.upgrade_book_info)
  .delete(bookcontroll.delete_book);

module.exports = router;
