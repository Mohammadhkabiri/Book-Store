const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Userschema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your email"],
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },

  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minlength: 8,
    select: false,
  },

  phoneNumber: {
    type: Number,
    required: true,
    validate: validator.isMobilePhone,
  },
  confirmPass: {
    type: String,
    required: [true, "Please Confirm your password"],
    minlength: 8,
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: "Passwords are not the same",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPass = undefined;
  next();
});

Userschema.methods.correct_Password = async function (
  cancidatePassword,
  Userpassword
) {
  return await bcrypt.compare(cancidatePassword, Userpassword);
};

const User = new mongoose.model("User", Userschema);

module.exports = User;
