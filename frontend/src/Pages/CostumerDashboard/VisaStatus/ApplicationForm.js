import React, { useState } from 'react';
import axios from 'axios';
import '../CostumerDashboardStyles/ApplicationForm.css';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: 'male',
    country: '',
    state: '',
    visaType: 'tourist',
    destination: '',
    documents: [{ name: '', file: null }]
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDocumentNameChange = (index, event) => {
    const newDocuments = [...formData.documents];
    newDocuments[index].name = event.target.value;
    setFormData({ ...formData, documents: newDocuments });
  };

  const handleFileChange = (index, event) => {
    const newDocuments = [...formData.documents];
    newDocuments[index].file = event.target.files[0];
    setFormData({ ...formData, documents: newDocuments });
  };

  const handleAddDocument = () => {
    setFormData({ ...formData, documents: [...formData.documents, { name: '', file: null }] });
  };

  const handleRemoveDocument = (index) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    setFormData({ ...formData, documents: newDocuments });
  };
  console.log("Form Data:",formData);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData);
      console.log('Form submitted successfully:', response.data);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: 'male',
        country: '',
        state: '',
        visaType: 'tourist',
        destination: '',
        documents: [{ name: '', file: null }]
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="visaApplication-container">
      <div className="visaApplication-form-container">
        <h2 className="visaApplication-title">Visa Application</h2>
        <form className="visaApplication-form" onSubmit={handleSubmit}>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="firstname" className="visaApplication-label">First Name</label>
              <input
                type="text"
                id="firstname"
                className="visaApplication-input"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="visaApplication-form-group">
              <label htmlFor="lastname" className="visaApplication-label">Last Name</label>
              <input
                type="text"
                id="lastname"
                className="visaApplication-input"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="email" className="visaApplication-label">Email</label>
              <input
                type="email"
                id="email"
                className="visaApplication-input"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="visaApplication-form-group">
              <label htmlFor="phone" className="visaApplication-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="visaApplication-input"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="gender" className="visaApplication-label">Gender</label>
              <select
                id="gender"
                className="visaApplication-input"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="country" className="visaApplication-label">Country</label>
              <input
                type="text"
                id="country"
                className="visaApplication-input"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="visaApplication-form-group">
              <label htmlFor="state" className="visaApplication-label">State</label>
              <input
                type="text"
                id="state"
                className="visaApplication-input"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="visaType" className="visaApplication-label">Type of Visa</label>
              <select
                id="visaType"
                className="visaApplication-input"
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
              >
                <option value="tourist">Tourist Visa</option>
                <option value="business">Business Visa</option>
                <option value="student">Student Visa</option>
              </select>
            </div>
            <div className="visaApplication-form-group">
            <label htmlFor="destination" className="visaApplication-label">Destination Country</label>
            <input
              type="text"
              id="destination"
              className="visaApplication-input"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
            />
          </div>

          </div>
          
          <div>
  <div className="visaApplication-form-group-doc">
    <div className='d-flex m-2'>
    <h3 className="visaApplication-label">Documents:</h3>
    <button type="button" style={{width:200}} className='btn btn-danger' onClick={handleAddDocument}>Add Document</button>
    </div>
    
    <table className="visaApplication-table m-2">
      <thead>
        <tr>
          <th>Document Name</th>
          <th>Upload</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {formData.documents.map((document, index) => (
          <tr key={index}>
            <td>
              <input
                type="text"
                className="visaApplication-input"
                placeholder="Document Name"
                value={document.name}
                onChange={(event) => handleDocumentNameChange(index, event)}
              />
            </td>
            <td>
              <input
                type="file"
                className="visaApplication-input"
                onChange={(event) => handleFileChange(index, event)}
              />
            </td>
            <td>
              <button type="button" className='btn btn-danger' onClick={() => handleRemoveDocument(index)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
  </div>
</div>

          <button type="submit" className="visaApplication-submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;
