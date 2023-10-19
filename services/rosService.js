const ROSLIB = require('roslib');

class ROSService {
  constructor() {
    this.ros = new ROSLIB.Ros({
      url: process.env.ROSBridge_URL, // Retrieve ROSBridge URL from environment variables
    });

    this.coordinateTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/robot_coordinates',
      messageType: 'geometry_msgs/Pose2D',
    });

    this.coordinateTopic.subscribe((message) => {
      // Handle incoming robot coordinates here
      console.log('Received robot coordinates:', message);
    });
  }

  // Method for sending robot commands
  sendRobotCommand(tableId) {
    // Perform any necessary ROS operations here
    return 'Command sent successfully'; // Replace with actual result
  }

  // Disconnect from ROS (Optional)
  disconnect() {
    this.ros.close();
  }
}

module.exports = ROSService;
