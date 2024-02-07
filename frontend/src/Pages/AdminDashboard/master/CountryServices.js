import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminDashboardStyles/Employee.css";

const CountryServices = () => {
  const initialFormData = {
    countryName: "",
    descriptions: "",
    countryImage: '',
    flagImage: '',
    serviceTypes: [
      {
        serviceName: "",
        description: "",
        subServiceTypes: [
          {
            subServiceName: "",
            description: "",
          },
        ],
      },
    ],
  };
  const [countriesServiceType, setCountriesServiceType] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [countryFormData, setCounrtyFormData] = useState(initialFormData);
  const [editIndex, setEditIndex] = useState(null);

  const getcountriesServiceDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getcountries`
      );
      if (response.status === 200) {
        setCountriesServiceType(response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getcountriesServiceDetails();
  }, []);

  const handleCreateDepartment = async () => {
    try {
        const formData = new FormData();

// Append data to FormData
formData.append('countryName', countryFormData.countryName);
formData.append('descriptions', countryFormData.descriptions);
formData.append('countryImage', countryFormData.countryImage);
formData.append('flagImage', countryFormData.flagImage);

// Append serviceTypes data (assuming it's an array)
formData.append('serviceTypes', JSON.stringify(countryFormData.serviceTypes));

      if (editIndex !== null && editIndex !== undefined) {
        console.log("editing", countryFormData);
        // Handle update logic for existing country
        // await axios.put(`${process.env.REACT_APP_BACKEND_URL}/employee/update/department`, formData);
      } else {
        // Handle create logic for new country
        console.log("creating", countryFormData.countryImage);
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/create/newCountry`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Set proper content type
            },
        }
        );
      }
      getcountriesServiceDetails(); // Fetch updated data
      setShowModal(false); // Close the modal
    } catch (error) {
      alert(error.message);
    }
  };
  const reSetForm = () => {
    setCounrtyFormData(initialFormData);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setCounrtyFormData(initialFormData);
  };
  const handleInputChanges = (name, value, serviceIndex = 0) => {
    setCounrtyFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  const handleServiceFieldChange = (field, value, serviceIndex) => {
    setCounrtyFormData((previous) => {
      const updatedServiceTypes = [...previous.serviceTypes];
      const updatedService = { ...updatedServiceTypes[serviceIndex] };

      if (field === "serviceName" || field === "description") {
        updatedService[field] = value;
      }

      updatedServiceTypes[serviceIndex] = updatedService;

      return {
        ...previous,
        serviceTypes: updatedServiceTypes,
      };
    });
  };
  const handleInputChange = (
    field,
    value,
    serviceIndex = 0,
    subServiceIndex = 0
  ) => {
    setCounrtyFormData((previous) => {
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

  const handleFileChange = (e) => {
    e.preventDefault();
  console.log("Selected File:", e.target.name, e.target.files[0]);

  // Update state directly with the file object
  setCounrtyFormData((previous) => ({
    ...previous,
    [e.target.name]: e.target.files[0], // Set the file object directly
  }));
  };
  const handleAddSubService = (serviceIndex) => {
    setCounrtyFormData((previous) => {
      const updatedServiceTypes = [...previous.serviceTypes];
      const updatedService = { ...updatedServiceTypes[serviceIndex] };

      // Add a new sub-service with empty values
      updatedService.subServiceTypes = [
        ...updatedService.subServiceTypes,
        {
          subServiceName: "",
          description: "",
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
    setCounrtyFormData((previous) => {
      const updatedServiceTypes = [...previous.serviceTypes];

      // Add a new service type with an empty array of sub-service types
      updatedServiceTypes.push({
        serviceName: "",
        description: "",
        subServiceTypes: [
          {
            subServiceName: "",
            description: "",
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
      setCounrtyFormData({
        countryName: editedCountry.countryName,
        descriptions: editedCountry.description,
        serviceTypes: editedCountry.serviceTypes.map((serviceType) => ({
          serviceName: serviceType.serviceName,
          description: serviceType.description,
          subServiceTypes: serviceType.subServiceTypes.map(
            (subServiceType) => ({
              subServiceName: subServiceType.subServiceName,
              description: subServiceType.description,
            })
          ),
        })),
      });
    } else {
      // If not editing, reset form data
      reSetForm();
    }
  };
  return (
    <>
      <div className="main-department-section">
        <div className="dep-tbl">
          <h2>CountryServices</h2>
          <button
            className="btn btn-primary create-button"
            onClick={() => setShowModal(true)}
          >
            Create
          </button>
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>countryName</th>
              <th>Description</th>
              <th>Country Image</th>
              <th>Flag Image</th>
              <th>serviceNames</th>
              <th>serviceType</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(countriesServiceType) &&
              countriesServiceType.map((country, index) => (
                <tr key={index}>
                  <td>{country.countryName}</td>
                  <td>{country.description}</td>
                  <td><img src={`http://localhost:3000/uploads/countryImages/${country.countryImagePath}`} style={{ width: "100px", height: "100px" }} alt="Placeholder Image" /></td>
                  <td><img src={`http://localhost:3000/uploads/countryImages/${country.flagImagePath}`} style={{ width: "100px", height: "100px" }} alt="Placeholder Image" /></td>


                  <td>
                    <ul>
                      {country.serviceTypes &&
                        country.serviceTypes.map((serviceType, innerIndex) => (
                          <li key={innerIndex}>{serviceType.serviceName}</li>
                        ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {country.serviceTypes &&
                        country.serviceTypes.map((serviceType, innerIndex) => (
                          <li key={innerIndex}>
                            <div>{serviceType.serviceName}</div>
                            {serviceType.subServiceTypes && (
                              <ul>
                                {serviceType.subServiceTypes.map(
                                  (subServiceType, subIndex) => (
                                    <li key={subIndex}>
                                      {subServiceType.subServiceName}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </li>
                        ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-cont-edit"
                      onClick={() => handleShowEditModal(index)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div>
          <div className="create-account-dashboard create-country">
            <div className="account-heading">
              <h3>
                {" "}
                {editIndex !== null && editIndex !== undefined
                  ? "Edit"
                  : "Create"}
              </h3>
              <button className="close-buttonss" onClick={handleCloseModal}>
                {" "}
                x{" "}
              </button>
            </div>
            <div className="create-country-form">
              <div className="country-form-input mb-3">
                <input
                  className="form-control"
                  placeholder="countryName"
                  type="text"
                  name="countryName"
                  value={countryFormData.countryName}
                  onChange={(e) =>
                    handleInputChanges("countryName", e.target.value)
                  }
                />
              </div>
              <div className="country-form-input mb-3">
                <input
                  className="form-control"
                  placeholder="Country Description"
                  type="text"
                  name="descriptions"
                  value={countryFormData.descriptions}
                  onChange={(e) =>
                    handleInputChanges("descriptions", e.target.value)
                  }
                />
              </div>
              <div className="country-form-input mb-3">
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  name="countryImage"
                  onChange={(event) => handleFileChange(event)}
                />
              </div>
              <div className="country-form-input mb-3">
                {/* <label htmlFor="flagImage" className="form-label">Flag Image</label> */}
                <input
                  className="form-control"
                  placeholder="Flag Image"
                  type="file"
                  accept="image/*"
                  name="flagImage"
                  onChange={(event) => handleFileChange(event)}
                />
              </div>

              {countryFormData.serviceTypes.map((service, serviceIndex) => (
                <div className="services-country" key={serviceIndex}>
                  <div className="country-form-input mb-3">
                    <input
                      className="form-control"
                      placeholder="Service Name"
                      type="text"
                      name={`serviceTypes[${serviceIndex}].serviceName`}
                      value={service.serviceName}
                      onChange={(e) =>
                        handleServiceFieldChange(
                          "serviceName",
                          e.target.value,
                          serviceIndex
                        )
                      }
                    />
                  </div>
                  <div className="country-form-input mb-3">
                    <input
                      className="form-control"
                      placeholder="Service Description"
                      type="text"
                      name={`serviceTypes[${serviceIndex}].description`}
                      value={service.description}
                      onChange={(e) =>
                        handleServiceFieldChange(
                          "description",
                          e.target.value,
                          serviceIndex
                        )
                      }
                    />
                  </div>
                  {service.subServiceTypes.map(
                    (subService, subServiceIndex) => (
                      <div
                        className="create-country-form"
                        key={subServiceIndex}
                      >
                        <div className="country-form-input mb-3">
                          <input
                            className="form-control"
                            placeholder="Sub-Service Name"
                            type="text"
                            name={`serviceTypes[${serviceIndex}].subServiceTypes[${subServiceIndex}].subServiceName`}
                            value={subService.subServiceName}
                            onChange={(e) =>
                              handleInputChange(
                                "subServiceName",
                                e.target.value,
                                serviceIndex,
                                subServiceIndex
                              )
                            }
                          />
                        </div>
                        <div className="country-form-input mb-3">
                          <input
                            className="form-control"
                            placeholder="Sub-Service Description"
                            type="text"
                            name={`serviceTypes[${serviceIndex}].subServiceTypes[${subServiceIndex}].description`}
                            value={subService.description}
                            onChange={(e) =>
                              handleInputChange(
                                "description",
                                e.target.value,
                                serviceIndex,
                                subServiceIndex
                              )
                            }
                          />
                        </div>
                      </div>
                    )
                  )}
                  <div className="create-country-buttons">
                    <button
                      className="btn btn-primary btn-service-name"
                      onClick={() => handleAddServiceName(serviceIndex)}
                    >
                      Add Service Name
                    </button>
                    <button
                      className="btn btn-primary btn-service-name"
                      onClick={() => handleAddSubService(serviceIndex)}
                    >
                      Add Sub-Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="form-button-dashboard">
              <button
                className="btn btn-primary create"
                onClick={handleCreateDepartment}
              >
                {editIndex !== null && editIndex !== undefined
                  ? "Update"
                  : "Create"}
              </button>
              <button className="btn btn-primary cancel" onClick={reSetForm}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CountryServices;
