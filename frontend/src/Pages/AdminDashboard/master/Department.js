import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../AdminDashboardStyles/Employee.css";
const Department = () => {
  const [role, setRole] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    description: '',
  });

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/employee/get/department`);
      
      setRole(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleCreateDepartment = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/employee/create/department`, formData);
      fetchDetails(); // Fetch updated data
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
          <th>Department</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {role.map((department, index) => (
          <tr key={index}>
            <td>{department.role}</td>
            <td>{department.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

      {/* Modal */}
      {showModal && (
        <div >
          <div className='create-account-dashboard'>
            <div className='account-heading'>
            <h3>Create Department</h3>
            <button class="close-buttonss" onClick={() => setShowModal(false)}> x </button>
            </div>
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

export default Department;
