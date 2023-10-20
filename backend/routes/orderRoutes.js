const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create a new order
router.post("/orders", orderController.createOrder);

// Update order information
router.put("/orders/:id", orderController.updateOrder);

// Additional routes for managing orders

module.exports = router;
