const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Retrieve a list of menu items
router.get("/menu/menu-items", adminController.getMenuItems);

// Create a new menu item
router.post("/menu/create", adminController.createMenuItem);

// Update a menu item
router.put("/menu/update/:item_id", adminController.updateMenuItem);

// Delete a menu item
router.delete("/menu/delete/:item_id", adminController.deleteMenuItem);

// Retrieve a list of tables
router.get("/table/lists", adminController.getTables);

// Create a new table information
router.post("/table/create", adminController.createTableInformation);

// Update a table information
router.put(
  "/table/update/:table_number",
  adminController.updateTableInformation,
);

// Delete a table information
router.delete(
  "/table/delete/:table_number",
  adminController.deleteTableInformation,
);

// Retrieve a list of orders
router.get("/order/lists", adminController.getOrders);

// Modify an order (e.g., update status)
router.put("/order/update/:order_id", adminController.modifyOrder);

// Create a new order
router.post("/order/create", adminController.createOrder);

// Remove an order
router.delete("/order/delete/:order_id", adminController.removeOrder);

module.exports = router;
