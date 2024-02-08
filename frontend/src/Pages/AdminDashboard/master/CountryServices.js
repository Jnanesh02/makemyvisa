import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../AdminDashboardStyles/Employee.css";

const CountryServices = () => {
    const initialFormData = {
        countryName: '',
        descriptions: '',
        countryImage: '',
        flagImage:'',
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
    const [editIndex, setEditIndex] = useState(null);

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
            if (editIndex !== null && editIndex !== undefined) {
                console.log("editing", formData);
                // Handle update logic for existing country
                // await axios.put(`${process.env.REACT_APP_BACKEND_URL}/employee/update/department`, formData);
            } else {
                console.log("123", formData);
                // Handle create logic for new country
                // await axios.post(`${process.env.REACT_APP_BACKEND_URL}/employee/create/department`, formData);
            }
            getcountriesServiceDetails(); // Fetch updated data
            setShowModal(false); // Close the modal
        } catch (error) {
            alert(error.message);
        }
    };
    const reSetForm = () => {
        setFormData(initialFormData);

    }
    const handleCloseModal = () => {
        setShowModal(false);
        reSetForm();
    };
    const handleInputChanges = (name, value, serviceIndex = 0) => {
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };
    const handleServiceFieldChange = (field, value, serviceIndex) => {
        setFormData((previous) => {
            const updatedServiceTypes = [...previous.serviceTypes];
            const updatedService = { ...updatedServiceTypes[serviceIndex] };

            if (field === 'serviceName' || field === 'description') {
                updatedService[field] = value;
            }

            updatedServiceTypes[serviceIndex] = updatedService;

            return {
                ...previous,
                serviceTypes: updatedServiceTypes,
            };
        });
    };
    const handleInputChange = (field, value, serviceIndex = 0, subServiceIndex = 0) => {
        setFormData((previous) => {
            const updatedServiceTypes = [...previous.serviceTypes];
            const updatedService = { ...updatedServiceTypes[serviceIndex] };

            if (subServiceIndex !== null && subServiceIndex !== undefined) {
                const updatedSubServiceTypes = [...updatedService.subServiceTypes];
                updatedSubServiceTypes[subServiceIndex][field] = value;
                updatedService.subServiceTypes = updatedSubServiceTypes;
            } else {
                // For main fields (countryName, description, serviceName, description)
                updatedService[field] = value;
            }

            updatedServiceTypes[serviceIndex] = updatedService;

            return {
                ...previous,
                serviceTypes: updatedServiceTypes,
            };
        });
    };

    const handleFileChange = (fieldName, e) => {
        const file = e.target.files[0];
        setFormData((previous) => ({
            ...previous,
            [fieldName]: file,
        }));
    };
    const handleAddSubService = (serviceIndex) => {
        setFormData((previous) => {
            const updatedServiceTypes = [...previous.serviceTypes];
            const updatedService = { ...updatedServiceTypes[serviceIndex] };

            // Add a new sub-service with empty values
            updatedService.subServiceTypes = [
                ...updatedService.subServiceTypes,
                {
                    subServiceName: '',
                    description: '',
                },
            ];

            updatedServiceTypes[serviceIndex] = updatedService;

            return {
                ...previous,
                serviceTypes: updatedServiceTypes,
            };
        });
    };

    const handleAddServiceName = (serviceIndex) => {
        setFormData((previous) => {
            const updatedServiceTypes = [...previous.serviceTypes];

            // Add a new service type with an empty array of sub-service types
            updatedServiceTypes.push({
                serviceName: '',
                description: '',
                subServiceTypes: [
                    {
                        subServiceName: '',
                        description: '',
                    },
                ],
            });

            return {
                ...previous,
                serviceTypes: updatedServiceTypes,
            };
        });
    };
    const handleShowEditModal = (index) => {
        setEditIndex(index);
        setShowModal(true);

        // Set initial form data with country details for editing
        if (index !== null && index !== undefined) {
            const editedCountry = countriesServiceType[index];
            setFormData({
                countryName: editedCountry.countryName,
                descriptions: editedCountry.description,
                serviceTypes: editedCountry.serviceTypes.map((serviceType) => ({
                    serviceName: serviceType.serviceName,
                    description: serviceType.description,
                    subServiceTypes: serviceType.subServiceTypes.map((subServiceType) => ({
                        subServiceName: subServiceType.subServiceName,
                        description: subServiceType.description,
                    })),
                })),
            });
        } else {
            // If not editing, reset form data
            reSetForm();
        }
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
                            <th>Country Image</th>
                            <th>serviceNames</th>
                            <th>serviceType</th>
                            <th>actions</th>

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
                                <td>
                                    <button class="btn btn-primary btn-cont-edit" onClick={() => handleShowEditModal(index)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* Modal */}
            {showModal && (
                <div>
                    <div className='create-account-dashboard create-country'>
                        <div className='country-form-dashboard-form'>
                        <div className='account-heading'>
                            <h3>  {editIndex !== null && editIndex !== undefined ? 'Edit' : 'Create'}</h3>
                            <button className="close-buttonss" onClick={handleCloseModal}> x </button>
                        </div>
                        <div className='create-country-form'>
                        <div class="country-form-input mb-3">
                            <input className="form-control"
                                placeholder="countryName"
                                type="text"
                                name="countryName"
                                value={formData.countryName}
                                onChange={(e) => handleInputChanges('countryName', e.target.value)} />
                        </div>
                        <div class="country-form-input mb-3">
                            <input className="form-control" placeholder="Country Description" type="text" name="descriptions" value={formData.descriptions}
                                onChange={(e) => handleInputChanges('descriptions', e.target.value)} />
                        </div>
                        <div class="country-form-input mb-3">
                            <input className="form-control"
                                placeholder="Country Image"
                                type="file"
                                accept="image/*"
                                name="countryImage"
                                onChange={(e) => handleFileChange('countryImage', e)} />
                        </div>
                        <div class="country-form-input mb-3">
                            {/* <label htmlFor="flagImage" className="form-label">Flag Image</label> */}
                            <input className="form-control"
                                placeholder="Flag Image"
                                type="file"
                                accept="image/*"
                                name="flagImage"
                                onChange={(e) => handleFileChange('flagImage', e)} />
                        </div>
                     
                            {formData.serviceTypes.map((service, serviceIndex) => (
                                <div  class="services-country" key={serviceIndex}>
                                    <div class="country-form-input mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Service Name"
                                        type="text"
                                        name={`serviceTypes[${serviceIndex}].serviceName`}
                                        value={service.serviceName}
                                        onChange={(e) => handleServiceFieldChange('serviceName', e.target.value, serviceIndex)}
                                    />
                                    </div>
                                    <div class="country-form-input mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Service Description"
                                        type="text"
                                        name={`serviceTypes[${serviceIndex}].description`}
                                        value={service.description}
                                        onChange={(e) => handleServiceFieldChange('description', e.target.value, serviceIndex)}
                                    />
                                    </div>
                                    {service.subServiceTypes.map((subService, subServiceIndex) => (
                                        <div  class="create-country-form" key={subServiceIndex}>
                                                <div class="country-form-input mb-3">
                                            <input
                                                className="form-control"
                                                placeholder="Sub-Service Name"
                                                type="text"
                                                name={`serviceTypes[${serviceIndex}].subServiceTypes[${subServiceIndex}].subServiceName`}
                                                value={subService.subServiceName}
                                                onChange={(e) => handleInputChange('subServiceName', e.target.value, serviceIndex, subServiceIndex)}
                                            />
                                            </div>
                                            <div class="country-form-input mb-3">
                                            <input
                                                className="form-control"
                                                placeholder="Sub-Service Description"
                                                type="text"
                                                name={`serviceTypes[${serviceIndex}].subServiceTypes[${subServiceIndex}].description`}
                                                value={subService.description}
                                                onChange={(e) => handleInputChange('description', e.target.value, serviceIndex, subServiceIndex)}
                                            />
                                            </div>
                                        </div>
                                    ))}
                                    <div className='create-country-buttons'>
                                    <button class="btn btn-primary btn-service-name" onClick={() => handleAddServiceName(serviceIndex)}>Add Service Name</button>
                                    <button class="btn btn-primary btn-service-name" onClick={() => handleAddSubService(serviceIndex)}>Add Sub-Service</button>
                                    </div>
                                </div>
                            ))}
                        
                        </div>
                        <div className="form-button-dashboard">
                            <button className="btn btn-primary create" onClick={handleCreateDepartment}>
                                {editIndex !== null && editIndex !== undefined ? 'Update' : 'Create'}
                            </button>
                            <button className="btn btn-primary cancel" onClick={reSetForm}>Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default CountryServices;