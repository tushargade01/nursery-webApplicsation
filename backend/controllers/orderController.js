import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartDate: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all orders (admin)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get orders of a specific user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update status of an order (admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Cancel a specific product from an order
const cancelProduct = async (req, res) => {
  const { orderId, productId } = req.body;

  try {
    const order = await orderModel.findById(orderId);
    if (!order)
      return res.json({ success: false, message: "Order not found" });

    const originalLength = order.items.length;

    order.items = order.items.filter(
      (item) => item._id.toString() !== productId
    );

    if (order.items.length === originalLength) {
      return res.json({ success: false, message: "Product not found in order" });
    }

    // Optionally delete the order if all items are removed
    if (order.items.length === 0) {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: true, message: "Order cancelled completely." });
    }

    await order.save();
    res.json({ success: true, message: "Product cancelled successfully" });
  } catch (error) {
    console.error("Cancel Product Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const trackOrder = async (req, res) => {
    try {
      const { orderId } = req.body;
      const order = await orderModel.findById(orderId);
  
      if (!order) {
        return res.json({ success: false, message: 'Order not found' });
      }
  
      res.json({ success: true, status: order.status });
    } catch (error) {
      console.error('Track order error:', error);
      res.json({ success: false, message: 'Something went wrong' });
    }
  };
  
  export { placeOrder, allOrders, userOrders, updateStatus, cancelProduct, trackOrder };
  
