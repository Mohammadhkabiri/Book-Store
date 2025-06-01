const express = require("express");
const cartController = require("./cartController");
const authController = require("./auth_contoller");

const router = express.Router();

router.use(authController.protect); 

router
  .route("/")
  .get(cartController.getCart)
  .post(cartController.addToCart)
  .delete(cartController.deleteCart);

router.route("/items").patch(cartController.updateCart);

module.exports = router;