import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CostumerDashboardStyles/ApplicationForm.css";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
const SuccessDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "green",
}));

const SuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: "green",
}));
const ApplicationForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [modalDisabled, setModalDisabled] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    country: "",
    state: "",
    visaType: "",
    passport: "",
    destination: "",
  });
  const handleConfirm = () => {
    setPaymentSubmitted(true);
    setShowModal(false); // Close the modal after confirmation
    setModalDisabled(true); // Disable the "Open Modal" button after confirmation
  };

  const handleSubmit = () => {
    setPaymentConfirmed(true); // Set payment as confirmed
    setShowSuccessMessage(true); // Show success message
  };
  const [countriesData, setCountriesData] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchCountriesAndServices = async () => {
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
        console.error("Error fetching countries and services:", error);
      }
    };

    fetchCountriesAndServices();
  }, []);
  return (
    <div className="container">
      {/* Application Form */}
      {modalDisabled ? null : (
        <>
          <div>
            <div
              className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
              style={{ width: "1000px" }}
            >
              <div className="visaApplication-form-container">
                <h2 className="visaApplication-title">Visa Application</h2>
                <div className="visaApplication-form">
                  <div className="visaApplication-form-row">
                    <div className="visaApplication-form-group">
                      <input
                        type="text"
                        id="firstname"
                        className="visaApplication-input  form-control"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="visaApplication-form-group">
                      <input
                        type="text"
                        id="lastname"
                        className="visaApplication-input  form-control"
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="visaApplication-form-row">
                    <div className="visaApplication-form-group">
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="visaApplication-input  form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="visaApplication-form-group">
                      <input
                        type="tel"
                        id="phone"
                        placeholder="Phone Number"
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
                      <select
                        id="gender"
                        className="visaApplication-input  form-control"
                        placeholder="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="visaApplication-form-group">
                      <input
                        type="number"
                        id="passport"
                        placeholder="Passport Number"
                        className="visaApplication-input  form-control"
                        name="passport"
                        value={formData.passport}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="visaApplication-form-row">
                    <div className="visaApplication-form-group">
                      <input
                        type="text"
                        id="country"
                        placeholder="Current country"
                        className="visaApplication-input  form-control"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="visaApplication-form-group">
                      <input
                        type="text"
                        id="state"
                        placeholder="State"
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
                      <label
                        htmlFor="Destinationcountry"
                        className="visaApplication-label"
                      >
                        Destination Country
                      </label>
                      <select
                        id="Destinationcountry"
                        className="visaApplication-input form-control"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Country</option>
                        {countriesData.map((country, index) => (
                          <option key={index} value={country.countryName}>
                            {country.countryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.destination ? (
                      <div className="visaApplication-form-group">
                        <label
                          htmlFor="visaType"
                          className="visaApplication-label"
                        >
                          Type of Visa
                        </label>
                        <select
                          id="visaType"
                          className="visaApplication-input form-control"
                          name="visaType"
                          value={formData.visaType}
                          onChange={handleInputChange}
                          required
                        >
                          <option>select</option>
                          {countriesData
                            .find(
                              (country) =>
                                country.countryName === formData.destination
                            )
                            .serviceTypes.map((service, index) => (
                              <option key={index} value={service.serviceName}>
                                {service.serviceName}
                              </option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-danger-submit"
                    style={{ background: "#e12912", color: "white" }}
                    onClick={() => setShowModal(true)}
                    disabled={paymentConfirmed}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="w-50 modal-dialog-centered m-auto">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Payment</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to proceed with the payment?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Div */}
      <div className="d-flex flex-column align-items-center justify-content-center">
        {showSuccessMessage && (
          <div className="d-flex justify-content-center">
            <SuccessDiv>
              <SuccessIcon />
              <Typography variant="body1">Application Submitted</Typography>
            </SuccessDiv>
          </div>
        )}
        {paymentSubmitted && !paymentConfirmed && (
          <div>
            <div
              className="mx-auto mb-3 shadow px-5 py-3 rounded"
              style={{ width: "1000px" }}
            >
              <Typography variant="h6" gutterBottom>
                Payment method
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardName"
                    label="Name on card"
                    fullWidth
                    autoComplete="cc-name"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardNumber"
                    label="Card number"
                    fullWidth
                    autoComplete="cc-number"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="expDate"
                    label="Expiry date"
                    fullWidth
                    autoComplete="cc-exp"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cvv"
                    label="CVV"
                    helperText="Last three digits on signature strip"
                    fullWidth
                    autoComplete="cc-csc"
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </div>
            <button
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={paymentConfirmed}
            >
              Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
