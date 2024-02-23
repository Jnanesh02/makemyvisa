import React, { useState } from 'react';
import axios from 'axios';

const TravelInsuranceMaster = () => {
  // State variables
  const [formData, setFormData] = useState({
    numberOfPassengers: 0,
    passengerDetails: [],
  });

  // Function to add a new passenger
  const handleAddPassenger = () => {
    setFormData({
      ...formData,
      numberOfPassengers: formData.numberOfPassengers + 1,
      passengerDetails: [
        ...formData.passengerDetails,
        { Insurancename: '', Document: null, Country: '', months: '', cost: '' },
      ],
    });
  };

  // Function to handle changes in passenger details
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengerDetails = [...formData.passengerDetails];
    updatedPassengerDetails[index][field] = value;
    setFormData({
      ...formData,
      passengerDetails: updatedPassengerDetails,
    });
  };

  // Function to remove a passenger
  const handleRemovePassenger = (index) => {
    const updatedPassengerDetails = [...formData.passengerDetails];
    updatedPassengerDetails.splice(index, 1);
    setFormData({
      ...formData,
      numberOfPassengers: formData.numberOfPassengers - 1,
      passengerDetails: updatedPassengerDetails,
    });
  };

  // Function to submit form data
  const handleSubmit = async () => {
    try {
      const response = await axios.post('your_api_endpoint_here', formDataToFormData(formData), {
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

  // Convert form data to FormData object
  const formDataToFormData = (data) => {
    const formData = new FormData();
    formData.append('numberOfPassengers', data.numberOfPassengers);
    data.passengerDetails.forEach((passenger, index) => {
      formData.append(`passengerDetails[${index}][Insurancename]`, passenger.Insurancename);
      formData.append(`passengerDetails[${index}][Document]`, passenger.Document);
      formData.append(`passengerDetails[${index}][Country]`, passenger.Country);
      formData.append(`passengerDetails[${index}][months]`, passenger.months);
      formData.append(`passengerDetails[${index}][cost]`, passenger.cost);
    });
    return formData;
  };

  return (
    <div>
      TravelInsurance
      <div>
        <div className="d-flex justify-content-between">
          <h4 className="form-label"> Travel Insurance </h4>
          <button
            className="btn btn-primary add-passangers"
            onClick={handleAddPassenger}
          >
            <i className="fas fa-plus"></i> Create
          </button>
        </div>

        <table className="table table-dummyticket">
          <thead>
            <tr>
              <th scope="col">Insurance Name</th>
              <th scope="col">Document</th>
              <th scope="col">Country</th>
              <th scope="col">months</th>
              <th scope='col'>Cost</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.passengerDetails.map((passenger, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="dummy-form-control form-control"
                    value={passenger.Insurancename}
                    onChange={(e) =>
                      handlePassengerChange(index, 'Insurancename', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="file"
                    className="dummy-form-control form-control"
                    onChange={(e) =>
                      handlePassengerChange(index, 'Document', e.target.files[0])
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="dummy-form-control form-control"
                    value={passenger.Country}
                    onChange={(e) =>
                      handlePassengerChange(index, 'Country', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="dummy-form-control form-control"
                    value={passenger.months}
                    onChange={(e) =>
                      handlePassengerChange(index, 'months', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="dummy-form-control form-control"
                    value={passenger.cost}
                    onChange={(e) =>
                      handlePassengerChange(index, 'cost', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemovePassenger(index)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <button className="btn btn-primary" onClick={handleSubmit}><i className="fas fa-add"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default TravelInsuranceMaster;
