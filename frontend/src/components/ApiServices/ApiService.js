import axios from "axios";
import CookieUtils from "../cookie/Cookies";

const postServiceCollectionApi = async(serviceDetails,customerId) =>{
    try {
        const customerID = JSON.parse(atob(customerId.split(".")[1])).id;
    
        if (typeof serviceDetails !== "string") {
          throw new Error("Invalid serviceDetails format");
        }
    
        const services = JSON.parse(serviceDetails);
        const serviceName = services.dummyTicket;
        const data = services.formData;
    
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/create/newserviceType/${serviceName}`,
          { customerID, data }
        );
    
        if (response.status === 200) {
          CookieUtils.removeCookies("dummyTicket");
        } else {
          console.error("Service creation failed:", response.data);
        }
      } catch (err) {
        alert("An error occurred while creating the service. Please try again.");
      }
}

export default postServiceCollectionApi;