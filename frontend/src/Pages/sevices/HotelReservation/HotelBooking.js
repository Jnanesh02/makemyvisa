import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../DummyTickets/DummyTicketForm.css";
import CookieUtils from "../../../components/cookie/Cookies";
import { useParams } from "react-router-dom";

export const HotelBooking = () => {
  const [formData, setFormData] = useState({
    arrivalCountry: "",
    checkIn: "",
    checkOut: "",
    phonenumber: "",
    numberOfPassengers: 1,
    passengerDetails: [
      { name: "", age: "", phonenumber: "", passportNumber: "" },
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
        { name: "", age: "", phonenumber: "", passportNumber: "" },
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
    if (validateForm()) {
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
    }
  };

  const validateForm = () => {
    // Basic validation checks
    if (
      formData.arrivalCountry === "" ||
      formData.checkIn === "" ||
      formData.checkOut === ""
    ) {
      return false;
    }

    // Additional validation checks for passenger details
    for (let passenger of formData.passengerDetails) {
      if (
        passenger.name === "" ||
        passenger.age === "" ||
        passenger.phonenumber.length > 15 ||
        passenger.passportNumber === ""
      ) {
        return false;
      }
    }

    return true;
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
                  <h4>Arrival City:</h4>
                  <input
                    type="text"
                    className={`dummy-form-control form-control ${
                      formSubmitted && formData.arrivalCountry === ""
                        ? "is-invalid"
                        : ""
                    }`}
                    name="arrivalCountry"
                    placeholder="Country Name"
                    value={formData.arrivalCountry}
                    onChange={handleChange}
                  />
                  {formSubmitted && formData.arrivalCountry === "" && (
                    <div className="invalid-feedback">
                      Please provide a valid arrival city.
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group w-100 me-2">
              <div className="date-group">
                <div className="Departure_date">
                  <h4 className="label_Departure">Check In:</h4>
                  <input
                    type="date"
                    className={`dummy-form-control form-control ${
                      formSubmitted && formData.checkIn === ""
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formData.checkIn}
                    name="checkIn"
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {formSubmitted && formData.checkIn === "" && (
                    <div className="invalid-feedback">
                      Please provide a valid check-in date.
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group w-100">
              <div className="date-group">
                <div className="Departure_date">
                  <h4 className="label_Departure">Check out:</h4>
                  <input
                    type="date"
                    className={`dummy-form-control form-control ${
                      formSubmitted && formData.checkOut === ""
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formData.checkOut}
                    name="checkOut"
                    onChange={handleChange}
                  />
                  {formSubmitted && formData.checkOut === "" && (
                    <div className="invalid-feedback">
                      Please provide a valid check-out date.
                    </div>
                  )}
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
            <table className="table table-dummyticket">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Passport Number</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData?.passengerDetails.map((passenger, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className={`dummy-form-control form-control ${
                          formSubmitted && passenger.name === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        value={passenger.name}
                        onChange={(e) =>
                          handlePassengerChange(index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="Number"
                        className={`dummy-form-control form-control ${
                          formSubmitted && passenger.age === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        value={passenger.age}
                        onChange={(e) =>
                          handlePassengerChange(index, "age", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`dummy-form-control form-control ${
                          formSubmitted &&
                          (passenger.phonenumber === "" ||
                            passenger.phonenumber.length > 15)
                            ? "is-invalid"
                            : ""
                        }`}
                        value={passenger.phonenumber}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "phonenumber",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className={`dummy-form-control form-control ${
                          formSubmitted && passenger.passportNumber === ""
                            ? "is-invalid"
                            : ""
                        }`}
                        value={passenger.passportNumber}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "passportNumber",
                            e.target.value
                          )
                        }
                        pattern="[A-Za-z0-9]{6,20}"
                        title="Please provide a valid passport number (6-20 alphanumeric characters)."
                      />
                      {formSubmitted && passenger.passportNumber === "" && (
                        <div className="invalid-feedback">
                          Please provide a valid passport number (6-20
                          alphanumeric characters).
                        </div>
                      )}
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
