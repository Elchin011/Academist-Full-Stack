const OrderSchema = require("../models/Order/OrderSchema");
const UserSchema = require("../models/User/UserSchema");
const ProductSchema = require("../models/Product/ProductSchema");
const CoursesSchema = require("../models/Courses/Courses");
const Coupon = require("../models/Cupon/CouponSchema");

const createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      totalAmount,
      couponCode,
      status = "pending",
      address,
      firstName,
      lastname,
      email,
      phone,
    } = req.body;

    console.log("REQ ITEMS:", items);
    const cleanItems = items
      .filter((i) => i && i.type && i.item)
      .map((i) => ({
        type: i.type,
        item: i.item,
        quantity: i.quantity || 1,
      }));
      console.log("CLEAN ITEMS:", cleanItems);

    if (!totalAmount || isNaN(Number(totalAmount))) {
      return res
        .status(400)
        .json({ message: "Total amount is required and must be a number" });
    }

    let discount = 0;
    let finalPrice = Number(totalAmount);

    let appliedCoupon = couponCode;
    try {
      appliedCoupon = JSON.parse(couponCode);
    } catch (e) {
      appliedCoupon = couponCode;
    }

    if (appliedCoupon) {
      const coupon = await Coupon.findOne({
        code: { $regex: `^${appliedCoupon.trim()}$`, $options: "i" },
        isActive: true,
      });

      if (coupon) {
        if (coupon.discountType === "percentage") {
          discount = (totalAmount * coupon.discountValue) / 100;
        } else {
          discount = coupon.discountValue;
        }
        finalPrice = totalAmount - discount;
      }
    }

    // User yoxla
    const foundUser = await UserSchema.findById(user);
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    // Products və Courses yoxla
    const productIds = cleanItems
      .filter((i) => i.type === "Product")
      .map((i) => i.item);

    const courseIds = cleanItems
      .filter((i) => i.type === "Course")
      .map((i) => i.item);

    const foundProducts = productIds.length
      ? await ProductSchema.find({ _id: { $in: productIds } })
      : [];
    const foundCourses = courseIds.length
      ? await CoursesSchema.find({ _id: { $in: courseIds } })
      : [];

    if (foundProducts.length !== productIds.length) {
      return res
        .status(404)
        .json({ message: "One or more products not found" });
    }
    if (foundCourses.length !== courseIds.length) {
      return res.status(404).json({ message: "One or more courses not found" });
    }

    // Order yarat
    const newOrder = new OrderSchema({
      user,
      items: cleanItems,
      totalAmount: Number(totalAmount),
      discount: Number(discount.toFixed(2)),
      finalPrice: Number(finalPrice.toFixed(2)),
      status,
      address,
      firstName,
      lastname,
      email,
      phone,
    });

    console.log("CLEAN ITEMS:", cleanItems);
    await newOrder.save();

    // Populate edərək cavab qaytar
    const populatedOrder = await OrderSchema.findById(newOrder._id)
      .populate("user")
      .populate("items.item");
    return res.status(201).json({
      message: "Order created successfully",
      data: populatedOrder,
    });
  } catch (err) {
    console.error("CreateOrder error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderSchema.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  const userId = req.query.user;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const orders = await OrderSchema.find({ user: userId })
      .populate("user")
      .populate("items.item");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    return res.status(200).json({
      data: orders,
      message: "User's orders fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllOrdersInDashboard = async (req, res) => {
  try {
    const orders = await OrderSchema.find()
      .populate("user")
      .populate("items.item");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json({
      data: orders,
      message: "All orders fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }
  try {
    const order = await OrderSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Order status updated", data: order });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getAllOrdersInDashboard,
  updateOrderStatus,
  deleteOrder,
};
