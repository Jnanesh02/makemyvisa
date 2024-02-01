import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../AdminDashboardStyles/Employee.css";

const CountryServices = () => {
    const [countriesServiceType, setCountriesServiceType] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        role: '',
        description: '',
    });

    const getcountriesServiceDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getcountries`);
            if (response.status === 200) {
                setCountriesServiceType(response.data.message);
            }
        }
        catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        getcountriesServiceDetails();
    }, []);

    const handleCreateDepartment = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/employee/create/department`, formData);
            getcountriesServiceDetails(); // Fetch updated data
            setShowModal(false); // Close the modal
        } catch (error) {
            alert(error.message);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div class="main-department-section">
                <div class="dep-tbl">
                    <h2 >Department</h2>
                    <button class="btn btn-primary create-button" onClick={() => setShowModal(true)}>Create</button>
                </div>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>countryName</th>
                            <th>Description</th>
                            <th>serviceNames</th>

                        </tr>
                    </thead>
                    <tbody>
                        {countriesServiceType.map((country, index) => (
                            <tr key={index}>
                                <td>{country.countryName}</td>
                                <td>{country.description}</td>

                                <td>
                                    <ul>
                                        {country.serviceTypes && country.serviceTypes.map((serviceType, innerIndex) => (
                                            <li key={innerIndex}>{serviceType.serviceName}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Modal */}
            {showModal && (
                <div >
                    <div className='create-account-dashboard'>
                        <h3>Create Department</h3>
                        <div className='create-dep-labels mb-3'>
                            <label class="form-label" > Department:   </label>
                            <input class="form-control" type="text" name="role" value={formData.role} onChange={handleInputChange} />
                        </div>
                        <div className='create-dep-labels mb-3'>
                            <label>  Description:  </label>
                            <input class="form-control" type="text" name="description" value={formData.description} onChange={handleInputChange} />
                        </div>
                        <div class="form-button-dashboard">
                            <button class="btn btn-primary create" onClick={handleCreateDepartment}>Create</button>
                            <button class="btn btn-primary cancel" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default CountryServices;