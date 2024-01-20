// Profile.js
import React from "react";
import "./Profile.css";
import { NavLink, Outlet } from "react-router-dom";

function Profile() {

  return (
    <div>
      <div className="Profile-Header">
        <h3>My Profile</h3>
      </div>
      <div className="Profile-container">
        <img
          src="https://i.imgur.com/G1pXs7D.jpg"
          alt="Profile"
          className="img-fluid profile-image"
          width="70"
        />

        <div className="ml-3">
          <h5 className="name">{}</h5>
        </div>
      </div>

      <div className="Details">
        <div className="DetailsList ProfileDetails">
          <NavLink to="" style={{ textDecoration: "none", color: "black" }}>
            <i className="fa-solid fa-user m-2"></i> Profile Details
          </NavLink>
        </div>
    
        
      </div>
      <Outlet/>
    </div>
  );
}

export default Profile;
