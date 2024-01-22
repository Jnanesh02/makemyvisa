import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import ConfirmationModal from "../AdminDashboard/EmployeeDetails/ConfirmationAccountModel";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    passportNumber: "",
    passportExpiry: "",
  });
  const [originalFormData, setOriginalFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const employeeId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:3000/makemyvisa/customer/getuserdetails/${employeeId}`);
        const userData = response.data.existingUser;
        console.log(userData);
  
        setFormData(prevFormData => ({
          ...prevFormData,
          firstName: userData.first_name || "",
          lastName: userData.last_name || "",
          email: userData.email || "",
          phoneNumber: userData.phone_number || "",
          address: userData.address || "",
          passportNumber: userData.passport.passportNumber || "",
          passportExpiry: userData.passport.passportExpiry || "",
        }));
        setOriginalFormData(prevFormData => ({ ...prevFormData}));

      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
  
      fetchUserData();

  }, []);

  const handleInputChange = (e) => {
    setFormData(prevFormData=>({...prevFormData,[e.target.id]:e.target.value}))
  };

  const toggleEditMode = () => {
    if (editMode) {
      setShowConfirmationModal(true);
    } else {
      setEditMode(!editMode);
      setShowConfirmationModal(false);
    }
  };

  const handleConfirmEdit = async () => {
    setEditMode(!editMode);
    setShowConfirmationModal(false);

    try {
      const employeeId = localStorage.getItem("userId");
       await axios.put(`http://localhost:3000/makemyvisa/customer/updateCustomerProfile/${employeeId}`, formData);
      setUpdateUserSuccess("Profile updated successfully");
      setOriginalFormData({ ...formData });
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setShowConfirmationModal(false);
    setFormData({ ...originalFormData });
  };
  const handleCancel =(e)=>{
    e.preventDefault(); 
    setEditMode(false);
  }


  return (
    <>
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
      </div>
    <div className="container mt-2">
      <h4>Basic Details :</h4>
      <form>
      <div className="row mb-3">
          <div className="col">
            <div className="floating-label">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name "
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="col">
            <div className="floating-label">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name "
                disabled={!editMode}
              />

            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <div className="floating-label">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="col">
            <div className="floating-label">
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number "
                disabled={!editMode}
              />
            </div>
          </div>
        </div>

        <div className="row mb-1">
          <div className="col">
            <div className="floating-label" style={{ height: "100px" }}>
              <textarea
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address "
                disabled={!editMode}
              />
            </div>
          </div>
        </div>

        <h4>Passport Details :</h4>
        <div className="mb-3 floating-label">
          <input
            type="text"
            className="form-control"
            id="passportNumber"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleInputChange}
            placeholder=" "
            disabled={!editMode}
          />
          <label htmlFor="passportNumber" className="form-label">
            Passport Number
          </label>
        </div>

        <div className="mb-3 floating-label">
          <input
            type="text"
            className="form-control"
            id="passportExpiry"
            name="passportExpiry"
            value={formData.passportExpiry}
            onChange={handleInputChange}
            placeholder=" "
            disabled={!editMode}
          />
          <label htmlFor="passportExpiry" className="form-label">
            Passport Expiry
          </label>
        </div>         
        <button
          type="submit"
          className="btn btn-primary me-2"
          hidden={!editMode}
          onClick={handleCancel}          

        >
          <i className="fa-solid fa-save me-1"></i>
          cancel 
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={toggleEditMode}
        >
          {editMode ? (
            <>
              <i className="fa-solid fa-times me-1"></i>
              save
            </>
          ) : (
            <>
              <i className="fa-solid fa-edit me-1"></i>
              Edit
            </>
          )}
        </button>

        {showConfirmationModal && (
          <ConfirmationModal
            message="Are you sure you want to discard changes?"
            onConfirm={handleConfirmEdit}
            onCancel={handleCancelEdit}
          />
        )}

        {updateUserSuccess && (
          <div className="alert alert-success mt-5" role="alert">
            {updateUserSuccess}
          </div>
        )}
      </form>
    </div>
    </>
  );
};

export default ProfileForm;
