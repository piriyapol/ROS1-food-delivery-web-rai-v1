const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");

// Retrieve a list of tables
router.get("/api/tables", tableController.getTables);

// Create a new table
router.post("/api/tables", tableController.createTable);

// Update table information
router.put("/api/tables/:id", tableController.updateTable);

// Additional routes for managing tables

module.exports = router;
