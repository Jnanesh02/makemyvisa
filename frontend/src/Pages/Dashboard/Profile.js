import React from "react";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import { ProfileProvider, useProfile } from "./context/ProfileProvider";

function Profile() {
  // const data = useContext(ProfileContext);
  const { profile } = useProfile();
  console.log(profile);
  return (
    // <div>
    //   <div className="Profile-Header">
    //     <h3>My Profile{profile} </h3>
    //   </div>
    //   <div className="Profile-container">
    //     <img
    //       src="https://i.imgur.com/G1pXs7D.jpg"
    //       alt="Profile"
    //       className="img-fluid profile-image"
    //       width="70"
    //     />

    //     <div className="ml-3">
    //       <h5 className="name">Clarke Jeffery {profile.name}</h5>
    //     </div>
    //   </div>

    //   <div className="Details">
    //     <div className="DetailsList  ProfileDetails">
    //       <NavLink to="" style={{ textDecoration: "none", color: "black" }}>
    //         {" "}
    //         <i class="fa-solid fa-user m-2"></i> Profile Details
    //       </NavLink>
    //     </div>
    //     <div className="DetailsList  AddressDetails">
    //       <NavLink
    //         to="Address"
    //         style={{ textDecoration: "none", color: "black" }}>
    //         <i class="fa-regular fa-address-book m-2"></i>Address Details
    //       </NavLink>
    //     </div>
    //     <div className="DetailsList  TravelPartners">
    //       <NavLink
    //         to="Travel"
    //         style={{ textDecoration: "none", color: "black" }}>
    //         <i class="fa-solid fa-location-dot m-2"></i> Travel Partners
    //       </NavLink>
    //     </div>
    //   </div>
    // </div>
    <h1>hello {profile}</h1>
  );
}

export default Profile;
