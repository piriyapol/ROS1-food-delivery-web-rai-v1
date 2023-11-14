#!/usr/bin/env python

import rospy
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal
from geometry_msgs.msg import Pose, Point, Quaternion, Pose2D
from actionlib_msgs.msg import GoalStatusArray
import actionlib
import json

class MoveToTableAction():
    def __init__(self):
        self.move_base_action = actionlib.SimpleActionClient('/move_base', MoveBaseAction)
        self.move_base_action.wait_for_server(rospy.Duration(5))
        rospy.loginfo("Before subscriber initialization")
        self.robot_coordinates_subscriber = rospy.Subscriber('/robot_coordinates', Pose2D, self.robotCoordinatesCallback)
        rospy.loginfo("Subscriber initialized")

    def robotCoordinatesCallback(self, data):
        try:
            rospy.loginfo("Received robot coordinates: x=%f, y=%f, theta=%f", data.x, data.y, data.theta)
            self.moveToCoordinates(data.x, data.y, data.theta)
        except Exception as e:
            rospy.logerr("Error processing robot coordinates: %s", str(e))

    def createGoal(self, x, y, theta):
        goal = MoveBaseGoal()
        goal.target_pose.header.frame_id = 'map'
        goal.target_pose.header.stamp = rospy.Time.now()
        goal.target_pose.pose = Pose(Point(x, y, 0.0), Quaternion(0.0, 0.0, 0.0, 1.0))
        return goal

    def moveToCoordinates(self, x, y, theta):
        target_goal = self.createGoal(x, y, theta)
        rospy.loginfo("Moving to coordinates: x=%f, y=%f, theta=%f", x, y, theta)
        self.moveBaseAction(target_goal)

    def moveBaseAction(self, goal):
        self.move_base_action.send_goal(goal)
        success = self.move_base_action.wait_for_result()
        state = self.move_base_action.get_state()
        rospy.loginfo("Move to coordinates goal -> x=%f, y=%f, theta=%f", goal.target_pose.pose.position.x,
                      goal.target_pose.pose.position.y, goal.target_pose.pose.orientation.z)
        if success and state == GoalStatus.SUCCEEDED:
            rospy.loginfo("Move to coordinates complete")
        else:
            rospy.logerr("Move to coordinates failed")
            self.move_base_action.cancel_goal()

def main():
    rospy.init_node('RAI1', anonymous=True)
    move_to_table_action = MoveToTableAction()
    rospy.loginfo("MoveToTableAction node initialized")
    rospy.spin()
    rospy.loginfo("Exiting MoveToTableAction node")

if __name__ == '__main__':
    try:
        main()
    except rospy.ROSInterruptException:
        pass