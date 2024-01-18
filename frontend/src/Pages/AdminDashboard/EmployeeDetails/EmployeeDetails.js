import React, { useEffect, useState } from "react";
import axios from "axios";
import "./employe.css";
import CreateAccountForm from "./CreateAccountForm";



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
  const displayFields = ["firstName", "lastName", "email", "role", "contactDetails", "status"];


  // Function to apply all filters
  const applyFilters = (data) => {
    return data.filter((employee) => (
      filterBySearchTerm(employee, searchTerm) &&
      filterByRole(employee, roleFilter) &&
      filterByStatus(employee, statusFilter)
    ));
  };
  // useEffect to fetch data on component mount
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        const response = await axios.get("http://localhost:3000/makemyvisa/employee/employeData", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          }, withCredentials: true
        });
        const employeeData = response.data.employeeData;
        setEmployees(employeeData);
      } catch (error) {
        setError("Error fetching employee details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeDetails();
  }, []);

  // useEffect to apply filters whenever filter-related state changes
  useEffect(() => {
    applyAndFetch(employees, applyFilters, setFilteredEmployees);// eslint-disable-next-line
  }, [employees, roleFilter, statusFilter, searchTerm]); // Include applyFilters in the dependency array

  // Function to apply filters and fetch data
  const applyAndFetch = () => {
    const filteredData = applyFilters(employees);
    setFilteredEmployees(filteredData);
  };
  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilteredEmployees(applyFilters(employees));
  };

  // Function to handle role filter changes
  const handleRoleFilterChange = (event) => {
    const roleFilterValue = event.target.value;
    setRoleFilter(roleFilterValue);
    setFilteredEmployees(applyFilters(employees));
  };

  // Function to handle status filter changes
  const handleStatusFilterChange = (event) => {
    const statusFilterValue = event.target.value;
    setStatusFilter(statusFilterValue);
    setFilteredEmployees(applyFilters(employees));
  };


  // Separate filter functions
  const filterBySearchTerm = (employee, term) => (
    term === "" ||
    (employee.firstName && employee.firstName.toLowerCase().includes(term.toLowerCase())) ||
    (employee.lastName && employee.lastName.toLowerCase().includes(term.toLowerCase())) ||
    (employee.email && employee.email.toLowerCase().includes(term.toLowerCase())) ||
    (employee.contactDetails && employee.contactDetails.toLowerCase().includes(term.toLowerCase())) ||
    (employee.role && employee.role.toLowerCase().includes(term.toLowerCase())) ||
    (employee.status && employee.status.toLowerCase().includes(term.toLowerCase()))
  );

  const filterByRole = (employee, role) => (
    role === "" || employee.role.toLowerCase() === role.toLowerCase()

  );

  const filterByStatus = (employee, status) => (
    status === "" || employee.status.toLowerCase() === status.toLowerCase()
  );

  // Function to handle form submission
  const handleCreateAccount = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    setFilteredEmployees(applyFilters(updatedEmployees));
    setShowCreateForm(false); // Close the form after submission
  };

  const handleDelete = async (employeeId) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await axios.delete(`${process.env.REACT_APP_ADMIN_DELETE}/delete/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }, withCredentials: true
      });

      // Update the state to remove the deleted employee
      const updatedEmployees = employees.filter((employee) => employee._id !== employeeId);
      setEmployees(updatedEmployees);
      setFilteredEmployees(applyFilters(updatedEmployees));
    } catch (error) {
      console.error("Error deleting employee:", error.message);
      setError("Error deleting employee. Please try again later.");
    }
  };

  // Function to handle edit action
  const handleEdit = (employeeId) => {
    // Retrieve the employee data based on the employeeId
    const employeeToEdit = employees.find((employee) => employee._id === employeeId);

    // Set the employee as the editing employee
    setEditingEmployee(employeeToEdit);
  };

  // Function to handle save action
  const handleSave = () => {
    // Implement the logic to save the edited employee data
    // You might want to make an API call to update the employee data in the backend
    // For this example, let's assume a successful save and clear the editing state
    setEditingEmployee(null);
  };
  return (
    <div>
      <h2>Employee Details</h2>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: '8px' }}
        />

        <label style={{ marginRight: '8px' }}>
          Role Filter:
          <select value={roleFilter} onChange={handleRoleFilterChange}>
            <option value="">All</option>
            <option value="admin">admin</option>
            <option value="operation">operation</option>
          </select>
        </label>

        <label style={{ marginRight: '8px' }}>
          Status Filter:
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? "Cancel" : "Create Account"}
        </button>
      </div>

      {showCreateForm && <CreateAccountForm onSubmit={handleCreateAccount} />}

      <table className="employee-table">
        <thead>
          <tr>
            {/* Map over specified fields for table headers */}
            {displayFields.map((field) => (
              <th key={field}>{field}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              {/* Map over specified fields for table cells */}
              {displayFields.map((field) => (
                <td key={field}>
                  {editingEmployee && editingEmployee._id === employee._id ? (
                    <input
                      type="text"
                      value={editingEmployee[field]}
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, [field]: e.target.value })}
                    />
                  ) : (
                    // Render the field value with a click event to enable editing
                    <span onClick={() => handleEdit(employee._id)}>{employee[field]}</span>
                  )}
                </td>
              ))}
              {/* Actions column */}
              <td>
                {editingEmployee && editingEmployee._id === employee._id && (
                  <button className="action-button" onClick={handleSave}>
                    Save
                  </button>
                )}
                {!editingEmployee && (
                  <button className="action-button" onClick={() => handleEdit(employee._id)}>
                    Edit
                  </button>
                )}
                <button className="action-button" onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
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
