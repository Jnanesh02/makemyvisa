import React, { useState, useEffect } from 'react'
import countryBannerImage from "../../assets/countriesserviceImages/country-banner.jpg";
import { useParams } from 'react-router-dom';
import Banner from "../../assets/countriesserviceImages/information-visa.png";
import card from "../../assets/countriesserviceImages/countries-card.jpg";
import icon from "../../assets/countriesserviceImages/countries-icons.png";

import axios from 'axios';
import "./HomeStyles/countriesserviceDetails.css";
export const CountriesDetails = () => {
    const { countryName, serviceName } = useParams();
    const [countryData, setCountryData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`${process.env.REACT_APP_BACKEND_URL}/getcountries`);
                const filteredCountries = response.data.message.filter(country => country.countryName === countryName.replace(/-/g, ' '));
                if (filteredCountries.length > 0) {
                    setCountryData(filteredCountries[0]);
                } else {
                    setCountryData(null);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [countryName, serviceName]);


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
                            <img className="banner-flag" src={`http://localhost:3000/uploads/countryImages/${countryData.flagImagePath}`} alt="Country Flag" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="visa-category" style={{ backgroundImage: `url(${Banner})`, backgroundSize: 'contain' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="visa-category-text">Visa Categories</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                                <div className="row">
                                    {countryData.serviceTypes ? (
                                        countryData.serviceTypes.map((serviceName, index) => (
                                            <div key={index} className="country-services-card-category">
                                                <div className="card country-cards">
                                                    <img src={card} className="card-img-top" alt={serviceName.serviceName} />
                                                    <div className="card-body">
                                                        <div className="country-icons">
                                                            <img src={icon} alt="" />
                                                        </div>
                                                        <h5 className="card-title">{serviceName.serviceName}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No data available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="information-visa">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Information on Visa</h1>
                            {countryData && countryData.serviceTypes ? (
                                <p>
                                    {countryData.serviceTypes.map((serviceType, index) => (
                                        <span key={index}>{serviceType.description}</span>
                                    ))}
                                </p>
                            ) : (
                                <p>No service types available</p>
                            )}
                        </div>
                        <div className="col-lg-12">
                            <div className="accordion country-faq" id="accordionExample">
                                {countryData &&
                                    countryData.serviceTypes &&
                                    countryData.serviceTypes.map((serviceType, index) => (
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
                                                    {serviceType.serviceName}
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${index + 1}`}
                                                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''
                                                    }`}
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="accordion-body">
                                                    <strong>{serviceType.serviceName}</strong>
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
}
