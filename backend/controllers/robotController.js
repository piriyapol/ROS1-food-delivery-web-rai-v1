const ROSLIB = require("roslib");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ros = new ROSLIB.Ros({
  url: process.env.ROSBridge_URL,
});

const coordinateTopic = new ROSLIB.Topic({
  ros,
  name: "/robot_coordinates",
  messageType: "geometry_msgs/Pose2D",
});

const sendRobotControlCommand = async (req, res) => {
  const { action, table_id } = req.body;

  if (action === "move" && table_id) {
    try {
      const targetTable = await prisma.tableInformation.findUnique({
        where: { table_id },
      });

      if (targetTable) {
        const coordinateMessage = new ROSLIB.Message({
          x: targetTable.ros_x_position,
          y: targetTable.ros_y_position,
          theta: 0.0,
        });

        coordinateTopic.publish(coordinateMessage);

        res.status(200).json({ message: "Coordinate sent to the robot." });
      } else {
        res.status(404).json({ error: "Table not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.status(400).json({ error: "Invalid request or missing parameters." });
  }
};

module.exports = {
  sendRobotControlCommand,
};
