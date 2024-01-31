import React, { useState, useEffect, useMemo } from "react";
import "../AdminDashboardStyles/CreateAccountForm.css";
import ConfirmationModal from "./ConfirmationAccountModel";
import axios from "axios";

const CreateAccountForm = ({ onEmployeeCreate, onEmployeeUpdate, editingEmployee }) => {
  const initialEmployeeData = useMemo(() => ({
    firstName: "",
    lastName: "",
    contactDetails: "",
    email: "",
    role: "",
    address: "",
  }), []);

  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [roles,setRoles]=useState([]);
  const EDIT_FIELDS = ["firstName", "lastName", "email", "role", "contact_Details", "status"];
  const CREATE_FIELDS = ["firstName", "lastName", "email", "role", "contactDetails", "address"];

  useEffect(() => {
    if (editingEmployee) {
      setEmployeeData(editingEmployee);
      setIsEditing(true);
    } else {
      setEmployeeData(initialEmployeeData);
      setIsEditing(false);
    }

  }, [editingEmployee, initialEmployeeData]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee/get/department`);
      
        setRoles(response.data.message); 
      } catch (error) {
        console.error("Error fetching roles:", error.message);
      }
    };

    fetchRoles();
  }, []);
  const onChangeInput = (event) => {
    event.preventDefault();
    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
  };

  const renderSelectOptions = (options) => (
    <>
      <option value="">Select {options.label}</option>
      {options.values &&
        options.values.map((value) => (
          <option key={value._id} value={value.role}>
                      {options.label === "role" ? value.role : value.status}
        </option>
        ))}
    </>
  );
  const renderStatusSelectOptions = (values) => (
    <>
      <option value="">Select status</option>
      {values &&
        values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
    </>
  );

  const renderFormFields = (fields) =>
  fields.map((field) => (
    <div key={field}>
      {field === "role" || field === "status" ? (
        <select
          name={field}
          className="form-input"
          value={employeeData[field] || ""}
          required
          onChange={(e) => onChangeInput(e)}
        >
          {field === "role"
            ? renderSelectOptions({ label: "role", values: roles })
            : renderStatusSelectOptions(["active", "inactive"])}
        </select>
      ) : (
        <input
          type="text"
          name={field}
          className="form-input"
          value={employeeData[field] || ""}
          placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}:`}
          onChange={(e) => onChangeInput(e)}
        />
      )}
    </div>
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = isEditing ? EDIT_FIELDS : CREATE_FIELDS;
    const isAllFieldsFilled = requiredFields.every(
      (field) => employeeData[field] !== undefined && employeeData[field].trim() !== ""
    );

    if (isAllFieldsFilled) {
      setConfirmationModalOpen(true);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleConfirm = async () => {
    const adminToken = JSON.parse(localStorage.getItem("adminToken"));

    try {
      const response = isEditing
        ? await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/employee/update/${editingEmployee._id}`,
          employeeData,
          { Authorization: `Bearer ${adminToken.AdminToken}` }
        )
        : await axios.post(`${process.env.REACT_APP_BACKEND_URL}/employee/createEmployee`, employeeData, {
          Authorization: `Bearer ${adminToken.AdminToken}`
        });

      if (response.status === 200) {
        isEditing ? onEmployeeUpdate(employeeData) : onEmployeeCreate(employeeData);
      } else {
        alert(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again later.");
    } finally {
      setEmployeeData(initialEmployeeData);
      setConfirmationModalOpen(false);
    }
  };

  const handleCancel = () => {
    setConfirmationModalOpen(false);
  };

  return (
    <>
      <form className="admin-form" onSubmit={handleSubmit}>
        {renderFormFields(isEditing ? EDIT_FIELDS : CREATE_FIELDS)}
        <button type="submit" className="form-btn">
          {isEditing ? "Update Employee" : "Create Account"}
        </button>
      </form>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to ${isEditing ? "update" : "create"} this user?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default CreateAccountForm;
