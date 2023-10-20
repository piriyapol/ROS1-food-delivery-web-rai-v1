const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");

// Retrieve a list of tables
router.get("/lists", tableController.getTables);

// Create a new table
router.post("/create", tableController.createTable);

// Update table information
router.put("/update/:id", tableController.updateTable);

// Additional routes for managing tables

module.exports = router;
