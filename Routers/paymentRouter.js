const express = require("express");
const paymentController = require("./../controllers/paymentcontroller");
const authController = require("./../controllers/auth_controller");

const router = express.Router();

router.use(authController.protect); 

router.route("/").post(paymentController.processPayment);

module.exports = router;
