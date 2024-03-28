
import axios from 'axios';

const sendNotificationToAdmin = async (customerID, serviceName) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/CustomerToAdminNotifications/`,
      { sender: customerID, message: serviceName }
    );
    return response.data; // Assuming you want to return data from the response
  } catch (error) {
    // Handle error appropriately
    console.error('Error sending notification:', error);
    throw error;
  }
};

export default sendNotificationToAdmin;
