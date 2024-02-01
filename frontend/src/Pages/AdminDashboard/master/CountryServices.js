import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../AdminDashboardStyles/Employee.css";

const CountryServices = () => {
    const initialFormData = {
        countryName: '',
        description: '',
        serviceTypes: [
          {
            serviceName: '',
            description: '',
            subServiceTypes: [
              {
                subServiceName: '',
                description: ''
              }
            ]
          }
        ]
      };
    const [countriesServiceType, setCountriesServiceType] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

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
        const { name, value } = e.target;

        // Split the name into keys to navigate the nested structure
        const keys = name.split('.');
      
        // Create a deep copy of the form data to avoid directly modifying the state
        const updatedFormData = { ...formData };
      
        // Update the form data based on the nested structure
        keys.reduce((nestedObj, key, index) => {
          if (index === keys.length - 1) {
            // Last key, update the value
            nestedObj[key] = value;
          } else {
            // Create nested structures if they don't exist
            nestedObj[key] = nestedObj[key] || (isNaN(keys[index + 1]) ? {} : []);
          }
          return nestedObj[key];
        }, updatedFormData);
      
        // Set the updated form data
        setFormData(updatedFormData);
    };
    return (
        <>
            <div class="main-department-section">
                <div class="dep-tbl">
                    <h2 >CountryServices</h2>
                    <button class="btn btn-primary create-button" onClick={() => setShowModal(true)}>Create</button>
                </div>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>countryName</th>
                            <th>Description</th>
                            <th>serviceNames</th>
                            <th>serviceType</th>
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
                                <td>
                                    <ul>
                                        {country.serviceTypes && country.serviceTypes.map((serviceType, innerIndex) => (
                                            <li key={innerIndex}>
                                                <div>{serviceType.serviceName}</div>
                                                {serviceType.subServiceTypes && (
                                                    <ul>
                                                        {serviceType.subServiceTypes.map((subServiceType, subIndex) => (
                                                            <li key={subIndex}>{subServiceType.subServiceName}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
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
                <div>
                    <div className='create-account-dashboard'>
                        <div className='account-heading'>
                            <h3>Create </h3>
                            <button className="close-buttonss" onClick={() => setShowModal(false)}> x </button>
                        </div>
                        <div className='create-dep-labels mb-3'>
                            <label className="form-label">countryName: </label>
                            <input className="form-control" type="text" name="countryName" value={formData.countryName} onChange={handleInputChange} />
                        </div>
                        <div className='create-dep-labels mb-3'>
                            <label className="form-label">Description: </label>
                            <input className="form-control" type="text" name="description" value={formData.description} onChange={handleInputChange} />
                        </div>

                        {/* Service Types */}
                        {formData.serviceTypes.map((service, index) => (
                            <div key={index}>
                                <div className='create-dep-labels mb-3'>
                                    <label className="form-label">Service Name: </label>
                                    <input className="form-control" type="text" name={`serviceTypes[${index}].serviceName`} value={service.serviceName} onChange={handleInputChange} />
                                </div>
                                <div className='create-dep-labels mb-3'>
                                    <label className="form-label">Service Description: </label>
                                    <input className="form-control" type="text" name={`serviceTypes[${index}].description`} value={service.description} onChange={handleInputChange} />
                                </div>

                                {/* Sub Service Types */}
                                {service.subServiceTypes.map((subService, subIndex) => (
                                    <div key={subIndex}>
                                        <div className='create-dep-labels mb-3'>
                                            <label className="form-label">Sub Service Name: </label>
                                            <input className="form-control" type="text" name={`serviceTypes[${index}].subServiceTypes[${subIndex}].subServiceName`} value={subService.subServiceName} onChange={handleInputChange} />
                                        </div>
                                        <div className='create-dep-labels mb-3'>
                                            <label className="form-label">Sub Service Description: </label>
                                            <input className="form-control" type="text" name={`serviceTypes[${index}].subServiceTypes[${subIndex}].description`} value={subService.description} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="form-button-dashboard">
                            <button className="btn btn-primary create" onClick={handleCreateDepartment}>Create</button>
                            <button className="btn btn-primary cancel" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default CountryServices;