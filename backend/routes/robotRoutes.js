const express = require('express');
const router = express.Router();
const robotController = require('../controllers/robotController');

// Send a robot control command to move to a table
router.post('/robot-control', robotController.sendRobotControlCommand);

// Additional routes for robot control

module.exports = router;
