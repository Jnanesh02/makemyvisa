import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TravelHealthInsurance.css";

const TravelHealthInsurance = () => {
  const initialData = {
    countryName: "",
    departureDate: "",
    returnDate: "",
  };
  const [formData, setformData] = useState(initialData);
  const [insurance, setInsurance] = useState([]);
  const [showVisaTypes, setShowVisaTypes] = useState(false);
  const [showPaymentButton, setShowPaymentButton] = useState(false);

  const fetchInsurance = async (countryName) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/makemyvisa/api/files/${countryName}`
      );
      console.log("REsponse",response);
      setInsurance(response.data);
    } catch (error) {
      console.log(error);
    }
  };
// console.log("insurence",insurance);
  const [countriesData, setCountriesData] = useState([]);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getcountries`);
        
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


  console.log("countriesData",countriesData);
  const handleInputChange = (event) => {
    event.preventDefault();
    setformData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
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
                Destination Country:
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
                { 
                  Array.isArray(countriesData) &&
                  countriesData.map((country)=>(
                    <option key={country._id} value={country.countryName}>{country.countryName}</option>
                  ))
                  }
              </select>
            </div>
            <div>
              <h5 htmlFor="departureDate" className="travel-Insurance-label">
                Departure Date:
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
                Return Date:
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
              {insurance.length === 0?(
                 <div className="col text-center">
                 <p>No insurance documents found.</p>
               </div>
              ):(insurance?.map((document) => (
                <div key={document?._doc?._id} className="col-md-6 mb-3">
                  <div className="travel-Insurance-card shadow-sm card bg-light text-white">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="travel-Insurance-checkbox me-3"
                          onChange={handleCheckboxChange}
                        />

                        <h4 className="travel-Insurance-card-title card-title">
                          {document._doc.insuranceName || "no title"}
                        </h4>
                      </div>
                      <p className="travel-Insurance-card-text card-text">
                        Months: {document._doc.duration || "--"}
                      </p>
                      <p className="travel-Insurance-card-text card-text">
                        Fee: {document._doc.cost || "--"}
                      </p>
                      <button
                        className="travel-Insurance-link btn btn-danger"
                        onClick={() => handleDownload(document.url)}
                      >
                        Download Document
                      </button>
                    </div>
                  </div>
                </div>
              )))}
            </div>
            <div className="text-center">
              {" "}
              {/* Center the button */}
              {showPaymentButton && (
                <button className="travel-Insurance-link btn btn-danger">
                  Pay Payment
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelHealthInsurance;
