// menuRouter.js
const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Define routes
router.get("/menu-items", menuController.getMenuItems);

module.exports = router;
