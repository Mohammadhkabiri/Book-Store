const express = require("express");
const paymentController = require("./paymentcontroller");
const authController = require("./auth_controller");

const router = express.Router();

router.use(authController.protect); 

router.route("/").post(paymentController.processPayment);

module.exports = router;