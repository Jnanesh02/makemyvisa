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
    department: "",
    address: "",
  }), []);

  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [department,setDepartment]=useState([]);
  const EDIT_FIELDS = ["firstName", "email","department", "role", "contact_Details", "status"];
  const CREATE_FIELDS = ["firstName", "lastName", "email","department", "role", "contactDetails"];

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
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee/get/department`);
      
        setDepartment(response.data.message); 
      } catch (error) {
        console.error("Error fetching department:", error.message);
      }
    };

    fetchDepartment();
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
          <option key={value._id} value={value.department}>
                      {options.label === "department" ? value.department : value.status}
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
    <div className="input-fileds-account" key={field}>
      {field === "department" || field === "status" ? (
        <select
          name={field}
          className="form-control create-account-frm"
          value={employeeData[field] || ""}
          required
          onChange={(e) => onChangeInput(e)}
        >
          {field === "department"
            ? renderSelectOptions({ label: "department", values: department })
            : renderStatusSelectOptions(["active", "inactive"])}
        </select>
      ) : (
        <input
          type="text"
          name={field}
          className="form-control create-account-frm"
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
        <button type="submit" className="btn btn-primary create-account-btn">
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








