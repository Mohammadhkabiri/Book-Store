const express = require("express");


const Router = express.Router();

Router
.route("/")
.get(get_all_users)
.post(add_user)

Router
.route("/:id")
.get(get_user)
.patch(update_user_info)
.delete(delete_user)

app.use("/api/v1/users" ,Router);

module.exports =  Router;