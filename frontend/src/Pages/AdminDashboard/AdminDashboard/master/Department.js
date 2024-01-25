import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Department = () => {
  const [role, setRole] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/makemyvisa/employee/get/department');
      console.log(response.data.message);
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
      // Add the logic for creating a new department here
      // For example, you can make another axios.post request
      // and then call fetchDetails to update the department list
      console.log('Creating a new department...');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <h2 style={{ marginRight: '10px' }}>Department</h2>
        <button onClick={handleCreateDepartment}>Create</button>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Role Name</th>
          </tr>
        </thead>
        <tbody>
          {role.map((role, index) => (
            <tr key={index}>
              <td>{role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Department;
