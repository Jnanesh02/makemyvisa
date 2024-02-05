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
import servicessmall from "../assets/images/servicesImages/small.png";

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
              
             <div className="clients-cricle-section">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
      <img src={servicessmall}/>
    </button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
    <img src={servicessmall}/>
    </button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
    <img src={servicessmall}/>
    </button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
    <img src={servicessmall}/>
    </button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
    <img src={servicessmall}/>
    </button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
    <img src={servicessmall}/>
    </button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
    <img src={servicessmall}/>
    </button>
  </li>

</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">addhaadaskdldadkh</div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">aldadjadasdl.asdj</div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">...</div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">...</div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">...</div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">...</div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">...</div>
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
