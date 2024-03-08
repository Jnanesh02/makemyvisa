import React, { useState, useEffect, useMemo } from "react";
import ConfirmationModal from "../../EmployeeDetails/ConfirmationAccountModel";



import axios from "axios";

export const CreateCountryService = ({
  handleCloseModal,
  setIsEdit,
  countryDetailsToEdit,
  setActionrender
}) => {
  const initialFormData = useMemo(
    () => ({
      countryName: "",
      description: "",
      countryImagePath: "",
      flagImagePath: "",
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
    }),
    []
  );

  const [countryFormData, setCountyFormData] = useState(initialFormData);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (countryDetailsToEdit) {
      setCountyFormData(countryDetailsToEdit);
      setIsEditing(true);
    } else {
      setCountyFormData(initialFormData);
      setIsEditing(false);
    }
    
  }, [countryDetailsToEdit, initialFormData]);

  const handleInputChanges = (name, value, serviceIndex = 0) => {
    setCountyFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleServiceFieldChange = (field, value, serviceIndex) => {
    setCountyFormData((previous) => {
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
    subServiceIndex 
  ) => {
    setCountyFormData((previous) => {
      const updatedServiceTypes = [...previous.serviceTypes];
      const updatedService = { ...updatedServiceTypes[serviceIndex] };

      if (subServiceIndex != null && subServiceIndex !== undefined) {
        const updatedSubServiceTypes = [...updatedService.subServiceTypes];
        updatedSubServiceTypes[subServiceIndex][field] = value;
        updatedService.subServiceTypes = updatedSubServiceTypes;
      } else {
        // Do nothing or handle the case where subServiceIndex is not provided
        console.warn(
          `handleInputChange: subServiceIndex not provided for field "${field}"`
        );
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
    setCountyFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleAddSubService = (serviceIndex) => {
    setCountyFormData((previous) => {
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

  const handleAddServiceName = () => {
    setCountyFormData((previous) => ({
      ...previous,
      serviceTypes: [
        ...previous.serviceTypes,
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
    }));
  };

  const handleCreateDepartment = () => {
    setConfirmationModalOpen(true);
  };

  const handleConfirm = async () => {
    try {

      const formData = new FormData();

      // Append data to FormData
      formData.append("countryName", countryFormData.countryName);
      formData.append("description", countryFormData.description);
      formData.append("countryImagePath", countryFormData.countryImagePath);
      formData.append("flagImagePath", countryFormData.flagImagePath);

      // Append serviceTypes data (assuming it's an array)
      formData.append(
        "serviceTypes",
        JSON.stringify(countryFormData.serviceTypes)
      );

      const url = isEditing
        ? `${process.env.REACT_APP_BACKEND_URL}/updateCountry/${countryDetailsToEdit._id}`
        : `${process.env.REACT_APP_BACKEND_URL}/create/newCountry`;
      
       
      const response = await axios({
        method: isEditing ? "put" : "post",
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setConfirmationModalOpen(false);
        handleCloseModal();
        setIsEdit(true);
        setActionrender(false);

      } else if (response.status === 409) {
        setConfirmationModalOpen(false);
        alert("Country already exists!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    setConfirmationModalOpen(false);
  };

  const reSetForm = () => {
    setCountyFormData(initialFormData);
  };

  return (
    <>
      <div className="create-account-dashboard create-country">
        <div className="create-dep-form scrl-frm">
      <button className="close-buttonss" onClick={handleCloseModal}>X</button>
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
              name="description"
              value={countryFormData.description}
              onChange={(e) =>
                handleInputChanges("description", e.target.value)
              }
            />
          </div>
          <div className="country-form-input mb-3">
            <input
              className="form-control"
              type="file"
              accept="image/*"
              name="countryImagePath"
              onChange={(event) => handleFileChange(event)}
            />
          </div>
          <div className="country-form-input mb-3">
            <input
              className="form-control"
              placeholder="Flag Image"
              type="file"
              accept="image/*"
              name="flagImagePath"
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
              {service.subServiceTypes.map((subService, subServiceIndex) => (
                <div className="create-country-form" key={subServiceIndex}>
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
              ))}
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
            {isEditing ? "Update" : "Create"}
          </button>
          <button className="btn btn-primary cancel" onClick={reSetForm}>
            Cancel
          </button>
        </div>
        </div>
      </div>
  

      {isConfirmationModalOpen && (
        <ConfirmationModal
          message={`Are you sure you want to ${
            isEditing ? "Update" : "Create"
          } this countryService?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  ); 
};
