import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../DummyTickets/DummyTicketForm.css";
import CookieUtils from "../../../components/Cookie/Cookies";
import { useParams } from "react-router-dom";

export const HotelBooking = () => {
  const [formData, setFormData] = useState({
    arrivalCountry: "",
    checkIn: "",
    checkOut: "",
    phonenumber: "",
    numberOfPassengers: 1,
    passengerDetails: [
      { givenName: "",surname:"", age: "", phonenumber: "", passportNumber: "",dateOfIssue:"",dateOfExpiry:"" },
    ],
  });
  const [formSubmitted, setFormSubmitted] = useState(false); // Track if form has been submitted
  const { hotelReservation } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePassengerChange = (index, field, value) => {
    // console.log("index,field,value",index,field,value);
    const updatedPassengerDetails = [...formData.passengerDetails];

    updatedPassengerDetails[index][field] = value;

    setFormData({ ...formData, passengerDetails: updatedPassengerDetails });
  };

  const handleAddPassenger = () => {
    setFormData({
      ...formData,
      numberOfPassengers: formData.numberOfPassengers + 1,
      passengerDetails: [
        ...formData.passengerDetails,
        { givenName: "",surname:"", age: "", phonenumber: "", passportNumber: "",dateOfIssue:"",dateOfExpiry:"" },
      ],
    });
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengerDetails = formData.passengerDetails.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      numberOfPassengers: formData.numberOfPassengers - 1,
      passengerDetails: updatedPassengerDetails,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setFormSubmitted(true); // Set formSubmitted to true when the form is submitted
    console.log("formdata",formData);
      try {
        if (CookieUtils.getCookies("userId")) {
          navigate("/dashboard");
        } else {
          const cookieData = {
            formData: formData,
            serviceType: hotelReservation,
          };
          CookieUtils.setCookies("servicename", JSON.stringify(cookieData));
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    
  };

  

  return (
    <div className="dummy-ticket-form-container">
      <div className="container mx-auto shadow bg-body rounded p-5 dummytickets">
        <h2 className="text-center dummy-text-heading">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 -960 960 960"
            width="40"
          >
            <path d="M40-200v-600h80v400h320v-320h320q66 0 113 47t47 113v360h-80v-120H120v120H40Zm240-240q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm240 40h320v-160q0-33-23.5-56.5T760-640H520v240ZM280-520q17 0 28.5-11.5T320-560q0-17-11.5-28.5T280-600q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0 0q-17 0-28.5-11.5T240-560q0-17 11.5-28.5T280-600q17 0 28.5 11.5T320-560q0 17-11.5 28.5T280-520Zm240-120h240q33 0 56.5 23.5T840-560v160H520v-240Z" />
          </svg>
          <span> Hotel Reservation </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-3">
            <div className="form-group w-100">
              <div className="from-to-group">
                <div className="fromto" style={{ width: "90%" }}>
                  <h4>Arrival City*</h4>
                  <input
                    type="text"
                    className={`dummy-form-control form-control`}
                    name="arrivalCountry"
                    placeholder="Country Name"
                    value={formData.arrivalCountry}
                    onChange={handleChange}
                    required
                  />
                 
                </div>
              </div>
            </div>
            <div className="form-group w-100 me-2">
              <div className="date-group">
                <div className="Departure_date">
                  <h4 className="label_Departure">Check In*</h4>
                  <input
                    type="date"
                    className={`dummy-form-control form-control `}
                    value={formData.checkIn}
                    name="checkIn"
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                  
                </div>
              </div>
            </div>
            <div className="form-group w-100">
              <div className="date-group">
                <div className="Departure_date">
                  <h4 className="label_Departure">Check out*</h4>
                  <input
                    type="date"
                    className={`dummy-form-control form-control`}
                    value={formData.checkOut}
                    name="checkOut"
                    onChange={handleChange}
                    required
                  />
                  
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between mb-2">
              <h3>Passenger Details:</h3>
              <button
                type="button"
                className="btn btn-primary add-passangers"
                onClick={handleAddPassenger}
              >
                <i className="fas fa-plus"></i> Add Passenger
              </button>
            </div>
            <table className="table table-bordered  table-dummyticket">
              <thead>
                <tr className="fw-bold align-middle text-center">
                  <th scope="col">Given Name*</th>
                  <th scope="col">Surname*</th>
                  <th scope="col">Age*</th>
                  <th scope="col">Phone Number*</th>
                  <th scope="col">Passport Number</th>
                  <th scope="col">Date of Issue</th>
                  <th scope="col">Date of Expiry</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData?.passengerDetails.map((passenger, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className={`dummy-form-control form-control`}
                        value={passenger.giveName}
                        onChange={(e) =>
                          handlePassengerChange(index, "givenName", e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`dummy-form-control form-control`}
                        value={passenger.surname}
                        onChange={(e) =>
                          handlePassengerChange(index, "surname", e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="Number"
                        className={`dummy-form-control form-control`}
                        value={passenger.age}
                        onChange={(e) =>
                          handlePassengerChange(index, "age", e.target.value)
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="Number"
                        className={`dummy-form-control form-control`}
                        value={passenger.phonenumber}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "phonenumber",
                            e.target.value
                          )
                        }
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`dummy-form-control form-control`}
                        value={passenger.passportNumber}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "passportNumber",
                            e.target.value
                          )
                        }
                        pattern="[A-Za-z0-9]{6,20}"
                        
                      />
                      
                    </td>
                    <td>
                      <input
                        type="date"
                        className={`dummy-form-control form-control`}
                        value={passenger.dateOfIssue}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "dateOfIssue",
                            e.target.value
                          )
                        }
                       
                      />
                      
                    </td>
                    <td>
                      <input
                        type="date"
                        className={`dummy-form-control form-control`}
                        value={passenger.dateOfExpiry}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "dateOfExpiry",
                            e.target.value
                          )
                        }
                       
                      />
                      
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemovePassenger(index)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
