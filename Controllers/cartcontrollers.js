const Cart = require("./../models/cartmodel");
const Book = require("./../models/bookmodel");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.book");
    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find((item) => item.book.equals(bookId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ book: bookId, quantity });
    }

    await cart.save();

    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "Cart not found",
      });
    }

    const item = cart.items.find((item) => item.book.equals(bookId));

    if (!item) {
      return res.status(404).json({
        status: "fail",
        message: "Item not found in cart",
      });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
