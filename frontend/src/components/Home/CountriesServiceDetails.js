import React, { useState, useEffect } from "react";
import countryBannerImage from "../../assets/countriesserviceImages/country-banner.jpg";
import { useParams } from "react-router-dom";
import Banner from "../../assets/countriesserviceImages/information-visa.png";
import card from "../../assets/countriesserviceImages/countries-card.jpg";
import icon from "../../assets/countriesserviceImages/countries-icons.png";
import axios from "axios";
import "./HomeStyles/countriesserviceDetails.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const CountriesServiceDetails = () => {
  const { countryName, serviceName } = useParams();
  const [countryData, setCountryData] = useState([]);
  const [filteredSubServiceType, setFilteredSubServiceTypes] = useState([]);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 3,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `${process.env.REACT_APP_BACKEND_URL}/getcountries`
        );
        const filteredCountries = response.data.message.filter(
          (country) => country.countryName === countryName.replace(/-/g, " ")
        );

        if (filteredCountries.length > 0) {
          setCountryData(filteredCountries[0]);
          const selectedService = filteredCountries[0].serviceTypes.find(
            (service) => service.serviceName === serviceName.replace(/-/g, " ")
          );
          if (selectedService) {
            console.log(selectedService);
            setFilteredSubServiceTypes(selectedService.subServiceTypes);
          } else {
            setFilteredSubServiceTypes([]);
          }
        } else {
          setCountryData(null);
          setFilteredSubServiceTypes([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [countryName, serviceName]);

  const countryBanner = (countryData) => {
    return (
      <section
        className="country-banner-section"
        style={{ backgroundImage: `url(${countryBannerImage})` }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5">
              <div className="banner-country-text">
                <h3> {countryData?.countryName} </h3>
                <p>{countryData?.description}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <img
                className="banner-flag"
                src={`http://localhost:3000/uploads/countryImages/${countryData?.flagImagePath}`}
                alt="Country Flag"
              />
            </div>
          </div>
        </div>
      </section>
    );
  };
  const ServiceCategoryBanner = (serviceName) => {
    return (
      <section
        className="visa-category"
        style={{ backgroundImage: `url(${Banner})`, backgroundSize: "contain" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="visa-category-text">{serviceName}-Categories</h2>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="services-country-card">
            {filteredSubServiceType && filteredSubServiceType.length === 1 ? (
              filteredSubServiceType.map((subServiceType, index) => (
                <div key={index} className="country-services-card-category p-2">
                  <div className="card country-cards">
                    <img src={card} className="card-img-top" alt="/" />
                    <div className="card-body">
                      <div className="country-icons">
                        <img src={icon} alt="" />
                      </div>
                      <h5 className="card-title">
                        {subServiceType.subServiceName || "No Service Name"}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Slider className="autoplay mx-auto mt-3" {...settings}>
                {filteredSubServiceType.map((subServiceType, index) => (
                  <div
                    key={index}
                    className="country-services-card-category p-2"
                  >
                    <div className="card country-cards">
                      <img src={card} className="card-img-top" alt="/" />
                      <div className="card-body">
                        <div className="country-icons">
                          <img src={icon} alt="" />
                        </div>
                        <h5 className="card-title">
                          {subServiceType.subServiceName || "No Service Name"}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </section>
    );
  };

  const ServiceInformation = (countryData, serviceName) => {
    return (
      <section className="information-visa">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>Information on {serviceName}</h1>
              {countryData && countryData.serviceTypes ? (
                <p>
                  {countryData.serviceTypes
                    .filter(
                      (serviceType) =>
                        serviceType.serviceName ===
                        serviceName.replace(/-/g, " ")
                    )
                    .map((serviceType, index) => (
                      <span key={index}>
                        {serviceType.description || "no data"}
                      </span>
                    ))}
                </p>
              ) : (
                <p>No service types available</p>
              )}
            </div>
            <div className="col-lg-12">
              <div className="accordion country-faq" id="accordionExample">
                {filteredSubServiceType &&
                  filteredSubServiceType.map((serviceType, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index + 1}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                          aria-controls={`collapse${index + 1}`}
                        >
                          {serviceType.subServiceName || "no data"}
                        </button>
                      </h2>
                      <div
                        id={`collapse${index + 1}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <strong>{serviceType.subServiceName}</strong>
                          {serviceType.description}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  return (
    <main className="content">
      {countryData ? (
        <>
          {countryBanner(countryData)}
          {ServiceCategoryBanner(serviceName)}
          {ServiceInformation(countryData, serviceName)}
        </>
      ) : (
        <p>No data available for this country and service.</p>
      )}
    </main>
  );
};
