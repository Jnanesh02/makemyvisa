import React, { useEffect, useState } from "react";
import jsonData from "./data.json"; // Assuming your JSON data is stored in data.json

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
   ArrivalCountry: "", 
   ArrivalAirport: "" ,
    DepartureCountry: "", 
    DepartureAirport: "" 
  });
  const [arrivalAirports, setArrivalAirports] = useState([]);
  const [departureAirports, setDepartureAirports] = useState([]);

  useEffect(() => {
    // Extract unique countries from the JSON data
    const countrySet = new Set(jsonData.map((entry) => entry.county));
    const uniqueCountries = Array.from(countrySet);
    setCountries(uniqueCountries);
  }, []);

  const handleCountryChange = (e) => {
    e.preventDefault();
    console.log("e.target.value",e.target.value)
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
 
  };

 

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <div>
      <h1>List of Countries</h1>
      <form onSubmit={handleSubmit}>
        {/* Arrival City */}
        <div>
          <h2>Arrival City</h2>
          <select name="ArrivalCountry" value={formData.ArrivalCity} onChange={handleCountryChange}>
            <option value="">Select Arrival Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          <select name="ArrivalAirport" value={formData.ArrivalAirport} onChange={handleCountryChange}>
            <option value="">Select Arrival Airport</option>
            {arrivalAirports.map((airport, index) => (
              <option key={index} value={airport.airport}>{airport.airport} - {airport.city_code} </option>
            ))}
            <option value='Not in the List'>Not in the List</option>
          </select>
        </div>
        <div>
          <h2>Arrival City</h2>
          <select name="DepartureCountry" value={formData.ArrivalCity} onChange={handleCountryChange}>
            <option value="">Select Departure Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          <select name="DepartureAirport" value={formData.ArrivalAirport} onChange={handleCountryChange}>
            <option value="">Select Departure Airport</option>
            {arrivalAirports.map((airport, index) => (
              <option key={index} value={airport.airport}>{airport.airport} - {airport.city_code} </option>
            ))}
            <option value='Not in the List'>Not in the List</option>
          </select>
        </div>
       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CountryList;
