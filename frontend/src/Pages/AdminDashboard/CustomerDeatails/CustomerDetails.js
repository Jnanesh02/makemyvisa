import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../AdminDashboardStyles/Employee.css";
import CookieUtils from "../../../components/Cookie/Cookies";

export const CustomerDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
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
            const adminToken = JSON.parse(CookieUtils.getCookies("adminToken"));
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

    

    const applyFilters = useCallback((data) => {
        return data.filter(
            (employee) =>
                filterBySearchTerm(employee, searchTerm) 
        );
    }, [searchTerm]);

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


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset current page when the search term changes
        applyAndFetch(employees, applyFilters, setFilteredEmployees);
    };


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);


    useEffect(() => {
        if (employees) {
            applyAndFetch(employees, applyFilters, setFilteredEmployees);
        }
    }, [employees, searchTerm, applyFilters]);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="main-department-section">
            <div className="dep-tbl">
                <h2>Customer Details</h2>

                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="Searchbar form-control"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>PhoneNumber</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>SocialMedia</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((employee, key) => (
                        <tr key={`${employee._id}-${key}`}>
                            {displayFields.map((field) => (
                                <td key={`${employee._id}-${field}`}>
                                    {field === 'social_media' && typeof employee[field] === 'object' ? (
                                        <>
                                            {employee[field].facebookId && (
                                                <span>Login with Facebook</span>
                                            )}
                                            {employee[field].linkedinId && (
                                                <span>Login with LinkedIn</span>
                                            )}
                                            {employee[field].googleId && (
                                                <span>Login with Google</span>
                                            )}
                                            {!employee[field].facebookId && !employee[field].linkedinId && !employee[field].googleId && (
                                                <span>No social media IDs</span>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="pagination">
                <button className="previouss"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="pagination-count">{currentPage}</span>
                <button className="next"
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
