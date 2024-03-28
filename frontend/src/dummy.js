import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pages/sevices/TravelHealthInsurance/TravelHealthInsurance.css";

const TravelHealthInsurance = () => {
  const initialData = {
    countryName: "",
    departureDate: "",
    returnDate: "",
    numberOfPassengers: 1,
    numberOfDays: "",
    passengerDetails: [{ fullName: "", email: "", age: "", phoneNumber: "" }],
  };
  const [formData, setFormData] = useState(initialData);
  const [insurance, setInsurance] = useState([]);
  const [showVisaTypes, setShowVisaTypes] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const fetchInsurance = async (countryName) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/makemyvisa/api/files/${countryName}`
      );
      setInsurance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getcountries`
        );
        if (Array.isArray(response.data.message)) {
          setCountriesData(response.data.message);
        } else {
          setCountriesData([]);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      numberOfDays:
        name === "departureDate" || name === "returnDate"
          ? calculateNumberOfDays(name, value, prevFormData)
          : prevFormData.numberOfDays,
    }));
  };
  const calculateNumberOfDays = (changedField, changedValue, prevFormData) => {
    const { departureDate, returnDate } = prevFormData;

    if (
      (changedField === "departureDate" && returnDate) ||
      (changedField === "returnDate" && departureDate)
    ) {
      const startDate =
        changedField === "departureDate"
          ? new Date(changedValue)
          : new Date(departureDate);
      const endDate =
        changedField === "returnDate"
          ? new Date(changedValue)
          : new Date(returnDate);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        const timeDifference = endDate.getTime() - startDate.getTime();
        return Math.ceil(timeDifference / (1000 * 3600 * 24)).toString();
      }
    }
    return "";
  };

  const handleSearch = (destinationCountry) => {
    fetchInsurance(destinationCountry);
    setShowVisaTypes(true);
  };
  const handleDownload = (documentUrl) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = documentUrl;
    downloadLink.click();
  };
  const isValidDateSelection = () => {
    const departureDate = new Date(formData.departureDate);
    const returnDate = new Date(formData.returnDate);
    return returnDate >= departureDate;
  };
  const handleCheckboxChange = () => {
    setShowPaymentButton(!showPaymentButton);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengerDetails = [...formData.passengerDetails];
    updatedPassengerDetails[index][field] = value;
    setFormData({ ...formData, passengerDetails: updatedPassengerDetails });
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

  const handleAddPassenger = () => {
    setFormData({
      ...formData,
      numberOfPassengers: formData.numberOfPassengers + 1,
      passengerDetails: [
        ...formData.passengerDetails,
        { fullName: "", email: "", age: "", phoneNumber: "" },
      ],
    });
  };

  console.log("formData", formData);
  return (
    <div className="travel-Insurance-container">
      <div className="travel-Insurance-header text-white p-4">
        <h1 className="text-center travel-Insurance-h1">Travel Insurance</h1>
      </div>
      <div className="travel-Insurance-body container">
        <div className="travel-Insurance-container-form shadow p-5 mb-5 bg-body rounded">
          <div className="travel-Insurance-container-sub">
            <div>
              <h5
                htmlFor="destinationCountry"
                className="travel-Insurance-label"
              >
                Destination Country*
              </h5>
              <select
                type="text"
                id="destinationCountry"
                className="travel-Insurance-input form-control mb-3"
                name="countryName"
                value={formData.countryName}
                onChange={handleInputChange}
              >
                <option value="">Select Country</option>
                {Array.isArray(countriesData) &&
                  countriesData.map((country) => (
                    <option key={country._id} value={country.countryName}>
                      {country.countryName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <h5 htmlFor="departureDate" className="travel-Insurance-label">
                Departure Date*
              </h5>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                className="travel-Insurance-input form-control mb-3"
                value={formData.departureDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <h5 htmlFor="returnDate" className="travel-Insurance-label">
                Return Date*
              </h5>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                className="travel-Insurance-input form-control mb-3"
                value={formData.returnDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <h5 htmlFor="numberOfDays" className="travel-Insurance-label">
                Number of Days
              </h5>
              <input
                type="text"
                id="numberOfDays"
                name="numberOfDays"
                className="travel-Insurance-input form-control mb-3"
                value={formData.numberOfDays}
                readOnly
              />
            </div>
          </div>
          <button
            className="travel-Insurance-button btn btn-danger"
            onClick={() => handleSearch(formData.countryName)}
            disabled={
              !(
                formData.countryName &&
                formData.departureDate &&
                formData.returnDate &&
                isValidDateSelection()
              )
            }
          >
            Search
          </button>
        </div>
        {showVisaTypes && (
          <div className="travel-Insurance-visa-types">
            <h2 className="travel-Insurance-plans text-center">Plans</h2>
            <p className="text-center">
              Choose the most appropriate plan for you and your family.
            </p>
            <div className="row">
              {insurance.length === 0 ? (
                <div className="col text-center">
                  <p>No insurance documents found.</p>
                </div>
              ) : (
                insurance?.map((document) => (
                  <div key={document?._id} className="col-md-6  mb-3 ">
                    <div className="travel-Insurance-card shadow-sm card bg-light  text-white">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="travel-Insurance-checkbox me-3"
                            onChange={handleCheckboxChange}
                          />

                          <h4 className="travel-Insurance-card-title card-title">
                            {document.insuranceName || "no title"}
                          </h4>
                        </div>
                        <div className="border border-danger rounded p-3 w-50">
                          <p className="travel-Insurance-card-text card-text">
                            Months: {document.duration || "--"}
                          </p>
                          <p className="travel-Insurance-card-text card-text">
                            Fee:
                            <strong style={{ color: "#dd2817" }}>
                              {" "}
                              {document.cost || "--"}
                            </strong>
                          </p>
                        </div>
                        <button
                          className="travel-Insurance-link btn btn-danger"
                          onClick={() => handleDownload(document.url)}
                        >
                          Download Document
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="text-center">
              {" "}
              {/* Center the button */}
              {showPaymentButton && (
                <button
                  className="travel-Insurance-link btn btn-danger"
                  onClick={toggleModal}
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        )}

        {isOpen && (
          <div>
            <div
              className="modal mx-auto"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="modal-dialog">
                <div className="modal-content travelInsurance-modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Application Form</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeForm}
                    ></button>
                  </div>
                  <div className="modal-body w-90">
                    <div>
                      <div className="d-flex justify-content-between mb-3">
                        <h3 className="form-label">Person Details:</h3>
                        <button
                          className="btn btn-danger me-5"
                          onClick={handleAddPassenger}
                        >
                          <i className="fas fa-plus"></i>
                          Add Person
                        </button>
                      </div>

                      <table className="table table-bordered">
                        <thead>
                          <tr className="fw-bold align-middle text-center">
                            <th scope="col">Full Name*</th>
                            <th scope="col">Email*</th>
                            <th scope="col">Phone Number*</th>
                            <th scope="col">Age*</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.passengerDetails.map((person, index) => (
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={person.fullName}
                                  onChange={(e) =>
                                    handlePassengerChange(
                                      index,
                                      "fullName",
                                      e.target.value
                                    )
                                  }
                                  placeholder="john"
                                  required
                                />
                              </td>

                              <td>
                                <input
                                  type="email"
                                  className="form-control"
                                  value={person.email}
                                  onChange={(e) =>
                                    handlePassengerChange(
                                      index,
                                      "email",
                                      e.target.value
                                    )
                                  }
                                  placeholder="@gmail.com"
                                  required
                                />
                              </td>

                              <td>
                                <input
                                  type="Number"
                                  className="form-control"
                                  value={person.phoneNumber}
                                  onChange={(e) =>
                                    handlePassengerChange(
                                      index,
                                      "phoneNumber",
                                      e.target.value
                                    )
                                  }
                                  placeholder="+91 XXXXX-XXXXX"
                                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                  required
                                  title="Please enter Proper Phone Number"
                                />
                              </td>

                              <td>
                                <input
                                  type="Number"
                                  className="form-control"
                                  value={person.age}
                                  onChange={(e) =>
                                    handlePassengerChange(
                                      index,
                                      "age",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Age"
                                  required
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
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={closeForm}
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-danger">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelHealthInsurance;
