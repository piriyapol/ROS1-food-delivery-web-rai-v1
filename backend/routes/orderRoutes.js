const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create a new order
router.post("/api/orders", orderController.createOrder);

// Update order information
router.put("/api/orders/:id", orderController.updateOrder);

// Additional routes for managing orders

module.exports = router;
