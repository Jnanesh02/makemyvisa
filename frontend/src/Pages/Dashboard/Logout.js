import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

async function performLogout() {
  try {
    const response = await axios.post(
      "http://localhost:3000/makemyvisa/customer/logout"
    );
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (err) {
    alert(err.message);
    return false;
  }
}

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await performLogout();
    if (success) {
      navigate("/login");
    } else {
      alert("Failed to log out.");
    }
  };

  // Call handleLogout when the component mounts
  React.useEffect(() => {
    handleLogout();
  }, []);

  return <div>Logging out...</div>;
}

export default Logout;
