const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create a new order
router.post("/", orderController.createOrder);

// Retrieve a list of orders
router.get("/", orderController.getOrders);

// Serve an order (update its status)
router.put("/:order_id/serve", orderController.serveOrder);

module.exports = router;
