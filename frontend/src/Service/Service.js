import React from "react";
import { Link, NavLink } from "react-router-dom";
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
import servicesmain1 from "../assets/images/services-main-images/1-1.png";
import servicesmain2 from "../assets/images/services-main-images/2-1.png";
import servicesmain3 from "../assets/images/services-main-images/3-1.png";
import servicesmain4 from "../assets/images/services-main-images/4-1.png";
import servicesmain5 from "../assets/images/services-main-images/5-1.png";
import servicesmain6 from "../assets/images/services-main-images/6-1.png";
import servicesmain11 from "../assets/images/services-main-images/11-1.png";
import servicesmain12 from "../assets/images/services-main-images/12-1.png";
import servicesmain13 from "../assets/images/services-main-images/13-1.png";
import servicesmain14 from "../assets/images/services-main-images/14-1.png";
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
              >
                <i
                  className="fa-solid fa-xmark"
                  style={{ color: "#fe5141" }}
                ></i>
              </button>

              <div
                id="carouselExample"
                className="carousel slide carousal-slider-services"
              >
                <div className="clients-cricle-section">
                  <ul
                    className="nav nav-pills mb-3 nav-services-circle"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active btn-circle-services-1"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        <img src={services1} alt="/" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-circle-services-2"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        <img src={services2} alt="/" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-circle-services-3"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                      >
                        <img src={services3} alt="/" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-circle-services-4"
                        id="pills-profile-1-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile-1"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile-1"
                        aria-selected="false"
                      >
                        <img src={services4} alt="/" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-circle-services-5"
                        id="pills-contact-1-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact-1"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact-1"
                        aria-selected="false"
                      >
                        <img src={services5} alt="/" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-circle-services-6"
                        id="pills-profile-2-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile-2"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile-2"
                        aria-selected="false"
                      >
                        <img src={services6} alt="/" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-circle-services-7"
                        id="pills-contact-2-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact-2"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact-2"
                        aria-selected="false"
                      >
                        <img src={services11} alt="/" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-circle-services-8"
                        id="pills-contact-3-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact-3"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact-3"
                        aria-selected="false"
                      >
                        <img src={services12} alt="/" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-circle-services-9"
                        id="pills-contact-4-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact-4"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact-4"
                        aria-selected="false"
                      >
                        <img src={services13} alt="/" />
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link btn-circle-services-10"
                        id="pills-contact-5-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact-5"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact-5"
                        aria-selected="false"
                      >
                        <img src={services14} alt="/" />
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain1}
                        alt="/"
                      />
                      <p className="pills-tab-text">
                        {" "}
                        Forex <br /> Services{" "}
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain2}
                        alt="/"
                      />
                      <p className="pills-tab-text">
                        {" "}
                        Visa <br /> Assistance{" "}
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact"
                      role="tabpanel"
                      aria-labelledby="pills-contact-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain3}
                        alt="/"
                      />
                      <Link to="/dummyticket">
                      <p className="pills-tab-text"> Ticketing </p>
                      </Link>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile-1"
                      role="tabpanel"
                      aria-labelledby="pills-profile-1-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain4}
                        alt="/"
                      />
                      <p className="pills-tab-text">
                        {" "}
                        Hotel <br /> Reservation{" "}
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact-1"
                      role="tabpanel"
                      aria-labelledby="pills-contact-1-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain5}
                        alt="/"
                      />
                      <p className="pills-tab-text">
                        {" "}
                        Travel Health <br /> Insurance{" "}
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile-2"
                      role="tabpanel"
                      aria-labelledby="pills-profile-2-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain6}
                        alt="/"
                      />
                      <p className="pills-tab-text">
                        {" "}
                        Immigration <br /> Advice{" "}
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact-2"
                      role="tabpanel"
                      aria-labelledby="pills-contact-2-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain11}
                        alt="/"
                      />
                      <p className="pills-tab-text">
                        {" "}
                        Apostille & <br /> Attestation{" "}
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact-3"
                      role="tabpanel"
                      aria-labelledby="pills-contact-3-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain12}
                        alt="/"
                      />
                      <p className="pills-tab-text">
                        {" "}
                        Translation & <br /> Notary{" "}
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact-4"
                      role="tabpanel"
                      aria-labelledby="pills-contact-4-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain13}
                        alt="/"
                      />
                      <p className="pills-tab-text">
                        {" "}
                        Courier, <br /> Pickup{" "}
                      </p>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact-5"
                      role="tabpanel"
                      aria-labelledby="pills-contact-5-tab"
                      tabindex="0"
                    >
                      <img
                        className="services-main-imagess"
                        src={servicesmain14}
                        alt="/"
                      />

                      <p className="pills-tab-text">
                        {" "}
                        International <br /> Student{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
