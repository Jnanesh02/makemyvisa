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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <h2 style={{ marginRight: '10px' }}>Department</h2>
        <button style={{left: '62rem', position: 'relative'}}onClick={() => setShowModal(true)}>Create</button>
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

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h3>Create Department</h3>
            <label>
              Department:
              <input type="text" name="role" value={formData.role} onChange={handleInputChange} />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
            </label>
            <button onClick={handleCreateDepartment}>Create</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

   
    </>
  );
};

export default Department;
