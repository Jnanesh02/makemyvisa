import React from "react";
import "./service.css";
import Bgservices from "../assets/images/servicesImages/bg-services.png";
import services1 from "../assets/images/servicesImages/1.png";
import services2 from "../assets/images/servicesImages/2.png";
import services3 from "../assets/images/servicesImages/3.png";
import services4 from "../assets/images/servicesImages/4.png";
import services5 from "../assets/images/servicesImages/5.png";
import services6 from "../assets/images/servicesImages/6.png";
import services11 from "../assets/images/servicesImages/11.png";
import services12 from "../assets/images/servicesImages/12.png";
import services13 from "../assets/images/servicesImages/13.png";
import services14 from "../assets/images/servicesImages/14.png";
import services15 from "../assets/images/servicesImages/15.png";
import services16 from "../assets/images/servicesImages/16.png";

const Service = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sidenavbar-b"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Services
      </button>

      <div
        className="modal modal-em-m"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundImage: `url(${Bgservices})` }}
          >
            <div className="modal-body">
              <button
                type="button"
                className="services-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ><i className="fa-solid fa-xmark"  style={{color:"#fe5141"}}></i></button>

              <div
                id="carouselExample"
                className="carousel slide carousal-slider-services"
              >
                <div className="carousel-inner services-icons-fd">
                <div className="carousel-item active">
                    <img className="services-images" src={services4} alt="Service 4" />
                    <p> Hotel Reservation </p>
                  </div>
                  <div className="carousel-item ">
                    <img className="services-images" src={services2} alt="Service 2" />
                    <p> Visa Assistance </p>
                  </div>
                  <div className="carousel-item">
                    <img className="services-images" src={services3} alt="Service 3" />
                    <p> Ticketing </p>
                  </div>
                 
                  <div className="carousel-item">
                    <img className="services-images" src={services5} alt="Service 5" />
                    <p> Travel Health Insurance </p>
                  </div>
                  <div className="carousel-item">
                    <img className="services-images" src={services6} alt="Service 6" />
                    <p> Immigration Advice </p>
                  </div>
                  <div className="carousel-item ">
                    <img className="services-images" src={services1} alt="Service 1" />
                    <p> Forex Services </p>
                  </div>
                  <div className="carousel-item">
                    <img className="services-images" src={services11} alt="Service 11" />
                    <p> Apostille & Attestation Services </p>
                  </div>
                  <div className="carousel-item">
                    <img className="services-images" src={services12} alt="Service 12" />
                    <p> Translation & Notary Services </p>
                  </div>
                  <div className="carousel-item">
                    <img className="services-images" src={services13} alt="Service 13" />
                    <p> Courier, Pick-up & Drop Services </p>
                  </div>
                  <div className="carousel-item">
                    <img className="services-images" src={services14} alt="Service 14" />
                    <p> International Student Accommodation</p>
                  </div>
                  <div className="carousel-item">
                    <img className="services-images" src={services15} alt="Service 15" />
                    <p> Travel Packages </p>
                  </div>
                  <div className="carousel-item">
                    <img className="services-images" src={services16} alt="Service 16" />
                    <p> Student Admissions </p>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
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
                  data-bs-target="#carouselExample"
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
      </div>
    </>
  );
};

export default Service;
