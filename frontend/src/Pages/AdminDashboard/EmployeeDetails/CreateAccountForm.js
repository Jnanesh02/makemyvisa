// CreateAccountForm.js
import React, { useState } from "react";
import "./CreateAccountForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccountForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const initialEmployeeData = {
    firstName: "",
    lastName: "",
    contactDetails: "",
    email: "",
    role: "",
    address: "",
  };
  const [createEmployee, setCreateEmployee] = useState(initialEmployeeData);

  const onChangeInput = (event) => {
    event.preventDefault();
    setCreateEmployee({
      ...createEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to create this account"
    );
    if (isConfirmed) {
      const adminToken = localStorage.getItem("adminToken");
      const headers = {
        Authorization: `Bearer ${adminToken}`,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/makemyvisa/employee/createEmployee",
          createEmployee, // Pass the data to the server
          { headers }
        );

        // Handle success, if needed

        console.log(response.data);
        window.location.reload();

        // Clear the form after submission
        setCreateEmployee(initialEmployeeData);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        className="form-input"
        value={createEmployee.firstName}
        required
        placeholder="First Name:"
        onChange={(e) => onChangeInput(e)}
      />
      <br />
      <input
        type="text"
        name="lastName"
        className="form-input"
        value={createEmployee.lastName}
        placeholder="Last Name:"
        onChange={(e) => onChangeInput(e)}
      />
      <br />
      <input
        type="email"
        name="email"
        className="form-input"
        value={createEmployee.email}
        required
        placeholder="email:"
        onChange={(e) => onChangeInput(e)}
      />
      <br />
      <select
        type="text"
        name="role" // Name should match the property in the state
        className="form-input"
        value={createEmployee.role}
        required
        onChange={(e) => onChangeInput(e)}>
        <option value="">select role</option>
        <option value="admin">Admin</option>
        <option value="operation">Operations</option>
      </select>
      <br />
      <input
        type="text"
        name="contactDetails"
        className="form-input"
        value={createEmployee.contactDetails}
        placeholder="contactDetails:"
        onChange={(e) => onChangeInput(e)}
      />
      <br />
      <input
        type="text"
        name="address"
        className="form-input"
        value={createEmployee.address}
        placeholder="Address :"
        onChange={(e) => onChangeInput(e)}
      />
      <button type="submit" className="form-btn" onSubmit={handleSubmit}>
        Create Account
      </button>
    </form>
  );
};

export default CreateAccountForm;
