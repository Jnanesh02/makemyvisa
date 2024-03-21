import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CostumerDashboardStyles/ApplicationForm.css";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useParams} from 'react-router-dom'
import CookieUtils from '../../../components/Cookie/Cookies';
const SuccessDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "green",
}));

const SuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: "green",
}));
const ApplicationForm = ({ Data, setLoading }) => {
  const { visastatus } = useParams();
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
    gender: "male",
    country: "",
    state: "",
    visaType: "",
    passport: "",
    destination: "",
    status:"submit"
  });
  const postApi = async () => {
    const customerId = CookieUtils.getCookies('userId');
    const objectID = JSON.parse(atob(customerId.split('.')[1]));
    const customerID = objectID.id;
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create/newserviceType/${visastatus}`, {
        data:{
        formData,
        documentUpload:[
  
        ],
        AdditionDocuments:[
  
        ]
       },
       "customerID": customerID
      });
  
      if (response.status === 200) {
        setLoading(true);
        console.log("success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  
  const handleConfirm = (e) => {
    setPaymentSubmitted(true);
    setShowModal(false); // Close the modal after confirmation
    setModalDisabled(true); // Disable the "Open Modal" button after confirmation
  };

  const handleSubmit = () => {
    

    setPaymentConfirmed(true); // Set payment as confirmed
    postApi();
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
    <div>
      {Data.length !== 0 ? (
        <div>
          <div
            className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
            style={{ width: "1000px" }}
          >
            <h2 className="visaApplication-title">Visa Application</h2>
            {Array.isArray(Data) ? (
              <>
                {Data.map((res) => (
                  <div key={res._id} className="mb-4 p-3 border rounded">
                  <div>
                    First Name: <span className="fw-bold">{res.data.formData.firstName}</span>{" "}
                  </div>
                  <div>
                    Last Name: <span className="fw-bold">{res.data.formData.lastName}</span>{" "}
                  </div>
                  <div>
                    Email: <span className="fw-bold text-primary">{res.data.formData.email}</span>{" "}
                  </div>
                  <div>
                    Gender: <span className="fw-bold">{res.data.formData.gender}</span>{" "}
                  </div>
                  
                  <div>
                    Passport Number: <span className="fw-bold">{res.data.formData.passport}</span>{" "}
                  </div>
                  <div>
                    Phone Number: <span className="fw-bold">{res.data.formData.phoneNumber}</span>{" "}
                  </div>
                  <div>
                    Destination: <span className="fw-bold">{res.data.formData.destination}</span>{" "}
                  </div>
                  <div>
                    visaType: <span className="fw-bold">{res.data.formData.visaType}</span>{" "}
                  </div>
                  <div>
                    Country: <span className="fw-bold">{res.data.formData.country}</span>{" "}
                  </div>
                </div>
                
                ))}
              </>
            ) : (
              <>"Visa Application"</>
            )}
          </div>
        </div>
      )  : (
        <div className="container">
          {/* Application Form */}
          {modalDisabled ? null : (
            <>
              <div>
                <div
                  className="visaApplication-container mx-auto mb-3 shadow px-5 py-3 rounded"
                  style={{ width: "1000px" }}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                    }}
                  >
                    <div className="visaApplication-form-container">
                      <h2 className="visaApplication-title">
                        Visa Application
                      </h2>
                      <div className="visaApplication-form">
                        <div className="visaApplication-form-row">
                          <div className="visaApplication-form-group">
                            <label
                              htmlFor="firstname"
                              className="visaApplication-label"
                            >
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
                            <label
                              htmlFor="lastname"
                              className="visaApplication-label"
                            >
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
                            <label
                              htmlFor="email"
                              className="visaApplication-label"
                            >
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
                            <label
                              htmlFor="phone"
                              className="visaApplication-label"
                            >
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
                            <label
                              htmlFor="gender"
                              className="visaApplication-label"
                            >
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
                          <div className="visaApplication-form-group">
                            <label
                              htmlFor="passport"
                              className="visaApplication-label"
                            >
                              Passport Number
                            </label>
                            <input
                              type="number"
                              id="passport"
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
                            <label
                              htmlFor="country"
                              className="visaApplication-label"
                            >
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
                            <label
                              htmlFor="state"
                              className="visaApplication-label"
                            >
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
                              // required
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
                                // required
                              >
                                <option>select</option>
                                {countriesData
                                  .find(
                                    (country) =>
                                      country.countryName ===
                                      formData.destination
                                  )
                                  .serviceTypes.map((service, index) => (
                                    <option
                                      key={index}
                                      value={service.serviceName}
                                    >
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
                          disabled={paymentConfirmed}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
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
      )}
    </div>
  );
};

export default ApplicationForm;




