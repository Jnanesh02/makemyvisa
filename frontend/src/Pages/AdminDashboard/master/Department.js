import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminDashboardStyles/Employee.css";
import CreatableSelect from 'react-select/creatable';

const components = { DropdownIndicator: null };

const Department = () => {
  const [department, setDepartment] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    roles:[],
    description: "",
  });

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/employee/get/department`
      );

      setDepartment(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleCreateDepartment = async () => {
    try {
      const roleArray = role.map((roleItem)=> roleItem.value);
      const postData={
        ...formData,
        roles:roleArray
      }
      
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/employee/create/department`,
        formData
      );
      fetchDetails(); // Fetch updated data
      setShowModal(false); // Close the modal
    } catch (error) {
      alert(error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const [inputValue, setInputValue] = useState('');
  const [role, setRole] = useState([]);

  const handleKeyDown = (event) => {
    if (!inputValue || !['Enter', 'Tab'].includes(event.key)) return;
    setRole((prev) => [...prev, { label:inputValue,value: inputValue }]);
    setInputValue('');
    event.preventDefault();
  };

  console.log("inputvalue:",inputValue);


  return (
    <>
      <div className="main-department-section">
        <div className="dep-tbl">
          <h2>Department</h2>
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
              <th>Department</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {department.map((department, index) => (
              <tr key={index}>
                <td>{department.department}</td>
                <td>{department.description}</td>
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
                <h3>Create Department</h3>
                <button
                  className="close-buttonss"
                  onClick={() => setShowModal(false)}
                >
                  {" "}
                  x{" "}
                </button>
              </div>
              <div className="create-dep-labels mb-3">
                <label className="form-label"> Department: </label>
                <input
                  className="form-control"
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>

              <div className="create-dep-labels mb-3">
                <label className="form-label"> Role: </label>
                <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setRole(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={role}
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
  );
};

export default Department;
