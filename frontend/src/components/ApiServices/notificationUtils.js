// notificationUtils.js

import axios from 'axios';

const updateNotificationStatus = async (notificationId, tokenData, notifications, setNotifications) => {
  try {
    // Send a request to update the notification status
    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/CustomerToAdminNotifications/${notificationId}`, {
      read: true,
      tokenData
    });

    // If the request is successful, update the notification status in state
    if (response.status === 200) {
      const updatedNotifications = notifications.map(notification => {
        if (notification._id === notificationId) {
          return { ...notification, read: true };
        }
        return notification;
      });
      setNotifications(updatedNotifications);
    }
  } catch (error) {
    console.error('Error updating notification status:', error);
    throw error;
  }
};

export default updateNotificationStatus;
