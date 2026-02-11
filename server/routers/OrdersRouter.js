const express = require("express");
const multer = require("multer");
const {
  createOrder,
  getAllOrders,
  getAllOrdersInDashboard,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/OrdersController");

const router = express.Router();

const upload = multer({ dest: "uploads/" });



router.post("/create", createOrder);
router.get("/", getAllOrders);
router.get("/admin/orders", getAllOrdersInDashboard);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);


module.exports = router;