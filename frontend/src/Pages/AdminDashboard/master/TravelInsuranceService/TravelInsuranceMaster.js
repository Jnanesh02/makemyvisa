import React, { useState } from 'react';
import axios from 'axios';

const TravelInsuranceMaster = () => {
  // State variables
  const [travelInsurance, setTravelInsurance] = useState({
    insuranceName:'',
    fileUpload:null,
    Country:[],
    noOfMonths:'',
    cost:''
  });

const onInputChange = (event) => {
  event.preventDefault();
  const {name,value} = event.target;
  setTravelInsurance((prev)=>({
    ...prev,[name]:value
  }));
}

const handleFileChange = (e) => {
  e.preventDefault();
  setTravelInsurance((previous) => ({
    ...previous,
    [e.target.name]: e.target.files[0],
  }));
};

  

  // Function to submit form data
  const handleSubmit = async () => {
    console.log('',travelInsurance);
    try {
      const formData = new FormData();

      // Append data to FormData
      formData.append("insuranceName", travelInsurance.insuranceName);
      formData.append("fileUpload", travelInsurance.fileUpload);
      formData.append("countryName", travelInsurance.Country);
      formData.append("noOfMonths", travelInsurance.noOfMonths);
      formData.append("cost", travelInsurance.cost);

      const response = await axios.post('http://localhost:3000/makemyvisa//api/upload',formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      // Handle success
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div>
    TravelInsurance
    <div>
      <div className="d-flex justify-content-between">
        <h4 className="form-label"> Travel Insurance </h4>
      </div>

      <table className="table table-dummyticket">
        <thead>
          <tr>
            <th scope="col">Insurance Name</th>
            <th scope="col">Document</th>
            <th scope="col">Country</th>
            <th scope="col">Months</th>
            <th scope='col'>Cost</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="insuranceName"
                className="dummy-form-control form-control"
                value={travelInsurance.insuranceName}
                onChange={onInputChange}
              />
            </td>
            <td>
              <input
                type="file"
                name="fileUpload"
                className="dummy-form-control form-control"
                onChange={handleFileChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="Country"
                className="dummy-form-control form-control"
                value={travelInsurance.Country}
                onChange={onInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="noOfMonths"
                className="dummy-form-control form-control"
                value={travelInsurance.noOfMonths}
                onChange={onInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="cost"
                className="dummy-form-control form-control"
                value={travelInsurance.cost}
                onChange={onInputChange}
              />
            </td>
            <td>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default TravelInsuranceMaster;
