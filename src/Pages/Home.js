import React from "react";
import banner from "../assets/images/banner-1.jpg";
import sliderImg from "../assets/images/slider-img.png";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div class="top-container">
      <section class="slider-section">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 p-0">
              <div
                id="carouselExampleDark"
                class="carousel carousel-dark slide"
              >
                <div class="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="0"
                    class="active"
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
                <div class="carousel-inner">
                  <div
                    class="carousel-item active slider-one"
                    data-bs-interval="10000"
                  >
                    <img src={banner} class="d-block w-100" alt="..." />
                    <img class="img-banner-fxd" src={sliderImg} />
                    <div class="carousel-caption d-md-block slider-content-img">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="slider-inner-content">
                            <p>*Welcome to Makemyvisa*</p>
                            <h2>
                              Bridge That Gap With <br /> Makemyvisa and <br />{" "}
                              get Visaized
                            </h2>
                            <div class="slider-buttons">
                              <Link to="/signup">
                                <button
                                  type="button"
                                  className="btn btn-primary loginbtn"
                                >
                                  Signup
                                </button>
                              </Link>

                              <Link to="/login">
                                <button
                                  type="button"
                                  className="btn btn-primary loginbtn"
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
                        <div class="col-lg-6"></div>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item" data-bs-interval="2000">
                    <img src={banner} class="d-block w-100" alt="..." />
                    <div class="carousel-caption d-none d-md-block">
                      <h5>Second slide label</h5>
                      <p>
                        Some representative placeholder content for the second
                        slide.
                      </p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src={banner} class="d-block w-100" alt="..." />
                    <div class="carousel-caption d-none d-md-block">
                      <h5>Third slide label</h5>
                      <p>
                        Some representative placeholder content for the third
                        slide.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
