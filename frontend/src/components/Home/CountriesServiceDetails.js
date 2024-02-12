import React, { useState, useEffect } from 'react'
import countryBannerImage from "../../assets/countriesserviceImages/country-banner.jpg";
import { useParams } from 'react-router-dom';
import Banner from "../../assets/countriesserviceImages/information-visa.png";
import card from "../../assets/countriesserviceImages/countries-card.jpg";
import icon from "../../assets/countriesserviceImages/countries-icons.png";

import axios from 'axios';
import "./HomeStyles/countriesserviceDetails.css";
export const CountriesServiceDetails = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { countryName, serviceName } = useParams();
    const [countryData, setCountryData] = useState([]);
    const [filteredSubServiceType, setFilteredSubServiceTypes] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`${process.env.REACT_APP_BACKEND_URL}/getcountries`);
                const filteredCountries = response.data.message.filter(country => country.countryName === countryName);

                if (filteredCountries.length > 0) {
                    setCountryData(filteredCountries[0]);

                    // Filter and store sub-service types based on the selected serviceName
                    const selectedService = filteredCountries[0].serviceTypes.find(service => service.serviceName === serviceName);

                    if (selectedService) {
                        setFilteredSubServiceTypes(selectedService.subServiceTypes);
                    } else {
                        setFilteredSubServiceTypes([]);
                    }
                } else {
                    setCountryData(null);
                    setFilteredSubServiceTypes([]);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [countryName, serviceName]);


    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    };
    return (
        <main className="content">
            <section className="country-banner-section" style={{ backgroundImage: `url(${countryBannerImage})` }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="banner-country-text">
                                <h3> {countryData?.countryName} </h3>
                                <p>
                                    {countryData?.description}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <img className="banner-flag" src={`http://localhost:3000/uploads/countryImages/${countryData?.flagImagePath}`} alt="Country Flag" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="visa-category" style={{ backgroundImage: `url(${Banner})`, backgroundSize: 'contain' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="visa-category-text">{serviceName}-Categories</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                                <div className="row">
                                    {filteredSubServiceType ? (
                                        filteredSubServiceType.map((subServiceType, index) => (
                                            <div key={index} className="country-services-card-category">
                                                <div className="card country-cards">
                                                    <img src={card} className="card-img-top" alt={subServiceType.subServiceName} />
                                                    <div className="card-body">
                                                        <div className="country-icons">
                                                            <img src={icon} alt="" />
                                                        </div>
                                                        <h5 className="card-title">{subServiceType.subServiceName}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No data available</p>
                                    )}
                                </div>
                                <button className="carousel-control-prev" type="button" onClick={handlePrev}>
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" onClick={handleNext}>
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="information-visa">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Information on {serviceName}</h1>
                            {countryData && countryData.serviceTypes ? (
                                <p>
                                    {countryData.serviceTypes
                                        .filter(serviceType => serviceType.serviceName === serviceName)
                                        .map((serviceType, index) => (
                                            <span key={index}>{serviceType.description}</span>
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
                                                    aria-expanded={index === 0 ? 'true' : 'false'}
                                                    aria-controls={`collapse${index + 1}`}
                                                >
                                                    {serviceType.subServiceName}
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${index + 1}`}
                                                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''
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
        </main>
    );
};
