import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminDashboardStyles/Employee.css";
import { CreateCountryService } from "./CountryService/CreateCountryService";
import ConfirmationModal from "../../AdminDashboard/EmployeeDetails/ConfirmationAccountModel";

const CountryServices = () => {
  const [countriesServiceType, setCountriesServiceType] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(false);
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
  }, [isEditing]);
  const handleCreate = () => {
    setSelectedCountry(null);
    setShowModal(true);
  };
  const handleEdit = (countryId) => {
    const countryToEdit = countriesServiceType.find(
      (country) => country._id === countryId
    );
    setSelectedCountry(countryToEdit);
    setShowModal(true);
  };
  const handleDelete = async (countryId) => {
    try {
      setSelectedCountry(countryId);
      setDeleteConfirmationModalOpen(true);
    } catch (error) {
      alert(error.message);
    }
  };

  // const handleDeleteService = async (serviceId) => {
  //   try {
  //     setSelectedCountry(serviceId);
  //     setDeleteConfirmationModalOpen(true);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // const handleDeleteSubService = async (serviceId, subServiceId) => {
  //   try {
  //     setSelectedCountry({ serviceId, subServiceId }); // Store the IDs for deletion
  // setDeleteConfirmationModalOpen(true);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  const handleCancelDelete = () => {
    // Close confirmation modal without performing deletion
    setDeleteConfirmationModalOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      // if (selectedCountry.subServiceId) {
      //   await axios.delete(
      //     `${process.env.REACT_APP_BACKEND_URL}/services/${selectedCountry.serviceId}/subservices/${selectedCountry.subServiceId}`
      //   );
      // } else if (selectedCountry.serviceId) {
      //   await axios.delete(
      //     `${process.env.REACT_APP_BACKEND_URL}/services/${selectedCountry.serviceId}`
      //   );
      // } else {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/countries/${selectedCountry}`
      );
      // }
      await getcountriesServiceDetails();
    } catch (error) {
      alert(error.message);
    } finally {
      setDeleteConfirmationModalOpen(false);
    }
  };
  return (
    <>
      <div className="main-department-section">
        <div className="dep-tbl">
          <h2>CountryServices</h2>
          <button
            className="btn btn-primary create-button"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>

        {isDeleteConfirmationModalOpen && (
          <ConfirmationModal
            message="Are you sure you want to delete this countryservice?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
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
                  <td>
                    <img
                      src={`http://localhost:3000/uploads/countryImages/${country.countryImagePath}`}
                      style={{ width: "100px", height: "100px" }}
                      alt="/"
                    />
                  </td>
                  <td>
                    <img
                      src={`http://localhost:3000/uploads/countryImages/${country.flagImagePath}`}
                      style={{ width: "100px", height: "100px" }}
                      alt="/"
                    />
                  </td>

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
                    {!editingEmployee && (
                      <>
                        <button
                          className="action-button edit"
                          onClick={() => handleEdit(country._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-button delete"
                          onClick={() => handleDelete(country._id)}
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
      </div>

      {/* Modal */}
      {showModal && (
        <CreateCountryService
          handleCloseModal={() => setShowModal(false)}
          countryDetailsToEdit={selectedCountry}
          onEmployeeUpdate={handleEdit}
          setIsEdit={setIsEditing}
          setActionrender={setEditingEmployee}
        />
      )}
    </>
  );
};
export default CountryServices;
