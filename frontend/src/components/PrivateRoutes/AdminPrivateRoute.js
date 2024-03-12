import React, { useCallback, useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
const AdminPrivateRoute = () => {
  const navigate = useNavigate();
  const navigateToAdminLogin = useCallback(() => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  },[navigate]);
  useEffect(() => {
    function isTokenExpired() {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return true;
      }
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000;
      const currentTime = new Date().getTime();
      return expirationTime < currentTime;
    }

    const interval = setInterval(() => {
      if (isTokenExpired()) {
        navigateToAdminLogin();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [navigateToAdminLogin]);

  const employeeId = localStorage.getItem("adminToken");

  if (!employeeId) {
    return <Navigate to="/admin" />;
  } else {
    return <Outlet />;
  }
};

export default AdminPrivateRoute;
