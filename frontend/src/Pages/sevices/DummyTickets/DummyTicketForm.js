import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DummyTicketForm.css";
import CookieUtils from "../../../components/Cookie/Cookies";
import { useParams } from "react-router-dom";
function DummyTicketForm() {
  const [formData, setFormData] = useState({
    tripType: "oneWay",
    returnDate: "",
    departureDate: "",
    numberOfPassengers: 1,
    passengerDetails: [{ name: "", age: "", passportNumber: "" }],
    from: "",
    to: "",
  });
  

  const { dummyticket } = useParams({});
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    tripType: '',
    departureDate: '',
    returnDate: '',
    from: '',
    to: '',
    numberOfPassengers: '',
    passengerDetails: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengerDetails = [...formData.passengerDetails];
    updatedPassengerDetails[index][field] = value;
    setFormData({ ...formData, passengerDetails: updatedPassengerDetails });
  };

  const handleAddPassenger = () => {
    setFormData({
      ...formData,
      numberOfPassengers: formData.numberOfPassengers + 1,
      passengerDetails: [...formData.passengerDetails, { name: '', age: '', passportNumber: '' }],
    });
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengerDetails = formData.passengerDetails.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      numberOfPassengers: formData.numberOfPassengers - 1,
      passengerDetails: updatedPassengerDetails,
    });
  };

  const handleSubmit = async () => {
    const formErrors = {};
    if (!formData.from) {
      formErrors.from = 'Please enter departure city';
    }
    if (!formData.to) {
      formErrors.to = 'Please enter arrival city';
    }
    if (!formData.departureDate) {
      formErrors.departureDate = 'Please select departure date';
    }
    if (formData.tripType === 'roundTrip' && !formData.returnDate) {
      formErrors.returnDate = 'Please select return date';
    }
    if (formData.numberOfPassengers < 1) {
      formErrors.numberOfPassengers = 'Number of passengers must be at least 1';
    }

    const passengerErrors = [];
    formData.passengerDetails.forEach((passenger, index) => {
      const errors = {};
      if (!passenger.name) {
        errors.name = `Please enter name for passenger ${index + 1}`;
      }
      if (!passenger.age) {
        errors.age = `Please enter age for passenger ${index + 1}`;
      }
      if (!passenger.passportNumber) {
        errors.passportNumber = `Please enter passport number for passenger ${index + 1}`;
      }
      if (Object.keys(errors).length > 0) {
        passengerErrors[index] = errors;
      }
    });
    if (passengerErrors.length > 0) {
      formErrors.passengerDetails = passengerErrors;
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Prevent form submission if there are errors
    }

    try {
      if (CookieUtils.getCookies("userId")) {
        navigate("/dashboard");
      } else {
        const cookieData = {
          formData: formData,
          serviceType: dummyticket,
        };
        console.log(cookieData);
        CookieUtils.setCookies('servicename', JSON.stringify(cookieData));
        navigate('/login');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dummy-ticket-form-container">
      <form onSubmit={handleSubmit}>
      <div className="container mx-auto shadow bg-body rounded p-5 dummytickets">
         <h2 className='text-center dummy-text-heading'>
        <svg className="flight-icon" xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m319.5-319-104-49 8.5-8.5 93.5 13.5 170-168.5-269-148 14.5-16 330 89 84.5-88q9.5-9.5 21.75-9.5t22.25 9.5Q701-685 701-672t-9.5 22.5l-85 86.5L696-234l-15.5 16.5-149-268.5L365-319l12.5 95.5-9 9-49-104.5Z"/></svg>
               <span>  Dummy Ticket </span>
                </h2> 
        <div className="form-group" > 
          {/* Trip Type */}
          <h4 className="form-label">Trip Type:</h4>
          <div className="trip-type-radio">
            {/* One Way */}
            <label className="form-check-label">
              <input className="form-check-input " type="radio" name="tripType" value="oneWay" checked={formData.tripType === 'oneWay'} onChange={handleChange} />
              One Way
            </label>
            {/* Round Trip */}
            <label className="form-check-label">
              <input className="form-check-input" type="radio" name="tripType" value="roundTrip" checked={formData.tripType === 'roundTrip'} onChange={handleChange} />
              Round Trip
            </label>
          </div>
          {/* Display Trip Type Error */}
          {errors.tripType && <div className="invalid-feedback">{errors.tripType}</div>}
        </div>
        <div className="from-to-group ">
          {/* Arrival City */}
          <div className='fromto'>
          <label className="form-label">Arrival City:</label>
          <input type="text" className={`dummy-form-control form-control ${errors.to && 'is-invalid'}`} name="to" placeholder="Country Name" value={formData.to} onChange={handleChange} required />
          {errors.to && <div className="invalid-feedback">{errors.to}</div>}

          </div>
          
          {/* Departure City */}
          <div className='fromto'>
          <label className="form-label w-40">Departure City:</label>
          <input type="text" className={`dummy-form-control form-control ${errors.from && 'is-invalid'}`} name="from" placeholder="Country Name" value={formData.from} onChange={handleChange} required />
          {errors.from && <div className="invalid-feedback">{errors.from}</div>}
          </div>
          
          
        </div>
        {/* Departure and Return Date */}
        <div className="form-group mb-3">
          {/* Departure Date */}
          <label className="label_Departure form-label">Departure Date:</label>
          <input type="date" className={`dummy-form-control form-control ${errors.departureDate && 'is-invalid'}`} value={formData.departureDate} name="departureDate" onChange={handleChange} required />
          {errors.departureDate && <div className="invalid-feedback">{errors.departureDate}</div>}
          {/* Return Date (only for Round Trip) */}
          {formData.tripType === 'roundTrip' && (
            <>
              <label className="label_return">Return Date:</label>
              <input type="date" className={`dummy-form-control form-control ${errors.returnDate && 'is-invalid'}`} value={formData.returnDate} name="returnDate" onChange={handleChange} required />
              {errors.returnDate && <div className="invalid-feedback">{errors.returnDate}</div>}
            </>
          )}
        </div>
        
        
       
        {/* Passenger Details */}
        <div>
          <div className='d-flex justify-content-between'>
            <h4 className="form-label"> Passenger Details: </h4>
            <button className="btn btn-primary add-passangers" onClick={handleAddPassenger}><i className="fas fa-plus"></i> Add Passenger</button>
          </div>
          <table className="table table-dummyticket">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col"> Age</th>
                <th scope="col">Passport Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.passengerDetails.map((passenger, index) => (
                <tr key={index}>
                  <td><input type="text" className={`dummy-form-control form-control ${errors.passengerDetails[index]?.name && 'is-invalid'}`} value={passenger.name} onChange={(e) => handlePassengerChange(index, 'name', e.target.value)} required /></td>
                  <td><input type="text" className={`dummy-form-control form-control ${errors.passengerDetails[index]?.age && 'is-invalid'}`} value={passenger.age} onChange={(e) => handlePassengerChange(index, 'age', e.target.value)} required /></td>
                  <td><input type="text" className={`dummy-form-control form-control ${errors.passengerDetails[index]?.passportNumber && 'is-invalid'}`} value={passenger.passportNumber} onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)} required /></td>
                  <td><button className="btn btn-danger" onClick={() => handleRemovePassenger(index)}><i className="fas fa-minus"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Display Passenger Details Errors */}
          {errors.passengerDetails.map((passengerErrors, index) => (
            <div key={index}>
              {passengerErrors.name && <div className="invalid-feedback">{passengerErrors.name}</div>}
              {passengerErrors.age && <div className="invalid-feedback">{passengerErrors.age}</div>}
              {passengerErrors.passportNumber && <div className="invalid-feedback">{passengerErrors.passportNumber}</div>}
            </div>
          ))}
        </div>
        {/* Submit Button */}
        <button className="btn btn-success" type="submit">Submit</button>
      </div>
      </form>
    </div>
  );
}

export default DummyTicketForm;
