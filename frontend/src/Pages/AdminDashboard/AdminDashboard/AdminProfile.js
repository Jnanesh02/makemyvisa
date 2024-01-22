import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import ConfirmationModal from "../EmployeeDetails/ConfirmationAccountModel";
export const AdminProfile = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
    const [originalFormData, setOriginalFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const adminToken = JSON.parse(localStorage.getItem("adminToken"));
          const response = await axios.get(`http://localhost:3000/makemyvisa/employee/getEmployedetail/${adminToken._Id}`);
          console.log(response);
          const userData = response.data.message;
          setFormData(prevFormData=>({
            ...prevFormData,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            phoneNumber: userData.contact_Details || "",
            address: userData.Address || "",
          }));
  
          setOriginalFormData(prevFormData=>({ ...prevFormData }));
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
        const adminToken = JSON.parse(localStorage.getItem("adminToken"));
         await axios.put(`http://localhost:3000/makemyvisa/employee/updateprofile/${adminToken._Id}`, formData);
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
                  placeholder="Email"
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
