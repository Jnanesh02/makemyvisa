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
    passengerDetails: [{ givenName: "",surname:"", age: "",dateOfBirth:"", passportNumber: "",dateOfIssue:"",dateOfExpiry:"" }],
    from: "",
    to: "",
  });

  const { dummyticket } = useParams({});
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
        { givenName: "",surname:"", age: "",dateOfBirth:"", passportNumber: "",dateOfIssue:"",dateOfExpiry:"" },
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

  const handleSubmit = async () => {
    console.log("Formdata",formData);
    try {
     
      if (CookieUtils.getCookies("userId")) {
        navigate("/dashboard");
      } else {
        const cookieData = {
          formData: formData,
          serviceType: dummyticket,
        };
        console.log(cookieData);
        CookieUtils.setCookies("servicename", JSON.stringify(cookieData));
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dummy-ticket-form-container">
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto shadow bg-body rounded p-5 dummytickets">
          <h2 className="text-center dummy-text-heading">
            <svg
              className="flight-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
            >
              <path d="m319.5-319-104-49 8.5-8.5 93.5 13.5 170-168.5-269-148 14.5-16 330 89 84.5-88q9.5-9.5 21.75-9.5t22.25 9.5Q701-685 701-672t-9.5 22.5l-85 86.5L696-234l-15.5 16.5-149-268.5L365-319l12.5 95.5-9 9-49-104.5Z" />
            </svg>
            <span> Dummy Ticket </span>
          </h2>
          <div className="form-group">
            {/* Trip Type */}
            <h4 className="form-label">Trip Type:</h4>
            <div className="trip-type-radio">
              {/* One Way */}
              <label className="form-check-label">
                <input
                  className="form-check-input "
                  type="radio"
                  name="tripType"
                  value="oneWay"
                  checked={formData.tripType === "oneWay"}
                  onChange={handleChange}
                />
                One Way
              </label>
              {/* Round Trip */}
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tripType"
                  value="roundTrip"
                  checked={formData.tripType === "roundTrip"}
                  onChange={handleChange}
                />
                Round Trip
              </label>
            </div>
          </div>
          <div className="from-to-group ">
            {/* Arrival City */}
            <div className="fromto">
              <h4 className="form-label">Arrival City*</h4>
              <input
                type="text"
                className={`dummy-form-control form-control`}
                name="to"
                placeholder="Country Name"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </div>

            {/* Departure City */}
            <div className="fromto">
              <h4 className="form-label w-40">Departure City*</h4>
              <input
                type="text"
                className={`dummy-form-control form-control`}
                name="from"
                placeholder="Country Name"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Departure and Return Date */}
          <div className="form-group d-flex gap-3 mb-3">
            {/* Departure Date */}
            <div className="w-50">
            <h4 className="label_Departure form-label">
              Departure Date*
            </h4>
            <input
              type="date"
              className={`dummy-form-control form-control`}
              value={formData.departureDate}
              name="departureDate"
              onChange={handleChange}
              required
            />
            </div>

            {/* Return Date (only for Round Trip) */}
            <div className="w-50">
            {formData.tripType === "roundTrip" && (
              <>
                <h4 className="label_return form-label">Return Date*</h4>
                <input
                  type="date"
                  className={`dummy-form-control form-control`}
                  value={formData.returnDate}
                  name="returnDate"
                  onChange={handleChange}
                  required
                />
              </>
            )}
            </div>
          </div>

          {/* Passenger Details */}
          <div>
            <div className="d-flex justify-content-between">
              <h4 className="form-label"> Passenger Details: </h4>
              <button
                className="btn btn-primary add-passangers"
                onClick={handleAddPassenger}
              >
                <i className="fas fa-plus"></i> Add Passenger
              </button>
            </div>
            <table className="table  table-bordered table-dummyticket">
              <thead>
                <tr className="fw-bold align-middle text-center">
                  <th scope="col">Given Name*</th>
                  <th scope="col">Surname*</th>
                  <th scope="col">Age*</th>
                  <th scope="col">Date Of Birth</th>
                  <th scope="col">Passport Number</th>
                  <th scope="col">Date Of Issue</th>
                  <th scope="col">Date Of Expiry</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.passengerDetails.map((passenger, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className={`dummy-form-control form-control`}
                        value={passenger.givenName}
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
                        type="number"
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
                        type="date"
                        className={`dummy-form-control form-control`}
                        value={passenger.dateOfBirth}
                        onChange={(e) =>
                          handlePassengerChange(index, "dateOfBirth", e.target.value)
                        }
                        
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

          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DummyTicketForm;
