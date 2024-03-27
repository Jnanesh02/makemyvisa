import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../AdminDashboardStyles/Employee.css";

const VisaApplicationDoc = () => {
const [visaDocName, setVisaDocName] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    documentName: "",
    description: "",
  });

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee/get/visaDocumentName`
      );
        
        setVisaDocName(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleCreateDepartment = async () => {
    try {
            await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/employee/create/visaDocumentName`,
        formData,
      );
      fetchDetails(); 
      setShowModal(false); 
    } catch (error) {
      alert(error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


 

  

  
  return (
    <>
      <div className="main-department-section">
        <div className="dep-tbl">
          <h2>Visa Application Docs</h2>
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
              <th>Document Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {visaDocName.map((DocName, index) => (
              <tr key={index}>
                <td>{DocName.documentName}</td>
                <td>{DocName.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div>
          <div className="create-account-dashboard">
            <div className="create-dep-form">
              <div className="account-heading">
                <h3>Create Document Name</h3>
                <button
                  className="close-buttonss"
                  onClick={() => setShowModal(false)}
                >
                  {" "}
                  x{" "}
                </button>
              </div>
              <div className="create-dep-labels mb-3">
                <label className="form-label"> Document Name: </label>
                <input
                  className="form-control"
                  type="text"
                  name="documentName"
                  value={formData.documentName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="create-dep-labels mb-3">
                <label> Description: </label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-button-dashboard">
                <button
                  className="btn btn-primary create"
                  onClick={handleCreateDepartment}
                >
                  Create
                </button>
                <button
                  className="btn btn-primary cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VisaApplicationDoc
