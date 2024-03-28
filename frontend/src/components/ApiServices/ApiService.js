import axios from "axios";
import CookieUtils from "../Cookie/Cookies";
import sendNotificationToAdmin from './notificationService'
const postServiceCollectionApi = async(serviceDetails,customerId) =>{
    try {
        const customerID = JSON.parse(atob(customerId.split(".")[1])).id;
    
        if (typeof serviceDetails !== "string") {
          throw new Error("Invalid serviceDetails format");
        }
    
        const services = JSON.parse(serviceDetails);
        const serviceName = services.serviceType;
        const data = services.formData;
    
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/create/newserviceType/${serviceName}`,
          { customerID, data }
        );
        if (response.status === 200) {
          // const response = await axios.post(
          //   `${process.env.REACT_APP_BACKEND_URL}/CustomerToAdminNotifications/`,
          //   { sender:customerID, message:serviceName }
          // );
          try {
            const response = await sendNotificationToAdmin(customerID, serviceName);
            // Handle response
            console.log('Notification sent successfully:', response);
          } catch (error) {
            // Handle error
            console.error('Error sending notification:', error);
          }

          CookieUtils.removeCookies("servicename");
        } else {
          console.error("Service creation failed:", response.data);
        }
      } catch (err) {
        alert("An error occurred while creating the service. Please try again.");
      }
}

export default postServiceCollectionApi;