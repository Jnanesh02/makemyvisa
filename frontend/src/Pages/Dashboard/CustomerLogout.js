import React, { useCallback } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

async function performLogout() {
    try {
      const response = await axios.post(
        "http://localhost:3000/makemyvisa/customer/logout"
      );
      if (response.status === 200) {
        localStorage.removeItem("userId")
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





