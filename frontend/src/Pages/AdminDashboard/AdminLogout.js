import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CookieUtils from "../../components/Cookie/Cookies";


async function performLogout() {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/employee/logout`

    );
    if (response.status === 200) {
      CookieUtils.removeCookies("adminToken")
      return true;
    }
    return false;
  } catch (err) {
    alert(err.message);
    return false;
  }
}


export const AdminLogout = () => {
  const navigate = useNavigate();
  const handleLogout = useCallback(async()=>{
    const success = await performLogout();
    if(success){
      navigate("/admin")
    }else{
      alert("failed to logout")
    }
  },[navigate])
  useEffect(()=>{
    handleLogout();
  },[handleLogout])
  return (
    <div>Logging out...</div>
  )
}


 

