import React from "react";
import { Link } from "react-router-dom";
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

                <div className="myDIV active"> 
                <a target="blank" href="https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-pexels-photo.jpg">
                <img src={services1}/>
                </a>
                </div>

                <div className="hidee"> 
                <img src={services1}/> 
                <p>
                   Forex Services
                </p>
                 </div>         
                <div className="myDIVsecond"> 
                <Link to="/services/VisaAssistance/">  <img src={services2} alt="..."/></Link>
                </div>
                <div className="hideesecond"> 
                <img src={services2} alt="..."/>
                <p>
                   Visa Assistance
                </p>
                   </div>     
                <div className="myDIVthree"> 
                <Link to="/services/dummy/dummyticket">
                <img src={services3} alt=".."/>

                </Link>
                </div>
                <div className="hideethree"> 
                <img src={services3} alt="..."/>  
                <p>
                   Ticketing
                </p>
                </div>   
                <div className="myDIVfour"> 
                <Link to="/services/hotel/hotelReservation">  <img src={services4} alt="..."/></Link>
                </div>
                <div className="hideefour"> 
                <img src={services4} alt="..."/> 
                <p>
                   Hotel Reservation
                </p>
                 </div>   

                <div className="myDIVfive"> 
                <Link to="/services/TravelHealthInsurance"><img src={services5} alt="..."/></Link>
                </div>
                <div className="hideefive">  
                
                 <img src={services5} alt=""/>
                 <p>
                   Travel Health
                </p>
                  </div>   

                <div className="myDIVsix"> 
                <Link to="service/immigration/immigrationAdvice"> <img src={services6} alt="..."/></Link>
                </div>
                <div className="hideesix">  
                <img src={services6} alt="..."/> 
                <p>
                  Immigration Advice
                </p>
                </div>   
                
                <div className="myDIVsixextra"> 
                <img src={services11}/>
                </div>
                <div className="hideesixextra"> 
                
                 <img src={services11}/> 
                 <p> Apostille & Attestation </p>
                 </div>   
                
                <div className="myDIVseven"> 
                <img src={services12}/>
                </div>
                <div className="hideeseven">
                  
                   <img src={services12}/> 
                   <p>
                    Translation & Notary
                   </p>
                   </div>   

                <div className="myDIVeight"> 
                <Link to="/services/CourierPickup/"> <img src={services13} alt=".."/></Link>
               
                </div>
                <div className="hideeeight">
                    <img src={services13} alt="..."/>
                    <p>
                       Courier, Pickup & Drop 
                    </p>
                     </div>   

                <div className="myDIVnine"> 
                <img src={services14}/>
                </div>
                <div className="hideenine">   
                 <img src={services14}/> 
                 <p>
                   Student Accommodation 
                 </p>
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
