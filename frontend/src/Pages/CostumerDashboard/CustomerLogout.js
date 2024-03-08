import React, { useCallback } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CookieUtils from '../../components/Cookie/Cookies';

async function performLogout() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/customer/logout`
      );
      if (response.status === 200) {
        CookieUtils.removeCookies("userId");
        return true;
      }
      return false;
    } catch (err) {
      alert(err.message);
      return false;
    }
  }
export const CustomerLogout = () => {
    const navigate = useNavigate();

    const handleLogout =useCallback( async () => {
      const success = await performLogout();
      if (success) {
        navigate("/login");
      } else {
        alert("Failed to log out.");
      }
    },[navigate]);
  
    // Call handleLogout when the component mounts
    React.useEffect(() => {
      handleLogout();
    }, [handleLogout]);
  
    return <div>Logging out...</div>;
}





