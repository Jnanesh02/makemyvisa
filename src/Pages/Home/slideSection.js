import React from "react";
import { Link } from "react-router-dom";

import bannerImage from "../../assets/images/banner-1.jpg";
import sliderImage from "../../assets/images/slider-img.png";
import Enquiry from "../Enquiry/enquiry";
import "./Home.css";
const SlideSection = () => {
  return (
    <>
      <div className="top-container">
        <section className="slider-section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 p-0">
                <div
                  id="carouselExampleDark"
                  className="carousel carousel-dark slide"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div
                      className="carousel-item active slider-one"
                      data-bs-interval="10000"
                    >
                      <img
                        src={bannerImage}
                        className="d-block w-100"
                        alt="bannerImage"
                      />
                      <img
                        src={sliderImage}
                        className="img-banner-fxd"
                        alt="SliderImage"
                      />
                      <div className="carousel-caption d-md-block slider-content-img">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="slider-inner-content">
                              <p>*Welcome to Makemyvisa*</p>
                              <h2>
                                Bridge That Gap With <br /> Makemyvisa and{" "}
                                <br /> get Visaized
                              </h2>
                              <div className="slider-buttons">
                                <Link to="/registration">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Signup
                                  </button>
                                </Link>
                                <Link to="/login">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    Login
                                  </button>
                                </Link>
                              </div>
                              <p>
                                Proud Member Of ASSOCHAM National Council <br />{" "}
                                On Travel & Tourism
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Enquiry />
    </>
  );
};

export default SlideSection;
