const mongoose = require("mongoose");
const User = require("./usermodel");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { use } = require("./../Routers/userRouter");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  const decoded = jwt.verify(token, "secret");
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist.",
    });
  }

  req.user = currentUser;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};

const signtoken = (id) => {
  return jwt.sign({ id: New_User.id }, "secret", {
    expiresIn: 90,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const New_User = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPass: req.body.confirmpassword,
    });
    const token = signtoken(New_User.id);
    res.status(201).json({
      status: "success",
      token,
      data: New_User,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
  next();
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const Password = req.body.password;
  if (!email || Password) {
    return res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
  const user = await User.findOne({ email }).select("+password");
  const correct = await user.correct_Password(password, user.password);

  if (!user || !correct) {
    return res.status(401).json({
      status: "Fail",
      message: err.message,
    });
  }
  const token = signtoken(user.id);
  res.status(201).json({
    status: "success",
    token,
  });
};
