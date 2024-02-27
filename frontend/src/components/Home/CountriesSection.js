
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./HomeStyles/Home.css";
const renderFlipCard = (country) => (
  <div className="col-lg-4 col-md-6 col-sm-6" key={country.countryName}>
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
         src={`http://localhost:3000/uploads/countryImages/${country.countryImagePath}`}
         alt={`Avatar for ${country.countryName}`}
         style={{ width: "300px", height: "300px" }}
          />

          <div className="country-details">
            <h4>{country.countryName}</h4>
            <p>{country.description}</p>
          </div>
        </div>
        <div className="flip-card-back">
        {country.serviceTypes ? (
            <ul className="list-group countries-list">
              <h3 className="country-heading-nm"> {country.countryName} </h3>
              {country.serviceTypes.map((service, index) => (
                <li className="list-group-item countries-list" key={index}>
                  <NavLink to={`/countries/${country.countryName.replace(/\s/g,"-")}/${service.serviceName.replace(/\s/g,"-")}`}>
                    {service.serviceName}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>No services available</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const CountriesSection = () => {
  const [selectedCountry, setSelectedCountry] = useState("All");
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

  const filteredCountries =
    selectedCountry === "All"
      ? countriesData
      : countriesData.filter(
          (country) => country.countryName === selectedCountry
        );

  return (
    <>
      <section className="countrys-section" style={{ backgroundImage: "url(images/OJO4YQ0.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h4>OUR AREAS OF EXPERTISE</h4>
              <h2>Countries & Visas We Cover</h2>
            </div>
            <div className="search">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setSelectedCountry(e.target.value)}
                value={selectedCountry}
              >
                <option value="All">Select Country</option>
                
                {countriesData.map((country) => (
                  <option key={country.countryName} value={country.countryName}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-12">
              <div className="row">
              {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <React.Fragment key={country.countryName}>
                      {renderFlipCard(country)}
                    </React.Fragment>
                  ))
                ) : (
                  <p>No countries available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CountriesSection;

