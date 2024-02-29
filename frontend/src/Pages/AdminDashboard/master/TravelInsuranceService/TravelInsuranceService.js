import React, { useState, useEffect } from "react";
import { FadeLoader } from 'react-spinners';
import axios from "axios";
import "../../AdminDashboardStyles/Employee.css";
import { CreateTravelInsurance } from "./CreateTravelInsurance";
import ConfirmationModal from "../../EmployeeDetails/ConfirmationAccountModel";

const TravelInsuranceServices = () => {
  const [travelInsuranceData, setTravelInsuranceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [insuranceIdToDelete, setInsuranceIdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTravelInsuranceData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/allTravelInsurance`
      );
      if (response.status === 200) {
        setTravelInsuranceData(response.data);
        setIsLoading(false)
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getTravelInsuranceData();
  }, [isEditing]);

  const handleCreate = () => {
    setShowModal(true);
  };


  const handleDelete = async (insuranceId) => {
    setInsuranceIdToDelete(insuranceId);
    setDeleteConfirmationModalOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      const response =  await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/delete/insurance/${insuranceIdToDelete}`
        );
        console.log(response);
    if(response.status === 200){
      setDeleteConfirmationModalOpen(false);
      setIsLoading(false);
      setIsEditing(true);
    }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error);
    } 
  };

  return (
    <>
      {isLoading?<FadeLoader/>:(
        <>
        <div className="main-department-section">
        <div className="dep-tbl">
          <h2>Travel Insurance</h2>
          <button
            className="btn btn-primary create-button"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>

        {isDeleteConfirmationModalOpen && (
          <ConfirmationModal
            message="Are you sure you want to delete this travel insurance?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}

        <table className="employee-table">
          <thead>
            <tr>
              <th>Insurance Name</th>
              <th>Document Type</th>
              <th>Countries Covered</th>
              <th>Duration (Months)</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(travelInsuranceData) ? (
              travelInsuranceData.map((insurance) => (
                <tr key={insurance._id}>
                  <td>{insurance.insuranceName}</td>
                  <td>{insurance.key}</td>
                  <td>
                    {insurance?.countriesApplicable.map((country,index) => (
                      <span key={index}>{country}<br/></span>
                      
                    ))}{" "}
                  </td>
                  <td>{insurance.duration}</td>
                  <td>{insurance.cost}</td>
                  <td>
                    <button
                      className="action-button delete"
                      onClick={() => handleDelete(insurance._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No travel insurance data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <CreateTravelInsurance
          handleCloseModal={() => setShowModal(false)}
          setActionrender={setIsEditing}
        />
      )}
        </>
      )}
    </>
  );
};

export default TravelInsuranceServices;
