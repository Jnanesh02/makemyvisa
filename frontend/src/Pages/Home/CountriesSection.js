import React, { useState } from "react";
import Canada from "../../assets/images/01.png";
import Australia from "../../assets/images/02.png";
import UK from "../../assets/images/03.png";
import Ireland from "../../assets/images/04.png";
import USA from "../../assets/images/05.png";
import European from "../../assets/images/06.png";
import "./Home.css";
const renderFlipCard = (imageSrc, countryName, description) => (
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={imageSrc}
            alt={`Avatar for ${countryName}`}
            style={{ width: "300px", height: "300px" }}
          />

          <div className="country-details">
            <h4>{countryName}</h4>
            <p>{description}</p>
          </div>
        </div>
        <div className="flip-card-back">
          <h1>John Doe</h1>
          <p>Architect & Engineer</p>
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  </div>
);
const CountriesSection = () => {
    const [selectedCountry, setSelectedCountry] = useState('All'); // Initialize with 'All' to show all countries by default
    const countriesData = [
        { imageSrc: Canada, countryName: "CANADA", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { imageSrc: Australia, countryName: "AUSTRALIA", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { imageSrc: UK, countryName: "UNITED KINGDOM", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { imageSrc: Ireland, countryName: "IRELAND", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { imageSrc: USA, countryName: "U S A", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { imageSrc: European, countryName: "European Schengen", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
      ];
      const filteredCountries = selectedCountry === 'All' ? countriesData : countriesData.filter(country => country.countryName === selectedCountry);
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
                    {countriesData.map((country, index) => (
                      <option key={index} value={country.countryName}>{country.countryName}</option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    {filteredCountries.map((country, index) => (
                      <React.Fragment key={index}>
                        {renderFlipCard(country.imageSrc, country.countryName, country.description)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
};

export default CountriesSection;
