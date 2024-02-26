import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../AdminDashboardStyles/Employee.css";
import { CreateTravelInsurance } from "./CreateTravelInsurance";
import ConfirmationModal from "../../EmployeeDetails/ConfirmationAccountModel";

const TravelInsuranceServices = () => {
  const [travelInsuranceData, setTravelInsuranceData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getTravelInsuranceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getTravelInsurance`
      );
      if (response.status === 200) {
        setTravelInsuranceData(response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getTravelInsuranceData();
  }, [isEditing]);

  const handleCreate = () => {
    setSelectedInsurance(null);
    setShowModal(true);
  };

  const handleEdit = (insuranceId) => {
    const insuranceToEdit = travelInsuranceData.find(
      (insurance) => insurance._id === insuranceId
    );
    setSelectedInsurance(insuranceToEdit);
    setShowModal(true);
  };

  const handleDelete = async (insuranceId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/deleteTravelInsurance/${insuranceId}`
      );
      setDeleteConfirmationModalOpen(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await getTravelInsuranceData();
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
          <h2>Travel Insurance</h2>
          <button className="btn btn-primary create-button" onClick={handleCreate}>
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
            {Array.isArray(travelInsuranceData) &&
              travelInsuranceData.map((insurance, index) => (
                <tr key={index}>
                  <td>{insurance.insuranceName}</td>
                  <td>{insurance.fileUpload ? "Uploaded" : "Not Uploaded"}</td>
                  <td>{insurance.Countries.join(", ")}</td>
                  <td>{insurance.noOfMonths}</td>
                  <td>{insurance.cost}</td>
                  <td>
                    <button className="action-button edit" onClick={() => handleEdit(insurance._id)}>
                      Edit
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(insurance._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <CreateTravelInsurance
          handleCloseModal={() => setShowModal(false)}
          travelInsuranceDetailsToEdit={selectedInsurance}
          setIsEdit={setIsEditing}
          setActionrender={setIsEditing}
        />
      )}
    </>
  );
};

export default TravelInsuranceServices;
