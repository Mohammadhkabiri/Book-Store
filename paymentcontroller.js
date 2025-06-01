const Payment = require("./Payment.model");
const Cart = require("./cartmodel");
const Book = require("./bookmodel");

exports.processPayment = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
      isPaid: false,
    }).populate("items.book");

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "No active cart found",
      });
    }

    for (const item of cart.items) {
      const book = await Book.findById(item.book._id);
      if (book.quantity < item.quantity) {
        return res.status(400).json({
          status: "fail",
          message: `Not enough stock for book: ${book.title}`,
        });
      }
      book.quantity -= item.quantity;
      await book.save();
    }

    cart.isPaid = true;
    await cart.save();

    const payment = await Payment.create({
      cart: cart._id,
      user: req.user.id,
      amount: cart.items.reduce(
        (total, item) => total + item.book.price * item.quantity,
        0
      ),
      status: "completed",
    });

    res.status(200).json({
      status: "success",
      data: payment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
