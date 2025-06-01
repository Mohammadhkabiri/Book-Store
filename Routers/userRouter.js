const express = require("express");
const auth_contoller = require("./auth_contoller");
const user_controller = require("./usercontroller")

const Router = express.Router();

Router.post("/signup", auth_contoller.signup);
Router.post("/login", auth_contoller.signup);

Router.route("/").get(user_controller.get_all_user).post(user_controller.add_user);

Router.route("/:id").get(user_controller.get_user).patch(user_controller.upgrade_user_info).delete(user_controller.delete_user);

app.use("/api/v1/users", Router);

module.exports = Router;