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
    if (!ros.isConnected) {
      if (req && res) {
        // Check if ROS is not connected and respond with an error for HTTP requests
        res.status(500).json({ error: "ROS system is offline." });
      } else {
        // Handle the error for direct function calls
        console.error("ROS system is offline.");
      }
      return;
    }

    switch (action) {
      case "move":
        if (table_id) {
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

            if (req && res) {
              // Respond with a success message for HTTP requests
              res
                .status(200)
                .json({ message: "Coordinate sent to the robot." });
            }
          } else {
            if (req && res) {
              // Respond with an error message for HTTP requests
              res.status(404).json({ error: "Table not found." });
            } else {
              // Handle the error for direct function calls
              console.error("Table not found.");
            }
          }
        } else {
          if (req && res) {
            // Respond with an error message for HTTP requests
            res
              .status(400)
              .json({ error: "Invalid request or missing parameters." });
          } else {
            // Handle the error for direct function calls
            console.error("Invalid request or missing parameters.");
          }
        }
        break;

      case "return":
        // Implement logic to move the robot to the homebase or a predefined location
        const homeBaseCoordinates = { x: 0, y: 0, theta: 0.0 };
        const homeBaseMessage = new ROSLIB.Message(homeBaseCoordinates);
        coordinateTopic.publish(homeBaseMessage);

        if (req && res) {
          // Respond with a success message for HTTP requests
          res
            .status(200)
            .json({ message: "Robot is returning to the homebase." });
        }
        break;

      default:
        if (req && res) {
          // Respond with an error message for HTTP requests
          res.status(400).json({ error: "Invalid action." });
        } else {
          // Handle the error for direct function calls
          console.error("Invalid action.");
        }
        break;
    }
  } catch (error) {
    if (req && res) {
      // Respond with an error message for HTTP requests
      res.status(500).json({ error: "Internal server error." });
    } else {
      // Handle the error for direct function calls
      console.error("Internal server error:", error);
    }
  }
};

module.exports = {
  sendRobotControlCommand,
};
