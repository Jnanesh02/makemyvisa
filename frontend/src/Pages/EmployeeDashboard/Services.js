import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CookieUtils from "../../components/Cookie/Cookies";
export const Services = () => {
    const {serviceName} = useParams();
    console.log("11",serviceName)
    const [formData,setFormData] = useState([])
    const fetchUserData = async () => {
        try {
          const token = CookieUtils.getCookies("adminToken");
    
          const tokenData = JSON.parse(atob(token.split(".")[1]));
    
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/employee/getEmployedetail/${tokenData.id}`
          );
    
          setFormData(response.data.message);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };
      useEffect(() => {
        fetchUserData();
      }, []);
  return (
    <div>
      <h1>Services</h1>
    </div>
  );
};
