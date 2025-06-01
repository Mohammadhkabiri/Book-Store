const fs = require("fs");
const User = require("./usermodel");

exports.get_all_user = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.get_user = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.add_user = async (req, res) => {
  try {
    const NewBook = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      data: NewBook,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.upgrade_user_info = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.delete_user = async (req, res) => {
  try {
    await User.findOneAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err.message,
    });
  }
};
