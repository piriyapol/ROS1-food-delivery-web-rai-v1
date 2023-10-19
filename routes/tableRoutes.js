const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");

// Retrieve a list of tables
router.get("/tables", tableController.getTables);

// Create a new table
router.post("/tables", tableController.createTable);

// Update table information
router.put("/tables/:id", tableController.updateTable);

// Additional routes for managing tables

module.exports = router;
