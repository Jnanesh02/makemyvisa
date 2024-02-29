import React, { useState } from "react";
import axios from "axios";
import '../CostumerDashboardStyles/ApplicationForm.css';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';

const SuccessDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: 'green', // Green color for success
}));

const SuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: 'green', // Green color for success
}));


const ApplicationForm = () => {

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "male",
    country: "",
    state: "",
    visaType: "tourist",
    destination: "",
    documents: [{ name: "", file: null }],
  });

  const [FormSubmited,setFormSubmited]=useState(true);

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
    setFormData({
      ...formData,
      documents: [...formData.documents, { name: "", file: null }],
    });
  };

  const handleRemoveDocument = (index) => {
    const newDocuments = [...formData.documents];
    newDocuments.splice(index, 1);
    setFormData({ ...formData, documents: newDocuments });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(false)
    try {
      
      const response = await axios.post("YOUR_API_ENDPOINT", formData);
      console.log("Form submitted successfully:", response.data);
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "male",
        country: "",
        state: "",
        visaType: "tourist",
        destination: "",
        documents: [{ name: "", file: null }],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      

      {FormSubmited?<div>

        <div className="visaApplication-container mx-auto mb-3 shadow p-3 rounded" style={{width:"1000px"}}>
      
      <div className="visaApplication-form-container">
        <h2 className="visaApplication-title">Visa Application</h2>
        <form className="visaApplication-form" onSubmit={handleSubmit}>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="firstname" className="visaApplication-label">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                className="visaApplication-input  form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="visaApplication-form-group">
              <label htmlFor="lastname" className="visaApplication-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                className="visaApplication-input  form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="email" className="visaApplication-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="visaApplication-input  form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="visaApplication-form-group">
              <label htmlFor="phone" className="visaApplication-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="visaApplication-input  form-control"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="gender" className="visaApplication-label">
                Gender
              </label>
              <select
                id="gender"
                className="visaApplication-input  form-control"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="country" className="visaApplication-label">
                Country
              </label>
              <input
                type="text"
                id="country"
                className="visaApplication-input  form-control"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="visaApplication-form-group">
              <label htmlFor="state" className="visaApplication-label">
                State
              </label>
              <input
                type="text"
                id="state"
                className="visaApplication-input  form-control"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="visaApplication-form-row">
            <div className="visaApplication-form-group">
              <label htmlFor="visaType" className="visaApplication-label">
                Type of Visa
              </label>
              <select
                id="visaType"
                className="visaApplication-input  form-control"
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
                required
              >
                <option value="tourist">Tourist Visa</option>
                <option value="business">Business Visa</option>
                <option value="student">Student Visa</option>
              </select>
            </div>
            <div className="visaApplication-form-group">
              <label htmlFor="destination" className="visaApplication-label">
                Destination Country
              </label>
              <input
                type="text"
                id="destination"
                className="visaApplication-input  form-control"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <div className="visaApplication-form-group-doc">
              <div className="document-add-btns">
                <h5 className="visaApplication-label">Documents:</h5>
                <button
                  type="button"
                  className="btn btn-danger add-dcoument-danger"
                  onClick={handleAddDocument}
                >
                  Add Document
                </button>
              </div>
              <div className="table-responsive">
                <table className="table">
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
                            className="visaApplication-input  form-control"
                            placeholder="Document Name"
                            value={document.name}
                            onChange={(event) =>
                              handleDocumentNameChange(index, event)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            className="visaApplication-input  form-control"
                            onChange={(event) => handleFileChange(index, event)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveDocument(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-danger btn-danger-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
      </div>:<div className="d-flex justify-content-center"><SuccessDiv>
      <SuccessIcon />
      <Typography variant="body1">Application Submitted</Typography>
    </SuccessDiv></div>}
    </div>
  );
};

export default ApplicationForm;
