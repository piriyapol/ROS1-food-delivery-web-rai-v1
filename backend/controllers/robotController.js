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

// const sendRobotControlCommand = async (req, res) => {
//   const { action, table_id } = req.body;

//   if (action === "move" && table_id) {
//     try {
//       const targetTable = await prisma.tableInformation.findUnique({
//         where: { table_id },
//       });

//       if (targetTable) {
//         const coordinateMessage = new ROSLIB.Message({
//           x: targetTable.ros_x_position,
//           y: targetTable.ros_y_position,
//           theta: 0.0,
//         });

//         coordinateTopic.publish(coordinateMessage);

//         res.status(200).json({ message: "Coordinate sent to the robot." });
//       } else {
//         res.status(404).json({ error: "Table not found." });
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error." });
//     }
//   } else {
//     res.status(400).json({ error: "Invalid request or missing parameters." });
//   }
// };

// const sendRobotControlCommand = async (req, res) => {
//   const { action, table_id } = req.body;

const sendRobotControlCommand = async (action, table_id, req, res) => {
  try {
    console.log("Received action:", action);
    console.log("Action contents:", action);

    if (!ros.isConnected) {
      if (req && res) {
        res.status(500).json({ error: "ROS system is offline." });
      } else {
        console.error("ROS system is offline.");
      }
      return;
    }

    console.log("Checking conditions...");
    console.log("Action:", action);
    console.log("Action action:", action.action);
    console.log("Table ID:", action.table_id);

    if (action.action === "move" && action.table_id) {
      console.log("Conditions met.");
      const targetTable = await prisma.tableInformation.findUnique({
        where: { table_id: action.table_id },
      });

      if (targetTable) {
        const coordinateMessage = new ROSLIB.Message({
          x: targetTable.ros_x_position,
          y: targetTable.ros_y_position,
          theta: 0.0,
        });
        console.log("Publishing coordinate message to ROS:");
         console.log(coordinateMessage);

        coordinateTopic.publish(coordinateMessage);

        if (req && res) {
          res.status(200).json({ message: "Coordinate sent to the robot." });
        }
      } else {
        if (req && res) {
          res.status(404).json({ error: "Table not found." });
        } else {
          console.error("Table not found.");
        }
      }
    } else {
      console.log("Conditions not met.");
      if (req && res) {
        res
          .status(400)
          .json({ error: "Invalid request or missing parameters." });
      } else {
        console.error("Invalid request or missing parameters.");
      }
    }
  } catch (error) {
    if (req && res) {
      res.status(500).json({ error: "Internal server error." });
    } else {
      console.error("Internal server error:", error);
    }
  }
};

module.exports = {
  sendRobotControlCommand,
};

