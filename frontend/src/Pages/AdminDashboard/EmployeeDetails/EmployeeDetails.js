import React, { useEffect, useState,useCallback } from "react";
import axios from "axios";
import "../AdminDashboardStyles/Employee.css";
import CreateAccountForm from "./CreateAccountForm";
import Modal from "./CreateAccountModal";
import ConfirmationModal from "./ConfirmationAccountModel";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  const [confirmationEmployeeId, setConfirmationEmployeeId] = useState(null);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [roles, setRoles] = useState([]);

  const displayFields = [
    "firstName",
    "lastName",
    "email",
    "role",
    "contact_Details",
    "status",
  ];

  const fetchEmployeeDetails = async () => {
    try {
      setLoading(true);
      const adminToken = JSON.parse(localStorage.getItem("adminToken"));
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee/employeData`,
        {
          headers: {
            Authorization: `Bearer ${adminToken.AdminToken}`,
          },
          withCredentials: true,
        }
      );
      const employeeData = response.data.employeeData;
      setEmployees(employeeData);
    } catch (error) {
      setError("Error fetching employee details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const fetchRolesAndStatuses = async () => {
    try {
     
      const departmentsResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee/get/department`
      );
      setRoles(departmentsResponse.data.message);
    } catch (error) {
      console.error("Error fetching roles and departments:", error.message);
    }
  };
  const applyFilters = useCallback((data) => {
    return data.filter(
      (employee) =>
        filterBySearchTerm(employee, searchTerm) &&
        filterByRole(employee, roleFilter) &&
        filterByStatus(employee, statusFilter)
    );
  }, [searchTerm, roleFilter, statusFilter]);

  const applyAndFetch = (data, filterFunction, setFunction) => {
    const filteredData = filterFunction(data);
    setFunction(filteredData);
  };

  const filterBySearchTerm = (employee, term) =>
    term === "" ||
    Object.values(employee).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(term.toLowerCase())
    );

    const filterByRole = (employee, role) => {
      return role === "" || (employee && employee.role && employee.role.toLowerCase() === role.toLowerCase());
    };
  const filterByStatus = (employee, status) =>{
    return status === "" || (employee && employee.status && employee.status.toLowerCase() === status.toLowerCase());

  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    applyAndFetch(employees, applyFilters, setFilteredEmployees);
  };

  const handleFilterChange = (event, setFilterFunction) => {
    const filterValue = event.target.value;
    setFilterFunction(filterValue);
    applyAndFetch(employees, applyFilters, setFilteredEmployees);
  };

  const handleCreateAccount = (newEmployee) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = [...prevEmployees, newEmployee];
      applyAndFetch(updatedEmployees, applyFilters, setFilteredEmployees);
      return updatedEmployees;
    });
    setShowCreateForm(false);
    setIsAccountCreated(true);
    setEditingEmployee(null);
  };

  const handleDelete = (employeeId) => {
    setConfirmationEmployeeId(employeeId);
    setDeleteConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleteConfirmationModalOpen(false);

    try {
      const adminToken = JSON.parse(localStorage.getItem("adminToken"));

      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/employee/delete/${confirmationEmployeeId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken.AdminToken}`,
          },
          withCredentials: true,
        }
      );

      const updatedEmployees = employees.filter(
        (employee) => employee._id !== confirmationEmployeeId
      );
      applyAndFetch(updatedEmployees, applyFilters, setFilteredEmployees);
    } catch (error) {
      setError("Error deleting employee. Please try again later.");
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationModalOpen(false);
    setConfirmationEmployeeId(null);
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = employees.find(
      (employee) => employee._id === employeeId
    );
    setIsEditing(true);
    setEditingEmployee(employeeToEdit);
    setShowCreateForm(true);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
    setShowCreateForm(false);
  };

  const handleUpdateAccount = (updatedEmployee) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.map((employee) =>
        employee._id === updatedEmployee._id ? updatedEmployee : employee
      );
      applyAndFetch(updatedEmployees, applyFilters, setFilteredEmployees);
      return updatedEmployees;
    });
    setShowCreateForm(false);
    setEditingEmployee(null);
    setIsAccountCreated(true);
  };
  useEffect(() => {
    fetchEmployeeDetails();
  }, [isAccountCreated, isEditing]);
  useEffect(() => {
    fetchRolesAndStatuses();
  }, []);
  useEffect(() => {
    applyAndFetch(employees, applyFilters, setFilteredEmployees);
  }, [employees, roleFilter, statusFilter, searchTerm, applyFilters]);

  return (
    <div class="main-department-section">
        <div class="dep-tbl">
      <h2>Employee Details</h2>

      <div>
        <input 
          type="text"
          placeholder="Search..."
          className="Searchbar form-control"
          value={searchTerm}
          onChange={handleSearchChange}
         
        />

        <label class="table-bar-label">
      
          <select class="form-select"  value={roleFilter} onChange={(e) => handleFilterChange(e, setRoleFilter)}>
          <option value="">  Role Filter: </option>
    {roles.map((role) => (
      <option key={role._id} value={role.role}>
        {role.role}
      </option>
    ))}
          </select>
        </label>

        <label class="table-bar-label">
    
          <select class="form-select"  value={statusFilter} onChange={(e) => handleFilterChange(e, setStatusFilter)}>
            <option value=""> Status Filter: </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        <button class="btn btn-primary create-button" onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "Create Account"}
        </button>
      </div>
      </div>
      <Modal open={showCreateForm} onClose={handleCancelEdit}>
        <CreateAccountForm
          onEmployeeCreate={handleCreateAccount}
          onEmployeeUpdate={handleUpdateAccount}
          editingEmployee={editingEmployee}
        />
      </Modal>

      {isDeleteConfirmationModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <table className="employee-table">
        <thead>
          <tr>
            {displayFields.map((field) => (
              <th key={field}>{field}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, key) => (
            <tr key={`${employee._id}-${key}`}>
              {displayFields.map((field) => (
                <td key={`${employee._id}-${field}`}>
                  <span>{employee[field]}</span>
                </td>
              ))}
              <td>
                {!editingEmployee && (
                  <>
                    <button
                      className="action-button edit"
                      onClick={() => handleEdit(employee._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EmployeeDetails;
