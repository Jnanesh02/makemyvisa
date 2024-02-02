import React, { useState, useEffect } from 'react'
import countryBannerImage from "../../assets/countriesserviceImages/country-banner.jpg";
import countryFlagImage from "../../assets/countriesserviceImages/Flag-1.png";
import { useParams } from 'react-router-dom';
import Banner from "../../assets/countriesserviceImages/information-visa.png";
import card from "../../assets/countriesserviceImages/countries-card.jpg";
import icon from "../../assets/countriesserviceImages/countries-icons.png";

import axios from 'axios';
import "./HomeStyles/countriesserviceDetails.css";
export const CountriesDetails = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { countryName, serviceName } = useParams();
    const [countryData, setCountryData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`${process.env.REACT_APP_BACKEND_URL}/getcountries`);
                const filteredCountries = response.data.message.filter(country => country.countryName === countryName);

                if (filteredCountries.length > 0) {
                    setCountryData(filteredCountries[0]);

                    // Filter and store sub-service types based on the selected serviceName
                    const selectedService = filteredCountries[0].serviceTypes.find(service => service.serviceName === serviceName);
                } else {
                    setCountryData(null);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [countryName, serviceName]);

    console.log("response",countryData);

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
                            <img className="banner-flag" src={countryFlagImage} alt="Country Flag" />
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
                                            <div key={index} className="col-lg-4">
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
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Accordion Item #1
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Accordion Item #2
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Accordion Item #3
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
