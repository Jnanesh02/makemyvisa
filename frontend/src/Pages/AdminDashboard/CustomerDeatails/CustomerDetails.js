import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../AdminDashboardStyles/Employee.css";

export const CustomerDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const displayFields = [
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "state",
        "country",
        "social_media"
    ];

    const fetchEmployeeDetails = async () => {
        try {
            setLoading(true);
            const adminToken = JSON.parse(localStorage.getItem("adminToken"));
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/customer`,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken.AdminToken}`,
                    },
                    withCredentials: true,
                }
            );
            const employeeData = response.data.existingUser;
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
                `${process.env.REACT_APP_BACKEND_URL}/customer`
            );
            // setRoles(departmentsResponse.data.message);
        } catch (error) {
            console.error("Error fetching roles and departments:", error.message);
        }
    };

    const applyFilters = useCallback((data) => {
        return data.filter(
            (employee) =>
                filterBySearchTerm(employee, searchTerm) &&
                filterByStatus(employee, statusFilter)
        );
    }, [searchTerm, statusFilter]);

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

    const filterByStatus = (employee, status) => {
        return (
            status === "" ||
            (employee &&
                employee.status &&
                employee.status.toLowerCase() === status.toLowerCase())
        );
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset current page when the search term changes
        applyAndFetch(employees, applyFilters, setFilteredEmployees);
    };

    const handleFilterChange = (event, setFilterFunction) => {
        const filterValue = event.target.value;
        setFilterFunction(filterValue);
        setCurrentPage(1); // Reset current page when the filter changes
        applyAndFetch(employees, applyFilters, setFilteredEmployees);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);

    useEffect(() => {
        fetchRolesAndStatuses();
    }, []);

    useEffect(() => {
        if (employees) {
            applyAndFetch(employees, applyFilters, setFilteredEmployees);
        }
    }, [employees, statusFilter, searchTerm, applyFilters]);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div class="main-department-section">
            <div class="dep-tbl">
                <h2>Customer Details</h2>

                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="Searchbar form-control"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />

                    <label class="table-bar-label">
                        <select
                            class="form-select"
                            value={statusFilter}
                            onChange={(e) => handleFilterChange(e, setStatusFilter)}
                        >
                            <option value=""> Status Filter: </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </label>
                </div>
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        {displayFields.map((field) => (
                            <th key={field}>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((employee, key) => (
                        <tr key={`${employee._id}-${key}`}>
                            {displayFields.map((field) => (
                                <td key={`${employee._id}-${field}`}>
                                    {field === 'social_media' && typeof employee[field] === 'object' ? (
                                        <>
                                            {employee[field].facebookId  && (
                                                <span>Login with Facebook</span>
                                            )}
                                            {employee[field].linkedinId && (
                                                <span>Login with LinkedIn</span>
                                            )}
                                            {employee[field].googleId && (
                                                <span>Login with Google</span>
                                            )}
                                        </>
                                    ) : (
                                        <span>
                                            {employee[field] !== null && employee[field] !== ""
                                                ? employee[field]
                                                : "--"}
                                        </span>
                                    )}
                                </td>
                            ))}
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="pagination">
                <button class="previouss"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span class="pagination-count">{currentPage}</span>
                <button class="next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={indexOfLastItem >= filteredEmployees.length}
                >
                    Next
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
};
